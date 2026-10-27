"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/features/listening/components/empty-state";
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

  const unmark = (g: GoldenExample) => {
    setBusyId(g.sourceId);
    onRemove(g);
    toast.success("Removed from the golden set.");
    setBusyId(null);
  };

  return (
    <Stagger className="space-y-3">
      {items.map((g) => (
        <StaggerItem key={`${g.market}:${g.sourceId}`}>
          <Card>
            <CardContent className="flex items-start justify-between gap-3 p-4">
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                  <Badge variant="outline" className="text-[10px]">
                    {g.market}
                  </Badge>
                  <span>{g.intent || "no intent"}</span>
                  <span>·</span>
                  <span>on-topic: {g.onTopic ? "yes" : "no"}</span>
                  {g.sentiment && (
                    <>
                      <span>·</span>
                      <span>{g.sentiment}</span>
                    </>
                  )}
                </div>
                {g.text && <p className="text-[13px] text-foreground/90">&quot;{g.text}&quot;</p>}
                <div className="text-[11px] text-muted-foreground">
                  Marked by {g.markedBy || "—"} · {formatDateTime(g.markedAt)}
                </div>
              </div>
              <Button
                size="xs"
                variant="ghost"
                disabled={busyId === g.sourceId}
                onClick={() => unmark(g)}
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
