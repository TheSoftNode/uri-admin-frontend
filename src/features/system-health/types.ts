import type { Kpi } from "@/types/tone";

export type ServiceStatus = "healthy" | "degraded" | "down";

export interface ServiceHealth {
  id: string;
  name: string;
  status: ServiceStatus;
  /** Severity of a degradation; drives the badge tone. */
  severity?: "warning" | "critical";
  metric: string;
  lastIncident: string;
}

export interface SystemHealthPageData {
  kpis: Kpi[];
  requestVolume: { hour: string; requests: number }[];
  services: ServiceHealth[];
}
