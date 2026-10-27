export type JaneDecision = "PLAN" | "ADVISE";

export interface CampaignPlan {
  id: string;
  business: string;
  decision: JaneDecision;
  budgetNgn: number;
  spendNgn: number;
  accountCapNgn: number;
  launched: boolean;
  updated: string;
  /** Admin safety flag — distinct from the plan's own PLAN/ADVISE decision. */
  flaggedForReview: boolean;
}

export interface CampaignsStats {
  totalFundedNgn: number;
  spendThisMonthNgn: number;
  accountCapBreaches: number;
  plansAwaitingDecision: number;
}

export interface CampaignsPageData {
  stats: CampaignsStats;
  plans: CampaignPlan[];
}
