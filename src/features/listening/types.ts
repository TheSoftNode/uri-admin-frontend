import type { Kpi } from "@/types/tone";

export type SignalType = "trend_spike" | "unmet_need" | "competitor_gap" | "objection_spike";
export type CardStatus = "pending review" | "low confidence" | "rejected — fabrication check";

export interface CurationCard {
  id: string;
  market: string;
  signal: SignalType;
  proposedAction: string;
  confidence: number;
  status: CardStatus;
}

export interface LearningMetric {
  label: string;
  /** null when the backend does not compute it yet. */
  value: string | null;
}

export const curationTabs = ["Topics", "Sources", "Review", "Golden", "Replay", "Metrics"] as const;
export type CurationTab = (typeof curationTabs)[number];

export interface ListeningPageData {
  kpis: Kpi[];
  cards: CurationCard[];
  metrics: LearningMetric[];
}
