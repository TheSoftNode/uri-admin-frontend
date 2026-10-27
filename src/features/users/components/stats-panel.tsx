import { Building2, FileText, UserPlus, Users } from "lucide-react";

import { AnimatedNumber } from "@/components/motion/animated-number";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Card } from "@/components/ui/card";
import { Meter } from "@/components/data-display/meter";
import { StatCard } from "@/components/data-display/stat-card";
import { planTierLabel } from "@/features/users/lib";
import type { AdminStats } from "@/features/users/types";
import { formatNumber } from "@/lib/format";
import type { Tone } from "@/types/tone";

const tierTone: Record<string, Tone> = {
  starter: "neutral",
  growth: "info",
  pro: "brand",
  agency: "success",
};

export function StatsPanel({ stats }: { stats: AdminStats }) {
  const tierEntries = Object.entries(stats.subscriptionStats).sort((a, b) => b[1] - a[1]);
  const tierTotal = tierEntries.reduce((sum, [, count]) => sum + count, 0);

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:col-span-2">
        <StaggerItem>
          <StatCard
            icon={Users}
            label="Total users"
            value={<AnimatedNumber value={stats.totalUsers} />}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            icon={UserPlus}
            tone="success"
            label="New in 7 days"
            value={<AnimatedNumber value={stats.newUsers7d} />}
            hint={`${formatNumber(stats.newUsers30d)} in the last 30 days`}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            icon={Building2}
            tone="info"
            label="Brands & workspaces"
            value={<AnimatedNumber value={stats.totalBrands} />}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            icon={FileText}
            tone="brand"
            label="Content generated"
            value={<AnimatedNumber value={stats.totalContent} />}
          />
        </StaggerItem>
      </Stagger>

      <Card className="flex h-full flex-col gap-4 p-5">
        <p className="text-[12px] font-semibold text-muted-foreground">Plan mix</p>
        <div className="flex flex-col gap-3.5">
          {tierEntries.map(([tier, count]) => {
            const tone = tierTone[tier] ?? "neutral";
            const share = tierTotal ? (count / tierTotal) * 100 : 0;
            return (
              <div key={tier} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[12.5px]">
                  <span className="font-medium text-foreground">{planTierLabel(tier)}</span>
                  <span className="font-mono text-subtle-foreground tabular">
                    {formatNumber(count)}
                  </span>
                </div>
                <Meter value={share} tone={tone} label={`${planTierLabel(tier)} share`} />
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
