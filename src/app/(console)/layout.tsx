import { AppSidebar } from "@/components/layout/app-sidebar";
import { Topbar } from "@/components/layout/topbar";
import { getNotifications } from "@/features/notifications/api/get-notifications";
import { NotificationsProvider } from "@/features/notifications/notifications-provider";

/**
 * Notifications use a short (seconds) cache life so the bell stays near
 * real-time, which falls below Cache Components' instant-prefetch window —
 * an intentional freshness-over-prefetch tradeoff, not an oversight. See
 * node_modules/next/dist/docs/.../instant-navigation.md#opting-out.
 */
export const instant = false;

/**
 * Console shell. The viewport is locked (`h-dvh overflow-hidden`); only the
 * content column scrolls, so the sidebar never moves with the page.
 */
export default async function ConsoleLayout({ children }: { children: React.ReactNode }) {
  const { notifications } = await getNotifications();

  return (
    <NotificationsProvider initial={notifications}>
      <div className="flex h-dvh overflow-hidden bg-background">
        <AppSidebar className="hidden lg:flex" />
        <div className="flex min-w-0 flex-1 flex-col overflow-y-auto overscroll-contain">
          <Topbar />
          <main className="mx-auto w-full max-w-[1480px] flex-1 px-4 pt-3 pb-14 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </NotificationsProvider>
  );
}
