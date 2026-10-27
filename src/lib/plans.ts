/** Real plan_tier_id values the backend accepts (setUserSubscription, access codes). */
export const PLAN_TIERS = ["starter", "growth", "pro", "agency"] as const;
export type PlanTier = (typeof PLAN_TIERS)[number];

export function planTierLabel(tier: string | null | undefined): string {
  if (!tier) return "Free";
  return tier.charAt(0).toUpperCase() + tier.slice(1);
}
