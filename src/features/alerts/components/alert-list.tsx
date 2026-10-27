"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { SectionCard } from "@/components/data-display/section-card";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Button } from "@/components/ui/button";
import { isActive, occurrenceTone } from "@/features/alerts/lib";
import type { PlatformAlert } from "@/features/alerts/types";
import { formatDateTime, formatNumber } from "@/lib/format";
import { ease } from "@/lib/motion";
import { toneBg } from "@/lib/tone";
import { cn } from "@/lib/utils";

interface AlertListProps {
  alerts: PlatformAlert[];
  onDismiss: (kind: string) => void;
}

export function AlertList({ alerts, onDismiss }: AlertListProps) {
  const [showDismissed, setShowDismissed] = useState(false);
  const visible = showDismissed ? alerts : alerts.filter(isActive);

  return (
    <SectionCard
      title="Alerts"
      description="Newest first"
      flush
      action={
        <Button variant="ghost" size="sm" onClick={() => setShowDismissed((v) => !v)}>
          {showDismissed ? "Hide dismissed" : "Show dismissed"}
        </Button>
      }
    >
      <ul className="flex flex-col gap-1">
        <AnimatePresence initial={false}>
          {visible.map((alert, index) => {
            const active = isActive(alert);
            const tone = occurrenceTone(alert.occurrences);
            return (
              <motion.li
                key={alert.kind}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: index * 0.04, ease: ease.out }}
                className={cn(
                  "flex flex-wrap items-center gap-4 rounded-xl px-3 py-3.5 transition-colors hover:bg-muted",
                  active && tone === "critical" && "bg-critical-soft hover:bg-critical-soft",
                  !active && "opacity-60",
                )}
              >
                <span
                  className={cn("h-9 w-1 shrink-0 rounded-full", toneBg[active ? tone : "neutral"])}
                  aria-hidden
                />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[13.5px] font-bold text-foreground">{alert.title}</p>
                    {alert.lastEmailedAt ? (
                      <span title={`Emailed ${formatDateTime(alert.lastEmailedAt)}`}>
                        <Mail className="size-3.5 text-subtle-foreground" />
                      </span>
                    ) : null}
                  </div>
                  <p className="text-xs leading-relaxed text-subtle-foreground">{alert.detail}</p>
                  <p className="text-xs text-subtle-foreground">
                    {formatNumber(alert.occurrences)} occurrences · first seen{" "}
                    {formatDateTime(alert.firstSeen)} · last seen {formatDateTime(alert.lastSeen)}
                  </p>
                </div>
                {active ? (
                  <Button
                    variant="soft"
                    size="sm"
                    onClick={() => {
                      onDismiss(alert.kind);
                      toast.success("Alert dismissed.");
                    }}
                  >
                    <X />
                    Dismiss
                  </Button>
                ) : (
                  <StatusBadge tone="neutral">dismissed</StatusBadge>
                )}
              </motion.li>
            );
          })}
        </AnimatePresence>
        {visible.length === 0 ? (
          <li className="py-10 text-center text-sm text-subtle-foreground">
            No {showDismissed ? "" : "active "}alerts.
          </li>
        ) : null}
      </ul>
    </SectionCard>
  );
}
