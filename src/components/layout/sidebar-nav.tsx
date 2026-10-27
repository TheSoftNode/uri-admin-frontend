"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation, type NavItem } from "@/config/navigation";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
  /** Distinguishes the desktop and drawer instances so their indicators animate independently. */
  layoutScope: string;
  onNavigate?: () => void;
}

export function SidebarNav({ layoutScope, onNavigate }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Console sections" className="flex flex-col gap-6">
      {navigation.map((group) => (
        <div key={group.label} className="flex flex-col gap-0.5">
          <p className="px-3 pb-2 text-[10px] font-bold tracking-[0.09em] text-subtle-foreground uppercase">
            {group.label}
          </p>
          {group.items.map((item) => (
            <SidebarNavLink
              key={item.href}
              item={item}
              active={pathname === item.href || pathname.startsWith(`${item.href}/`)}
              layoutScope={layoutScope}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ))}
    </nav>
  );
}

interface SidebarNavLinkProps {
  item: NavItem;
  active: boolean;
  layoutScope: string;
  onNavigate?: () => void;
}

function SidebarNavLink({ item, active, layoutScope, onNavigate }: SidebarNavLinkProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onNavigate={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex h-9 items-center gap-3 rounded-xl px-3 text-[13px] font-medium text-sidebar-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/30",
        active && "font-semibold text-sidebar-accent-foreground",
      )}
    >
      {active ? (
        <motion.span
          layoutId={`${layoutScope}-active`}
          transition={spring}
          className="absolute inset-0 rounded-xl bg-sidebar-accent"
          aria-hidden
        >
          <span className="absolute top-2 bottom-2 -left-3 w-[3px] rounded-r-full bg-sidebar-primary" />
        </motion.span>
      ) : (
        <span
          className="absolute inset-0 rounded-xl bg-accent opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden
        />
      )}
      <Icon
        className={cn(
          "relative size-[16px] shrink-0 transition-colors",
          active ? "text-sidebar-primary" : "text-subtle-foreground group-hover:text-foreground",
        )}
        strokeWidth={1.9}
      />
      <span className="relative truncate">{item.title}</span>
    </Link>
  );
}
