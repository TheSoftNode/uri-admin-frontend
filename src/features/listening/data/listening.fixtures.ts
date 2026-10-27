import type {
  CurationMarket,
  CurationTopic,
  GoldenExample,
  ListeningConfig,
  ListeningPageData,
  OntologyCategory,
  PendingReview,
  ProductMetrics,
  SourcePermission,
  TopicHistoryEntry,
} from "@/features/listening/types";

const markets: CurationMarket[] = [
  { key: "ng-beauty", label: "Nigeria · Beauty", subscriberCount: 412 },
  { key: "ng-fitness", label: "Nigeria · Fitness", subscriberCount: 268 },
  { key: "ng-logistics", label: "Nigeria · Logistics", subscriberCount: 94 },
  { key: "gh-fmcg", label: "Ghana · FMCG", subscriberCount: 71 },
  { key: "ke-beauty", label: "Kenya · Beauty", subscriberCount: 58 },
];

const topics: CurationTopic[] = [
  {
    market: "ng-beauty",
    key: "shea_butter",
    name: "Shea butter vs. synthetic creams",
    status: "candidate",
    lastSeen: "2026-10-26T14:10:00Z",
    coOccurs: { eczema: 14, "dry skin": 9, "natural skincare": 7 },
  },
  {
    market: "ng-beauty",
    key: "scalp_care",
    name: "Scalp-care routines",
    status: "observed",
    lastSeen: "2026-10-25T09:40:00Z",
    coOccurs: { "hair growth": 11, dandruff: 6 },
  },
  {
    market: "ng-fitness",
    key: "home_workout",
    name: "Home workouts for small apartments",
    status: "monitored",
    lastSeen: "2026-10-26T18:02:00Z",
    decidedBy: "Ada Okafor",
    coOccurs: { "resistance bands": 8, "no gym": 5 },
  },
  {
    market: "ng-fitness",
    key: "meal_prep",
    name: "Budget meal prep",
    status: "candidate",
    lastSeen: "2026-10-24T11:15:00Z",
    coOccurs: { "high protein": 10 },
  },
  {
    market: "ng-logistics",
    key: "late_delivery",
    name: "Late-delivery complaints",
    status: "monitored",
    lastSeen: "2026-10-26T07:55:00Z",
    decidedBy: "Chidi Eze",
    coOccurs: { "tracking number": 13, refund: 9 },
  },
  {
    market: "gh-fmcg",
    key: "cold_chain",
    name: "Cold-chain delivery questions",
    status: "observed",
    lastSeen: "2026-10-23T16:30:00Z",
  },
  {
    market: "ke-beauty",
    key: "scalp_oils",
    name: "Scalp oils trend spike",
    status: "paused",
    lastSeen: "2026-10-20T08:00:00Z",
    decidedBy: "Ada Okafor",
  },
  {
    market: "ng-beauty",
    key: "fragrance_free",
    name: "Fragrance-free demand",
    status: "retired",
    lastSeen: "2026-09-30T12:00:00Z",
    decidedBy: "Chidi Eze",
  },
];

const topicHistory: Record<string, TopicHistoryEntry[]> = {
  "ng-fitness:home_workout": [
    { oldStatus: "candidate", newStatus: "monitored", actor: "Ada Okafor", at: "2026-10-18T10:00:00Z" },
    { oldStatus: "observed", newStatus: "candidate", actor: "system", at: "2026-10-10T06:00:00Z" },
  ],
  "ng-logistics:late_delivery": [
    {
      oldStatus: "candidate",
      newStatus: "monitored",
      actor: "Chidi Eze",
      at: "2026-10-12T09:30:00Z",
      reason: "Sustained spike across 3 markets",
    },
  ],
  "ke-beauty:scalp_oils": [
    { oldStatus: "monitored", newStatus: "paused", actor: "Ada Okafor", at: "2026-10-20T08:00:00Z", reason: "Volume dropped off" },
    { oldStatus: "candidate", newStatus: "monitored", actor: "Ada Okafor", at: "2026-09-15T08:00:00Z" },
  ],
  "ng-beauty:fragrance_free": [
    { oldStatus: "paused", newStatus: "retired", actor: "Chidi Eze", at: "2026-09-30T12:00:00Z" },
  ],
};

