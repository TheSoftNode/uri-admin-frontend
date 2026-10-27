import { StatCard } from "@/components/data-display/stat-card";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { cn } from "@/lib/utils";
import type { Kpi } from "@/types/tone";

export function KpiGrid({ items, className }: { items: Kpi[]; className?: string }) {
  return (
    <Stagger className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4", className)}>
      {items.map((kpi) => (
        <StaggerItem key={kpi.id}>
          <StatCard label={kpi.label} value={kpi.value} hint={kpi.hint} tone={kpi.tone} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
