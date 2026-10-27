import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

/** Dashed-border placeholder for a section with nothing in it yet. */
export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2.5 rounded-2xl border border-dashed px-6 py-14 text-center">
      <div className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Icon className="size-5" />
      </div>
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="max-w-sm text-[13px] text-muted-foreground">{description}</p>
      {action}
    </div>
  );
}
