"use client";

import { motion } from "framer-motion";
import { useId, useMemo } from "react";

import { areaPath, smoothPath, toPoints } from "@/components/charts/geometry";
import { duration, ease } from "@/lib/motion";
import { toneColor } from "@/lib/tone";
import type { Tone } from "@/types/tone";

interface SparklineProps {
  values: number[];
  width?: number;
  height?: number;
  tone?: Tone;
  className?: string;
}

export function Sparkline({
  values,
  width = 130,
  height = 36,
  tone = "brand",
  className,
}: SparklineProps) {
  const id = useId();
  const points = useMemo(() => toPoints(values, width, height, 0.15), [values, width, height]);
  const color = toneColor[tone];
  const last = points[points.length - 1];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.25} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <motion.path
        d={areaPath(points, height)}
        fill={`url(#${id}-fill)`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration.slow, delay: 0.3 }}
      />
      <motion.path
        d={smoothPath(points)}
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: duration.chart, ease: ease.inOut }}
      />
      {last ? (
        <motion.circle
          cx={last.x - 1.5}
          cy={last.y}
          r={2.6}
          fill={color}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: duration.chart }}
        />
      ) : null}
    </svg>
  );
}
