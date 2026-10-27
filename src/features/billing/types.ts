import type { PlanTier } from "@/lib/plans";
import type { Tone } from "@/types/tone";

export interface FunnelStage {
  name: string;
  count: number;
  /** Share of the starting cohort, 0–100. */
  share: number;
  tone: Tone;
}

export interface Wallet {
  id: string;
  /** Links back to the same AdminUser this wallet belongs to. */
  userId: string;
  email: string;
  /** null = no active subscription (free). */
  tier: PlanTier | null;
  source: "stripe" | "trial" | "access_code";
  creditsRemaining: number;
  trialActive: boolean;
  /** Renewal date label, or null when the last payment failed. */
  renewal: string | null;
}

export interface BillingStats {
  mrrUsd: number;
  mrrChangePct: number;
  activeSubscriptions: number;
  trialConversionPct: number;
  failedPayments7d: number;
  failedPaymentsAtRiskUsd: number;
}

export interface BillingPageData {
  stats: BillingStats;
  revenue: { month: string; mrrUsd: number }[];
  funnel: FunnelStage[];
  wallets: Wallet[];
}
