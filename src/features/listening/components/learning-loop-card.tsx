import { Code } from "@/components/data-display/callout";
import { SectionCard } from "@/components/data-display/section-card";
import type { LearningMetric } from "@/features/listening/types";

export function LearningLoopCard({ metrics }: { metrics: LearningMetric[] }) {
  return (
    <SectionCard
      title="Metrics — learning loop"
      description={
        <>
          Shown honestly, matching what <Code>metrics.py</Code> actually returns today.
        </>
      }
    >
      <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex flex-col gap-2 rounded-xl bg-muted px-4 py-3.5">
            <dt className="text-xs font-semibold text-muted-foreground">{metric.label}</dt>
            <dd>
              {metric.value ? (
                <span className="font-mono text-xl font-semibold tracking-tight tabular">
                  {metric.value}
                </span>
              ) : (
                <span className="text-[13px] text-subtle-foreground italic">not yet available</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </SectionCard>
  );
}
