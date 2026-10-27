import type { TokenState } from "@/types/integrations";

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

export interface InboxStats {
  businessesEnabled: number;
  metaTokensExpiring7d: number;
  guardInterventionsToday: number;
  moduleEnabled: boolean;
}

export interface InboxPageData {
  stats: InboxStats;
  connections: InboxConnection[];
}
