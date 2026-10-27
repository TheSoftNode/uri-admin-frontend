import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { profileFixture } from "@/features/profile/data/profile.fixtures";
import type { ProfilePageData } from "@/features/profile/types";
import { cacheTags } from "@/lib/api/cache";

export async function getProfile(): Promise<ProfilePageData> {
  "use cache";
  cacheLife("minutes");
  cacheTag(cacheTags.profile);

  // TODO(api): replace with `GET /api/admin/me` (checkIsAdmin's own endpoint
  // already returns is_admin; this would extend it with device/session data).
  return profileFixture;
}
