"use client";

import { motion } from "framer-motion";
import { useId } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { OverviewData } from "@/features/overview/types";
import { formatNumber } from "@/lib/format";
import { duration, ease } from "@/lib/motion";

const HQ = { x: 60, y: 150 };
const ORBITS = [46, 72, 98];

interface MarketsNetworkProps {
  markets: OverviewData["markets"];
}

/** Connections radiate from HQ to each active market; arcs draw in, nodes pop. */
export function MarketsNetwork({ markets }: MarketsNetworkProps) {
  const id = useId();

  return (
    <Card className="h-full gap-2 py-5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-success" aria-hidden />
          Active markets
        </CardTitle>
        <CardAction>
          <Badge variant="neutral" className="font-mono">
            {formatNumber(markets.totalBusinesses)} businesses
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-1 items-center">
        <svg
          viewBox="0 0 460 300"
          className="h-full max-h-[320px] w-full"
          role="img"
          aria-label={`Network of active markets radiating from URI headquarters: ${markets.nodes
            .map((n) => `${n.code} ${n.businesses}`)
            .join(", ")}`}
        >
          <defs>
            <radialGradient id={`${id}-glow`}>
              <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.16} />
              <stop offset="100%" stopColor="var(--brand)" stopOpacity={0} />
            </radialGradient>
            <linearGradient id={`${id}-primary`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--brand-deep)" />
              <stop offset="100%" stopColor="var(--brand-vivid)" />
            </linearGradient>
          </defs>

          <circle cx={HQ.x} cy={HQ.y} r={118} fill={`url(#${id}-glow)`} />
          {ORBITS.map((r, index) => (
            <motion.circle
              key={r}
              cx={HQ.x}
              cy={HQ.y}
              r={r}
              fill="none"
              stroke="var(--track)"
              strokeWidth={1}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ transformOrigin: `${HQ.x}px ${HQ.y}px` }}
              transition={{ duration: duration.slow, delay: index * 0.08, ease: ease.out }}
            />
          ))}

          {markets.nodes.map((node, index) => {
            const isPrimary = node.tier === "primary";
            return (
              <motion.path
                key={`arc-${node.code}`}
                d={`M${HQ.x},${HQ.y} Q${node.curve.x},${node.curve.y} ${node.x},${node.y}`}
                fill="none"
                stroke={isPrimary ? "var(--brand)" : "var(--info)"}
                strokeWidth={Math.max(1, 2.6 - index * 0.3)}
                strokeLinecap="round"
                strokeOpacity={isPrimary ? 1 - index * 0.15 : 0.55 - (index - 3) * 0.08}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: duration.chart,
                  delay: 0.2 + index * 0.1,
                  ease: ease.inOut,
                }}
              />
            );
          })}

          <circle cx={HQ.x} cy={HQ.y} r={23} fill="var(--foreground)" />
          <text
            x={HQ.x}
            y={HQ.y + 4}
            textAnchor="middle"
            fontSize={10.5}
            fontWeight={800}
            fill="var(--background)"
          >
            HQ
          </text>

          {markets.nodes.map((node, index) => {
            const isPrimary = node.tier === "primary";
            const fill =
              index === 0 ? `url(#${id}-primary)` : isPrimary ? "var(--brand)" : "var(--info)";
            return (
              <motion.g
                key={node.code}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                transition={{
                  delay: 0.9 + index * 0.08,
                  type: "spring",
                  stiffness: 360,
                  damping: 18,
                }}
              >
                {index === 0 ? (
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={node.radius + 8}
                    fill="var(--brand)"
                    initial={{ opacity: 0.25 }}
                    animate={{ opacity: [0.25, 0.08, 0.25] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                ) : null}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.radius}
                  fill={fill}
                  fillOpacity={isPrimary ? 1 - index * 0.12 : 0.9 - (index - 3) * 0.12}
                  stroke="var(--card)"
                  strokeWidth={2.5}
                />
                <text
                  x={node.x}
                  y={node.y + node.radius * 0.18 + 2}
                  textAnchor="middle"
                  fontSize={Math.max(7, node.radius * 0.5)}
                  fontWeight={800}
                  fill="#fff"
                >
                  {node.code}
                </text>
                <text
                  x={node.x}
                  y={node.y + node.radius + 15}
                  textAnchor="middle"
                  fontSize={index === 0 ? 10.5 : 9.5}
                  fontWeight={700}
                  className="font-mono"
                  fill={index === 0 ? "var(--brand)" : "var(--muted-foreground)"}
                >
                  {formatNumber(node.businesses)}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </CardContent>
    </Card>
  );
}
