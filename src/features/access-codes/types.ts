import type { Kpi } from "@/types/tone";

export type AccessCodeType = "bonus_credits" | "agency_seat" | "trial_extension";
export type AccessCodeStatus = "active" | "expired" | "revoked";

export interface AccessCode {
  code: string;
  type: AccessCodeType;
  grant: string;
  redeemed: number;
  maxRedemptions: number;
  status: AccessCodeStatus;
  created: string;
  /** null = never expires. */
  expires: string | null;
}

export interface AccessCodesPageData {
  kpis: Kpi[];
  codes: AccessCode[];
}
