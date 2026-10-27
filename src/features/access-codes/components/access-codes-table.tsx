"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/data-display/data-table";
import { Meter } from "@/components/data-display/meter";
import { SectionCard } from "@/components/data-display/section-card";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Button } from "@/components/ui/button";
import type { AccessCode, AccessCodeStatus } from "@/features/access-codes/types";
import type { Tone } from "@/types/tone";

const statusTone: Record<AccessCodeStatus, Tone> = {
  active: "success",
  expired: "neutral",
  revoked: "critical",
};

const columns: ColumnDef<AccessCode, unknown>[] = [
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ getValue }) => (
      <span className="rounded-lg bg-muted px-2 py-1 font-mono text-xs font-semibold tracking-wider text-foreground">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ getValue }) => (
      <span className="font-mono text-xs text-subtle-foreground">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "grant",
    header: "Grant",
    cell: ({ getValue }) => <span className="font-semibold text-brand">{getValue<string>()}</span>,
  },
  {
    accessorKey: "redeemed",
    header: "Redemptions",
    cell: ({ row }) => {
      const { redeemed, maxRedemptions } = row.original;
      const share = (redeemed / maxRedemptions) * 100;
      return (
        <div className="flex w-36 flex-col gap-1.5">
          <span className="font-mono text-xs tabular">
            {redeemed} / {maxRedemptions}
          </span>
          <Meter value={share} tone={share >= 95 ? "warning" : "brand"} />
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<AccessCodeStatus>();
      return <StatusBadge tone={statusTone[status]}>{status}</StatusBadge>;
    },
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ getValue }) => <span className="text-subtle-foreground">{getValue<string>()}</span>,
  },
  {
    accessorKey: "expires",
    header: "Expires",
    cell: ({ getValue }) => (
      <span className="text-subtle-foreground">{getValue<string | null>() ?? "never"}</span>
    ),
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    meta: { align: "right" },
    cell: ({ row }) =>
      row.original.status === "active" ? (
        <Button variant="ghost" size="sm" className="text-critical hover:bg-critical-soft">
          Revoke
        </Button>
      ) : null,
  },
];

export function AccessCodesTable({ codes }: { codes: AccessCode[] }) {
  return (
    <SectionCard title="All codes" flush>
      <DataTable columns={columns} data={codes} searchPlaceholder="Search codes…" />
    </SectionCard>
  );
}
