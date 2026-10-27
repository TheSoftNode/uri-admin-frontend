"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/data-display/data-table";
import { SectionCard } from "@/components/data-display/section-card";
import { StatusBadge } from "@/components/data-display/status-badge";
import { TokenStatusBadge } from "@/components/data-display/token-status-badge";
import { Badge } from "@/components/ui/badge";
import type { InboxChannel, InboxConnection } from "@/features/inbox/types";

const columns: ColumnDef<InboxConnection, unknown>[] = [
  {
    accessorKey: "business",
    header: "Business",
    cell: ({ getValue }) => (
      <span className="font-semibold text-foreground">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "channels",
    header: "Channels connected",
    enableSorting: false,
    cell: ({ getValue }) => (
      <div className="flex flex-wrap gap-1">
        {getValue<InboxChannel[]>().map((channel) => (
          <Badge key={channel} variant="neutral" className="font-medium">
            {channel}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    id: "token",
    header: "Token status",
    accessorFn: (row) => row.token.state,
    cell: ({ row }) => <TokenStatusBadge token={row.original.token} />,
  },
  {
    accessorKey: "autoReply",
    header: "AI auto-reply",
    cell: ({ getValue }) =>
      getValue<boolean>() ? (
        <StatusBadge tone="brand">on</StatusBadge>
      ) : (
        <StatusBadge tone="neutral">off</StatusBadge>
      ),
  },
  {
    accessorKey: "guardInterventions",
    header: "Guard interventions (7d)",
    meta: { align: "right" },
    cell: ({ getValue }) => <span className="font-mono tabular">{getValue<number>()}</span>,
  },
  {
    accessorKey: "lastActivity",
    header: "Last activity",
    cell: ({ getValue }) => <span className="text-subtle-foreground">{getValue<string>()}</span>,
  },
];

export function InboxConnectionsTable({ connections }: { connections: InboxConnection[] }) {
  return (
    <SectionCard title="Inbox connections" flush>
      <DataTable columns={columns} data={connections} searchPlaceholder="Search businesses…" />
    </SectionCard>
  );
}
