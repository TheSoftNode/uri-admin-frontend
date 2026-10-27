/** Mirrors AdminService.ts's AdminUser exactly (camelCase in place of the
 * real snake_case wire fields). subscription_tier is a free-form plan-tier
 * id, not a fixed enum — "Free" is the UI's own label for null/undefined,
 * not a real tier. */
export interface AdminUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  phone?: string;
  createdAt: string;
  subscriptionTier?: string;
  trialStart?: string;
  trialEnd?: string;
  creditsBalance?: number;
  isAdmin?: boolean;
}

export interface BrandProfile {
  id: string;
  brandName?: string;
  industry?: string;
  createdAt?: string;
}

export interface Workspace {
  id: string;
  name?: string;
  createdAt?: string;
}

export interface AdminUserDetails extends AdminUser {
  brandProfiles: BrandProfile[];
  contentCount: number;
  workspaces: Workspace[];
}

/** Mirrors AdminService.ts's AdminStats exactly. */
export interface AdminStats {
  totalUsers: number;
  newUsers7d: number;
  newUsers30d: number;
  /** Plan-tier id -> count of users on it. "free" covers everyone with no tier set. */
  subscriptionStats: Record<string, number>;
  totalContent: number;
  totalBrands: number;
  totalWorkspaces: number;
}

/** Derived client-side for display only — the real model has no "status"
 * field, just subscriptionTier/trialStart/trialEnd to read it from. */
export type UserLifecycleStatus = "paid" | "trial-active" | "trial-ended" | "free";

export interface UsersPageData {
  stats: AdminStats;
  users: AdminUserDetails[];
}
