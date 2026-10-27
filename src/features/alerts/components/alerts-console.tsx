"use client";

import { useState } from "react";

import { AlertList } from "@/features/alerts/components/alert-list";
import { AlertsStatsPanel } from "@/features/alerts/components/alerts-stats";
import type { AlertsPageData } from "@/features/alerts/types";

export function AlertsConsole({ data }: { data: AlertsPageData }) {
  const [alerts, setAlerts] = useState(data.alerts);

  return (
    <div className="flex flex-col gap-5">
      <AlertsStatsPanel stats={data.stats} />
      <AlertList
        alerts={alerts}
        onDismiss={(kind) =>
          setAlerts((prev) =>
            prev.map((alert) =>
              alert.kind === kind ? { ...alert, dismissedAt: new Date().toISOString() } : alert,
            ),
          )
        }
      />
    </div>
  );
}
