import type { Kpi } from "@/types/tone";

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
}

export interface CampaignsPageData {
  kpis: Kpi[];
  plans: CampaignPlan[];
}
