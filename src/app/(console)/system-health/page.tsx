import type { Metadata } from "next";

import { getSystemHealth } from "@/features/system-health/api/get-system-health";
import { RequestVolumeCard } from "@/features/system-health/components/request-volume-card";
import { ServicesTable } from "@/features/system-health/components/services-table";
import { SystemHealthStatsPanel } from "@/features/system-health/components/system-health-stats";
import { criticalCount } from "@/features/system-health/lib";

export const metadata: Metadata = { title: "System Health" };

/** cacheLife("seconds") keeps this near real-time, below the instant-prefetch
 * window — intentional; see node_modules/next/dist/docs/.../instant-navigation.md. */
export const instant = false;

export default async function SystemHealthPage() {
  const { stats, requestVolume, services } = await getSystemHealth();

  return (
    <div className="flex flex-col gap-5">
      <SystemHealthStatsPanel stats={stats} criticalCount={criticalCount(services)} />
      <RequestVolumeCard data={requestVolume} />
      <ServicesTable services={services} />
    </div>
  );
}
