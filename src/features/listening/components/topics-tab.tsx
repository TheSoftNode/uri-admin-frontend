"use client";

import { History, Tags } from "lucide-react";
import { Fragment, useMemo, useState } from "react";
import { toast } from "sonner";

import { EmptyState } from "@/components/data-display/empty-state";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { CurationMarket, CurationTopic, TopicHistoryEntry, TopicStatus } from "@/features/listening/types";
import { topicStatusMeta } from "@/features/listening/types";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

function topRelated(coOccurs: Record<string, number> | undefined, n = 3): string[] {
  if (!coOccurs) return [];
  return Object.entries(coOccurs)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([key]) => key);
}

function TopicHistoryPanel({ entries }: { entries: TopicHistoryEntry[] | undefined }) {
  if (!entries || entries.length === 0) {
    return <p className="py-2 text-xs text-subtle-foreground">No recorded transitions yet.</p>;
  }
  return (
    <ol className="space-y-1.5 py-1.5">
      {entries.map((entry, i) => (
        <li key={i} className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">
            {entry.oldStatus ? topicStatusMeta[entry.oldStatus].label : "new"} →{" "}
            {topicStatusMeta[entry.newStatus].label}
          </span>{" "}
          by {entry.actor} · {formatDateTime(entry.at)}
          {entry.reason ? <span className="italic"> — {entry.reason}</span> : null}
        </li>
      ))}
    </ol>
  );
}

function TopicActions({
  topic,
  busy,
  onDecide,
}: {
  topic: CurationTopic;
  busy: boolean;
  onDecide: (status: TopicStatus) => void;
}) {
  return (
    <>
      {topic.status !== "monitored" ? (
        <Button variant="outline" size="sm" disabled={busy} onClick={() => onDecide("monitored")}>
          Promote
        </Button>
      ) : null}
      {topic.status !== "retired" ? (
        <Button variant="ghost" size="sm" disabled={busy} onClick={() => onDecide("retired")}>
          Retire
        </Button>
      ) : null}
    </>
  );
}

interface TopicsTabProps {
  markets: CurationMarket[];
  topics: CurationTopic[];
  topicHistory: Record<string, TopicHistoryEntry[]>;
  market: string;
  onDecide: (topic: CurationTopic, status: TopicStatus) => void;
}

const STATUS_FILTERS: { value: string; label: string }[] = [
  { value: "default", label: "Observed + Candidate (default)" },
  { value: "observed", label: "Observed" },
  { value: "candidate", label: "Candidate" },
  { value: "monitored", label: "Monitored" },
  { value: "paused", label: "Paused" },
  { value: "retired", label: "Retired" },
];

export function TopicsTab({ markets, topics, topicHistory, market, onDecide }: TopicsTabProps) {
  const [status, setStatus] = useState("default");
  const [decidingKey, setDecidingKey] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleHistory = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    return topics.filter((t) => {
      if (market && t.market !== market) return false;
      if (status === "default") return t.status === "observed" || t.status === "candidate";
      return t.status === status;
    });
  }, [topics, market, status]);

  const marketLabel = (key: string) => markets.find((m) => m.key === key)?.label ?? key;

  const decide = (topic: CurationTopic, next: TopicStatus) => {
    setDecidingKey(topic.key);
    onDecide(topic, next);
    toast.success(`"${topic.name}" set to ${topicStatusMeta[next].label}.`);
    window.setTimeout(() => setDecidingKey(null), 150);
  };

  if (filtered.length === 0) {
    return (
      <div className="space-y-4">
        <FilterBar status={status} onStatusChange={setStatus} />
        <EmptyState
          icon={Tags}
          title="Nothing waiting on a decision"
          description="Topics appear here once they're observed or candidate — words and phrases Uri has seen but hasn't promoted to a monitored search term yet."
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <FilterBar status={status} onStatusChange={setStatus} />

      {/* Table on wider screens — dense and scannable for many rows. */}
      <div className="hidden overflow-hidden rounded-2xl border bg-card shadow-card md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Topic</TableHead>
              <TableHead>Market</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last seen</TableHead>
              <TableHead>Decided by</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((t) => {
              const id = `${t.market}:${t.key}`;
              const isOpen = expanded.has(id);
              const related = topRelated(t.coOccurs);
              const busy = decidingKey === t.key;
              return (
                <Fragment key={id}>
                  <TableRow>
                    <TableCell className="whitespace-normal">
                      <p className="font-semibold text-foreground">{t.name}</p>
                      {related.length > 0 ? (
                        <p className="text-xs font-normal text-subtle-foreground">
                          Related: {related.join(", ")}
                        </p>
                      ) : null}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{marketLabel(t.market)}</TableCell>
                    <TableCell>
                      <StatusBadge tone={topicStatusMeta[t.status].tone}>
                        {topicStatusMeta[t.status].label}
                      </StatusBadge>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-subtle-foreground tabular">
                      {formatDateTime(t.lastSeen)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{t.decidedBy ?? "—"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1.5">
                        <Button variant="ghost" size="icon-sm" onClick={() => toggleHistory(id)}>
                          <History />
                        </Button>
                        <TopicActions topic={t} busy={busy} onDecide={(s) => decide(t, s)} />
                      </div>
                    </TableCell>
                  </TableRow>
                  {isOpen ? (
                    <TableRow>
                      <TableCell colSpan={6} className="bg-muted/40">
                        <TopicHistoryPanel entries={topicHistory[id]} />
                      </TableCell>
                    </TableRow>
                  ) : null}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Card stack on narrow screens. */}
      <div className="space-y-2.5 md:hidden">
        {filtered.map((t) => {
          const id = `${t.market}:${t.key}`;
          const isOpen = expanded.has(id);
          const related = topRelated(t.coOccurs);
          const busy = decidingKey === t.key;
          return (
            <div key={id} className="space-y-2.5 rounded-2xl border bg-card p-4 shadow-card">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="truncate text-xs text-subtle-foreground">{marketLabel(t.market)}</p>
                  {related.length > 0 ? (
                    <p className="truncate text-xs text-subtle-foreground">Related: {related.join(", ")}</p>
                  ) : null}
                </div>
                <StatusBadge tone={topicStatusMeta[t.status].tone} className="shrink-0">
                  {topicStatusMeta[t.status].label}
                </StatusBadge>
              </div>
              <p className="font-mono text-xs text-subtle-foreground tabular">
                Last seen {formatDateTime(t.lastSeen)}
                {t.decidedBy ? ` · decided by ${t.decidedBy}` : ""}
              </p>
              <div className="flex flex-wrap gap-1.5">
                <TopicActions topic={t} busy={busy} onDecide={(s) => decide(t, s)} />
                <Button variant="ghost" size="sm" className="ml-auto" onClick={() => toggleHistory(id)}>
                  <History /> History
                </Button>
              </div>
              {isOpen ? (
                <div className="border-t pt-2">
                  <TopicHistoryPanel entries={topicHistory[id]} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FilterBar({ status, onStatusChange }: { status: string; onStatusChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger size="sm" className={cn("min-w-56")}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUS_FILTERS.map((f) => (
            <SelectItem key={f.value} value={f.value}>
              {f.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
