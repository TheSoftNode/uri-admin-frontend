"use client";

import { useState } from "react";
import { toast } from "sonner";

import { AdPlatformsStatsPanel } from "@/features/ad-platforms/components/ad-platforms-stats";
import { ConnectionsTable } from "@/features/ad-platforms/components/connections-table";
import type { AdPlatformsPageData } from "@/features/ad-platforms/types";

export function AdPlatformsConsole({ data }: { data: AdPlatformsPageData }) {
  const [notifiedIds, setNotifiedIds] = useState<Set<string>>(new Set());

  return (
    <div className="flex flex-col gap-5">
      <AdPlatformsStatsPanel stats={data.stats} />
      <ConnectionsTable
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
