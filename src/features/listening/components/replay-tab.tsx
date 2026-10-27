"use client";

import { FlaskConical } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { EmptyState } from "@/components/data-display/empty-state";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { CurationMarket, ReplayResult } from "@/features/listening/types";

interface ReplayTabProps {
  markets: CurationMarket[];
  market: string;
  results: ReplayResult[] | null;
  onRun: (input: { market: string; at: string[]; overrides: Record<string, unknown> }) => void;
}

export function ReplayTab({ markets, market, results, onRun }: ReplayTabProps) {
  const [selectedMarket, setSelectedMarket] = useState(market || markets[0]?.key || "");
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
    window.setTimeout(() => setRunning(false), 400);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3.5 rounded-2xl border bg-card p-5 shadow-card">
        <p className="text-[13px] font-semibold text-foreground">
          Run a candidate detection config against stored history
        </p>
        <p className="text-xs text-muted-foreground">
          Nothing here is persisted — compares what a candidate config (e.g. different thresholds) would have
          produced against what the live config actually stored, before a change ships.
        </p>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-muted-foreground">Market</p>
            <Select value={selectedMarket} onValueChange={setSelectedMarket}>
              <SelectTrigger size="sm" className="w-full">
                <SelectValue placeholder="Select a market…" />
              </SelectTrigger>
              <SelectContent>
                {markets.map((m) => (
                  <SelectItem key={m.key} value={m.key}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-muted-foreground">Timestamps to replay (one per line)</p>
            <Textarea
              value={timestamps}
              onChange={(e) => setTimestamps(e.target.value)}
              className="min-h-10 font-mono text-xs"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-muted-foreground">Candidate config overrides (JSON)</p>
          <Textarea
            value={overridesText}
            onChange={(e) => setOverridesText(e.target.value)}
            className="min-h-20 font-mono text-xs"
            placeholder='{"trend": {"min_accounts": 5}}'
          />
        </div>
        <Button size="sm" disabled={running} onClick={run}>
          <FlaskConical /> Run replay
        </Button>
      </div>

      {results ? (
        results.length === 0 ? (
          <EmptyState icon={FlaskConical} title="No results" description="The replay ran but returned nothing to compare." />
        ) : (
          <div className="space-y-3">
            {results.map((r) => (
              <div key={`${r.market}:${r.day}`} className="space-y-3 rounded-2xl border bg-card p-4 shadow-card">
                <div className="flex flex-wrap items-center gap-3 text-[12.5px]">
                  <span className="font-semibold text-foreground">{r.day}</span>
                  <span className="text-muted-foreground">candidate: {r.candidateSignalCount} signals</span>
                  <span className="text-muted-foreground">compared: {r.comparedSignalCount} signals</span>
                  <span className="text-muted-foreground">agreement: {r.agreementCount}</span>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold text-success">New signals (candidate only)</p>
                    {r.newSignals.length === 0 ? (
                      <p className="text-xs text-subtle-foreground">None</p>
                    ) : (
                      <ul className="mt-1 space-y-0.5 text-xs text-foreground">
                        {r.newSignals.map((s, i) => (
                          <li key={i}>
                            {s.topic} <span className="text-subtle-foreground">({s.type})</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-critical">Missed signals (compared only)</p>
                    {r.missedSignals.length === 0 ? (
                      <p className="text-xs text-subtle-foreground">None</p>
                    ) : (
                      <ul className="mt-1 space-y-0.5 text-xs text-foreground">
                        {r.missedSignals.map((s, i) => (
                          <li key={i}>
                            {s.topic} <span className="text-subtle-foreground">({s.type})</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : null}
    </div>
  );
}
