import type { Metadata } from "next";

import { KpiGrid } from "@/components/data-display/kpi-grid";
import { getAlerts } from "@/features/alerts/api/get-alerts";
import { AlertList } from "@/features/alerts/components/alert-list";

export const metadata: Metadata = { title: "Platform Alerts" };

export default async function AlertsPage() {
  const { kpis, alerts } = await getAlerts();

  return (
    <div className="flex flex-col gap-5">
      <KpiGrid items={kpis} />
      <AlertList alerts={alerts} />
    </div>
  );
}
