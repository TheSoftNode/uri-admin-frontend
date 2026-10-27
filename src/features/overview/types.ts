import type { Tone } from "@/types/tone";

export interface MarketNode {
  code: string;
  businesses: number;
  /** Position on the 460×300 network canvas. */
  x: number;
  y: number;
  radius: number;
  /** Primary markets render in brand, secondary in violet. */
  tier: "primary" | "secondary";
  /** Arc control point, so each connection curves distinctly. */
  curve: { x: number; y: number };
}

export interface PlatformSection {
  name: string;
  href: string;
  stat: string;
  meta: string;
  tone: Tone;
}

export interface AttentionItem {
  id: string;
  title: string;
  meta: string;
  age: string;
  action: string;
  href: string;
  tone: Tone;
}

export interface JaneActivity {
  id: string;
  text: string;
  ago: string;
}

export interface PlanShare {
  plan: string;
  users: number;
  color: string;
}

export interface Signup {
  id: string;
  name: string;
  ago: string;
}

export interface OverviewData {
  pulse: {
    postsToday: number;
    dmRepliesToday: number;
    adSpendTodayNgn: number;
    signal: number[];
  };
  markets: { totalBusinesses: number; nodes: MarketNode[] };
  health: { score: number; apiLatencyMs: number; spendOnTrack: boolean; degraded: number };
  mrr: { amountUsd: number; changePct: number; trend: { month: string; value: number }[] };
  sections: PlatformSection[];
  attention: AttentionItem[];
  jane: JaneActivity[];
  planMix: { totalUsers: number; shares: PlanShare[] };
  signups: Signup[];
}
