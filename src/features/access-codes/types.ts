/** Mirrors AdminService.ts's AccessCode exactly (camelCase in place of the
 * real snake_case wire fields). `status` tracks an ASSIGNED roster's
 * progress — an open/shared code (empty `assignedEmails`) is always
 * "unassigned" regardless of how many people have redeemed it. */
export type AccessCodeStatus = "unassigned" | "pending" | "partially_redeemed" | "fully_redeemed";

export interface AccessCode {
  code: string;
  planTierId: string;
  durationDays: number;
  maxRedemptions: number | null;
  redemptionCount: number;
  isActive: boolean;
  expiresAt: string | null;
  label: string;
  createdBy: string;
  createdAt: string;
  /** Non-empty = only these emails can ever redeem this code. Empty = open/shared. */
  assignedEmails: string[];
  status: AccessCodeStatus;
}

/** Mirrors AdminService.ts's AccessCodeRedemption exactly. */
export type RedemptionEffectiveStatus =
  "active" | "lapsed" | "revoked" | "superseded" | "not_redeemed";

export interface AccessCodeRedemption {
  code: string;
  userId: string | null;
  email: string | null;
  planTierId: string;
  accessStart: string | null;
  accessEnd: string | null;
  previousSubscriptionTier: string | null;
  redeemedAt: string | null;
  revokedAt: string | null;
  revocationReason: string | null;
  effectiveStatus: RedemptionEffectiveStatus;
}

export interface AccessCodesPageData {
  codes: AccessCode[];
  /** Keyed by code — the real API fetches these per-code on demand
   * (`listAccessCodeRedemptions`); bundled here since this feature has no
   * live backend to call lazily yet. */
  redemptionsByCode: Record<string, AccessCodeRedemption[]>;
}
