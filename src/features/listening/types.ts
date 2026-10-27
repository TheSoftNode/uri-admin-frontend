/* ─────────────────────────── Topics ─────────────────────────── */

export type TopicStatus = "observed" | "candidate" | "monitored" | "paused" | "retired";

/** Matches ListeningCurationPage.tsx's TOPIC_STATUS_META exactly. */
export const topicStatusMeta: Record<TopicStatus, { label: string; className: string }> = {
  observed: { label: "Observed", className: "bg-muted text-muted-foreground border-border" },
  candidate: { label: "Candidate", className: "bg-amber-50 text-amber-700 border-amber-200" },
  monitored: { label: "Monitored", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  paused: { label: "Paused", className: "bg-sky-50 text-sky-700 border-sky-200" },
  retired: { label: "Retired", className: "bg-rose-50 text-rose-700 border-rose-200" },
};

export interface CurationMarket {
  key: string;
  label: string;
  subscriberCount?: number;
}

export interface CurationTopic {
  market: string;
  key: string;
  name: string;
  status: TopicStatus;
  lastSeen: string;
  decidedBy?: string;
  /** Other topic keys most often mentioned in the same posts, highest count first. */
  coOccurs?: Record<string, number>;
}

export interface TopicHistoryEntry {
  oldStatus: TopicStatus | null;
  newStatus: TopicStatus;
  actor: string;
  at: string;
  reason?: string;
}

/* ─────────────────────────── Sources ─────────────────────────── */

export interface SourceDisplayRules {
  maxExcerptChars?: number;
  requireLink?: boolean;
  requireAttribution?: boolean;
}

export interface SourcePermission {
  source: string;
  approved: boolean;
  approvedBy?: string;
  retentionDays?: number;
  allowedUse: string[];
  displayRules?: SourceDisplayRules;
  notes?: string;
}

/* ─────────────────────────── Ontology ─────────────────────────── */

export interface OntologyCategory {
  id: string;
  label: string;
  status: string;
  coreTerms: string[];
  localTerms: Record<string, string[]>;
}

/* ─────────────────────────── Review queue ─────────────────────────── */

export interface PendingReview {
  market: string;
  sourceId: string;
  confidence?: number;
  intent?: string;
  onTopic?: boolean;
  text?: string;
  url?: string;
}

/* ─────────────────────────── Golden sets ─────────────────────────── */

export interface GoldenExample {
  market: string;
  sourceId: string;
  intent?: string;
  onTopic: boolean;
  sentiment?: string;
  text?: string;
  markedBy?: string;
  markedAt?: string;
}

/* ─────────────────────────── Replay ─────────────────────────── */

export interface ReplaySignal {
  topic: string;
  type: string;
}

export interface ReplayResult {
  market: string;
  day: string;
  candidateSignalCount: number;
  comparedSignalCount: number;
  agreementCount: number;
  newSignals: ReplaySignal[];
  missedSignals: ReplaySignal[];
}

/* ─────────────────────────── Metrics ─────────────────────────── */

export interface ProductMetrics {
  windowDays: number;
  cardsShown: number;
  usefulOrActedOnRate: number | null;
  dismissalRate: number | null;
  contentCreatedCount: number | null;
  contentCreatedRate: number | null;
  dismissalReasons: Record<string, number>;
  /** Metric id → honest reason it isn't computed yet. Never fabricated. */
  notAvailable: Record<string, string>;
}

/* ─────────────────────────── Settings ─────────────────────────── */

export interface ListeningConfig {
  monthlyBudgetUsd: number;
  cadenceHours: number;
  score: {
    minScore: number;
    minRelevance: number;
    maxCardsPerRun: number;
    maxEvergreenCards: number;
  };
  delivery: {
    maxAlertsPerWeek: number;
    alertMinScore: number;
  };
}

/* ─────────────────────────── Tabs ─────────────────────────── */

export type ListeningTabId =
  | "topics"
  | "sources"
  | "ontology"
  | "settings"
  | "reviews"
  | "golden"
  | "replay"
  | "metrics";

/* ─────────────────────────── Page bundle ─────────────────────────── */

export interface ListeningPageData {
  markets: CurationMarket[];
  topics: CurationTopic[];
  topicHistory: Record<string, TopicHistoryEntry[]>;
  sources: SourcePermission[];
  ontology: OntologyCategory[];
  reviews: PendingReview[];
  golden: GoldenExample[];
  config: ListeningConfig;
  metrics: ProductMetrics;
}
