"use client";

import { motion } from "framer-motion";

import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface Bar {
  label: string;
  value: number;
  display: string;
}

interface BarChartProps {
  data: Bar[];
  height?: number;
  ariaLabel: string;
  className?: string;
}

/** Vertical bars that rise in sequence; the latest bar carries the full brand colour. */
export function BarChart({ data, height = 140, ariaLabel, className }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div role="img" aria-label={ariaLabel} className={cn("flex flex-col gap-2.5", className)}>
      <div className="flex items-end gap-2.5" style={{ height }}>
        {data.map((bar, index) => {
          const isLatest = index === data.length - 1;
          return (
            <div key={bar.label} className="group relative flex h-full flex-1 items-end">
              <motion.div
                className={cn(
                  "w-full origin-bottom rounded-lg",
                  isLatest ? "bg-linear-to-t from-brand-deep to-brand-vivid" : "bg-brand/25",
                )}
                style={{ height: `${(bar.value / max) * 100}%` }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: duration.slow, delay: index * 0.06, ease: ease.out }}
              />
              <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-foreground px-1.5 py-0.5 font-mono text-[10px] text-background opacity-0 transition-opacity group-hover:opacity-100">
                {bar.display}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2.5">
        {data.map((bar, index) => (
          <span
            key={bar.label}
            className={cn(
              "flex-1 text-center font-mono text-[10px] tracking-wider text-subtle-foreground uppercase",
              index === data.length - 1 && "font-semibold text-brand",
            )}
          >
            {bar.label}
          </span>
        ))}
      </div>
    </div>
  );
}
