import { AlertTriangle, Clock, TrendingUp, Wallet } from "lucide-react";

import { AnimatedNumber } from "@/components/motion/animated-number";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { StatCard } from "@/components/data-display/stat-card";
import type { CampaignsStats } from "@/features/campaigns/types";

export function CampaignsStatsPanel({ stats }: { stats: CampaignsStats }) {
  const { totalFundedNgn, spendThisMonthNgn, accountCapBreaches, plansAwaitingDecision } = stats;
  return (
    <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StaggerItem>
        <StatCard
          icon={Wallet}
          label="Total funded"
          value={<AnimatedNumber value={totalFundedNgn} format="ngn-compact" />}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={TrendingUp}
          tone="brand"
          label="Spend this month"
          value={<AnimatedNumber value={spendThisMonthNgn} format="ngn-compact" />}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={AlertTriangle}
          tone="critical"
          label="Account-cap breaches"
          value={<AnimatedNumber value={accountCapBreaches} />}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={Clock}
          tone="warning"
          label="Plans awaiting decision"
          value={<AnimatedNumber value={plansAwaitingDecision} />}
        />
      </StaggerItem>
    </Stagger>
  );
}
