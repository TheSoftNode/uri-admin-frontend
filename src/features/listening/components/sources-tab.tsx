"use client";

import { ShieldCheck, ShieldOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { EmptyState } from "@/components/data-display/empty-state";
import { Button } from "@/components/ui/button";
import type { SourcePermission } from "@/features/listening/types";
import { cn } from "@/lib/utils";

interface SourcesTabProps {
  sources: SourcePermission[];
  onToggle: (source: SourcePermission) => void;
}

export function SourcesTab({ sources, onToggle }: SourcesTabProps) {
  const [busy, setBusy] = useState<string | null>(null);

  if (sources.length === 0) {
    return (
      <EmptyState
        icon={ShieldCheck}
        title="No source permission records yet"
        description="Each connector (X, X Pro, …) gets a permission record — terms, allowed use, retention and display rules — approved before it can collect anything."
      />
    );
  }

  const toggle = (source: SourcePermission) => {
    setBusy(source.source);
    onToggle(source);
    toast.success(
      source.approved
        ? `${source.source} revoked — collection stops on its next run.`
        : `${source.source} approved — collection resumes on its next run.`,
    );
    window.setTimeout(() => setBusy(null), 150);
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {sources.map((s) => (
        <div key={s.source} className="space-y-3.5 rounded-2xl border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "flex size-9 items-center justify-center rounded-xl",
                  s.approved ? "bg-success-soft text-success" : "bg-critical-soft text-critical",
                )}
              >
                {s.approved ? <ShieldCheck className="size-4" /> : <ShieldOff className="size-4" />}
              </div>
              <p className="font-mono text-sm font-semibold text-foreground">{s.source}</p>
            </div>
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                s.approved ? "bg-success-soft text-success" : "bg-critical-soft text-critical",
              )}
            >
              {s.approved ? "Approved" : "Revoked"}
            </span>
          </div>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
            <div>
              <dt className="inline text-foreground">Retention: </dt>
              <dd className="inline">{s.retentionDays ?? "—"} days</dd>
            </div>
            <div>
              <dt className="inline text-foreground">Approved by: </dt>
              <dd className="inline">{s.approvedBy || "—"}</dd>
            </div>
            <div className="col-span-2">
              <dt className="inline text-foreground">Allowed use: </dt>
              <dd className="inline">{s.allowedUse.join(", ") || "—"}</dd>
            </div>
            {s.displayRules ? (
              <div className="col-span-2">
                <dt className="inline text-foreground">Display rules: </dt>
                <dd className="inline">
                  max {s.displayRules.maxExcerptChars ?? "—"} chars
                  {s.displayRules.requireLink ? ", link required" : ""}
                  {s.displayRules.requireAttribution ? ", attribution required" : ""}
                </dd>
              </div>
            ) : null}
            {s.notes ? (
              <div className="col-span-2 italic text-subtle-foreground">{s.notes}</div>
            ) : null}
          </dl>

          <Button
            size="sm"
            variant={s.approved ? "outline" : "default"}
            disabled={busy === s.source}
            onClick={() => toggle(s)}
          >
            {s.approved ? <ShieldOff /> : <ShieldCheck />}
            {s.approved ? "Revoke" : "Approve"}
          </Button>
        </div>
      ))}
    </div>
  );
}
