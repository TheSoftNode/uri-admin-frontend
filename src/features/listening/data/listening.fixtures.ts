import type { ListeningPageData } from "@/features/listening/types";

export const listeningFixture: ListeningPageData = {
  kpis: [
    { id: "markets", label: "Markets monitored", value: "6" },
    { id: "keywords", label: "Keywords in Monitored state", value: "842" },
    { id: "cards", label: "Cards generated this week", value: "318", tone: "brand" },
    { id: "reject", label: "Confidence-gate reject rate", value: "34%", tone: "warning" },
  ],
  cards: [
    {
      id: "cc_01",
      market: "NG · beauty",
      signal: "trend_spike",
      proposedAction: "carousel: 5 reasons shea butter beats synthetic creams",
      confidence: 0.88,
      status: "pending review",
    },
    {
      id: "cc_02",
      market: "NG · fitness",
      signal: "unmet_need",
      proposedAction: "post: home workout for Lagos apartments",
      confidence: 0.74,
      status: "pending review",
    },
    {
      id: "cc_03",
      market: "GH · fmcg",
      signal: "competitor_gap",
      proposedAction: "faq: cold-chain delivery questions",
      confidence: 0.52,
      status: "low confidence",
    },
    {
      id: "cc_04",
      market: "NG · logistics",
      signal: "objection_spike",
      proposedAction: "faq: late-delivery concerns",
      confidence: 0.81,
      status: "pending review",
    },
    {
      id: "cc_05",
      market: "KE · beauty",
      signal: "trend_spike",
      proposedAction: "post: scalp-care routine",
      confidence: 0.39,
      status: "rejected — fabrication check",
    },
  ],
  metrics: [
    { label: "Cards shipped (30d)", value: "1,284" },
    { label: "Avg relevance score", value: "0.68" },
    { label: "First-draft approval rate", value: null },
    { label: "Ad-test cost / qualified lead", value: null },
  ],
};
