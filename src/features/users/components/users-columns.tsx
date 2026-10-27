"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { EntityCell } from "@/components/data-display/entity-cell";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Button } from "@/components/ui/button";
import type { PlatformUser, UserStatus } from "@/features/users/types";
import { formatNumber } from "@/lib/format";
import type { Tone } from "@/types/tone";

const statusTone: Record<UserStatus, Tone> = {
  active: "success",
  "trial ended": "warning",
  "past due": "critical",
};

export const usersColumns: ColumnDef<PlatformUser, unknown>[] = [
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => <EntityCell name={row.original.name} meta={row.original.email} avatar />,
  },
  { accessorKey: "plan", header: "Plan" },
  {
    accessorKey: "credits",
    header: "Credits",
    cell: ({ getValue }) => (
      <span className="font-mono tabular">{formatNumber(getValue<number>())}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge tone={statusTone[row.original.status]}>{row.original.status}</StatusBadge>
    ),
  },
  {
    accessorKey: "joined",
    header: "Joined",
    cell: ({ getValue }) => (
      <span className="font-mono text-xs text-subtle-foreground">{getValue<string>()}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    meta: { align: "right" },
    cell: () => (
      <div className="flex justify-end gap-1.5 opacity-70 transition-opacity group-hover/row:opacity-100">
        <Button variant="secondary" size="sm">
          Adjust credits
        </Button>
        <Button variant="ghost" size="sm">
          View
        </Button>
      </div>
    ),
  },
];
