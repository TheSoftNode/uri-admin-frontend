import { AppSidebar } from "@/components/layout/app-sidebar";
import { Topbar } from "@/components/layout/topbar";

/**
 * Console shell. The viewport is locked (`h-dvh overflow-hidden`); only the
 * content column scrolls, so the sidebar never moves with the page.
 */
export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <AppSidebar className="hidden lg:flex" />
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto overscroll-contain">
        <Topbar />
        <main className="mx-auto w-full max-w-[1480px] flex-1 px-4 pt-3 pb-14 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
