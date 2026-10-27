"use client";

import { AlertCircle, CheckCircle2, Gauge, Sparkles } from "lucide-react";
import { useState } from "react";

import { Callout } from "@/components/data-display/callout";
import { EmptyState } from "@/components/data-display/empty-state";
import { StatCard } from "@/components/data-display/stat-card";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CurationMarket, ProductMetrics } from "@/features/listening/types";
import { formatPercent } from "@/lib/format";

interface MetricsTabProps {
  markets: CurationMarket[];
  market: string;
  onMarketChange: (market: string) => void;
  windowDays: number;
  onWindowDaysChange: (days: number) => void;
  metrics: ProductMetrics;
}

export function MetricsTab({
  markets,
  market,
  onMarketChange,
  windowDays,
  onWindowDaysChange,
  metrics,
}: MetricsTabProps) {
  const [draftDays, setDraftDays] = useState(String(windowDays));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Select value={market || "all"} onValueChange={(v) => onMarketChange(v === "all" ? "" : v)}>
          <SelectTrigger size="sm" className="min-w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All markets</SelectItem>
            {markets.map((m) => (
              <SelectItem key={m.key} value={m.key}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="number"
          value={draftDays}
          onChange={(e) => {
            setDraftDays(e.target.value);
            const n = Math.max(1, Number(e.target.value) || windowDays);
            onWindowDaysChange(n);
          }}
          className="h-9 w-20 text-[13px]"
        />
        <span className="text-xs text-muted-foreground">days</span>
      </div>

      {metrics.cardsShown === 0 ? (
        <EmptyState
          icon={Gauge}
          title="No cards shown in this window"
          description="Metrics are computed only from cards actually shown to a business and the actions taken on them — nothing to show yet for this window."
        />
      ) : (
        <>
          <Stagger className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
            <StaggerItem>
              <StatCard label="Cards shown" value={metrics.cardsShown} hint={`last ${metrics.windowDays} days`} />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                icon={CheckCircle2}
                label="Useful or acted on"
                value={metrics.usefulOrActedOnRate != null ? formatPercent(metrics.usefulOrActedOnRate * 100, 0) : "—"}
                tone="success"
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                icon={AlertCircle}
                label="Dismissal rate"
                value={metrics.dismissalRate != null ? formatPercent(metrics.dismissalRate * 100, 0) : "—"}
                tone="warning"
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                icon={Sparkles}
                label="Content created"
                value={metrics.contentCreatedCount ?? "—"}
                hint={
                  metrics.contentCreatedRate != null
                    ? `${formatPercent(metrics.contentCreatedRate * 100, 0)} of cards`
                    : undefined
                }
                tone="brand"
              />
            </StaggerItem>
          </Stagger>

          {Object.keys(metrics.dismissalReasons).length > 0 ? (
            <div className="rounded-2xl border bg-card p-4 shadow-card">
              <p className="mb-2.5 text-[13px] font-semibold text-foreground">Top dismissal reasons</p>
              <div className="space-y-1.5">
                {Object.entries(metrics.dismissalReasons).map(([reason, count]) => (
                  <div key={reason} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{reason}</span>
                    <span className="font-mono font-semibold text-foreground tabular">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {Object.keys(metrics.notAvailable).length > 0 ? (
            <Callout tone="neutral">
              <p className="mb-2 text-[13px] font-semibold text-foreground">Not yet available</p>
              <div className="space-y-1.5">
                {Object.entries(metrics.notAvailable).map(([key, reason]) => (
                  <p key={key}>
                    <span className="font-semibold text-foreground">{key.replace(/_/g, " ")}:</span> {reason}
                  </p>
                ))}
              </div>
            </Callout>
          ) : null}
        </>
      )}
    </div>
  );
}
