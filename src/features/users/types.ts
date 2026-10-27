import type { Kpi } from "@/types/tone";

export type Plan = "Starter" | "Growth" | "Pro" | "Agency";
export type UserStatus = "active" | "trial ended" | "past due";
export type UserSegment = "all" | "admins" | "support" | "flagged";

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  plan: Plan;
  credits: number;
  status: UserStatus;
  joined: string;
  role: "member" | "admin" | "support";
  flagged: boolean;
}

export interface UsersPageData {
  kpis: Kpi[];
  totalCount: number;
  users: PlatformUser[];
}
