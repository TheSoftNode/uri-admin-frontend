"use client";

import { AlertCircle, CheckCircle2, Gauge, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import { Callout } from "@/components/data-display/callout";
import { Meter } from "@/components/data-display/meter";
import { StatCard } from "@/components/data-display/stat-card";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { EmptyState } from "@/features/listening/components/empty-state";
import type { CurationMarket, ProductMetrics } from "@/features/listening/types";
import { cn } from "@/lib/utils";

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
    className={cn(
      "h-8 rounded-lg border border-input bg-card px-2 text-[12px] text-foreground transition-[border-color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/20",
      className,
    )}
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

  const dismissalEntries = useMemo(
    () => Object.entries(metrics.dismissalReasons),
    [metrics.dismissalReasons],
  );
  const maxDismissal = useMemo(
    () => Math.max(1, ...dismissalEntries.map(([, count]) => count)),
    [dismissalEntries],
  );

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
          <Stagger className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StaggerItem>
              <StatCard
                icon={Sparkles}
                tone="brand"
                label="Cards shown"
                value={<AnimatedNumber value={metrics.cardsShown} />}
                hint={`last ${metrics.windowDays} days`}
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                icon={CheckCircle2}
                tone="success"
                label="Useful or acted on"
                value={
                  metrics.usefulOrActedOnRate != null ? (
                    <AnimatedNumber value={metrics.usefulOrActedOnRate * 100} format="percent" />
                  ) : (
                    "—"
                  )
                }
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                icon={AlertCircle}
                tone="warning"
                label="Dismissal rate"
                value={
                  metrics.dismissalRate != null ? (
                    <AnimatedNumber value={metrics.dismissalRate * 100} format="percent" />
                  ) : (
                    "—"
                  )
                }
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                icon={Sparkles}
                tone="info"
                label="Content created"
                value={
                  metrics.contentCreatedCount != null ? (
                    <AnimatedNumber value={metrics.contentCreatedCount} />
                  ) : (
                    "—"
                  )
                }
                hint={
                  metrics.contentCreatedRate != null
                    ? `${Math.round(metrics.contentCreatedRate * 100)}% of cards`
                    : undefined
                }
              />
            </StaggerItem>
          </Stagger>

          {dismissalEntries.length > 0 && (
            <Card>
              <CardContent className="space-y-3 p-4">
                <div className="text-[12.5px] font-semibold text-foreground">
                  Top dismissal reasons
                </div>
                <div className="space-y-2.5">
                  {dismissalEntries.map(([reason, count]) => (
                    <div key={reason} className="space-y-1">
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="text-muted-foreground">{reason}</span>
                        <span className="font-mono font-semibold text-foreground tabular">
                          {count}
                        </span>
                      </div>
                      <Meter value={(count / maxDismissal) * 100} tone="warning" label={reason} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {Object.keys(metrics.notAvailable).length > 0 && (
            <Callout tone="neutral">
              <p className="mb-1.5 font-semibold text-foreground">Not yet available</p>
              <div className="space-y-1">
                {Object.entries(metrics.notAvailable).map(([key, reason]) => (
                  <p key={key}>
                    <span className="font-semibold text-foreground">{key.replace(/_/g, " ")}:</span>{" "}
                    {reason}
                  </p>
                ))}
              </div>
            </Callout>
          )}
        </>
      )}
    </div>
  );
}
