import { AreaChart } from "@/components/charts/area-chart";
import { SectionCard } from "@/components/data-display/section-card";
import { Badge } from "@/components/ui/badge";
import type { SystemHealthPageData } from "@/features/system-health/types";
import { formatNumber } from "@/lib/format";

export function RequestVolumeCard({ data }: { data: SystemHealthPageData["requestVolume"] }) {
  const total = data.reduce((sum, point) => sum + point.requests, 0);

  return (
    <SectionCard
      title="Request volume"
      description="Last 24 hours"
      action={
        <Badge variant="neutral" className="font-mono">
          {formatNumber(total)} requests
        </Badge>
      }
    >
      <AreaChart
        data={data.map((d) => ({
          label: d.hour,
          value: d.requests,
          display: `${formatNumber(d.requests)} req/h`,
        }))}
        height={200}
        labelEvery={4}
        ariaLabel="API request volume over the last 24 hours"
      />
    </SectionCard>
  );
}
