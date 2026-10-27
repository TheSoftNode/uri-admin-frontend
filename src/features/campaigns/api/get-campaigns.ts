import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { campaignsFixture } from "@/features/campaigns/data/campaigns.fixtures";
import type { CampaignsPageData } from "@/features/campaigns/types";
import { cacheTags } from "@/lib/api/cache";

export async function getCampaigns(): Promise<CampaignsPageData> {
  "use cache";
  cacheLife("minutes");
  cacheTag(cacheTags.campaigns);

  // TODO(api): replace with `GET /admin/jane-ads/plans`.
  return campaignsFixture;
}
