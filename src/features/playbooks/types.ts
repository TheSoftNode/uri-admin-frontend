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
