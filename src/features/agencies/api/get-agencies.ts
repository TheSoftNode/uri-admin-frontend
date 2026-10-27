import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { agenciesFixture } from "@/features/agencies/data/agencies.fixtures";
import type { AgenciesPageData } from "@/features/agencies/types";
import { cacheTags } from "@/lib/api/cache";

export async function getAgencies(): Promise<AgenciesPageData> {
  "use cache";
  cacheLife("minutes");
  cacheTag(cacheTags.agencies);

  // TODO(api): replace with `GET /admin/agencies`.
  return agenciesFixture;
}
