import { CheckCircle2, FileStack, ShieldAlert, ShieldCheck } from "lucide-react";

import { AnimatedNumber } from "@/components/motion/animated-number";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { StatCard } from "@/components/data-display/stat-card";
import type { Kpi } from "@/types/tone";

/** Still Kpi-shaped (from the page's fixture) so this slots in without
 * reshaping ModerationPageData — only the presentation is elevated. */
export function ModerationStatsPanel({ kpis }: { kpis: Kpi[] }) {
  const icons = [ShieldAlert, ShieldCheck, FileStack, CheckCircle2];

  return (
    <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi, index) => {
        const numeric = Number(kpi.value.replace(/,/g, ""));
        const isNumeric = Number.isFinite(numeric) && /^[\d.,]+$/.test(kpi.value);
        return (
          <StaggerItem key={kpi.id}>
            <StatCard
              icon={icons[index]}
              tone={kpi.tone}
              label={kpi.label}
              value={isNumeric ? <AnimatedNumber value={numeric} /> : kpi.value}
              hint={kpi.hint}
            />
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
