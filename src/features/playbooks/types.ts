import type { Kpi } from "@/types/tone";

export type BusinessStage = "early" | "growth" | "mature";

export interface Playbook {
  id: string;
  brand: string;
  industry: string;
  stage: BusinessStage;
  targetPlatforms: string[];
  complianceFlagged: boolean;
  updated: string;
  /** Self-reported by the brand owner — the full record support can't see
   * elsewhere without a database query (per this page's own purpose). */
  contentPillars: string[];
  brandVoice: string;
  guardrails: string;
  complianceNotes: string | null;
}

export interface PlatformShare {
  platform: string;
  share: number;
}

export interface PlaybooksPageData {
  kpis: Kpi[];
  platformShares: PlatformShare[];
  playbooks: Playbook[];
}
