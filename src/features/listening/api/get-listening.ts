import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { listeningFixture } from "@/features/listening/data/listening.fixtures";
import type { ListeningPageData } from "@/features/listening/types";
import { cacheTags } from "@/lib/api/cache";

export async function getListening(): Promise<ListeningPageData> {
  "use cache";
  cacheLife("minutes");
  cacheTag(cacheTags.listening);

  // TODO(api): replace with the MI curation endpoints (review queue + metrics.py output).
  return listeningFixture;
}
