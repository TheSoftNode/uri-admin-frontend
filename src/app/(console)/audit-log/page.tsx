import { Fingerprint } from "lucide-react";
import type { Metadata } from "next";

import { Callout } from "@/components/data-display/callout";
import { getAuditLog } from "@/features/audit-log/api/get-audit-log";
import { AuditStatsPanel } from "@/features/audit-log/components/audit-stats";
import { AuditTimeline } from "@/features/audit-log/components/audit-timeline";

export const metadata: Metadata = { title: "Audit Log" };

export default async function AuditLogPage() {
  const { entries } = await getAuditLog();

  return (
    <div className="flex flex-col gap-5">
      <Callout tone="neutral" icon={Fingerprint}>
        Every credit adjustment, subscription override, admin grant and moderation action — who did
        it, to whom, and when. Nothing an admin does to a user&apos;s account happens without a row
        here; this is the record if anyone ever asks why an account looks the way it does.
      </Callout>
      <AuditStatsPanel entries={entries} />
      <AuditTimeline entries={entries} />
    </div>
  );
}
