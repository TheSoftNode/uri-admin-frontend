import type { SystemHealthPageData } from "@/features/system-health/types";

const hourlyRequests = [
  4200, 3600, 3100, 2900, 3300, 4800, 7600, 10400, 12800, 13900, 14600, 15200, 14800, 15600, 16200,
  15900, 15100, 14400, 13600, 12900, 11800, 9800, 7400, 5600,
];

export const systemHealthFixture: SystemHealthPageData = {
  stats: {
    apiP95LatencyMs: 184,
    backgroundJobsQueued: 12,
    apifySpendUsdMonth: 2118,
  },
  requestVolume: hourlyRequests.map((requests, hour) => ({
    hour: `${String(hour).padStart(2, "0")}:00`,
    requests,
  })),
  services: [
    {
      id: "svc_api",
      name: "FastAPI backend",
      status: "healthy",
      metric: "184ms p95",
      lastIncident: "none in 30d",
    },
    {
      id: "svc_mongo",
      name: "MongoDB (Atlas)",
      status: "healthy",
      metric: "8ms avg query",
      lastIncident: "none in 30d",
    },
    {
      id: "svc_apify",
      name: "Apify collector",
      status: "healthy",
      metric: "$2,118 spent / $5,000 cap",
      lastIncident: "none in 30d",
    },
    {
      id: "svc_openai",
      name: "OpenAI",
      status: "degraded",
      severity: "critical",
      metric: "9 failures / 14m",
      lastIncident: "14m ago",
      alertKind: "openai_out_of_credit",
    },
    {
      id: "svc_linkedin",
      name: "LinkedIn UGC API",
      status: "healthy",
      metric: "0.2% error rate",
      lastIncident: "6d ago",
    },
    {
      id: "svc_meta",
      name: "Meta Graph API",
      status: "degraded",
      severity: "warning",
      metric: "4.1% token refresh errors",
      lastIncident: "3h ago",
      alertKind: "meta_token_refresh_failing",
    },
    {
      id: "svc_tiktok",
      name: "TikTok Ads API",
      status: "healthy",
      metric: "320ms p95",
      lastIncident: "none in 30d",
    },
    {
      id: "svc_scheduler",
      name: "Notification scheduler",
      status: "healthy",
      metric: "12 jobs queued",
      lastIncident: "none in 30d",
    },
  ],
};
