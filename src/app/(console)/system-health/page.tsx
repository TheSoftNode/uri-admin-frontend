import type { Metadata } from "next";

import { KpiGrid } from "@/components/data-display/kpi-grid";
import { getSystemHealth } from "@/features/system-health/api/get-system-health";
import { RequestVolumeCard } from "@/features/system-health/components/request-volume-card";
import { ServicesTable } from "@/features/system-health/components/services-table";

export const metadata: Metadata = { title: "System Health" };

export default async function SystemHealthPage() {
  const { kpis, requestVolume, services } = await getSystemHealth();

  return (
    <div className="flex flex-col gap-5">
      <KpiGrid items={kpis} />
      <RequestVolumeCard data={requestVolume} />
      <ServicesTable services={services} />
    </div>
  );
}
