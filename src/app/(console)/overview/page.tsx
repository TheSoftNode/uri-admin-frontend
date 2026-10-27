import type { Metadata } from "next";

import { getOverview } from "@/features/overview/api/get-overview";
import { AttentionQueue } from "@/features/overview/components/attention-queue";
import { JaneActivity } from "@/features/overview/components/jane-activity";
import { MarketsNetwork } from "@/features/overview/components/markets-network";
import { MrrCard } from "@/features/overview/components/mrr-card";
import { PlanMixCard } from "@/features/overview/components/plan-mix-card";
import { PlatformDirectory } from "@/features/overview/components/platform-directory";
import { PlatformHealthCard } from "@/features/overview/components/platform-health-card";
import { PulseStrip } from "@/features/overview/components/pulse-strip";
import { RecentSignups } from "@/features/overview/components/recent-signups";

export const metadata: Metadata = { title: "Overview" };

export default async function OverviewPage() {
  const data = await getOverview();

  return (
    <div className="flex flex-col gap-5">
      <PulseStrip pulse={data.pulse} />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.15fr_1fr]">
        <MarketsNetwork markets={data.markets} />
        <div className="flex flex-col gap-5">
          <PlatformHealthCard health={data.health} />
          <MrrCard mrr={data.mrr} />
        </div>
      </div>

      <PlatformDirectory sections={data.sections} />

      <AttentionQueue items={data.attention} />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.2fr_1fr]">
        <JaneActivity items={data.jane} />
        <PlanMixCard planMix={data.planMix} />
      </div>

      <RecentSignups signups={data.signups} />
    </div>
  );
}
