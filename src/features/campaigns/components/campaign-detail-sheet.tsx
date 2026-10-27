"use client";

import { Flag } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { isAccountCapBreach } from "@/features/campaigns/lib";
import type { CampaignPlan } from "@/features/campaigns/types";
import { formatCurrency } from "@/lib/format";

interface CampaignDetailSheetProps {
  plan: CampaignPlan | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onToggleFlag: (planId: string, flagged: boolean) => void;
}

export function CampaignDetailSheet({
  plan,
  open,
  onOpenChange,
  onToggleFlag,
}: CampaignDetailSheetProps) {
  if (!plan) return null;

  const breach = isAccountCapBreach(plan);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 overflow-y-auto sm:max-w-sm">
        <SheetHeader className="gap-2 border-b border-border pb-5">
          <SheetTitle>{plan.business}</SheetTitle>
          <SheetDescription>Updated {plan.updated}</SheetDescription>
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant={plan.decision === "PLAN" ? "brand" : "neutral"} className="font-mono">
              {plan.decision}
            </Badge>
            <Badge variant={plan.launched ? "success" : "neutral"}>
              {plan.launched ? "launched" : "not launched"}
            </Badge>
            {breach ? <Badge variant="critical">cap breached</Badge> : null}
            {plan.flaggedForReview ? <Badge variant="warning">flagged</Badge> : null}
          </div>
        </SheetHeader>

        <div className="flex flex-col gap-6 p-4">
          <section className="grid grid-cols-2 gap-3 text-[13px]">
            <div>
              <p className="text-[11px] font-medium text-subtle-foreground">Budget</p>
              <p className="font-mono font-semibold text-foreground tabular">
                {formatCurrency(plan.budgetNgn, "NGN")}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-subtle-foreground">Spend</p>
              <p
                className={`font-mono font-semibold tabular ${breach ? "text-critical" : "text-foreground"}`}
              >
                {formatCurrency(plan.spendNgn, "NGN")}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-subtle-foreground">Account cap</p>
              <p className="font-mono text-foreground tabular">
                {formatCurrency(plan.accountCapNgn, "NGN")}
              </p>
            </div>
          </section>

          {breach ? (
            <div className="rounded-xl bg-critical-soft p-3.5 text-[13px] text-critical">
              Spend exceeds the account cap by{" "}
              {formatCurrency(plan.spendNgn - plan.accountCapNgn, "NGN")}.
            </div>
          ) : null}

          <Separator />

          <section className="flex flex-col gap-2.5">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase">
              Admin safety flag
            </p>
            <p className="text-[13px] text-subtle-foreground">
              Launches only happen through an explicit human action in Jane Ads — flagging a plan
              here is a note for the ops team, not a pause.
            </p>
            {plan.flaggedForReview ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  onToggleFlag(plan.id, false);
                  toast.success("Flag cleared.");
                }}
              >
                Clear flag
              </Button>
            ) : (
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  onToggleFlag(plan.id, true);
                  toast.success("Flagged for review.");
                }}
              >
                <Flag />
                Flag for review
              </Button>
            )}
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
