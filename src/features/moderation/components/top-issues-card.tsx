import { Meter } from "@/components/data-display/meter";
import { SectionCard } from "@/components/data-display/section-card";
import type { IssueCount } from "@/features/moderation/types";
import { formatNumber } from "@/lib/format";

export function TopIssuesCard({ issues }: { issues: IssueCount[] }) {
  const max = Math.max(...issues.map((i) => i.count), 1);

  return (
    <SectionCard title="Top detected_issues" description="Last 7 days">
      <ul className="flex flex-col gap-4">
        {issues.map((item, index) => (
          <li key={item.issue} className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-xs text-secondary-foreground">{item.issue}</span>
              <span className="font-mono text-xs text-subtle-foreground tabular">
                {formatNumber(item.count)}
              </span>
            </div>
            <Meter
              value={(item.count / max) * 100}
              tone={index === 0 ? "brand" : "info"}
              label={item.issue}
            />
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
