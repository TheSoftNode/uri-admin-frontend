import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { usersFixture, usersStatsFixture } from "@/features/users/data/users.fixtures";
import type { UsersPageData } from "@/features/users/types";
import { cacheTags } from "@/lib/api/cache";

export async function getUsers(): Promise<UsersPageData> {
  "use cache";
  cacheLife("minutes");
  cacheTag(cacheTags.users);

  // TODO(api): replace with `GET /api/admin/stats` + `GET /api/admin/users`.
  return { stats: usersStatsFixture, users: usersFixture };
}
