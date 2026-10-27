import type { ReactNode } from "react";

import { toneText } from "@/lib/tone";
import { cn } from "@/lib/utils";
import type { Tone } from "@/types/tone";

interface StatCardProps {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  tone?: Tone;
  className?: string;
}

export function StatCard({ label, value, hint, tone = "neutral", className }: StatCardProps) {
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-2xl border bg-card p-5 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-float",
        className,
      )}
    >
      <p className="text-[12px] font-semibold text-muted-foreground">{label}</p>
      <div className="flex flex-col gap-1.5">
        <p
          className={cn(
            "font-mono text-[26px] leading-none font-semibold tracking-tight tabular",
            toneText[tone],
          )}
        >
          {value}
        </p>
        {hint ? <p className="text-xs text-subtle-foreground">{hint}</p> : null}
      </div>
    </div>
  );
}
