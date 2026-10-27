import type { Metadata } from "next";

import { getAlerts } from "@/features/alerts/api/get-alerts";
import { AlertsConsole } from "@/features/alerts/components/alerts-console";

export const metadata: Metadata = { title: "Platform Alerts" };

export default async function AlertsPage() {
  const data = await getAlerts();

  return <AlertsConsole data={data} />;
}
