import type {
  AccessCode,
  AccessCodeStatus,
  RedemptionEffectiveStatus,
} from "@/features/access-codes/types";
import type { Tone } from "@/types/tone";

export const statusTone: Record<AccessCodeStatus, Tone> = {
  unassigned: "neutral",
  pending: "info",
  partially_redeemed: "warning",
  fully_redeemed: "success",
};

export const statusLabel: Record<AccessCodeStatus, string> = {
  unassigned: "Open",
  pending: "Pending",
  partially_redeemed: "Partially redeemed",
  fully_redeemed: "Fully redeemed",
};

export const redemptionStatusTone: Record<RedemptionEffectiveStatus, Tone> = {
  active: "success",
  lapsed: "neutral",
  revoked: "critical",
  superseded: "warning",
  not_redeemed: "neutral",
};

export const redemptionStatusLabel: Record<RedemptionEffectiveStatus, string> = {
  active: "Active",
  lapsed: "Lapsed",
  revoked: "Revoked",
  superseded: "Superseded",
  not_redeemed: "Not redeemed yet",
};

export function isExpired(code: AccessCode, now = new Date()): boolean {
  return Boolean(code.expiresAt) && new Date(code.expiresAt!).getTime() < now.getTime();
}

export function redemptionShare(code: AccessCode): number | null {
  if (!code.maxRedemptions) return null;
  return Math.min(100, (code.redemptionCount / code.maxRedemptions) * 100);
}

export function parseEmailList(raw: string): string[] {
  return Array.from(
    new Set(
      raw
        .split(/[\s,;]+/)
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean),
    ),
  );
}
