import { SegmentedBar } from "@/components/charts/segmented-bar";
import { SectionCard } from "@/components/data-display/section-card";
import type { OverviewData } from "@/features/overview/types";
import { formatNumber } from "@/lib/format";

export function PlanMixCard({ planMix }: { planMix: OverviewData["planMix"] }) {
  return (
    <SectionCard title="Plan mix" description={`${formatNumber(planMix.totalUsers)} users`}>
      <div className="flex flex-col gap-5">
        <SegmentedBar
          segments={planMix.shares.map((s) => ({ label: s.plan, value: s.users, color: s.color }))}
        />
        <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
          {planMix.shares.map((share) => (
            <li key={share.plan} className="flex items-center gap-2 text-[13px]">
              <span className="size-2.5 rounded-[3px]" style={{ backgroundColor: share.color }} />
              <span className="flex-1 text-secondary-foreground">{share.plan}</span>
              <span className="font-mono text-xs text-subtle-foreground tabular">
                {formatNumber(share.users)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </SectionCard>
  );
}
