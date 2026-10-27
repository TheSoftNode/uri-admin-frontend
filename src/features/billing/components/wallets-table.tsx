"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/data-display/data-table";
import { SectionCard } from "@/components/data-display/section-card";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Wallet } from "@/features/billing/types";
import { planTierLabel } from "@/lib/plans";
import { cn } from "@/lib/utils";

const LOW_CREDIT_THRESHOLD = 3;

const sourceLabel: Record<Wallet["source"], string> = {
  stripe: "Stripe",
  trial: "Trial",
  access_code: "Access code",
};

interface WalletsTableProps {
  wallets: Wallet[];
  onAdjust: (wallet: Wallet) => void;
}

export function WalletsTable({ wallets, onAdjust }: WalletsTableProps) {
  const columns: ColumnDef<Wallet, unknown>[] = [
    {
      accessorKey: "email",
      header: "User",
      cell: ({ getValue }) => (
        <span className="font-semibold text-foreground">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: "tier",
      header: "Tier",
      cell: ({ getValue }) => {
        const tier = getValue<string | null>();
        return tier ? (
          <Badge variant="brand">{planTierLabel(tier)}</Badge>
        ) : (
          <Badge variant="neutral">Free</Badge>
        );
      },
    },
    {
      accessorKey: "source",
      header: "Source",
      cell: ({ getValue }) => (
        <span className="text-subtle-foreground">{sourceLabel[getValue<Wallet["source"]>()]}</span>
      ),
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
      header: "Actions",
      enableSorting: false,
      meta: { align: "right" },
      cell: ({ row }) => (
        <Button variant="soft" size="sm" onClick={() => onAdjust(row.original)}>
          Adjust
        </Button>
      ),
    },
  ];

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
