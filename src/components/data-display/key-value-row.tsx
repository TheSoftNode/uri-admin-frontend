import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** A labelled setting or fact; rows separate by spacing and hover tint, not rules. */
export function KeyValueRow({
  label,
  description,
  children,
  className,
}: {
  label: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "-mx-3 flex items-center justify-between gap-6 rounded-xl px-3 py-3 transition-colors hover:bg-muted",
        className,
      )}
    >
      <div className="min-w-0">
        <div className="text-[13px] font-medium text-foreground">{label}</div>
        {description ? (
          <div className="mt-0.5 text-xs text-subtle-foreground">{description}</div>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-2 text-[13px] text-secondary-foreground">
        {children}
      </div>
    </div>
  );
}
