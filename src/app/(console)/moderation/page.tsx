import type { Metadata } from "next";

import { KpiGrid } from "@/components/data-display/kpi-grid";
import { getModeration } from "@/features/moderation/api/get-moderation";
import { DraftsChartCard } from "@/features/moderation/components/drafts-chart-card";
import { ReviewQueueTable } from "@/features/moderation/components/review-queue-table";
import { TopIssuesCard } from "@/features/moderation/components/top-issues-card";

export const metadata: Metadata = { title: "Content & Moderation" };

export default async function ModerationPage() {
  const { kpis, queue, topIssues, draftsPerDay } = await getModeration();

  return (
    <div className="flex flex-col gap-5">
      <KpiGrid items={kpis} />
      <div className="grid grid-cols-1 gap-5 2xl:grid-cols-[1.75fr_1fr]">
        <ReviewQueueTable items={queue} />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-1">
          <TopIssuesCard issues={topIssues} />
          <DraftsChartCard data={draftsPerDay} />
        </div>
      </div>
    </div>
  );
}
