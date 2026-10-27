import type { TokenState } from "@/types/integrations";
import type { Kpi } from "@/types/tone";

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

export interface AdPlatformsPageData {
  kpis: Kpi[];
  connections: AdConnection[];
}
