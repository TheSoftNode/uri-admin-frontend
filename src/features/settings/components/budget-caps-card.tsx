import { KeyValueRow } from "@/components/data-display/key-value-row";
import { Meter } from "@/components/data-display/meter";
import { SectionCard } from "@/components/data-display/section-card";
import type { BudgetCap } from "@/features/settings/types";

export function BudgetCapsCard({ budgets }: { budgets: BudgetCap[] }) {
  return (
    <SectionCard title="Platform budget caps" description="Hard limits on third-party spend">
      <div className="flex flex-col">
        {budgets.map((budget) => (
          <KeyValueRow
            key={budget.id}
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
            <span className="font-mono text-[12.5px] text-foreground tabular">
              {budget.capDisplay}
            </span>
            {budget.used ? (
              <span className="font-mono text-xs text-subtle-foreground tabular">
                · {budget.used.display} used
              </span>
            ) : null}
          </KeyValueRow>
        ))}
      </div>
    </SectionCard>
  );
}
