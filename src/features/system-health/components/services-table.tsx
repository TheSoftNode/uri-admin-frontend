"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { DataTable } from "@/components/data-display/data-table";
import { SectionCard } from "@/components/data-display/section-card";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Button } from "@/components/ui/button";
import { serviceTone } from "@/features/system-health/lib";
import type { ServiceHealth } from "@/features/system-health/types";

const columns: ColumnDef<ServiceHealth, unknown>[] = [
  {
    accessorKey: "name",
    header: "Service",
    cell: ({ getValue }) => (
      <span className="font-semibold text-foreground">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge tone={serviceTone(row.original)} dot>
        {row.original.status}
      </StatusBadge>
    ),
  },
  {
    accessorKey: "metric",
    header: "Metric",
    cell: ({ getValue }) => <span className="font-mono text-xs">{getValue<string>()}</span>,
  },
  {
    accessorKey: "lastIncident",
    header: "Last incident",
    cell: ({ getValue }) => <span className="text-subtle-foreground">{getValue<string>()}</span>,
  },
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    meta: { align: "right" },
    cell: ({ row }) =>
      row.original.alertKind ? (
        <Button variant="ghost" size="sm" className="text-brand" asChild>
          <Link href="/alerts">
            View alert
            <ArrowUpRight />
          </Link>
        </Button>
      ) : null,
  },
];

export function ServicesTable({ services }: { services: ServiceHealth[] }) {
  return (
    <SectionCard title="Services & dependencies" flush>
      <DataTable columns={columns} data={services} />
    </SectionCard>
  );
}
