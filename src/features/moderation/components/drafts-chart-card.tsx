import { BarChart } from "@/components/charts/bar-chart";
import { SectionCard } from "@/components/data-display/section-card";
import type { ModerationPageData } from "@/features/moderation/types";
import { formatNumber } from "@/lib/format";

export function DraftsChartCard({ data }: { data: ModerationPageData["draftsPerDay"] }) {
  return (
    <SectionCard title="Drafts generated" description="Last 7 days">
      <BarChart
        data={data.map((d) => ({ label: d.day, value: d.drafts, display: formatNumber(d.drafts) }))}
        height={130}
        ariaLabel="Content drafts generated per day over the last seven days"
      />
    </SectionCard>
  );
}
