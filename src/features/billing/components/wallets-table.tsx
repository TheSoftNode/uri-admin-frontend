"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/data-display/data-table";
import { SectionCard } from "@/components/data-display/section-card";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Button } from "@/components/ui/button";
import type { Wallet } from "@/features/billing/types";
import { cn } from "@/lib/utils";

const LOW_CREDIT_THRESHOLD = 3;

const columns: ColumnDef<Wallet, unknown>[] = [
  {
    accessorKey: "email",
    header: "User",
    cell: ({ getValue }) => (
      <span className="font-semibold text-foreground">{getValue<string>()}</span>
    ),
  },
  { accessorKey: "tier", header: "Tier" },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ getValue }) => <span className="text-subtle-foreground">{getValue<string>()}</span>,
  },
  {
    accessorKey: "creditsRemaining",
    header: "Credits remaining",
    cell: ({ getValue }) => {
      const credits = getValue<number>();
      return (
        <span
          className={cn(
            "font-mono font-semibold tabular",
            credits <= LOW_CREDIT_THRESHOLD ? "text-critical" : "text-foreground",
          )}
        >
          {credits}
        </span>
      );
    },
  },
  {
    accessorKey: "trialActive",
    header: "Trial",
    cell: ({ getValue }) =>
      getValue<boolean>() ? (
        <StatusBadge tone="brand">Active</StatusBadge>
      ) : (
        <StatusBadge tone="neutral">No</StatusBadge>
      ),
  },
  {
    accessorKey: "renewal",
    header: "Next renewal",
    cell: ({ getValue }) => {
      const renewal = getValue<string | null>();
      return renewal ? (
        <span className="text-subtle-foreground">{renewal}</span>
      ) : (
        <StatusBadge tone="critical" dot>
          payment failed
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
      <Button variant="soft" size="sm">
        Adjust
      </Button>
    ),
  },
];

export function WalletsTable({ wallets }: { wallets: Wallet[] }) {
  return (
    <SectionCard
      title="Wallets requiring attention"
      description="credits_remaining ≤ 3 or payment failed"
      flush
    >
      <DataTable columns={columns} data={wallets} />
    </SectionCard>
  );
}
