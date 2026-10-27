import { Activity, AlertOctagon, Clock, ListTodo } from "lucide-react";

import { AnimatedNumber } from "@/components/motion/animated-number";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { StatCard } from "@/components/data-display/stat-card";
import type { SystemHealthStats } from "@/features/system-health/types";

export function SystemHealthStatsPanel({
  stats,
  criticalCount,
}: {
  stats: SystemHealthStats;
  criticalCount: number;
}) {
  return (
    <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StaggerItem>
        <StatCard
          icon={Clock}
          tone={stats.apiP95LatencyMs < 400 ? "success" : "warning"}
          label="API p95 latency"
          value={<AnimatedNumber value={stats.apiP95LatencyMs} />}
          hint="ms"
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={ListTodo}
          label="Background jobs queued"
          value={<AnimatedNumber value={stats.backgroundJobsQueued} />}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={Activity}
          tone="brand"
          label="Apify spend (month)"
          value={<AnimatedNumber value={stats.apifySpendUsdMonth} format="usd" />}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={AlertOctagon}
          tone={criticalCount > 0 ? "critical" : "success"}
          label="Critical services"
          value={<AnimatedNumber value={criticalCount} />}
          hint={criticalCount > 0 ? "needs attention" : "all clear"}
        />
      </StaggerItem>
    </Stagger>
  );
}
