import type { TokenState } from "@/types/integrations";
import type { Kpi } from "@/types/tone";

export type InboxChannel = "instagram" | "whatsapp" | "messenger";

export interface InboxConnection {
  id: string;
  business: string;
  channels: InboxChannel[];
  token: TokenState;
  autoReply: boolean;
  /** AI safety-guard interventions over the last 7 days. */
  guardInterventions: number;
  lastActivity: string;
}

export interface InboxPageData {
  kpis: Kpi[];
  connections: InboxConnection[];
}
