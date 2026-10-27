import { Ban, Building2, Gauge, Wallet } from "lucide-react";

import { AnimatedNumber } from "@/components/motion/animated-number";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { StatCard } from "@/components/data-display/stat-card";
import type { AgenciesStats } from "@/features/agencies/types";

export function AgenciesStatsPanel({ stats }: { stats: AgenciesStats }) {
  return (
    <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StaggerItem>
        <StatCard
          icon={Building2}
          label="Total agencies"
          value={<AnimatedNumber value={stats.totalAgencies} />}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={Wallet}
          tone="brand"
          label="Pooled wallet credits"
          value={<AnimatedNumber value={stats.pooledWalletCredits} />}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={Gauge}
          tone="warning"
          label="Near max_brands cap"
          value={<AnimatedNumber value={stats.nearCapCount} />}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={Ban}
          tone="critical"
          label="Suspended"
          value={<AnimatedNumber value={stats.suspendedCount} />}
        />
      </StaggerItem>
    </Stagger>
  );
}
