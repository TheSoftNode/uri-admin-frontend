"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Check } from "lucide-react";

import { DataTable } from "@/components/data-display/data-table";
import { SectionCard } from "@/components/data-display/section-card";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ReviewItem, ReviewStatus } from "@/features/moderation/types";
import { cn } from "@/lib/utils";
import type { Tone } from "@/types/tone";

const statusTone: Record<ReviewStatus, Tone> = {
  pending: "neutral",
  approved: "success",
  rejected: "critical",
};

function scoreTone(score: number): string {
  if (score < 0.5) return "text-critical";
  if (score < 0.7) return "text-warning";
  return "text-success";
}

const columns: ColumnDef<ReviewItem, unknown>[] = [
  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({ getValue }) => (
      <span className="font-semibold text-foreground">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "qualityScore",
    header: "Quality",
    cell: ({ getValue }) => {
      const score = getValue<number>();
      return (
        <span className={cn("font-mono font-semibold tabular", scoreTone(score))}>
          {score.toFixed(2)}
        </span>
      );
    },
  },
  {
    accessorKey: "issues",
    header: "Detected issues",
    enableSorting: false,
    cell: ({ getValue }) => {
      const issues = getValue<string[]>();
      return issues.length ? (
        <div className="flex flex-wrap gap-1">
          {issues.map((issue) => (
            <Badge key={issue} variant="neutral" className="font-mono font-medium">
              {issue}
            </Badge>
          ))}
        </div>
      ) : (
        <span className="text-subtle-foreground">none</span>
      );
    },
  },
  {
    accessorKey: "tier",
    header: "Tier",
    cell: ({ getValue }) => {
      const tier = getValue<ReviewItem["tier"]>();
      return <StatusBadge tone={tier === "mandatory" ? "warning" : "info"}>{tier}</StatusBadge>;
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ getValue }) => <span className="font-mono tabular">P{getValue<number>()}</span>,
  },
  {
    accessorKey: "assignee",
    header: "Assigned",
    cell: ({ row }) => {
      const { assignee, autoPassed } = row.original;
      if (autoPassed) return <span className="text-subtle-foreground">auto-passed</span>;
      return assignee ? (
        <span>{assignee}</span>
      ) : (
        <span className="text-subtle-foreground italic">unassigned</span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<ReviewStatus>();
      return <StatusBadge tone={statusTone[status]}>{status}</StatusBadge>;
    },
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    meta: { align: "right" },
    cell: ({ row }) =>
      row.original.status === "pending" ? (
        <Button variant="soft" size="sm">
          <Check />
          Approve
        </Button>
      ) : null,
  },
];

export function ReviewQueueTable({ items }: { items: ReviewItem[] }) {
  return (
    <SectionCard title="Review queue" description="Ordered by priority, then quality score" flush>
      <DataTable columns={columns} data={items} />
    </SectionCard>
  );
}
