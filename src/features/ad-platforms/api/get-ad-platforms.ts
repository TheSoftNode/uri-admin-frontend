import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { adPlatformsFixture } from "@/features/ad-platforms/data/ad-platforms.fixtures";
import type { AdPlatformsPageData } from "@/features/ad-platforms/types";
import { cacheTags } from "@/lib/api/cache";

export async function getAdPlatforms(): Promise<AdPlatformsPageData> {
  "use cache";
  cacheLife("minutes");
  cacheTag(cacheTags.adPlatforms);

  // TODO(api): replace with `GET /admin/ad-connections`.
  return adPlatformsFixture;
}
