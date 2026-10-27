"use client";

import { motion } from "framer-motion";

import { duration, ease } from "@/lib/motion";
import { toneColor } from "@/lib/tone";
import { cn } from "@/lib/utils";
import type { Tone } from "@/types/tone";

interface MeterProps {
  /** 0–100 */
  value: number;
  tone?: Tone;
  className?: string;
  label?: string;
}

/** Thin animated bar for spend, usage and share values. */
export function Meter({ value, tone = "brand", className, label }: MeterProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div
      role="meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      aria-label={label}
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-track", className)}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: toneColor[tone] }}
        initial={{ width: 0 }}
        whileInView={{ width: `${clamped}%` }}
        viewport={{ once: true }}
        transition={{ duration: duration.chart, ease: ease.out }}
      />
    </div>
  );
}
