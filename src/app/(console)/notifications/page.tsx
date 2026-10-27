import type { Metadata } from "next";

import { NotificationsConsole } from "@/features/notifications/components/notifications-console";

export const metadata: Metadata = { title: "Notifications" };

/** Reads from NotificationsProvider (cacheLife("seconds") upstream) rather
 * than fetching its own data — intentionally not instant-prefetch eligible;
 * see node_modules/next/dist/docs/.../instant-navigation.md. */
export const instant = false;

export default function NotificationsPage() {
  return <NotificationsConsole />;
}
