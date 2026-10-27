import type { TokenState } from "@/types/integrations";

export interface AdConnection {
  id: string;
  business: string;
  platform: string;
  accountType: "ads" | "social";
  token: TokenState;
  lastSync: string;
  /** 7-day error rate, percent. */
  errorRate: number;
}

export interface AdPlatformsStats {
  totalConnectedAccounts: number;
  tokensExpiring7d: number;
  disconnectedCount: number;
  platformsWithElevatedErrors: number;
}

export interface AdPlatformsPageData {
  stats: AdPlatformsStats;
  connections: AdConnection[];
}
