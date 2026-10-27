import { getInitials } from "@/lib/format";
import { cn } from "@/lib/utils";

interface EntityCellProps {
  name: string;
  meta?: string;
  /** Show an initials avatar before the name. */
  avatar?: boolean;
  className?: string;
}

/** Primary identity cell for table rows: name, optional avatar and secondary line. */
export function EntityCell({ name, meta, avatar = false, className }: EntityCellProps) {
  return (
    <div className={cn("flex min-w-0 items-center gap-3", className)}>
      {avatar ? (
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[10.5px] font-bold text-brand">
          {getInitials(name)}
        </span>
      ) : null}
      <div className="min-w-0">
        <p className="truncate font-semibold text-foreground">{name}</p>
        {meta ? <p className="truncate text-xs text-subtle-foreground">{meta}</p> : null}
      </div>
    </div>
  );
}
