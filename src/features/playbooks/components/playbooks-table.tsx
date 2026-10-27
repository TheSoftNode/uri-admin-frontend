"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Flag } from "lucide-react";

import { DataTable } from "@/components/data-display/data-table";
import { SectionCard } from "@/components/data-display/section-card";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Playbook } from "@/features/playbooks/types";

const columns: ColumnDef<Playbook, unknown>[] = [
  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({ getValue }) => (
      <span className="font-semibold text-foreground">{getValue<string>()}</span>
    ),
  },
  { accessorKey: "industry", header: "Industry" },
  {
    accessorKey: "stage",
    header: "Business stage",
    cell: ({ getValue }) => <span className="capitalize">{getValue<string>()}</span>,
  },
  {
    accessorKey: "targetPlatforms",
    header: "target_platforms",
    enableSorting: false,
    cell: ({ getValue }) => (
      <div className="flex flex-wrap gap-1">
        {getValue<string[]>().map((platform) => (
          <Badge key={platform} variant="neutral" className="font-mono font-medium">
            {platform}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "complianceFlagged",
    header: "compliance_notes",
    cell: ({ getValue }) =>
      getValue<boolean>() ? (
        <StatusBadge tone="warning">
          <Flag />
          flagged
        </StatusBadge>
      ) : (
        <span className="text-subtle-foreground">—</span>
      ),
  },
  {
    accessorKey: "updated",
    header: "Updated",
    cell: ({ getValue }) => <span className="text-subtle-foreground">{getValue<string>()}</span>,
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    meta: { align: "right" },
    cell: () => (
      <Button variant="ghost" size="sm" className="text-brand">
        View playbook
      </Button>
    ),
  },
];

export function PlaybooksTable({ playbooks }: { playbooks: Playbook[] }) {
  return (
    <SectionCard title="Brand playbooks" flush>
      <DataTable
        columns={columns}
        data={playbooks}
        searchPlaceholder="Search brands or industries…"
      />
    </SectionCard>
  );
}
