import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { playbooksFixture } from "@/features/playbooks/data/playbooks.fixtures";
import type { PlaybooksPageData } from "@/features/playbooks/types";
import { cacheTags } from "@/lib/api/cache";

export async function getPlaybooks(): Promise<PlaybooksPageData> {
  "use cache";
  cacheLife("minutes");
  cacheTag(cacheTags.playbooks);

  // TODO(api): replace with `GET /admin/playbooks` (read-only support view).
  return playbooksFixture;
}
