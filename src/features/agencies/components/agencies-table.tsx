"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpRight } from "lucide-react";

import { DataTable } from "@/components/data-display/data-table";
import { SectionCard } from "@/components/data-display/section-card";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { agencyStatusTone, agencyTierLabel, isNearBrandCap } from "@/features/agencies/lib";
import type { Agency } from "@/features/agencies/types";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

interface AgenciesTableProps {
  agencies: Agency[];
  onViewPortfolio: (agency: Agency) => void;
}

export function AgenciesTable({ agencies, onViewPortfolio }: AgenciesTableProps) {
  const columns: ColumnDef<Agency, unknown>[] = [
    {
      accessorKey: "name",
      header: "Agency",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-semibold text-foreground">{row.original.name}</span>
          <span className="truncate text-[11px] text-subtle-foreground">
            {row.original.ownerEmail}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "tier",
      header: "Plan tier",
      cell: ({ getValue }) => (
        <Badge variant="brand">{agencyTierLabel[getValue<Agency["tier"]>()]}</Badge>
      ),
    },
    {
      accessorKey: "brands",
      header: "Brands",
      cell: ({ row }) => {
        const { brands, maxBrands } = row.original;
        const atCap = isNearBrandCap(row.original);
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
        <span className="text-subtle-foreground">
          {getValue<boolean>() ? "enabled" : "disabled"}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue<Agency["status"]>();
        return (
          <StatusBadge tone={agencyStatusTone[status]} dot>
            {status}
          </StatusBadge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      meta: { align: "right" },
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          className="text-brand"
          onClick={() => onViewPortfolio(row.original)}
        >
          View portfolio
          <ArrowUpRight />
        </Button>
      ),
    },
  ];

  return (
    <SectionCard title="All agencies" flush>
      <DataTable columns={columns} data={agencies} searchPlaceholder="Search agencies…" />
    </SectionCard>
  );
}
