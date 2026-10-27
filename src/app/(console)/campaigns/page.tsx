import { Hand } from "lucide-react";
import type { Metadata } from "next";

import { Callout, Code } from "@/components/data-display/callout";
import { KpiGrid } from "@/components/data-display/kpi-grid";
import { getCampaigns } from "@/features/campaigns/api/get-campaigns";
import { CampaignPlansTable } from "@/features/campaigns/components/campaign-plans-table";

export const metadata: Metadata = { title: "Campaigns" };

export default async function CampaignsPage() {
  const { kpis, plans } = await getCampaigns();

  return (
    <div className="flex flex-col gap-5">
      <Callout tone="brand" icon={Hand}>
        Campaigns only go live through an explicit human <Code>Launch</Code> action in Jane Ads —
        there is no background job that spends automatically. <Code>LaunchResult.launched</Code>{" "}
        only ever flips to true from that click.
      </Callout>
      <KpiGrid items={kpis} />
      <CampaignPlansTable plans={plans} />
    </div>
  );
}
