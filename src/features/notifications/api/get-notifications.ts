import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { notificationsFixture } from "@/features/notifications/data/notifications.fixtures";
import type { NotificationsPageData } from "@/features/notifications/types";
import { cacheTags } from "@/lib/api/cache";

export async function getNotifications(): Promise<NotificationsPageData> {
  "use cache";
  cacheLife("seconds");
  cacheTag(cacheTags.notifications);

  // TODO(api): replace with `GET /api/admin/notifications` — likely an
  // aggregation layer over the other admin endpoints' own unread/urgent
  // items (alerts, moderation queue, ad-platform/inbox token health, etc.)
  // rather than a dedicated notifications table.
  return { notifications: notificationsFixture };
}
