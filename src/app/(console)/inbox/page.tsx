import { EyeOff } from "lucide-react";
import type { Metadata } from "next";

import { Callout } from "@/components/data-display/callout";
import { KpiGrid } from "@/components/data-display/kpi-grid";
import { getInbox } from "@/features/inbox/api/get-inbox";
import { InboxConnectionsTable } from "@/features/inbox/components/inbox-connections-table";

export const metadata: Metadata = { title: "Unified Inbox" };

export default async function InboxPage() {
  const { kpis, connections } = await getInbox();

  return (
    <div className="flex flex-col gap-5">
      <Callout tone="info" icon={EyeOff}>
        Message content is never visible to platform admins. Unanswered and priority alerts route to
        each business&apos;s own team — nothing escalates here by design. This page shows connection
        health and AI safety-guard activity only.
      </Callout>
      <KpiGrid items={kpis} />
      <InboxConnectionsTable connections={connections} />
    </div>
  );
}
