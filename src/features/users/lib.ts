import type { AdminUser, UserLifecycleStatus } from "@/features/users/types";

/** Real plan_tier_id values the backend accepts for setUserSubscription. */
export const PLAN_TIERS = ["starter", "growth", "pro", "agency"] as const;
export type PlanTier = (typeof PLAN_TIERS)[number];

export function planTierLabel(tier: string | undefined): string {
  if (!tier) return "Free";
  return tier.charAt(0).toUpperCase() + tier.slice(1);
}

function isTrialActive(user: AdminUser, now: Date): boolean {
  return Boolean(user.trialEnd) && new Date(user.trialEnd!).getTime() > now.getTime();
}

/** The real model has no status field — this is derived purely from
 * subscriptionTier/trialEnd, the same way the real backend's own admin
 * endpoints would have to be read. */
export function lifecycleStatus(user: AdminUser, now = new Date()): UserLifecycleStatus {
  if (user.subscriptionTier) return "paid";
  if (user.trialEnd) return isTrialActive(user, now) ? "trial-active" : "trial-ended";
  return "free";
}

export function trialDaysRemaining(user: AdminUser, now = new Date()): number | null {
  if (!user.trialEnd) return null;
  const ms = new Date(user.trialEnd).getTime() - now.getTime();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

export function displayName(user: AdminUser): string {
  return user.name || [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email;
}
