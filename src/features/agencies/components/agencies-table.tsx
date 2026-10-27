"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpRight } from "lucide-react";

import { DataTable } from "@/components/data-display/data-table";
import { SectionCard } from "@/components/data-display/section-card";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Button } from "@/components/ui/button";
import type { Agency } from "@/features/agencies/types";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

const columns: ColumnDef<Agency, unknown>[] = [
  {
    accessorKey: "name",
    header: "Agency",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-semibold text-foreground">{row.original.name}</span>
        <span className="font-mono text-[11px] text-subtle-foreground">{row.original.id}</span>
      </div>
    ),
  },
  {
    accessorKey: "tier",
    header: "Plan tier",
    cell: ({ getValue }) => <span className="font-mono text-xs">{getValue<string>()}</span>,
  },
  {
    accessorKey: "brands",
    header: "Brands",
    cell: ({ row }) => {
      const { brands, maxBrands } = row.original;
      const atCap = maxBrands !== null && brands >= maxBrands * 0.9;
      return (
        <span className={cn("font-mono tabular", atCap && "font-semibold text-warning")}>
          {brands} / {maxBrands ?? "∞"}
        </span>
      );
    },
  },
  {
    accessorKey: "walletCredits",
    header: "Wallet credits",
    cell: ({ getValue }) => (
      <span className="font-mono font-semibold text-foreground tabular">
        {formatNumber(getValue<number>())}
      </span>
    ),
  },
  {
    accessorKey: "perBrandCaps",
    header: "Per-brand caps",
    cell: ({ getValue }) => (
      <span className="text-subtle-foreground">{getValue<boolean>() ? "enabled" : "disabled"}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<Agency["status"]>();
      return (
        <StatusBadge tone={status === "active" ? "success" : "critical"} dot>
          {status}
        </StatusBadge>
      );
    },
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    meta: { align: "right" },
    cell: () => (
      <Button variant="ghost" size="sm" className="text-brand">
        View portfolio
        <ArrowUpRight />
      </Button>
    ),
  },
];

export function AgenciesTable({ agencies }: { agencies: Agency[] }) {
  return (
    <SectionCard title="All agencies" flush>
      <DataTable columns={columns} data={agencies} searchPlaceholder="Search agencies…" />
    </SectionCard>
  );
}
