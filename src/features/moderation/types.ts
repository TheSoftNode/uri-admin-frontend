import type { Kpi } from "@/types/tone";

export type ReviewTier = "mandatory" | "soft";
export type ReviewStatus = "pending" | "approved" | "rejected";

export interface ReviewItem {
  id: string;
  brand: string;
  qualityScore: number;
  issues: string[];
  tier: ReviewTier;
  priority: number;
  assignee: string | null;
  autoPassed: boolean;
  status: ReviewStatus;
}

export interface IssueCount {
  issue: string;
  count: number;
}

export interface ModerationPageData {
  kpis: Kpi[];
  queue: ReviewItem[];
  topIssues: IssueCount[];
  draftsPerDay: { day: string; drafts: number }[];
}
