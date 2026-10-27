import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { settingsFixture } from "@/features/settings/data/settings.fixtures";
import type { SettingsPageData } from "@/features/settings/types";
import { cacheTags } from "@/lib/api/cache";

export async function getSettings(): Promise<SettingsPageData> {
  "use cache";
  cacheLife("minutes");
  cacheTag(cacheTags.settings);

  // TODO(api): replace with `GET /admin/settings`.
  return settingsFixture;
}
