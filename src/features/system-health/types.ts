export type ServiceStatus = "healthy" | "degraded" | "down";

export interface ServiceHealth {
  id: string;
  name: string;
  status: ServiceStatus;
  /** Severity of a degradation; drives the badge tone. */
  severity?: "warning" | "critical";
  metric: string;
  lastIncident: string;
  /** The matching Platform Alert's `kind`, when this degradation has one. */
  alertKind?: string;
}

export interface SystemHealthStats {
  apiP95LatencyMs: number;
  backgroundJobsQueued: number;
  apifySpendUsdMonth: number;
}

export interface SystemHealthPageData {
  stats: SystemHealthStats;
  requestVolume: { hour: string; requests: number }[];
  services: ServiceHealth[];
}
