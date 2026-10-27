"use client";

import { Check, Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { KeyValueRow } from "@/components/data-display/key-value-row";
import { Input } from "@/components/ui/input";
import { Meter } from "@/components/data-display/meter";
import { SectionCard } from "@/components/data-display/section-card";
import { Button } from "@/components/ui/button";
import type { BudgetCap } from "@/features/settings/types";

function BudgetRow({
  budget,
  onChange,
}: {
  budget: BudgetCap;
  onChange: (capDisplay: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(budget.capDisplay);

  const save = () => {
    if (!draft.trim()) return;
    onChange(draft.trim());
    toast.success(`${budget.label} updated.`);
    setEditing(false);
  };

  return (
    <KeyValueRow
      label={budget.label}
      description={
        budget.used ? (
          <span className="mt-2 block w-48">
            <Meter
              value={budget.used.share}
              tone={budget.used.share >= 75 ? "warning" : "brand"}
              label={`${budget.label} used`}
            />
          </span>
        ) : undefined
      }
    >
      {editing ? (
        <div className="flex items-center gap-1.5">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="h-8 w-28 font-mono text-[12.5px]"
            autoFocus
          />
          <Button variant="ghost" size="icon-sm" onClick={save}>
            <Check />
          </Button>
        </div>
      ) : (
        <>
          <span className="font-mono text-[12.5px] text-foreground tabular">
            {budget.capDisplay}
          </span>
          {budget.used ? (
            <span className="font-mono text-xs text-subtle-foreground tabular">
              · {budget.used.display} used
            </span>
          ) : null}
          <Button variant="ghost" size="icon-sm" onClick={() => setEditing(true)}>
            <Pencil />
          </Button>
        </>
      )}
    </KeyValueRow>
  );
}

export function BudgetCapsCard({ budgets: initial }: { budgets: BudgetCap[] }) {
  const [budgets, setBudgets] = useState(initial);

  return (
    <SectionCard title="Platform budget caps" description="Hard limits on third-party spend">
      <div className="flex flex-col">
        {budgets.map((budget) => (
          <BudgetRow
            key={budget.id}
            budget={budget}
            onChange={(capDisplay) =>
              setBudgets((prev) => prev.map((b) => (b.id === budget.id ? { ...b, capDisplay } : b)))
            }
          />
        ))}
      </div>
    </SectionCard>
  );
}
