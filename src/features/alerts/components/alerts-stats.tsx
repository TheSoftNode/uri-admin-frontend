import { AlertTriangle, CheckCircle2, Mail, Radio } from "lucide-react";

import { AnimatedNumber } from "@/components/motion/animated-number";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { StatCard } from "@/components/data-display/stat-card";
import type { AlertsStats } from "@/features/alerts/types";

export function AlertsStatsPanel({ stats }: { stats: AlertsStats }) {
  return (
    <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StaggerItem>
        <StatCard
          icon={AlertTriangle}
          tone="critical"
          label="Active alerts"
          value={<AnimatedNumber value={stats.activeCount} />}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={Radio}
          tone="warning"
          label="Occurrences (active)"
          value={<AnimatedNumber value={stats.totalOccurrencesActive} />}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={Mail}
          label="Emailed to ops"
          value={<AnimatedNumber value={stats.emailedCount} />}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={CheckCircle2}
          tone="success"
          label="Dismissed (7d)"
          value={<AnimatedNumber value={stats.dismissedLast7d} />}
        />
      </StaggerItem>
    </Stagger>
  );
}
