import type { Metadata } from "next";

import { KpiGrid } from "@/components/data-display/kpi-grid";
import { PageToolbar } from "@/components/layout/page-toolbar";
import { getListening } from "@/features/listening/api/get-listening";
import { CurationCardsTable } from "@/features/listening/components/curation-cards-table";
import { CurationTabs } from "@/features/listening/components/curation-tabs";
import { LearningLoopCard } from "@/features/listening/components/learning-loop-card";

export const metadata: Metadata = { title: "Listening Curation" };

export default async function ListeningPage() {
  const { kpis, cards, metrics } = await getListening();

  return (
    <div className="flex flex-col gap-5">
      <PageToolbar>
        <CurationTabs />
      </PageToolbar>
      <KpiGrid items={kpis} />
      <CurationCardsTable cards={cards} />
      <LearningLoopCard metrics={metrics} />
    </div>
  );
}
