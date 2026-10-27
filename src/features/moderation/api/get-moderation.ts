import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { moderationFixture } from "@/features/moderation/data/moderation.fixtures";
import type { ModerationPageData } from "@/features/moderation/types";
import { cacheTags } from "@/lib/api/cache";

export async function getModeration(): Promise<ModerationPageData> {
  "use cache";
  cacheLife("minutes");
  cacheTag(cacheTags.moderation);

  // TODO(api): replace with `GET /admin/moderation/queue` and `/admin/moderation/stats`.
  return moderationFixture;
}
