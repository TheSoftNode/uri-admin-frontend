import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { accessCodesFixture } from "@/features/access-codes/data/access-codes.fixtures";
import type { AccessCodesPageData } from "@/features/access-codes/types";
import { cacheTags } from "@/lib/api/cache";

export async function getAccessCodes(): Promise<AccessCodesPageData> {
  "use cache";
  cacheLife("minutes");
  cacheTag(cacheTags.accessCodes);

  // TODO(api): replace with `GET /admin/access-codes`.
  return accessCodesFixture;
}
