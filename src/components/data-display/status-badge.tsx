import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { toneBg } from "@/lib/tone";
import { cn } from "@/lib/utils";
import type { Tone } from "@/types/tone";

interface StatusBadgeProps {
  tone: Tone;
  children: ReactNode;
  /** Leading dot, for live states (healthy, degraded, open). */
  dot?: boolean;
  className?: string;
}

export function StatusBadge({ tone, children, dot = false, className }: StatusBadgeProps) {
  return (
    <Badge variant={tone} className={className}>
      {dot ? <span className={cn("size-1.5 rounded-full", toneBg[tone])} aria-hidden /> : null}
      {children}
    </Badge>
  );
}
