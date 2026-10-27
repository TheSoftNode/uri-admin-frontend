"use client";

import { BookOpen, FlaskConical, Gauge, Globe2, Inbox, Settings2, ShieldCheck, Star, Tags } from "lucide-react";
import { useMemo, useState } from "react";

import { PageToolbar } from "@/components/layout/page-toolbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  ListeningTabDef,
  PendingReview,
  ReplayResult,
  SourcePermission,
  TopicStatus,
} from "@/features/listening/types";

const TABS: ListeningTabDef[] = [
  { id: "topics", label: "Topics", icon: Tags },
  { id: "sources", label: "Sources", icon: ShieldCheck },
  { id: "ontology", label: "Ontology", icon: BookOpen },
  { id: "settings", label: "Settings", icon: Settings2 },
  { id: "reviews", label: "Review queue", icon: Inbox },
  { id: "golden", label: "Golden sets", icon: Star },
  { id: "replay", label: "Replay", icon: FlaskConical },
  { id: "metrics", label: "Metrics", icon: Gauge },
];

/**
 * Client-side console shell: holds tab and market-filter state, and applies
 * every tab's mutation to its own local copy of the fixture data (toast
 * feedback, no persistence) — the same shape a real mutation will fill in
 * once each tab is wired to its endpoint.
 */
export function ListeningConsole({ data }: { data: ListeningPageData }) {
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
        t.market === topic.market && t.key === topic.key
          ? { ...t, status, decidedBy: "Ada Okafor" }
          : t,
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
        if (!lang) return { ...c, coreTerms: c.coreTerms.filter((t) => t !== term) };
        const existing = c.localTerms[lang] ?? [];
        return { ...c, localTerms: { ...c.localTerms, [lang]: existing.filter((t) => t !== term) } };
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
    <Tabs defaultValue="topics" className="gap-5">
      <PageToolbar
        actions={
          <div className="flex items-center gap-2">
            <Globe2 className="size-4 text-muted-foreground" />
            <Select value={market || "all"} onValueChange={(v) => setMarket(v === "all" ? "" : v)}>
              <SelectTrigger size="sm" className="min-w-52">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All markets ({data.markets.length})</SelectItem>
                {data.markets.map((m) => (
                  <SelectItem key={m.key} value={m.key}>
                    {m.label}
                    {m.subscriberCount ? ` · ${m.subscriberCount} subscribers` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        }
      >
        <div className="w-full overflow-x-auto">
          <TabsList>
            {TABS.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                <tab.icon /> {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </PageToolbar>

      <TabsContent value="topics">
        <TopicsTab
          markets={data.markets}
          topics={topics}
          topicHistory={data.topicHistory}
          market={market}
          onDecide={decideTopic}
        />
      </TabsContent>
      <TabsContent value="sources">
        <SourcesTab sources={sources} onToggle={toggleSource} />
      </TabsContent>
      <TabsContent value="ontology">
        <OntologyTab categories={ontology} onAddTerm={addOntologyTerm} onRemoveTerm={removeOntologyTerm} />
      </TabsContent>
      <TabsContent value="settings">
        <SettingsTab config={config} onSave={saveConfig} />
      </TabsContent>
      <TabsContent value="reviews">
        <ReviewsTab reviews={reviewsForMarket} onResolve={resolveReview} onMarkGolden={markGolden} />
      </TabsContent>
      <TabsContent value="golden">
        <GoldenTab items={goldenForMarket} onRemove={removeGolden} />
      </TabsContent>
      <TabsContent value="replay">
        <ReplayTab markets={data.markets} market={market} results={replayResults} onRun={runReplay} />
      </TabsContent>
      <TabsContent value="metrics">
        <MetricsTab
          markets={data.markets}
          market={market}
          onMarketChange={setMarket}
          windowDays={windowDays}
          onWindowDaysChange={setWindowDays}
          metrics={metrics}
        />
      </TabsContent>
    </Tabs>
  );
}
