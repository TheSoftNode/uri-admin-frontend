import type { Metadata } from "next";

import { getAlerts } from "@/features/alerts/api/get-alerts";
import { AlertsConsole } from "@/features/alerts/components/alerts-console";

export const metadata: Metadata = { title: "Platform Alerts" };

/** cacheLife("seconds") keeps this near real-time, below the instant-prefetch
 * window — intentional; see node_modules/next/dist/docs/.../instant-navigation.md. */
export const instant = false;

export default async function AlertsPage() {
  const data = await getAlerts();

  return <AlertsConsole data={data} />;
}
