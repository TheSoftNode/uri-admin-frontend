import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { systemHealthFixture } from "@/features/system-health/data/system-health.fixtures";
import type { SystemHealthPageData } from "@/features/system-health/types";
import { cacheTags } from "@/lib/api/cache";

export async function getSystemHealth(): Promise<SystemHealthPageData> {
  "use cache";
  cacheLife("seconds");
  cacheTag(cacheTags.systemHealth);

  // TODO(api): replace with `GET /admin/health` (service probes + request metrics).
  return systemHealthFixture;
}