const sources: SourcePermission[] = [
  {
    source: "x",
    approved: true,
    approvedBy: "Ada Okafor",
    retentionDays: 90,
    allowedUse: ["trend detection", "card generation"],
    displayRules: { maxExcerptChars: 280, requireLink: true, requireAttribution: true },
  },
  {
    source: "x_pro",
    approved: true,
    approvedBy: "Ada Okafor",
    retentionDays: 90,
    allowedUse: ["trend detection", "card generation", "geo-targeting"],
    displayRules: { maxExcerptChars: 280, requireLink: true, requireAttribution: true },
  },
  {
    source: "tiktok",
    approved: false,
    retentionDays: 30,
    allowedUse: ["trend detection"],
    notes: "Awaiting legal review of caption reuse terms.",
  },
  {
    source: "reddit",
    approved: false,
    retentionDays: 30,
    allowedUse: ["trend detection"],
    notes: "No geo-filter on this source — subreddit-level proxy only.",
  },
  {
    source: "news",
    approved: true,
    approvedBy: "Chidi Eze",
    retentionDays: 180,
    allowedUse: ["trend detection", "card generation", "competitor signal"],
    displayRules: { maxExcerptChars: 400, requireLink: true, requireAttribution: true },
  },
];

const ontology: OntologyCategory[] = [
  {
    id: "beauty",
    label: "Beauty & personal care",
    status: "active",
    coreTerms: ["skincare", "hair care", "natural ingredients"],
    localTerms: { pcm: ["skin care wey sweet", "natural oil"] },
  },
  {
    id: "fitness",
    label: "Fitness & wellness",
    status: "active",
    coreTerms: ["home workout", "meal prep", "resistance bands"],
    localTerms: {},
  },
  {
    id: "logistics",
    label: "Logistics & delivery",
    status: "active",
    coreTerms: ["delivery time", "tracking", "refund"],
    localTerms: { pcm: ["my package never reach"] },
  },
  {
    id: "fmcg",
    label: "FMCG & retail",
    status: "review",
    coreTerms: ["cold chain", "stock availability"],
    localTerms: {},
  },
];

const reviews: PendingReview[] = [
  {
    market: "ng-beauty",
    sourceId: "x-1182940",
    confidence: 0.52,
    intent: "question",
    onTopic: undefined,
    text: "Anyone know a shea butter brand that doesn't break me out? asking for a friend lol",
    url: "https://x.com/example/status/1182940",
  },
  {
    market: "ng-logistics",
    sourceId: "news-29311",
    confidence: 0.47,
    intent: undefined,
    text: "Lagos traffic worsens ahead of festive season, delivery firms warn of delays",
    url: "https://example-news.ng/lagos-traffic",
  },
  {
    market: "ke-beauty",
    sourceId: "x-9981022",
    confidence: 0.39,
    intent: "complaint",
    onTopic: false,
    text: "scalp oil did literally nothing for me after 3 weeks, waste of money",
  },
  {
    market: "gh-fmcg",
    sourceId: "news-10452",
    confidence: 0.58,
    intent: "question",
    text: "How do cold-chain logistics firms in Accra keep produce fresh during transport?",
    url: "https://example-news.gh/cold-chain",
  },
];

const golden: GoldenExample[] = [
  {
    market: "ng-fitness",
    sourceId: "x-5502210",
    intent: "question",
    onTopic: true,
    sentiment: "neutral",
    text: "Best resistance bands for a one-room apartment setup? budget matters",
    markedBy: "Ada Okafor",
    markedAt: "2026-10-14T10:00:00Z",
  },
  {
    market: "ng-logistics",
    sourceId: "x-5502880",
    intent: "complaint",
    onTopic: true,
    sentiment: "negative",
    text: "3rd time this month my delivery is 'in transit' for 5 days straight",
    markedBy: "Chidi Eze",
    markedAt: "2026-10-12T15:20:00Z",
  },
  {
    market: "ng-beauty",
    sourceId: "x-5501177",
    intent: "recommendation request",
    onTopic: true,
    sentiment: "positive",
    text: "shea butter + rosehip oil combo has been life changing for my dry patches",
    markedBy: "Ada Okafor",
    markedAt: "2026-10-08T09:10:00Z",
  },
];

const config: ListeningConfig = {
  monthlyBudgetUsd: 5000,
  cadenceHours: 12,
  score: { minScore: 0.45, minRelevance: 0.4, maxCardsPerRun: 8, maxEvergreenCards: 2 },
  delivery: { maxAlertsPerWeek: 5, alertMinScore: 0.75 },
};

const metrics: ProductMetrics = {
  windowDays: 30,
  cardsShown: 1284,
  usefulOrActedOnRate: 0.42,
  dismissalRate: 0.34,
  contentCreatedCount: 318,
  contentCreatedRate: 0.25,
  dismissalReasons: {
    "not relevant to my brand": 96,
    "already posted something similar": 54,
    "too generic": 41,
    "wrong format suggested": 22,
  },
  notAvailable: {
    first_draft_approval_rate: "No draft-approval tracking exists yet — card → draft lifecycle isn't linked to approval state.",
    ad_test_cost_per_qualified_lead: "No ad-test outcome tracking exists yet — depends on the ad_test action being wired to Jane Ads.",
  },
};

export const listeningFixture: ListeningPageData = {
  markets,
  topics,
  topicHistory,
  sources,
  ontology,
  reviews,
  golden,
  config,
  metrics,
};
