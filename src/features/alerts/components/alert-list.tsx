"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { SectionCard } from "@/components/data-display/section-card";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Button } from "@/components/ui/button";
import type { AlertSeverity, AlertStatus, PlatformAlert } from "@/features/alerts/types";
import { formatNumber } from "@/lib/format";
import { ease } from "@/lib/motion";
import { toneBg } from "@/lib/tone";
import { cn } from "@/lib/utils";
import type { Tone } from "@/types/tone";

const severityTone: Record<AlertSeverity, Tone> = {
  critical: "critical",
  warning: "warning",
  info: "info",
};

const statusTone: Record<AlertStatus, Tone> = {
  open: "critical",
  acknowledged: "neutral",
  monitoring: "info",
};

export function AlertList({ alerts: initial }: { alerts: PlatformAlert[] }) {
  // Optimistic local state until acknowledge is backed by a server action.
  const [alerts, setAlerts] = useState(initial);

  function acknowledge(id: string) {
    setAlerts((current) =>
      current.map((alert) => (alert.id === id ? { ...alert, status: "acknowledged" } : alert)),
    );
    toast.success("Alert acknowledged", { description: "Logged to the audit trail." });
  }

  return (
    <SectionCard title="Active alerts" description="Newest first" flush>
      <ul className="flex flex-col gap-1">
        <AnimatePresence initial={false}>
          {alerts.map((alert, index) => (
            <motion.li
              key={alert.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.04, ease: ease.out }}
              className={cn(
                "flex flex-wrap items-center gap-4 rounded-xl px-3 py-3.5 transition-colors hover:bg-muted",
                alert.severity === "critical" &&
                  alert.status === "open" &&
                  "bg-critical-soft hover:bg-critical-soft",
              )}
            >
              <span
                className={cn(
                  "h-9 w-1 shrink-0 rounded-full",
                  toneBg[severityTone[alert.severity]],
                )}
                aria-hidden
              />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[13.5px] font-bold text-foreground">{alert.title}</p>
                  <StatusBadge tone={severityTone[alert.severity]}>{alert.severity}</StatusBadge>
                </div>
                <p className="text-xs text-subtle-foreground">
                  {alert.platform} · {formatNumber(alert.businessesImpacted)} businesses impacted ·
                  first seen {alert.firstSeen}
                </p>
              </div>
              <StatusBadge tone={statusTone[alert.status]} dot={alert.status === "open"}>
                {alert.status}
              </StatusBadge>
              <Button
                variant={alert.status === "open" ? "soft" : "ghost"}
                size="sm"
                disabled={alert.status !== "open"}
                onClick={() => acknowledge(alert.id)}
              >
                <Check />
                Acknowledge
              </Button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </SectionCard>
  );
}
