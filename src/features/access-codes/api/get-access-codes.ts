import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import {
  accessCodeRedemptionsFixture,
  accessCodesFixture,
} from "@/features/access-codes/data/access-codes.fixtures";
import type { AccessCodesPageData } from "@/features/access-codes/types";
import { cacheTags } from "@/lib/api/cache";

export async function getAccessCodes(): Promise<AccessCodesPageData> {
  "use cache";
  cacheLife("minutes");
  cacheTag(cacheTags.accessCodes);

  // TODO(api): replace with `GET /api/admin/access-codes`; redemptions per
  // code come from `GET /api/admin/access-codes/{code}/redemptions`, fetched
  // on demand rather than bundled once this is wired to the real backend.
  return { codes: accessCodesFixture, redemptionsByCode: accessCodeRedemptionsFixture };
}
