"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/data-display/data-table";
import { SectionCard } from "@/components/data-display/section-card";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Button } from "@/components/ui/button";
import type { CardStatus, CurationCard } from "@/features/listening/types";
import { cn } from "@/lib/utils";
import type { Tone } from "@/types/tone";

const statusTone: Record<CardStatus, Tone> = {
  "pending review": "neutral",
  "low confidence": "warning",
  "rejected — fabrication check": "critical",
};

const columns: ColumnDef<CurationCard, unknown>[] = [
  {
    accessorKey: "market",
    header: "Market",
    cell: ({ getValue }) => (
      <span className="font-semibold text-foreground">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "signal",
    header: "Signal type",
    cell: ({ getValue }) => <span className="font-mono text-xs">{getValue<string>()}</span>,
  },
  {
    accessorKey: "proposedAction",
    header: "Proposed action",
    meta: { className: "whitespace-normal min-w-[260px]" },
    cell: ({ getValue }) => <span className="text-secondary-foreground">{getValue<string>()}</span>,
  },
  {
    accessorKey: "confidence",
    header: "Confidence",
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return (
        <span
          className={cn(
            "font-mono font-semibold tabular",
            value >= 0.7 ? "text-success" : value >= 0.5 ? "text-warning" : "text-critical",
          )}
        >
          {value.toFixed(2)}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<CardStatus>();
      return <StatusBadge tone={statusTone[status]}>{status}</StatusBadge>;
    },
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    meta: { align: "right" },
    cell: () => (
      <Button variant="soft" size="sm">
        Review
      </Button>
    ),
  },
];

export function CurationCardsTable({ cards }: { cards: CurationCard[] }) {
  return (
    <SectionCard title="Cards pending curation review" flush>
      <DataTable columns={columns} data={cards} />
    </SectionCard>
  );
}
