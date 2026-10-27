"use client";

import { AlertCircle, CheckCircle2, Gauge, type LucideIcon, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/features/listening/components/empty-state";
import type { CurationMarket, ProductMetrics } from "@/features/listening/types";
import { cn } from "@/lib/utils";

function KpiCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  hint?: string;
}) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-4.5 w-4.5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-medium text-muted-foreground">{label}</div>
            <div className="text-xl leading-tight font-semibold tracking-tight text-foreground">{value}</div>
          </div>
        </div>
        {hint && <div className="truncate text-[11px] text-muted-foreground">{hint}</div>}
      </CardContent>
    </Card>
  );
}

const SelectEl = ({
  value,
  onChange,
  children,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  className?: string;
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={cn("h-8 rounded-lg border border-border bg-background px-2 text-[12px] text-foreground", className)}
  >
    {children}
  </select>
);

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
        <SelectEl value={market} onChange={onMarketChange}>
          <option value="">All markets</option>
          {markets.map((m) => (
            <option key={m.key} value={m.key}>
              {m.label || m.key}
            </option>
          ))}
        </SelectEl>
        <Input
          type="number"
          value={draftDays}
          onChange={(e) => {
            setDraftDays(e.target.value);
            onWindowDaysChange(Math.max(1, Number(e.target.value) || windowDays));
          }}
          className="h-8 w-20 text-[12px]"
        />
        <span className="text-[12px] text-muted-foreground">days</span>
      </div>

      {metrics.cardsShown === 0 ? (
        <EmptyState
          icon={Gauge}
          title="No cards shown in this window"
          description="Metrics are computed only from cards actually shown to a business and the actions taken on them — nothing to show yet for this window."
        />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <KpiCard
              icon={Sparkles}
              label="Cards shown"
              value={metrics.cardsShown}
              hint={`last ${metrics.windowDays} days`}
            />
            <KpiCard
              icon={CheckCircle2}
              label="Useful or acted on"
              value={metrics.usefulOrActedOnRate != null ? `${Math.round(metrics.usefulOrActedOnRate * 100)}%` : "—"}
            />
            <KpiCard
              icon={AlertCircle}
              label="Dismissal rate"
              value={metrics.dismissalRate != null ? `${Math.round(metrics.dismissalRate * 100)}%` : "—"}
            />
            <KpiCard
              icon={Sparkles}
              label="Content created"
              value={metrics.contentCreatedCount ?? "—"}
              hint={
                metrics.contentCreatedRate != null
                  ? `${Math.round(metrics.contentCreatedRate * 100)}% of cards`
                  : undefined
              }
            />
          </div>

          {Object.keys(metrics.dismissalReasons).length > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="mb-2 text-[12.5px] font-medium text-foreground">Top dismissal reasons</div>
                <div className="space-y-1.5">
                  {Object.entries(metrics.dismissalReasons).map(([reason, count]) => (
                    <div key={reason} className="flex items-center justify-between text-[12px]">
                      <span className="text-muted-foreground">{reason}</span>
                      <span className="font-medium text-foreground">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {Object.keys(metrics.notAvailable).length > 0 && (
            <Card className="border-dashed">
              <CardContent className="p-4">
                <div className="mb-2 text-[12.5px] font-medium text-foreground">Not yet available</div>
                <div className="space-y-1.5">
                  {Object.entries(metrics.notAvailable).map(([key, reason]) => (
                    <div key={key} className="text-[12px] text-muted-foreground">
                      <span className="font-medium text-foreground">{key.replace(/_/g, " ")}:</span> {reason}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
