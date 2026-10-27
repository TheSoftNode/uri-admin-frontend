"use client";

import { EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Callout } from "@/components/data-display/callout";
import { InboxConnectionsTable } from "@/features/inbox/components/inbox-connections-table";
import { InboxStatsPanel } from "@/features/inbox/components/inbox-stats";
import type { InboxPageData } from "@/features/inbox/types";

export function InboxConsole({ data }: { data: InboxPageData }) {
  const [notifiedIds, setNotifiedIds] = useState<Set<string>>(new Set());

  return (
    <div className="flex flex-col gap-5">
      <Callout tone="info" icon={EyeOff}>
        Message content is never visible to platform admins. Unanswered and priority alerts route to
        each business&apos;s own team — nothing escalates here by design. This page shows connection
        health and AI safety-guard activity only.
      </Callout>
      <InboxStatsPanel stats={data.stats} />
      <InboxConnectionsTable
        connections={data.connections}
        notifiedIds={notifiedIds}
        onNotify={(id) => {
          setNotifiedIds((prev) => new Set(prev).add(id));
          toast.success("Business notified to reconnect.");
        }}
      />
    </div>
  );
}
