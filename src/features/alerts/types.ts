import type { Kpi } from "@/types/tone";

export type AlertSeverity = "critical" | "warning" | "info";
export type AlertStatus = "open" | "acknowledged" | "monitoring";

export interface PlatformAlert {
  id: string;
  title: string;
  severity: AlertSeverity;
  platform: string;
  businessesImpacted: number;
  firstSeen: string;
  status: AlertStatus;
}

export interface AlertsPageData {
  kpis: Kpi[];
  alerts: PlatformAlert[];
}
