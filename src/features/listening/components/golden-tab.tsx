"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { EmptyState } from "@/components/data-display/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { GoldenExample } from "@/features/listening/types";
import { formatDateTime } from "@/lib/format";

interface GoldenTabProps {
  items: GoldenExample[];
  onRemove: (item: GoldenExample) => void;
}

export function GoldenTab({ items, onRemove }: GoldenTabProps) {
  const [busyId, setBusyId] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <EmptyState
        icon={Star}
        title="No golden examples yet"
        description="Resolve a reading in the review queue and mark it golden to start an evaluation anchor set — hand-confirmed labels for relevance, intent, sentiment and buying intent."
      />
    );
  }

  const remove = (item: GoldenExample) => {
    setBusyId(item.sourceId);
    onRemove(item);
    toast.success("Removed from the golden set.");
    window.setTimeout(() => setBusyId(null), 150);
  };

  return (
    <div className="space-y-3">
      {items.map((g) => (
        <div
          key={`${g.market}:${g.sourceId}`}
          className="flex items-start justify-between gap-3 rounded-2xl border bg-card p-4 shadow-card"
        >
          <div className="min-w-0 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">{g.market}</Badge>
              <span>{g.intent || "no intent"}</span>
              <span>·</span>
              <span>on-topic: {g.onTopic ? "yes" : "no"}</span>
              {g.sentiment ? (
                <>
                  <span>·</span>
                  <span>{g.sentiment}</span>
                </>
              ) : null}
            </div>
            {g.text ? <p className="text-[13px] text-foreground/90">&ldquo;{g.text}&rdquo;</p> : null}
            <p className="text-xs text-subtle-foreground">
              Marked by {g.markedBy || "—"} · {formatDateTime(g.markedAt)}
            </p>
          </div>
          <Button variant="ghost" size="sm" disabled={busyId === g.sourceId} onClick={() => remove(g)}>
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}
