import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { toneText } from "@/lib/tone";
import { cn } from "@/lib/utils";
import type { Tone } from "@/types/tone";

interface StatCardProps {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  tone?: Tone;
  /** Optional leading icon badge, tinted to `tone`. */
  icon?: LucideIcon;
  className?: string;
}

export function StatCard({ label, value, hint, tone = "neutral", icon: Icon, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col gap-3.5 overflow-hidden rounded-2xl border bg-card p-5 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-float",
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        {Icon ? (
          <span
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft",
              toneText[tone],
            )}
          >
            <Icon className="size-4" />
          </span>
        ) : null}
        <p className="text-[12px] font-semibold text-muted-foreground">{label}</p>
      </div>
      <p
        className={cn(
          "font-mono text-[26px] leading-none font-semibold tracking-tight tabular",
          toneText[tone],
        )}
      >
        {value}
      </p>
      {hint ? <p className="-mt-1 text-xs text-subtle-foreground">{hint}</p> : null}
    </div>
  );
}
