"use client";

import { FlaskConical } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/features/listening/components/empty-state";
import type { CurationMarket, ReplayResult } from "@/features/listening/types";
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
      "h-8 rounded-lg border border-border bg-background px-2 text-[12px] text-foreground",
      className,
    )}
  >
    {children}
  </select>
);

interface ReplayTabProps {
  markets: CurationMarket[];
  market: string;
  results: ReplayResult[] | null;
  onRun: (input: { market: string; at: string[]; overrides: Record<string, unknown> }) => void;
}

export function ReplayTab({ markets, market, results, onRun }: ReplayTabProps) {
  // The page-level market filter takes precedence; a locally picked one
  // only matters while that filter is "All markets" — no effect needed to
  // keep these in sync, so there's nothing to cascade-render on prop change.
  const [localMarket, setLocalMarket] = useState("");
  const selectedMarket = market || localMarket || markets[0]?.key || "";
  const [timestamps, setTimestamps] = useState(() => new Date().toISOString().slice(0, 16));
  const [overridesText, setOverridesText] = useState("{}");
  const [running, setRunning] = useState(false);

  const run = () => {
    if (!selectedMarket) {
      toast.warning("Pick a market to replay.");
      return;
    }
    let overrides: Record<string, unknown> = {};
    try {
      overrides = overridesText.trim() ? JSON.parse(overridesText) : {};
    } catch {
      toast.error("Candidate overrides must be valid JSON.");
      return;
    }
    const at = timestamps
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => (s.length === 16 ? `${s}:00` : s));
    if (at.length === 0) {
      toast.warning("Add at least one timestamp to replay.");
      return;
    }
    setRunning(true);
    onRun({ market: selectedMarket, at, overrides });
    setRunning(false);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="space-y-3 p-4">
          <div className="text-[13px] font-medium text-foreground">
            Run a candidate detection config against stored history
          </div>
          <p className="text-[12px] text-muted-foreground">
            Nothing here is persisted — compares what a candidate config (e.g. different thresholds)
            would have produced against what the live config actually stored, before a change ships.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <div className="mb-1 text-[11px] font-medium text-muted-foreground">Market</div>
              <SelectEl value={selectedMarket} onChange={setLocalMarket} className="w-full">
                <option value="">Select a market…</option>
                {markets.map((m) => (
                  <option key={m.key} value={m.key}>
                    {m.label || m.key}
                  </option>
                ))}
              </SelectEl>
            </div>
            <div>
              <div className="mb-1 text-[11px] font-medium text-muted-foreground">
                Timestamps to replay (one per line)
              </div>
              <Textarea
                value={timestamps}
                onChange={(e) => setTimestamps(e.target.value)}
                className="min-h-9.5 font-mono text-[12px]"
              />
            </div>
          </div>
          <div>
            <div className="mb-1 text-[11px] font-medium text-muted-foreground">
              Candidate config overrides (JSON)
            </div>
            <Textarea
              value={overridesText}
              onChange={(e) => setOverridesText(e.target.value)}
              className="min-h-17.5 font-mono text-[12px]"
              placeholder='{"trend": {"min_accounts": 5}}'
            />
          </div>
          <Button size="sm" disabled={running} onClick={run}>
            <FlaskConical className="h-3.5 w-3.5" />
            Run replay
          </Button>
        </CardContent>
      </Card>

      {results &&
        (results.length === 0 ? (
          <EmptyState
            icon={FlaskConical}
            title="No results"
            description="The replay ran but returned nothing to compare."
          />
        ) : (
          <div className="space-y-3">
            {results.map((r) => (
              <Card key={`${r.market}:${r.day}`}>
                <CardContent className="space-y-2 p-4">
                  <div className="flex flex-wrap items-center gap-3 text-[12.5px]">
                    <span className="font-medium text-foreground">{r.day}</span>
                    <span className="text-muted-foreground">
                      candidate: {r.candidateSignalCount} signals
                    </span>
                    <span className="text-muted-foreground">
                      compared: {r.comparedSignalCount} signals
                    </span>
                    <span className="text-muted-foreground">agreement: {r.agreementCount}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <div className="text-[11px] font-semibold text-emerald-700">
                        New signals (candidate only)
                      </div>
                      {r.newSignals.length === 0 ? (
                        <div className="text-[11.5px] text-muted-foreground">None</div>
                      ) : (
                        <ul className="mt-1 space-y-0.5 text-[12px] text-foreground">
                          {r.newSignals.map((s, i) => (
                            <li key={i}>
                              {s.topic} <span className="text-muted-foreground">({s.type})</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-rose-700">
                        Missed signals (compared only)
                      </div>
                      {r.missedSignals.length === 0 ? (
                        <div className="text-[11.5px] text-muted-foreground">None</div>
                      ) : (
                        <ul className="mt-1 space-y-0.5 text-[12px] text-foreground">
                          {r.missedSignals.map((s, i) => (
                            <li key={i}>
                              {s.topic} <span className="text-muted-foreground">({s.type})</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
    </div>
  );
}
