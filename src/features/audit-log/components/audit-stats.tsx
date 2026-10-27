"use client";

import { CreditCard, ScrollText, ShieldCheck, Users } from "lucide-react";

import { AnimatedNumber } from "@/components/motion/animated-number";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { StatCard } from "@/components/data-display/stat-card";
import { withinRange } from "@/features/audit-log/lib";
import type { AuditEntry } from "@/features/audit-log/types";

export function AuditStatsPanel({ entries }: { entries: AuditEntry[] }) {
  const now = new Date();
  const last7d = entries.filter((e) => withinRange(e, "7d", now));
  const activeAdmins = new Set(entries.filter((e) => e.actor !== "System").map((e) => e.actor))
    .size;
  const creditAdjustments = last7d.filter((e) => e.category === "credit").length;
  const adminGrants = last7d.filter((e) => e.category === "admin").length;

  return (
    <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StaggerItem>
        <StatCard
          icon={ScrollText}
          label="Actions (7d)"
          value={<AnimatedNumber value={last7d.length} />}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={Users}
          tone="brand"
          label="Active admins"
          value={<AnimatedNumber value={activeAdmins} />}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={CreditCard}
          tone="success"
          label="Credit adjustments (7d)"
          value={<AnimatedNumber value={creditAdjustments} />}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={ShieldCheck}
          tone="info"
          label="Admin grants (7d)"
          value={<AnimatedNumber value={adminGrants} />}
        />
      </StaggerItem>
    </Stagger>
  );
}
