import type { Metadata } from "next";

import { getCampaigns } from "@/features/campaigns/api/get-campaigns";
import { CampaignsConsole } from "@/features/campaigns/components/campaigns-console";

export const metadata: Metadata = { title: "Campaigns" };

export default async function CampaignsPage() {
  const data = await getCampaigns();

  return <CampaignsConsole data={data} />;
}
