/** Mirrors the real Agency model (app/models/agency.py) exactly. */
export type AgencyTier = "agency_starter" | "agency_pro" | "agency_enterprise";
export type AgencyStatus = "active" | "suspended" | "cancelled";

export interface Agency {
  id: string;
  name: string;
  ownerUserId: string;
  ownerEmail: string;
  tier: AgencyTier;
  brands: number;
  /** null = unlimited (enterprise). */
  maxBrands: number | null;
  walletCredits: number;
  perBrandCaps: boolean;
  status: AgencyStatus;
}

export interface AgenciesStats {
  totalAgencies: number;
  pooledWalletCredits: number;
  nearCapCount: number;
  suspendedCount: number;
}

export interface AgenciesPageData {
  stats: AgenciesStats;
  agencies: Agency[];
}
