import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PageToolbarProps {
  /** Filters, tabs or context on the left. */
  children?: ReactNode;
  /** Primary page actions on the right. */
  actions?: ReactNode;
  className?: string;
}

/** The first row of a page: page-level controls under the shared top bar. */
export function PageToolbar({ children, actions, className }: PageToolbarProps) {
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-3", className)}>
      <div className="flex min-w-0 flex-wrap items-center gap-3">{children}</div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}
