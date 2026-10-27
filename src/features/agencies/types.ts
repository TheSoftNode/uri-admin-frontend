import type { Kpi } from "@/types/tone";

export type AgencyTier = "agency_starter" | "agency_pro" | "agency_enterprise";

export interface Agency {
  id: string;
  name: string;
  tier: AgencyTier;
  brands: number;
  /** null = unlimited (enterprise). */
  maxBrands: number | null;
  walletCredits: number;
  perBrandCaps: boolean;
  status: "active" | "suspended";
}

export interface AgenciesPageData {
  kpis: Kpi[];
  agencies: Agency[];
}
