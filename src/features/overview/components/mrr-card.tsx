import { TrendingUp } from "lucide-react";

import { AreaChart } from "@/components/charts/area-chart";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { Card } from "@/components/ui/card";
import type { OverviewData } from "@/features/overview/types";
import { formatCurrency, formatPercent } from "@/lib/format";

export function MrrCard({ mrr }: { mrr: OverviewData["mrr"] }) {
  const series = mrr.trend.map((point) => ({
    label: point.month,
    value: point.value,
    display: formatCurrency(point.value),
  }));

  return (
    <Card className="flex-1 gap-4 px-6 py-5">
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow">Revenue — MRR</p>
        <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2.5 py-1 text-[11px] font-bold text-success">
          <TrendingUp className="size-3" />+{formatPercent(mrr.changePct)} vs last month
        </span>
      </div>
      <p className="font-serif text-5xl leading-none font-semibold tracking-tight">
        <AnimatedNumber value={mrr.amountUsd} format="usd" />
      </p>
      <AreaChart data={series} height={84} ariaLabel="MRR over the last six months" />
    </Card>
  );
}
