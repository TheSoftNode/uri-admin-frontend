"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { findNavItem } from "@/config/navigation";
import { duration, ease } from "@/lib/motion";

/** Page title and context, derived from the navigation config for the active route. */
export function TopbarTitle() {
  const pathname = usePathname();
  const item = findNavItem(pathname);

  return (
    <div className="relative min-w-0">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={item?.href ?? pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: duration.fast, ease: ease.out }}
          className="flex min-w-0 items-baseline gap-3"
        >
          <h1 className="truncate font-serif text-[22px] font-semibold tracking-tight text-foreground italic sm:text-2xl">
            {item?.title ?? "Console"}
          </h1>
          {item?.description ? (
            <span className="hidden items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground md:inline-flex">
              {item.href === "/overview" || item.href === "/system-health" ? (
                <span className="size-1.5 rounded-full bg-success" aria-hidden />
              ) : null}
              {item.description}
            </span>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
