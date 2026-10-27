import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { RadialGauge } from "@/components/charts/radial-gauge";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Card } from "@/components/ui/card";
import type { OverviewData } from "@/features/overview/types";

export function PlatformHealthCard({ health }: { health: OverviewData["health"] }) {
  return (
    <Card className="flex-row items-center gap-6 px-6 py-5">
      <RadialGauge value={health.score} ariaLabel={`Platform health ${health.score} out of 100`}>
        <span className="font-serif text-[34px] leading-none font-semibold">{health.score}</span>
        <span className="mt-1 font-mono text-[10px] text-subtle-foreground">/ 100</span>
      </RadialGauge>
      <div className="flex min-w-0 flex-col gap-3">
        <p className="eyebrow">Platform health</p>
        <div className="flex flex-wrap gap-1.5">
          <StatusBadge tone="neutral">API {health.apiLatencyMs}ms</StatusBadge>
          <StatusBadge tone={health.spendOnTrack ? "success" : "warning"}>
            Spend {health.spendOnTrack ? "on-track" : "over pace"}
          </StatusBadge>
          {health.degraded > 0 ? (
            <StatusBadge tone="critical" dot>
              {health.degraded} degraded
            </StatusBadge>
          ) : null}
        </div>
        <Link
          href="/system-health"
          className="group inline-flex w-fit items-center gap-1.5 text-xs font-bold text-brand"
        >
          View system health
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </Card>
  );
}
