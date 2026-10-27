import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { overviewFixture } from "@/features/overview/data/overview.fixtures";
import type { OverviewData } from "@/features/overview/types";
import { cacheTags } from "@/lib/api/cache";

export async function getOverview(): Promise<OverviewData> {
  "use cache";
  cacheLife("minutes");
  cacheTag(cacheTags.overview);

  // TODO(api): replace with `GET /admin/overview` once the backend endpoint ships.
  return overviewFixture;
}
