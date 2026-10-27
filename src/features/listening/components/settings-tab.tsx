"use client";

import { Settings2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { ListeningConfig } from "@/features/listening/types";

/** The budget/cadence/threshold knobs most worth an admin changing live
 * without a deploy — not a generic editor over the whole nested config tree,
 * which would be sprawl for value nobody's asked to change this way. */
const SETTINGS_FIELDS: {
  section: "root" | "score" | "delivery";
  key: string;
  label: string;
  hint: string;
  get: (c: ListeningConfig) => number;
  set: (c: ListeningConfig, v: number) => ListeningConfig;
}[] = [
  {
    section: "root",
    key: "monthlyBudgetUsd",
    label: "Monthly budget (USD)",
    hint: "Hard ceiling across every source combined.",
    get: (c) => c.monthlyBudgetUsd,
    set: (c, v) => ({ ...c, monthlyBudgetUsd: v }),
  },
  {
    section: "root",
    key: "cadenceHours",
    label: "Default cadence (hours)",
    hint: "How often a market collects when nothing is hot.",
    get: (c) => c.cadenceHours,
    set: (c, v) => ({ ...c, cadenceHours: v }),
  },
  {
    section: "score",
    key: "minScore",
    label: "Minimum card score",
    hint: "A signal below this never becomes a card, regardless of relevance.",
    get: (c) => c.score.minScore,
    set: (c, v) => ({ ...c, score: { ...c.score, minScore: v } }),
  },
  {
    section: "score",
    key: "minRelevance",
    label: "Minimum relevance",
    hint: "Gates every card independently of the overall score.",
    get: (c) => c.score.minRelevance,
    set: (c, v) => ({ ...c, score: { ...c.score, minRelevance: v } }),
  },
  {
    section: "score",
    key: "maxCardsPerRun",
    label: "Max cards per cycle",
    hint: "Per business, per scheduled run.",
    get: (c) => c.score.maxCardsPerRun,
    set: (c, v) => ({ ...c, score: { ...c.score, maxCardsPerRun: v } }),
  },
  {
    section: "score",
    key: "maxEvergreenCards",
    label: "Reserved evergreen card slots",
    hint: "Recurring-need cards guaranteed a slot so trends can't crowd them out.",
    get: (c) => c.score.maxEvergreenCards,
    set: (c, v) => ({ ...c, score: { ...c.score, maxEvergreenCards: v } }),
  },
  {
    section: "delivery",
    key: "maxAlertsPerWeek",
    label: "Max alerts per week",
    hint: "Per business, across every channel.",
    get: (c) => c.delivery.maxAlertsPerWeek,
    set: (c, v) => ({ ...c, delivery: { ...c.delivery, maxAlertsPerWeek: v } }),
  },
  {
    section: "delivery",
    key: "alertMinScore",
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

  const setField = (field: (typeof SETTINGS_FIELDS)[number], raw: string) => {
    if (raw === "") return;
    const num = Number(raw);
    if (Number.isNaN(num)) return;
    setDraft((prev) => field.set(prev, num));
  };

  const save = () => {
    setSaving(true);
    onSave(draft);
    toast.success("Settings saved — takes effect on the next scheduled cycle.");
    setSaving(false);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
          {SETTINGS_FIELDS.map((f) => (
            <div key={`${f.section}.${f.key}`} className="space-y-1">
              <div className="text-[12px] font-medium text-foreground">{f.label}</div>
              <Input
                type="number"
                value={f.get(draft)}
                onChange={(e) => setField(f, e.target.value)}
                className="h-8 text-[13px]"
              />
              <div className="text-[11px] text-muted-foreground">{f.hint}</div>
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button size="sm" onClick={save} disabled={saving}>
          <Settings2 className="h-3.5 w-3.5" />
          Save changes
        </Button>
      </div>
    </div>
  );
}
