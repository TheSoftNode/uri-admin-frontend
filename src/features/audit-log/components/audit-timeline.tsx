"use client";

import {
  BellOff,
  Coins,
  CreditCard,
  Download,
  KeyRound,
  ShieldCheck,
  Ticket,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";

import { PageToolbar } from "@/components/layout/page-toolbar";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AuditCategory, AuditEntry } from "@/features/audit-log/types";
import { cn } from "@/lib/utils";

const categoryMeta: Record<AuditCategory, { icon: LucideIcon; className: string }> = {
  credit: { icon: Coins, className: "bg-success-soft text-success" },
  subscription: { icon: CreditCard, className: "bg-brand-soft text-brand" },
  admin: { icon: ShieldCheck, className: "bg-info-soft text-info" },
  auth: { icon: KeyRound, className: "bg-warning-soft text-warning" },
  "access-code": { icon: Ticket, className: "bg-critical-soft text-critical" },
  alert: { icon: BellOff, className: "bg-secondary text-muted-foreground" },
};

const filters: { value: AuditCategory | "all"; label: string }[] = [
  { value: "all", label: "All actions" },
  { value: "credit", label: "Credit adjustments" },
  { value: "subscription", label: "Subscription changes" },
  { value: "admin", label: "Admin grants" },
  { value: "auth", label: "Sign-ins" },
];

export function AuditTimeline({ entries }: { entries: AuditEntry[] }) {
  const [category, setCategory] = useState<AuditCategory | "all">("all");
  const [range, setRange] = useState("7d");

  const visible = useMemo(
    () => (category === "all" ? entries : entries.filter((entry) => entry.category === category)),
    [entries, category],
  );

  return (
    <div className="flex flex-col gap-4">
      <PageToolbar
        actions={
          <Button variant="secondary">
            <Download />
            Export
          </Button>
        }
      >
        <Select
          value={category}
          onValueChange={(value) => setCategory(value as AuditCategory | "all")}
        >
          <SelectTrigger className="w-52" aria-label="Filter by action">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {filters.map((filter) => (
              <SelectItem key={filter.value} value={filter.value}>
                {filter.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={range} onValueChange={setRange}>
          <SelectTrigger className="w-40" aria-label="Time range">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </PageToolbar>

      <Card className="px-3 py-3">
        <Stagger key={category} stagger={0.04} className="flex flex-col gap-0.5">
          {visible.map((entry) => {
            const meta = categoryMeta[entry.category];
            const Icon = meta.icon;
            return (
              <StaggerItem key={entry.id}>
                <article className="flex items-start gap-4 rounded-xl px-3 py-3.5 transition-colors hover:bg-muted">
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-xl",
                      meta.className,
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <p className="text-[13.5px] text-secondary-foreground">
                      <span className="font-bold text-foreground">{entry.actor}</span>{" "}
                      {entry.action}{" "}
                      <span className="font-mono text-[12.5px] font-semibold text-foreground">
                        {entry.target}
                      </span>
                    </p>
                    <p className="text-xs text-subtle-foreground">{entry.detail}</p>
                  </div>
                  <time className="shrink-0 font-mono text-[11px] text-subtle-foreground">
                    {entry.when}
                  </time>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Card>
    </div>
  );
}
