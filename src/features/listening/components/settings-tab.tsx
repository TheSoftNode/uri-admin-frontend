"use client";

import { Settings2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ListeningConfig } from "@/features/listening/types";

interface SettingsField {
  key: string;
  label: string;
  hint: string;
  get: (cfg: ListeningConfig) => number;
  set: (cfg: ListeningConfig, value: number) => ListeningConfig;
}

const SETTINGS_FIELDS: SettingsField[] = [
  {
    key: "monthlyBudgetUsd",
    label: "Monthly budget (USD)",
    hint: "Hard ceiling across every source combined.",
    get: (c) => c.monthlyBudgetUsd,
    set: (c, v) => ({ ...c, monthlyBudgetUsd: v }),
  },
  {
    key: "cadenceHours",
    label: "Default cadence (hours)",
    hint: "How often a market collects when nothing is hot.",
    get: (c) => c.cadenceHours,
    set: (c, v) => ({ ...c, cadenceHours: v }),
  },
  {
    key: "score.minScore",
    label: "Minimum card score",
    hint: "A signal below this never becomes a card, regardless of relevance.",
    get: (c) => c.score.minScore,
    set: (c, v) => ({ ...c, score: { ...c.score, minScore: v } }),
  },
  {
    key: "score.minRelevance",
    label: "Minimum relevance",
    hint: "Gates every card independently of the overall score.",
    get: (c) => c.score.minRelevance,
    set: (c, v) => ({ ...c, score: { ...c.score, minRelevance: v } }),
  },
  {
    key: "score.maxCardsPerRun",
    label: "Max cards per cycle",
    hint: "Per business, per scheduled run.",
    get: (c) => c.score.maxCardsPerRun,
    set: (c, v) => ({ ...c, score: { ...c.score, maxCardsPerRun: v } }),
  },
  {
    key: "score.maxEvergreenCards",
    label: "Reserved evergreen card slots",
    hint: "Recurring-need cards guaranteed a slot so trends can't crowd them out.",
    get: (c) => c.score.maxEvergreenCards,
    set: (c, v) => ({ ...c, score: { ...c.score, maxEvergreenCards: v } }),
  },
  {
    key: "delivery.maxAlertsPerWeek",
    label: "Max alerts per week",
    hint: "Per business, across every channel.",
    get: (c) => c.delivery.maxAlertsPerWeek,
    set: (c, v) => ({ ...c, delivery: { ...c.delivery, maxAlertsPerWeek: v } }),
  },
  {
    key: "delivery.alertMinScore",
    label: "Minimum score for an immediate alert",
    hint: "Higher bar than a plain card — only the most useful opportunities interrupt.",
    get: (c) => c.delivery.alertMinScore,
    set: (c, v) => ({ ...c, delivery: { ...c.delivery, alertMinScore: v } }),
  },
];

interface SettingsTabProps {
  config: ListeningConfig;
  onSave: (config: ListeningConfig) => void;
}

export function SettingsTab({ config, onSave }: SettingsTabProps) {
  const [draft, setDraft] = useState(config);
  const [saving, setSaving] = useState(false);

  const setField = (field: SettingsField, raw: string) => {
    const num = Number(raw);
    if (raw === "" || Number.isNaN(num)) return;
    setDraft((prev) => field.set(prev, num));
  };

  const save = () => {
    setSaving(true);
    onSave(draft);
    toast.success("Settings saved — takes effect on the next scheduled cycle.");
    window.setTimeout(() => setSaving(false), 200);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-card p-5 shadow-card">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {SETTINGS_FIELDS.map((f) => (
            <div key={f.key} className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground" htmlFor={f.key}>
                {f.label}
              </label>
              <Input
                id={f.key}
                type="number"
                value={f.get(draft)}
                onChange={(e) => setField(f, e.target.value)}
                className="h-9 text-[13px]"
              />
              <p className="text-xs text-subtle-foreground">{f.hint}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <Button size="sm" disabled={saving} onClick={save}>
          <Settings2 /> Save changes
        </Button>
      </div>
    </div>
  );
}
