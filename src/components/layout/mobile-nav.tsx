"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

import { BrandMark } from "@/components/layout/brand-mark";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { SidebarUser } from "@/components/layout/sidebar-user";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

/** Below `lg` the sidebar becomes a drawer opened from the top bar. */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] gap-0 bg-sidebar p-0">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <div className="px-5 pt-6 pb-5">
          <BrandMark />
        </div>
        <ScrollArea className="min-h-0 flex-1 px-3">
          <div className="pb-4">
            <SidebarNav layoutScope="drawer" onNavigate={() => setOpen(false)} />
          </div>
        </ScrollArea>
        <div className="p-3">
          <SidebarUser />
        </div>
      </SheetContent>
    </Sheet>
  );
}
