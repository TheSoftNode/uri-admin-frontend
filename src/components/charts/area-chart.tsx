"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useMemo, useRef, useState, type PointerEvent } from "react";

import { areaPath, smoothPath, toPoints } from "@/components/charts/geometry";
import { duration, ease } from "@/lib/motion";
import { toneColor } from "@/lib/tone";
import { cn } from "@/lib/utils";
import type { Tone } from "@/types/tone";

export interface SeriesPoint {
  label: string;
  value: number;
  /** Pre-formatted value for the tooltip. */
  display: string;
}

interface AreaChartProps {
  data: SeriesPoint[];
  height?: number;
  tone?: Tone;
  ariaLabel: string;
  /** Show every Nth x-axis label (1 = all). */
  labelEvery?: number;
  className?: string;
}

const VIEW_WIDTH = 1000;

/**
 * Smooth area chart with a draw-in animation, a glowing live endpoint and a
 * hover read-out. Deliberately no gridlines or axes — the shape is the story.
 */
export function AreaChart({
  data,
  height = 220,
  tone = "brand",
  ariaLabel,
  labelEvery = 1,
  className,
}: AreaChartProps) {
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const points = useMemo(
    () =>
      toPoints(
        data.map((d) => d.value),
        VIEW_WIDTH,
        height,
      ),
    [data, height],
  );
  const line = useMemo(() => smoothPath(points), [points]);
  const area = useMemo(() => areaPath(points, height), [points, height]);
  const color = toneColor[tone];
  const last = points[points.length - 1];
  const active = hoverIndex !== null ? points[hoverIndex] : null;

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || data.length < 2) return;
    const ratio = (event.clientX - rect.left) / rect.width;
    setHoverIndex(Math.max(0, Math.min(data.length - 1, Math.round(ratio * (data.length - 1)))));
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div
        ref={containerRef}
        className="relative"
        style={{ height }}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setHoverIndex(null)}
      >
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${height}`}
          preserveAspectRatio="none"
          className="absolute inset-0 size-full overflow-visible"
          role="img"
          aria-label={ariaLabel}
        >
          <defs>
            <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.28} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
            <linearGradient id={`${id}-stroke`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--brand-deep)" stopOpacity={0.55} />
              <stop offset="100%" stopColor={color} />
            </linearGradient>
          </defs>
          <motion.path
            d={area}
            fill={`url(#${id}-fill)`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: duration.slow, delay: 0.35, ease: ease.out }}
          />
          <motion.path
            d={line}
            fill="none"
            stroke={`url(#${id}-stroke)`}
            strokeWidth={2.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: duration.chart, ease: ease.inOut }}
          />
        </svg>

        {last ? (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: `${(last.x / VIEW_WIDTH) * 100}%`,
              top: last.y,
              backgroundColor: color,
              boxShadow: `0 0 0 5px color-mix(in srgb, ${color} 18%, transparent), 0 0 22px 4px color-mix(in srgb, ${color} 45%, transparent)`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: duration.chart, type: "spring", stiffness: 420, damping: 18 }}
          />
        ) : null}

        <AnimatePresence>
          {active && hoverIndex !== null ? (
            <motion.div
              key="tooltip"
              className="pointer-events-none absolute z-10"
              style={{ left: `${(active.x / VIEW_WIDTH) * 100}%`, top: active.y }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: duration.fast }}
            >
              <span
                className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-card"
                style={{ backgroundColor: color }}
              />
              <span className="absolute bottom-3 left-0 flex -translate-x-1/2 flex-col items-center rounded-xl bg-foreground px-2.5 py-1.5 whitespace-nowrap text-background shadow-float">
                <span className="text-[10px] font-semibold tracking-wider uppercase opacity-70">
                  {data[hoverIndex].label}
                </span>
                <span className="font-mono text-xs font-semibold">{data[hoverIndex].display}</span>
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="flex justify-between font-mono text-[10.5px] tracking-wider text-subtle-foreground uppercase">
        {data.map((point, index) => (
          <span
            key={point.label}
            className={cn(
              index % labelEvery !== 0 && index !== data.length - 1 && "invisible",
              index === data.length - 1 && "font-semibold text-brand",
            )}
          >
            {point.label}
          </span>
        ))}
      </div>
    </div>
  );
}
