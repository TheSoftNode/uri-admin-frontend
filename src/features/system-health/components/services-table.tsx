"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/data-display/data-table";
import { SectionCard } from "@/components/data-display/section-card";
import { StatusBadge } from "@/components/data-display/status-badge";
import type { ServiceHealth } from "@/features/system-health/types";
import type { Tone } from "@/types/tone";

function serviceTone(service: ServiceHealth): Tone {
  if (service.status === "healthy") return "success";
  if (service.status === "down") return "critical";
  return service.severity ?? "warning";
}

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
];

export function ServicesTable({ services }: { services: ServiceHealth[] }) {
  return (
    <SectionCard title="Services & dependencies" flush>
      <DataTable columns={columns} data={services} />
    </SectionCard>
  );
}
