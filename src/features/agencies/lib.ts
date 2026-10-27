import type { AgencyStatus, AgencyTier } from "@/features/agencies/types";
import type { Tone } from "@/types/tone";

export const agencyTierLabel: Record<AgencyTier, string> = {
  agency_starter: "Starter",
  agency_pro: "Pro",
  agency_enterprise: "Enterprise",
};

export const AGENCY_TIERS: AgencyTier[] = ["agency_starter", "agency_pro", "agency_enterprise"];

export const agencyStatusTone: Record<AgencyStatus, Tone> = {
  active: "success",
  suspended: "critical",
  cancelled: "neutral",
};

export function isNearBrandCap(agency: { brands: number; maxBrands: number | null }): boolean {
  return agency.maxBrands !== null && agency.brands >= agency.maxBrands * 0.9;
}
