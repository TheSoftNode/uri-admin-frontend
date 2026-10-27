"use client";

import { animate, useInView, useMotionValue, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";

import { formatCompactCurrency, formatCurrency, formatNumber } from "@/lib/format";
import { duration, ease } from "@/lib/motion";

type NumberFormat = "integer" | "decimal" | "percent" | "usd" | "ngn" | "ngn-compact";

const formatters: Record<NumberFormat, (n: number) => string> = {
  integer: (n) => formatNumber(Math.round(n)),
  decimal: (n) => n.toFixed(2),
  percent: (n) => `${Math.round(n)}%`,
  usd: (n) => formatCurrency(n, "USD"),
  ngn: (n) => formatCurrency(n, "NGN"),
  "ngn-compact": (n) => formatCompactCurrency(n, "NGN"),
};

interface AnimatedNumberProps {
  value: number;
  format?: NumberFormat;
  className?: string;
}

/** Counts up to `value` the first time it scrolls into view. */
export function AnimatedNumber({ value, format = "integer", className }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const motionValue = useMotionValue(0);
  const text = useTransform(motionValue, formatters[format]);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, { duration: duration.chart, ease: ease.out });
    return () => controls.stop();
  }, [inView, motionValue, value]);

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}
