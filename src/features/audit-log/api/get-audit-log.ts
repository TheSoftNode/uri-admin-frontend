import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { auditLogFixture } from "@/features/audit-log/data/audit-log.fixtures";
import type { AuditLogPageData } from "@/features/audit-log/types";
import { cacheTags } from "@/lib/api/cache";

export async function getAuditLog(): Promise<AuditLogPageData> {
  "use cache";
  cacheLife("seconds");
  cacheTag(cacheTags.auditLog);

  // TODO(api): replace with `GET /admin/audit-log?range=7d` (cursor-paginated).
  return auditLogFixture;
}
