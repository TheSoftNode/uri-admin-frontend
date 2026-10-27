import type { AlertsPageData } from "@/features/alerts/types";

export const alertsFixture: AlertsPageData = {
  stats: {
    activeCount: 4,
    totalOccurrencesActive: 236,
    dismissedLast7d: 2,
    emailedCount: 2,
  },
  alerts: [
    {
      kind: "openai_out_of_credit",
      title: "OpenAI account out of credit",
      detail:
        "The shared OpenAI key returned insufficient_quota on content-generation requests. Every brand on the shared key is affected until billing is topped up.",
      firstSeen: "2026-10-27T08:46:00Z",
      lastSeen: "2026-10-27T09:12:00Z",
      occurrences: 182,
      lastEmailedAt: "2026-10-27T08:50:00Z",
      dismissedAt: null,
    },
    {
      kind: "meta_token_refresh_failing",
      title: "Meta token refresh failures rising",
      detail:
        'OAuth token refresh for connected Meta accounts is failing intermittently. Affected brands will see their Instagram/Facebook connections drop to "needs reconnect."',
      firstSeen: "2026-10-27T06:05:00Z",
      lastSeen: "2026-10-27T09:00:00Z",
      occurrences: 42,
      lastEmailedAt: "2026-10-27T06:10:00Z",
      dismissedAt: null,
    },
    {
      kind: "linkedin_video_429",
      title: "LinkedIn UGC video uploads returning 429",
      detail: "LinkedIn's video upload endpoint is rate-limiting a subset of accounts.",
      firstSeen: "2026-10-27T08:10:00Z",
      lastSeen: "2026-10-27T08:55:00Z",
      occurrences: 9,
      lastEmailedAt: null,
      dismissedAt: null,
    },
    {
      kind: "apify_tiktok_cost_spike",
      title: "Apify TikTok actor cost spike",
      detail:
        "The TikTok listening actor's per-run cost jumped roughly 3x against its normal baseline — likely an upstream pricing or input-shape change.",
      firstSeen: "2026-10-27T07:15:00Z",
      lastSeen: "2026-10-27T07:40:00Z",
      occurrences: 3,
      lastEmailedAt: null,
      dismissedAt: null,
    },
    {
      kind: "tiktok_ads_latency",
      title: "TikTok ads API latency elevated",
      detail: "p95 latency on TikTok's ads reporting endpoint doubled for about 40 minutes.",
      firstSeen: "2026-10-26T14:20:00Z",
      lastSeen: "2026-10-26T15:05:00Z",
      occurrences: 6,
      lastEmailedAt: null,
      dismissedAt: "2026-10-26T15:30:00Z",
    },
    {
      kind: "news_edition_empty_ng_en",
      title: "Google News edition feed empty for NG:en",
      detail:
        "The News actor returned zero items for the NG:en edition for two consecutive cycles.",
      firstSeen: "2026-10-25T09:00:00Z",
      lastSeen: "2026-10-25T21:00:00Z",
      occurrences: 2,
      lastEmailedAt: null,
      dismissedAt: "2026-10-26T08:00:00Z",
    },
  ],
};
