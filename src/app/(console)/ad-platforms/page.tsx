import type { Metadata } from "next";

import { KpiGrid } from "@/components/data-display/kpi-grid";
import { getAdPlatforms } from "@/features/ad-platforms/api/get-ad-platforms";
import { ConnectionsTable } from "@/features/ad-platforms/components/connections-table";

export const metadata: Metadata = { title: "Ad Platforms" };

export default async function AdPlatformsPage() {
  const { kpis, connections } = await getAdPlatforms();

  return (
    <div className="flex flex-col gap-5">
      <KpiGrid items={kpis} />
      <ConnectionsTable connections={connections} />
    </div>
  );
}
