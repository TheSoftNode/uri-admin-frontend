import type { CampaignPlan } from "@/features/campaigns/types";

export function isAccountCapBreach(plan: CampaignPlan): boolean {
  return plan.spendNgn > plan.accountCapNgn;
}
