"use client";

import { History, Tags } from "lucide-react";
import { Fragment, useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/features/listening/components/empty-state";
import type {
  CurationMarket,
  CurationTopic,
  TopicHistoryEntry,
  TopicStatus,
} from "@/features/listening/types";
import { topicStatusMeta } from "@/features/listening/types";
import { formatDateTime } from "@/lib/format";
import { toneSoftBg, toneText } from "@/lib/tone";
import { cn } from "@/lib/utils";

function topRelated(coOccurs: Record<string, number> | undefined, n = 3): string[] {
  return coOccurs
    ? Object.entries(coOccurs)
        .sort((a, b) => b[1] - a[1])
        .slice(0, n)
        .map(([key]) => key)
    : [];
}

const SelectEl = ({
  value,
  onChange,
  children,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  className?: string;
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={cn(
      "h-8 rounded-lg border border-input bg-card px-2 text-[12px] text-foreground transition-[border-color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/20",
      className,
    )}
  >
    {children}
  </select>
);

function TopicHistoryPanel({ entries }: { entries: TopicHistoryEntry[] | undefined }) {
  if (!entries || entries.length === 0) {
    return (
      <div className="py-2 text-[11.5px] text-muted-foreground">No recorded transitions yet.</div>
    );
  }
  return (
    <ol className="space-y-1.5 py-1">
      {entries.map((e, i) => (
        <li key={i} className="text-[11.5px] text-muted-foreground">
          <span className="font-medium text-foreground">
            {e.oldStatus ? topicStatusMeta[e.oldStatus].label : "new"} →{" "}
            {topicStatusMeta[e.newStatus].label}
          </span>{" "}
          by {e.actor} · {formatDateTime(e.at)}
          {e.reason ? <span className="italic"> — {e.reason}</span> : null}
        </li>
      ))}
    </ol>
  );
}

interface TopicsTabProps {
  markets: CurationMarket[];
  topics: CurationTopic[];
  topicHistory: Record<string, TopicHistoryEntry[]>;
  market: string;
  onDecide: (topic: CurationTopic, status: TopicStatus) => void;
}

export function TopicsTab({ markets, topics, topicHistory, market, onDecide }: TopicsTabProps) {
  const [status, setStatus] = useState<string>("");
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
      if (status) return t.status === status;
      return t.status === "observed" || t.status === "candidate";
    });
  }, [topics, market, status]);

  const decide = (t: CurationTopic, newStatus: TopicStatus) => {
    setDecidingKey(t.key);
    onDecide(t, newStatus);
    toast.success(`"${t.name || t.key}" set to ${topicStatusMeta[newStatus].label}.`);
    setDecidingKey(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <SelectEl value={status} onChange={setStatus}>
          <option value="">Observed + Candidate (default)</option>
          <option value="observed">Observed</option>
          <option value="candidate">Candidate</option>
          <option value="monitored">Monitored</option>
          <option value="paused">Paused</option>
          <option value="retired">Retired</option>
        </SelectEl>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Tags}
          title="Nothing waiting on a decision"
          description="Topics appear here once they're observed or candidate — words and phrases Uri has seen but hasn't promoted to a monitored search term yet."
        />
      ) : (
        <>
          {/* Table on wider screens — dense and scannable for many rows. */}
          <Card className="hidden overflow-hidden py-0 md:block">
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
                  const meta = topicStatusMeta[t.status] ?? topicStatusMeta.observed;
                  const busy = decidingKey === t.key;
                  const id = `${t.market}:${t.key}`;
                  const isOpen = expanded.has(id);
                  const related = topRelated(t.coOccurs);
                  return (
                    <Fragment key={id}>
                      <TableRow>
                        <TableCell className="font-medium text-foreground">
                          {t.name || t.key}
                          {related.length > 0 && (
                            <div className="mt-0.5 text-[11px] font-normal text-muted-foreground">
                              Related: {related.join(", ")}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {markets.find((m) => m.key === t.market)?.label || t.market}
                        </TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
                              toneSoftBg[meta.tone],
                              toneText[meta.tone],
                            )}
                          >
                            {meta.label}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDateTime(t.lastSeen)}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {t.decidedBy || "—"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1.5">
                            <Button size="xs" variant="ghost" onClick={() => toggleHistory(id)}>
                              <History className="h-3 w-3" />
                            </Button>
                            {t.status !== "monitored" && (
                              <Button
                                size="xs"
                                variant="soft"
                                disabled={busy}
                                onClick={() => decide(t, "monitored")}
                              >
                                Promote
                              </Button>
                            )}
                            {t.status !== "retired" && (
                              <Button
                                size="xs"
                                variant="ghost"
                                disabled={busy}
                                onClick={() => decide(t, "retired")}
                              >
                                Retire
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                      {isOpen && (
                        <TableRow>
                          <TableCell colSpan={6} className="bg-muted/20">
                            <TopicHistoryPanel entries={topicHistory[id]} />
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </Card>

          {/* Card stack on narrow screens — a wide table either clips columns
              off-screen with no scroll hint, or forces an unexpected side-scroll. */}
          <div className="space-y-2.5 md:hidden">
            {filtered.map((t) => {
              const meta = topicStatusMeta[t.status] ?? topicStatusMeta.observed;
              const busy = decidingKey === t.key;
              const id = `${t.market}:${t.key}`;
              const isOpen = expanded.has(id);
              const related = topRelated(t.coOccurs);
              return (
                <Card key={id}>
                  <div className="space-y-2 p-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="truncate text-[13.5px] font-medium text-foreground">
                          {t.name || t.key}
                        </div>
                        <div className="truncate text-[11.5px] text-muted-foreground">
                          {markets.find((m) => m.key === t.market)?.label || t.market}
                        </div>
                        {related.length > 0 && (
                          <div className="truncate text-[11px] text-muted-foreground">
                            Related: {related.join(", ")}
                          </div>
                        )}
                      </div>
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                          toneSoftBg[meta.tone],
                          toneText[meta.tone],
                        )}
                      >
                        {meta.label}
                      </span>
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      Last seen {formatDateTime(t.lastSeen)}
                      {t.decidedBy ? ` · decided by ${t.decidedBy}` : ""}
                    </div>
                    <div className="flex gap-1.5">
                      {t.status !== "monitored" && (
                        <Button
                          size="xs"
                          variant="soft"
                          disabled={busy}
                          onClick={() => decide(t, "monitored")}
                        >
                          Promote
                        </Button>
                      )}
                      {t.status !== "retired" && (
                        <Button
                          size="xs"
                          variant="ghost"
                          disabled={busy}
                          onClick={() => decide(t, "retired")}
                        >
                          Retire
                        </Button>
                      )}
                      <Button
                        size="xs"
                        variant="ghost"
                        className="ml-auto"
                        onClick={() => toggleHistory(id)}
                      >
                        <History className="h-3 w-3" /> History
                      </Button>
                    </div>
                    {isOpen && (
                      <div className="border-t border-border pt-2">
                        <TopicHistoryPanel entries={topicHistory[id]} />
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
