import { BrandMark } from "@/components/layout/brand-mark";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { SidebarUser } from "@/components/layout/sidebar-user";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

/**
 * Desktop sidebar. It is a sibling of the scrolling content column (not inside
 * it), so it stays fixed while pages scroll. Long navigation scrolls on its own.
 */
export function AppSidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "h-full w-[248px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar",
        className,
      )}
    >
      <div className="px-5 pt-6 pb-5">
        <BrandMark />
      </div>
      <ScrollArea className="min-h-0 flex-1 px-3">
        <div className="pb-4">
          <SidebarNav layoutScope="sidebar" />
        </div>
      </ScrollArea>
      <div className="p-3">
        <SidebarUser />
      </div>
    </aside>
  );
}
