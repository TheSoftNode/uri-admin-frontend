import { AreaChart } from "@/components/charts/area-chart";
import { SectionCard } from "@/components/data-display/section-card";
import { Badge } from "@/components/ui/badge";
import type { BillingPageData } from "@/features/billing/types";
import { formatCurrency } from "@/lib/format";

export function RevenueCard({
  revenue,
  className,
}: {
  revenue: BillingPageData["revenue"];
  className?: string;
}) {
  const latest = revenue[revenue.length - 1];
  const series = revenue.map((r) => ({
    label: r.month,
    value: r.mrrUsd,
    display: formatCurrency(r.mrrUsd),
  }));

  return (
    <SectionCard
      className={className}
      title="Revenue — last 6 months"
      action={
        <Badge variant="neutral" className="font-mono">
          {formatCurrency(latest.mrrUsd)} this month
        </Badge>
      }
    >
      <AreaChart
        data={series}
        height={190}
        ariaLabel="Monthly recurring revenue, last six months"
      />
    </SectionCard>
  );
}
