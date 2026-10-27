"use client";

import { motion } from "framer-motion";

import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface Segment {
  label: string;
  value: number;
  /** Any CSS colour, typically a chart token: var(--chart-1). */
  color: string;
}

interface SegmentedBarProps {
  segments: Segment[];
  className?: string;
}

/** Proportional bar with gaps between segments; segments grow in from the left. */
export function SegmentedBar({ segments, className }: SegmentedBarProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  const summary = segments
    .map((s) => `${s.label} ${Math.round((s.value / total) * 100)}%`)
    .join(", ");

  return (
    <div role="img" aria-label={summary} className={cn("flex h-3.5 gap-1", className)}>
      {segments.map((segment, index) => (
        <motion.div
          key={segment.label}
          className="h-full min-w-1.5 origin-left rounded-[3px] first:rounded-l-full last:rounded-r-full"
          style={{ flexGrow: segment.value, flexBasis: 0, backgroundColor: segment.color }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: duration.slow, delay: 0.1 + index * 0.08, ease: ease.out }}
        />
      ))}
    </div>
  );
}
