"use client";

import { BookOpen, FlaskConical, Gauge, Globe2, Inbox, Settings2, ShieldCheck, Star, Tags } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { GoldenTab } from "@/features/listening/components/golden-tab";
import { MetricsTab } from "@/features/listening/components/metrics-tab";
import { OntologyTab } from "@/features/listening/components/ontology-tab";
import { ReplayTab } from "@/features/listening/components/replay-tab";
import { ReviewsTab } from "@/features/listening/components/reviews-tab";
import { SettingsTab } from "@/features/listening/components/settings-tab";
import { SourcesTab } from "@/features/listening/components/sources-tab";
import { TopicsTab } from "@/features/listening/components/topics-tab";
import type {
  CurationTopic,
  GoldenExample,
  ListeningConfig,
  ListeningPageData,
  ListeningTabId,
  PendingReview,
  ReplayResult,
  SourcePermission,
  TopicStatus,
} from "@/features/listening/types";
import { cn } from "@/lib/utils";

const TABS: { id: ListeningTabId; label: string; icon: LucideIcon }[] = [
  { id: "topics", label: "Topics", icon: Tags },
  { id: "sources", label: "Sources", icon: ShieldCheck },
  { id: "ontology", label: "Ontology", icon: BookOpen },
  { id: "settings", label: "Settings", icon: Settings2 },
  { id: "reviews", label: "Review queue", icon: Inbox },
  { id: "golden", label: "Golden sets", icon: Star },
  { id: "replay", label: "Replay", icon: FlaskConical },
  { id: "metrics", label: "Metrics", icon: Gauge },
];

