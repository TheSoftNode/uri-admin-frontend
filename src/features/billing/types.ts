import type { Kpi, Tone } from "@/types/tone";

export interface FunnelStage {
  name: string;
  count: number;
  /** Share of the starting cohort, 0–100. */
  share: number;
  tone: Tone;
}

export interface Wallet {
  id: string;
  email: string;
  tier: "Starter" | "Growth" | "Pro" | "Agency";
  source: "stripe" | "trial";
  creditsRemaining: number;
  trialActive: boolean;
  /** Renewal date label, or null when the last payment failed. */
  renewal: string | null;
}

export interface BillingPageData {
  kpis: Kpi[];
  revenue: { month: string; mrrUsd: number }[];
  funnel: FunnelStage[];
  wallets: Wallet[];
}
