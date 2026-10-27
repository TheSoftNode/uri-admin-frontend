"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { AlertTriangle } from "lucide-react";

import { DataTable } from "@/components/data-display/data-table";
import { Meter } from "@/components/data-display/meter";
import { SectionCard } from "@/components/data-display/section-card";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Button } from "@/components/ui/button";
import { isAccountCapBreach } from "@/features/campaigns/lib";
import type { CampaignPlan } from "@/features/campaigns/types";
import { formatCompactCurrency, formatCurrency } from "@/lib/format";

interface CampaignPlansTableProps {
  plans: CampaignPlan[];
  onView: (plan: CampaignPlan) => void;
}

export function CampaignPlansTable({ plans, onView }: CampaignPlansTableProps) {
  const columns: ColumnDef<CampaignPlan, unknown>[] = [
    {
      accessorKey: "business",
      header: "Business",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-foreground">{row.original.business}</span>
          {row.original.flaggedForReview ? (
            <StatusBadge tone="warning" className="text-[10px]">
              flagged
            </StatusBadge>
          ) : null}
        </div>
      ),
    },
    {
      accessorKey: "decision",
      header: "Decision",
      cell: ({ getValue }) => {
        const decision = getValue<CampaignPlan["decision"]>();
        return (
          <StatusBadge tone={decision === "PLAN" ? "brand" : "neutral"} className="font-mono">
            {decision}
          </StatusBadge>
        );
      },
    },
    {
      accessorKey: "budgetNgn",
      header: "Budget",
      cell: ({ getValue }) => (
        <span className="font-mono tabular">{formatCurrency(getValue<number>(), "NGN")}</span>
      ),
    },
    {
      id: "spend",
      header: "Spend vs budget",
      accessorFn: (row) => row.spendNgn / row.budgetNgn,
      cell: ({ row }) => {
        const { spendNgn, budgetNgn } = row.original;
        const share = (spendNgn / budgetNgn) * 100;
        return (
          <div className="flex w-44 flex-col gap-1.5">
            <Meter
              value={share}
              tone={share >= 98 ? "critical" : "brand"}
              label="Spend vs budget"
            />
            <span className="font-mono text-[11px] text-subtle-foreground tabular">
              {formatCompactCurrency(spendNgn, "NGN")} of {formatCompactCurrency(budgetNgn, "NGN")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "accountCapNgn",
      header: "Account cap",
      cell: ({ row }) => {
        const breach = isAccountCapBreach(row.original);
        return (
          <div className="flex items-center gap-1.5">
            <span
              className={`font-mono tabular ${breach ? "font-semibold text-critical" : "text-subtle-foreground"}`}
            >
              {formatCurrency(row.original.accountCapNgn, "NGN")}
            </span>
            {breach ? <AlertTriangle className="size-3.5 text-critical" /> : null}
          </div>
        );
      },
    },
    {
      accessorKey: "launched",
      header: "Launched",
      cell: ({ getValue }) =>
        getValue<boolean>() ? (
          <StatusBadge tone="success" dot>
            yes
          </StatusBadge>
        ) : (
          <StatusBadge tone="neutral">no</StatusBadge>
        ),
    },
    {
      accessorKey: "updated",
      header: "Updated",
      cell: ({ getValue }) => <span className="text-subtle-foreground">{getValue<string>()}</span>,
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      meta: { align: "right" },
      cell: ({ row }) => (
        <Button variant="ghost" size="sm" onClick={() => onView(row.original)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <SectionCard title="Jane Ads plans" description="All figures in NGN" flush>
      <DataTable columns={columns} data={plans} searchPlaceholder="Search businesses…" />
    </SectionCard>
  );
}