const SelectEl = ({
  value,
  onChange,
  children,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  className?: string;
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={cn("h-8 rounded-lg border border-border bg-background px-2 text-[12px] text-foreground", className)}
  >
    {children}
  </select>
);

/**
 * Client-side console shell — ported from ListeningCurationPage.tsx's main
 * component, same tab bar, same market selector, same per-tab components.
 * Every tab's mutation applies to its own local copy of the fixture data
 * (toast feedback, no persistence) — the same shape a real mutation fills
 * in once each tab is wired to its endpoint.
 */
export function ListeningConsole({ data }: { data: ListeningPageData }) {
  const [activeTab, setActiveTab] = useState<ListeningTabId>("topics");
  const [market, setMarket] = useState("");
  const [topics, setTopics] = useState(data.topics);
  const [sources, setSources] = useState(data.sources);
  const [ontology, setOntology] = useState(data.ontology);
  const [reviews, setReviews] = useState(data.reviews);
  const [golden, setGolden] = useState(data.golden);
  const [config, setConfig] = useState(data.config);
  const [windowDays, setWindowDays] = useState(data.metrics.windowDays);
  const [replayResults, setReplayResults] = useState<ReplayResult[] | null>(null);

  const metrics = useMemo(() => ({ ...data.metrics, windowDays }), [data.metrics, windowDays]);

  const decideTopic = (topic: CurationTopic, status: TopicStatus) => {
    setTopics((prev) =>
      prev.map((t) =>
        t.market === topic.market && t.key === topic.key ? { ...t, status, decidedBy: "Ada Okafor" } : t,
      ),
    );
  };

  const toggleSource = (source: SourcePermission) => {
    setSources((prev) =>
      prev.map((s) =>
        s.source === source.source
          ? { ...s, approved: !s.approved, approvedBy: !s.approved ? "Ada Okafor" : s.approvedBy }
          : s,
      ),
    );
  };

  const addOntologyTerm = (categoryId: string, term: string, lang?: string) => {
    setOntology((prev) =>
      prev.map((c) => {
        if (c.id !== categoryId) return c;
        if (!lang) return { ...c, coreTerms: [...c.coreTerms, term] };
        const existing = c.localTerms[lang] ?? [];
        return { ...c, localTerms: { ...c.localTerms, [lang]: [...existing, term] } };
      }),
    );
  };

  const removeOntologyTerm = (categoryId: string, term: string, lang?: string) => {
    setOntology((prev) =>
      prev.map((c) => {
        if (c.id !== categoryId) return c;
        if (!lang) return { ...c, coreTerms: c.coreTerms.filter((x) => x !== term) };
        const existing = c.localTerms[lang] ?? [];
        return { ...c, localTerms: { ...c.localTerms, [lang]: existing.filter((x) => x !== term) } };
      }),
    );
  };

  const resolveReview = (review: PendingReview) => {
    setReviews((prev) => prev.filter((r) => r.sourceId !== review.sourceId));
  };

  const markGolden = (review: PendingReview) => {
    const entry: GoldenExample = {
      market: review.market,
      sourceId: review.sourceId,
      intent: review.intent,
      onTopic: review.onTopic ?? true,
      text: review.text,
      markedBy: "Ada Okafor",
      markedAt: new Date().toISOString(),
    };
    setGolden((prev) => [entry, ...prev]);
  };

  const removeGolden = (item: GoldenExample) => {
    setGolden((prev) => prev.filter((g) => g.sourceId !== item.sourceId));
  };

  const saveConfig = (next: ListeningConfig) => setConfig(next);

  const runReplay = (input: { market: string; at: string[]; overrides: Record<string, unknown> }) => {
    setReplayResults([
      {
        market: input.market,
        day: new Date().toISOString().slice(0, 10),
        candidateSignalCount: 7,
        comparedSignalCount: 5,
        agreementCount: 4,
        newSignals: [{ topic: "scalp_care", type: "trend_spike" }],
        missedSignals: [{ topic: "meal_prep", type: "unmet_need" }],
      },
    ]);
  };

  const reviewsForMarket = market ? reviews.filter((r) => r.market === market) : reviews;
  const goldenForMarket = market ? golden.filter((g) => g.market === market) : golden;

  return (
    <div>
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <p className="max-w-2xl text-[13.5px] text-muted-foreground">
          Topics, sources, review queue, golden datasets, offline replay and product metrics for the Listening
          Intelligence Platform — shared across every subscribed business, admin-only.
        </p>
        <div className="flex items-center gap-2">
          <Globe2 className="h-4 w-4 text-muted-foreground" />
          <SelectEl value={market} onChange={setMarket} className="min-w-50">
            <option value="">All markets ({data.markets.length})</option>
            {data.markets.map((m) => (
              <option key={m.key} value={m.key}>
                {m.label || m.key} {m.subscriberCount ? `· ${m.subscriberCount} subscribers` : ""}
              </option>
            ))}
          </SelectEl>
        </div>
      </div>

      <div className="mt-6 flex gap-1 overflow-x-auto border-b border-border">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 border-b-2 px-3.5 py-2.5 text-[13px] font-medium whitespace-nowrap transition-colors",
                isActive ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-5">
        {activeTab === "topics" && (
          <TopicsTab
            markets={data.markets}
            topics={topics}
            topicHistory={data.topicHistory}
            market={market}
            onDecide={decideTopic}
          />
        )}
        {activeTab === "sources" && <SourcesTab sources={sources} onToggle={toggleSource} />}
        {activeTab === "ontology" && (
          <OntologyTab categories={ontology} onAddTerm={addOntologyTerm} onRemoveTerm={removeOntologyTerm} />
        )}
        {activeTab === "settings" && <SettingsTab config={config} onSave={saveConfig} />}
        {activeTab === "reviews" && (
          <ReviewsTab reviews={reviewsForMarket} onResolve={resolveReview} onMarkGolden={markGolden} />
        )}
        {activeTab === "golden" && <GoldenTab items={goldenForMarket} onRemove={removeGolden} />}
        {activeTab === "replay" && (
          <ReplayTab markets={data.markets} market={market} results={replayResults} onRun={runReplay} />
        )}
        {activeTab === "metrics" && (
          <MetricsTab
            markets={data.markets}
            market={market}
            onMarketChange={setMarket}
            windowDays={windowDays}
            onWindowDaysChange={setWindowDays}
            metrics={metrics}
          />
        )}
      </div>
    </div>
  );
}
