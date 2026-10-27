"use client";

import { motion } from "framer-motion";
import { useId, type ReactNode } from "react";

import { duration, ease } from "@/lib/motion";

interface RadialGaugeProps {
  value: number;
  max?: number;
  size?: number;
  thickness?: number;
  children?: ReactNode;
  ariaLabel: string;
}

/** Ring gauge that sweeps to its value, brand gradient on the arc. */
export function RadialGauge({
  value,
  max = 100,
  size = 128,
  thickness = 10,
  children,
  ariaLabel,
}: RadialGaugeProps) {
  const id = useId();
  const radius = (size - thickness) / 2;
  const progress = Math.max(0, Math.min(1, value / max));

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={ariaLabel}
      >
        <defs>
          <linearGradient id={`${id}-arc`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--brand-vivid)" />
            <stop offset="100%" stopColor="var(--brand)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--track)"
          strokeWidth={thickness}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${id}-arc)`}
          strokeWidth={thickness}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress }}
          transition={{ duration: duration.chart, ease: ease.out }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}
