import { GlobalSearch } from "@/components/layout/global-search";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NotificationsButton } from "@/components/layout/notifications-button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { TopbarTitle } from "@/components/layout/topbar-title";
import { UserMenu } from "@/components/layout/user-menu";

/** Sticky within the scrolling content column, translucent over content. */
export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-[68px] shrink-0 items-center justify-between gap-4 bg-topbar px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-2">
        <MobileNav />
        <TopbarTitle />
      </div>
      <div className="flex shrink-0 items-center gap-2.5">
        <GlobalSearch />
        <ThemeToggle />
        <NotificationsButton />
        <UserMenu />
      </div>
    </header>
  );
}
