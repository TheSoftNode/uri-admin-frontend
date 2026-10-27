"use client";

import { CheckCircle2, ChevronDown, Inbox, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/features/listening/components/empty-state";
import type { PendingReview } from "@/features/listening/types";
import { cn } from "@/lib/utils";

function ReviewRow({
  r,
  onResolved,
  onMarkGolden,
}: {
  r: PendingReview;
  onResolved: (
    r: PendingReview,
    patch: { onTopic?: boolean; intent?: string; note?: string },
  ) => void;
  onMarkGolden: (r: PendingReview) => void;
}) {
  const [open, setOpen] = useState(false);
  const [onTopic, setOnTopic] = useState<boolean | undefined>(r.onTopic);
  const [intent, setIntent] = useState(r.intent || "");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  const resolve = () => {
    setBusy(true);
    onResolved(r, { onTopic, intent: intent || undefined, note: note || undefined });
    toast.success("Correction recorded.");
    setBusy(false);
  };

  const markGolden = () => {
    setBusy(true);
    onMarkGolden(r);
    toast.success("Marked as a golden example.");
    setBusy(false);
  };

  return (
    <Card className="overflow-hidden py-0">
      <CardContent className="space-y-2.5 p-4">
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
          <Badge variant="outline" className="text-[10px]">
            {r.market}
          </Badge>
          <span>confidence {r.confidence != null ? Math.round(r.confidence * 100) : "—"}%</span>
          <span>·</span>
          <span>{r.intent || "no intent yet"}</span>
          <span>·</span>
          <span>on-topic: {r.onTopic === undefined ? "—" : r.onTopic ? "yes" : "no"}</span>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="ml-auto inline-flex items-center gap-1 font-medium text-primary"
          >
            <ChevronDown className={cn("h-3 w-3 transition-transform", open && "rotate-180")} />
            {open ? "Close" : "Resolve"}
          </button>
        </div>
        {r.text && (
          <p className="text-[13px] leading-relaxed text-foreground/90">&quot;{r.text}&quot;</p>
        )}
        {r.url && (
          <a href={r.url} target="_blank" rel="noreferrer" className="text-[11.5px] text-primary">
            View source
          </a>
        )}
        {open && (
          <div className="space-y-2.5 rounded-lg border border-border bg-muted/20 p-3">
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-1.5 text-[12px] text-foreground">
                <input
                  type="radio"
                  checked={onTopic === true}
                  onChange={() => setOnTopic(true)}
                  className="accent-brand"
                />{" "}
                On-topic
              </label>
              <label className="flex items-center gap-1.5 text-[12px] text-foreground">
                <input
                  type="radio"
                  checked={onTopic === false}
                  onChange={() => setOnTopic(false)}
                  className="accent-brand"
                />{" "}
                Off-topic
              </label>
              <Input
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                placeholder="Corrected intent (optional)"
                className="h-7 max-w-55 text-[12px]"
              />
            </div>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Note for the training record (optional)"
              className="min-h-15 text-[12px]"
            />
            <div className="flex gap-2">
              <Button size="xs" disabled={busy} onClick={resolve}>
                <CheckCircle2 className="h-3 w-3" />
                Save correction
              </Button>
              <Button size="xs" variant="outline" disabled={busy} onClick={markGolden}>
                <Star className="h-3 w-3" /> Mark golden
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface ReviewsTabProps {
  reviews: PendingReview[];
  onResolve: (
    review: PendingReview,
    patch: { onTopic?: boolean; intent?: string; note?: string },
  ) => void;
  onMarkGolden: (review: PendingReview) => void;
}

export function ReviewsTab({ reviews, onResolve, onMarkGolden }: ReviewsTabProps) {
  if (reviews.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title="Nothing waiting on review"
        description="Low-confidence classifications land here, most uncertain first, so a curator can correct them before they feed training data."
      />
    );
  }

  return (
    <div className="space-y-3">
      {reviews.map((r) => (
        <ReviewRow
          key={`${r.market}:${r.sourceId}`}
          r={r}
          onResolved={onResolve}
          onMarkGolden={onMarkGolden}
        />
      ))}
    </div>
  );
}
