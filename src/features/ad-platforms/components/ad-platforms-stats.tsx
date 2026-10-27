import { AlertTriangle, Plug, PlugZap, Timer } from "lucide-react";

import { AnimatedNumber } from "@/components/motion/animated-number";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { StatCard } from "@/components/data-display/stat-card";
import type { AdPlatformsStats } from "@/features/ad-platforms/types";

export function AdPlatformsStatsPanel({ stats }: { stats: AdPlatformsStats }) {
  return (
    <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StaggerItem>
        <StatCard
          icon={PlugZap}
          label="Total connected accounts"
          value={<AnimatedNumber value={stats.totalConnectedAccounts} />}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={Timer}
          tone="warning"
          label="Tokens expiring (7d)"
          value={<AnimatedNumber value={stats.tokensExpiring7d} />}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={Plug}
          tone="critical"
          label="Disconnected"
          value={<AnimatedNumber value={stats.disconnectedCount} />}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={AlertTriangle}
          tone="warning"
          label="Platforms with elevated errors"
          value={<AnimatedNumber value={stats.platformsWithElevatedErrors} />}
          hint="error rate ≥ 5%"
        />
      </StaggerItem>
    </Stagger>
  );
}
