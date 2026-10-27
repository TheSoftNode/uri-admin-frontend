import { Info, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { Tone } from "@/types/tone";

const toneStyles: Record<Tone, string> = {
  neutral: "bg-muted text-secondary-foreground [&_svg]:text-muted-foreground",
  brand: "bg-brand-soft text-secondary-foreground [&_svg]:text-brand",
  info: "bg-info-soft text-secondary-foreground [&_svg]:text-info",
  success: "bg-success-soft text-secondary-foreground [&_svg]:text-success",
  warning: "bg-warning-soft text-secondary-foreground [&_svg]:text-warning",
  critical: "bg-critical-soft text-secondary-foreground [&_svg]:text-critical",
};

interface CalloutProps {
  tone?: Tone;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}

/** Contextual note at the top of a page — how the data behaves, what it can't show. */
export function Callout({ tone = "info", icon: Icon = Info, children, className }: CalloutProps) {
  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-3 rounded-2xl px-4 py-3.5 text-[13px] leading-relaxed",
        toneStyles[tone],
        className,
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0" strokeWidth={2} />
      <div className="min-w-0">{children}</div>
    </div>
  );
}

/** Inline code token inside callouts and descriptions. */
export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md bg-card/70 px-1.5 py-0.5 font-mono text-[11.5px] text-foreground">
      {children}
    </code>
  );
}
