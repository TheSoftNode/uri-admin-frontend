import { AlertTriangle, CreditCard, TrendingUp, Users } from "lucide-react";

import { AnimatedNumber } from "@/components/motion/animated-number";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { StatCard } from "@/components/data-display/stat-card";
import type { BillingStats } from "@/features/billing/types";
import { formatCurrency } from "@/lib/format";

export function BillingStatsPanel({ stats }: { stats: BillingStats }) {
  return (
    <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StaggerItem>
        <StatCard
          icon={TrendingUp}
          tone="brand"
          label="MRR"
          value={<AnimatedNumber value={stats.mrrUsd} format="usd" />}
          hint={`↑ ${stats.mrrChangePct}% vs last month`}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={CreditCard}
          label="Active subscriptions"
          value={<AnimatedNumber value={stats.activeSubscriptions} />}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={Users}
          tone="success"
          label="Trial → paid conversion"
          value={<AnimatedNumber value={stats.trialConversionPct} format="percent" />}
          hint="of trials ending this month"
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={AlertTriangle}
          tone="critical"
          label="Failed payments (7d)"
          value={<AnimatedNumber value={stats.failedPayments7d} />}
          hint={`${formatCurrency(stats.failedPaymentsAtRiskUsd)} at risk`}
        />
      </StaggerItem>
    </Stagger>
  );
}
