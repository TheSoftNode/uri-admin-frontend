import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { alertsFixture } from "@/features/alerts/data/alerts.fixtures";
import type { AlertsPageData } from "@/features/alerts/types";
import { cacheTags } from "@/lib/api/cache";

export async function getAlerts(): Promise<AlertsPageData> {
  "use cache";
  cacheLife("seconds");
  cacheTag(cacheTags.alerts);

  // TODO(api): replace with `GET /api/admin/alerts?include_dismissed=true`;
  // dismiss via `POST /api/admin/alerts/{kind}/dismiss`.
  return alertsFixture;
}
