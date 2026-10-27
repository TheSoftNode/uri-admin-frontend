"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/data-display/data-table";
import { SectionCard } from "@/components/data-display/section-card";
import { TokenStatusBadge } from "@/components/data-display/token-status-badge";
import type { AdConnection } from "@/features/ad-platforms/types";
import { cn } from "@/lib/utils";

function errorTone(rate: number): string {
  if (rate >= 5) return "text-critical font-semibold";
  if (rate >= 1) return "text-warning font-semibold";
  return "text-success";
}

const columns: ColumnDef<AdConnection, unknown>[] = [
  {
    accessorKey: "business",
    header: "Business",
    cell: ({ getValue }) => (
      <span className="font-semibold text-foreground">{getValue<string>()}</span>
    ),
  },
  { accessorKey: "platform", header: "Platform" },
  {
    accessorKey: "accountType",
    header: "Account type",
    cell: ({ getValue }) => <span className="text-subtle-foreground">{getValue<string>()}</span>,
  },
  {
    id: "token",
    header: "Token status",
    accessorFn: (row) => row.token.state,
    cell: ({ row }) => <TokenStatusBadge token={row.original.token} />,
  },
  {
    accessorKey: "lastSync",
    header: "Last sync",
    cell: ({ getValue }) => <span className="text-subtle-foreground">{getValue<string>()}</span>,
  },
  {
    accessorKey: "errorRate",
    header: "Error rate (7d)",
    meta: { align: "right" },
    cell: ({ getValue }) => {
      const rate = getValue<number>();
      return <span className={cn("font-mono tabular", errorTone(rate))}>{rate.toFixed(1)}%</span>;
    },
  },
];

export function ConnectionsTable({ connections }: { connections: AdConnection[] }) {
  return (
    <SectionCard title="Connections" description="Across all tenants" flush>
      <DataTable
        columns={columns}
        data={connections}
        searchPlaceholder="Search businesses or platforms…"
      />
    </SectionCard>
  );
}
