"use client";

import { CheckCircle2, ChevronDown, Inbox, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { EmptyState } from "@/components/data-display/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { PendingReview } from "@/features/listening/types";
import { cn } from "@/lib/utils";

function ReviewRow({
  review,
  onResolve,
  onMarkGolden,
}: {
  review: PendingReview;
  onResolve: (review: PendingReview, patch: { onTopic?: boolean; intent?: string; note?: string }) => void;
  onMarkGolden: (review: PendingReview) => void;
}) {
  const [open, setOpen] = useState(false);
  const [onTopic, setOnTopic] = useState<boolean | undefined>(review.onTopic);
  const [intent, setIntent] = useState(review.intent ?? "");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  const resolve = () => {
    setBusy(true);
    onResolve(review, { onTopic, intent: intent || undefined, note: note || undefined });
    toast.success("Correction recorded.");
    window.setTimeout(() => setBusy(false), 150);
  };

  const markGolden = () => {
    setBusy(true);
    onMarkGolden(review);
    toast.success("Marked as a golden example.");
    window.setTimeout(() => setBusy(false), 150);
  };

  return (
    <div className="space-y-3 rounded-2xl border bg-card p-4 shadow-card">
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Badge variant="outline">{review.market}</Badge>
        <span>confidence {review.confidence != null ? Math.round(review.confidence * 100) : "—"}%</span>
        <span>·</span>
        <span>{review.intent || "no intent yet"}</span>
        <span>·</span>
        <span>on-topic: {review.onTopic === undefined ? "—" : review.onTopic ? "yes" : "no"}</span>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="ml-auto inline-flex items-center gap-1 font-semibold text-brand"
        >
          <ChevronDown className={cn("size-3 transition-transform", open && "rotate-180")} />
          {open ? "Close" : "Resolve"}
        </button>
      </div>

      {review.text ? <p className="text-[13px] leading-relaxed text-foreground/90">&ldquo;{review.text}&rdquo;</p> : null}
      {review.url ? (
        <a href={review.url} target="_blank" rel="noreferrer" className="text-xs font-medium text-brand">
          View source
        </a>
      ) : null}

      {open ? (
        <div className="space-y-3 rounded-xl bg-muted/40 p-3.5">
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-1.5 text-xs text-foreground">
              <input
                type="radio"
                name={`${review.market}-${review.sourceId}`}
                checked={onTopic === true}
                onChange={() => setOnTopic(true)}
              />
              On-topic
            </label>
            <label className="flex items-center gap-1.5 text-xs text-foreground">
              <input
                type="radio"
                name={`${review.market}-${review.sourceId}`}
                checked={onTopic === false}
                onChange={() => setOnTopic(false)}
              />
              Off-topic
            </label>
            <Input
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              placeholder="Corrected intent (optional)"
              className="h-8 max-w-56 flex-1 text-xs"
            />
          </div>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Note for the training record (optional)"
            className="min-h-16 text-xs"
          />
          <div className="flex flex-wrap gap-2">
            <Button size="sm" disabled={busy} onClick={resolve}>
              <CheckCircle2 /> Save correction
            </Button>
            <Button size="sm" variant="outline" disabled={busy} onClick={markGolden}>
              <Star /> Mark golden
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

interface ReviewsTabProps {
  reviews: PendingReview[];
  onResolve: (review: PendingReview, patch: { onTopic?: boolean; intent?: string; note?: string }) => void;
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
        <ReviewRow key={`${r.market}:${r.sourceId}`} review={r} onResolve={onResolve} onMarkGolden={onMarkGolden} />
      ))}
    </div>
  );
}
