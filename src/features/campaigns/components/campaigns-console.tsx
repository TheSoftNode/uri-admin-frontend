"use client";

import { Hand } from "lucide-react";
import { useState } from "react";

import { Callout, Code } from "@/components/data-display/callout";
import { CampaignDetailSheet } from "@/features/campaigns/components/campaign-detail-sheet";
import { CampaignPlansTable } from "@/features/campaigns/components/campaign-plans-table";
import { CampaignsStatsPanel } from "@/features/campaigns/components/campaigns-stats";
import type { CampaignPlan, CampaignsPageData } from "@/features/campaigns/types";

export function CampaignsConsole({ data }: { data: CampaignsPageData }) {
  const [plans, setPlans] = useState(data.plans);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const selectedPlan = plans.find((plan) => plan.id === selectedId) ?? null;

  return (
    <div className="flex flex-col gap-5">
      <Callout tone="brand" icon={Hand}>
        Campaigns only go live through an explicit human <Code>Launch</Code> action in Jane Ads —
        there is no background job that spends automatically. <Code>LaunchResult.launched</Code>{" "}
        only ever flips to true from that click.
      </Callout>
      <CampaignsStatsPanel stats={data.stats} />
      <CampaignPlansTable
        plans={plans}
        onView={(plan) => {
          setSelectedId(plan.id);
          setSheetOpen(true);
        }}
      />

      <CampaignDetailSheet
        plan={selectedPlan}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onToggleFlag={(planId, flagged) => {
          setPlans((prev) =>
            prev.map((plan): CampaignPlan =>
              plan.id === planId ? { ...plan, flaggedForReview: flagged } : plan,
            ),
          );
        }}
      />
    </div>
  );
}
