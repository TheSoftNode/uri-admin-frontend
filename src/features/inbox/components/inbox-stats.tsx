import { Inbox, ShieldCheck, Timer, ToggleRight } from "lucide-react";

import { AnimatedNumber } from "@/components/motion/animated-number";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { StatCard } from "@/components/data-display/stat-card";
import type { InboxStats } from "@/features/inbox/types";

export function InboxStatsPanel({ stats }: { stats: InboxStats }) {
  return (
    <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StaggerItem>
        <StatCard
          icon={Inbox}
          label="Businesses with inbox enabled"
          value={<AnimatedNumber value={stats.businessesEnabled} />}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={Timer}
          tone="warning"
          label="Meta tokens expiring (7d)"
          value={<AnimatedNumber value={stats.metaTokensExpiring7d} />}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={ShieldCheck}
          tone="brand"
          label="Guard interventions today"
          value={<AnimatedNumber value={stats.guardInterventionsToday} />}
          hint="jailbreak / URL strips"
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={ToggleRight}
          tone={stats.moduleEnabled ? "success" : "critical"}
          label="Module status"
          value={stats.moduleEnabled ? "Enabled" : "Disabled"}
          hint="INBOX_TOKEN_ENC_KEYS set"
        />
      </StaggerItem>
    </Stagger>
  );
}
