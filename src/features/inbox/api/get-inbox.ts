import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { inboxFixture } from "@/features/inbox/data/inbox.fixtures";
import type { InboxPageData } from "@/features/inbox/types";
import { cacheTags } from "@/lib/api/cache";

export async function getInbox(): Promise<InboxPageData> {
  "use cache";
  cacheLife("minutes");
  cacheTag(cacheTags.inbox);

  // TODO(api): replace with `GET /admin/inbox/connections` (health only, never message content).
  return inboxFixture;
}
