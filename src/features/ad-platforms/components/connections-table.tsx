"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { BellRing, Check } from "lucide-react";

import { DataTable } from "@/components/data-display/data-table";
import { SectionCard } from "@/components/data-display/section-card";
import { TokenStatusBadge } from "@/components/data-display/token-status-badge";
import { Button } from "@/components/ui/button";
import { errorTone, isAtRisk } from "@/features/ad-platforms/lib";
import type { AdConnection } from "@/features/ad-platforms/types";
import { cn } from "@/lib/utils";

interface ConnectionsTableProps {
  connections: AdConnection[];
  notifiedIds: Set<string>;
  onNotify: (connectionId: string) => void;
}

export function ConnectionsTable({ connections, notifiedIds, onNotify }: ConnectionsTableProps) {
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
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      meta: { align: "right" },
      cell: ({ row }) => {
        if (!isAtRisk(row.original)) return null;
        const notified = notifiedIds.has(row.original.id);
        return (
          <Button
            variant={notified ? "ghost" : "soft"}
            size="sm"
            disabled={notified}
            onClick={() => onNotify(row.original.id)}
          >
            {notified ? <Check /> : <BellRing />}
            {notified ? "Notified" : "Notify business"}
          </Button>
        );
      },
    },
  ];

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
