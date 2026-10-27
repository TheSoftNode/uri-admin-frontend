import { Meter } from "@/components/data-display/meter";
import { SectionCard } from "@/components/data-display/section-card";
import type { FunnelStage } from "@/features/billing/types";
import { formatNumber } from "@/lib/format";

export function TrialFunnelCard({ funnel }: { funnel: FunnelStage[] }) {
  return (
    <SectionCard title="Trial funnel" description="30-day cohort">
      <ol className="flex flex-col gap-5">
        {funnel.map((stage) => (
          <li key={stage.name} className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between text-[13px]">
              <span className="font-semibold text-foreground">{stage.name}</span>
              <span className="font-mono text-xs text-subtle-foreground tabular">
                {formatNumber(stage.count)} · {stage.share}%
              </span>
            </div>
            <Meter value={stage.share} tone={stage.tone} label={stage.name} />
          </li>
        ))}
      </ol>
    </SectionCard>
  );
}
