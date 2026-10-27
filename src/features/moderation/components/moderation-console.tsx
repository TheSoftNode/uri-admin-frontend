"use client";

import { useState } from "react";

import { ModerationStatsPanel } from "@/features/moderation/components/moderation-stats";
import { DraftsChartCard } from "@/features/moderation/components/drafts-chart-card";
import { ReviewDetailSheet } from "@/features/moderation/components/review-detail-sheet";
import { ReviewQueueTable } from "@/features/moderation/components/review-queue-table";
import { TopIssuesCard } from "@/features/moderation/components/top-issues-card";
import type { ModerationPageData, ReviewItem } from "@/features/moderation/types";

export function ModerationConsole({ data }: { data: ModerationPageData }) {
  const [queue, setQueue] = useState(data.queue);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const selectedItem = queue.find((item) => item.id === selectedId) ?? null;

  const updateItem = (id: string, patch: Partial<ReviewItem>) => {
    setQueue((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  return (
    <div className="flex flex-col gap-5">
      <ModerationStatsPanel kpis={data.kpis} />
      <div className="grid grid-cols-1 gap-5 2xl:grid-cols-[1.75fr_1fr]">
        <ReviewQueueTable
          items={queue}
          onOpenItem={(item) => {
            setSelectedId(item.id);
            setSheetOpen(true);
          }}
        />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-1">
          <TopIssuesCard issues={data.topIssues} />
          <DraftsChartCard data={data.draftsPerDay} />
        </div>
      </div>

      <ReviewDetailSheet
        key={selectedId ?? "none"}
        item={selectedItem}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onApprove={(id) => updateItem(id, { status: "approved" })}
        onReject={(id) => updateItem(id, { status: "rejected" })}
        onReassign={(id, assignee) => updateItem(id, { assignee })}
      />
    </div>
  );
}
