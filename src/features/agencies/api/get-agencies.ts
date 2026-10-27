import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { agenciesFixture, agenciesStatsFixture } from "@/features/agencies/data/agencies.fixtures";
import type { AgenciesPageData } from "@/features/agencies/types";
import { cacheTags } from "@/lib/api/cache";

export async function getAgencies(): Promise<AgenciesPageData> {
  "use cache";
  cacheLife("minutes");
  cacheTag(cacheTags.agencies);

  // TODO(api): the real agency_router.py is self-service, scoped to the
  // caller's own agency (GET/PATCH /agency, /agency/wallet/topup, /agency/settings)
  // — there's no platform-admin "list every agency" surface yet. This needs a
  // new admin-scoped router over AgencyService/AgencyCreditService before it's live.
  return { stats: agenciesStatsFixture, agencies: agenciesFixture };
}
