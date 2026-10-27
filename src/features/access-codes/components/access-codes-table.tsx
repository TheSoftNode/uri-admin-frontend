"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { DataTable } from "@/components/data-display/data-table";
import { Meter } from "@/components/data-display/meter";
import { SectionCard } from "@/components/data-display/section-card";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RedemptionsSheet } from "@/features/access-codes/components/redemptions-sheet";
import { isExpired, redemptionShare, statusLabel, statusTone } from "@/features/access-codes/lib";
import type { AccessCode, AccessCodeRedemption } from "@/features/access-codes/types";
import { formatDateTime, formatNumber } from "@/lib/format";
import { planTierLabel } from "@/lib/plans";

interface AccessCodesTableProps {
  codes: AccessCode[];
  redemptionsByCode: Record<string, AccessCodeRedemption[]>;
  onRevokeCode: (code: string) => void;
  onDeleteCode: (code: string) => void;
  onRestoreRedemption: (code: string, email: string) => void;
  onRevokeRedemption: (code: string, email: string) => void;
}

export function AccessCodesTable({
  codes,
  redemptionsByCode,
  onRevokeCode,
  onDeleteCode,
  onRestoreRedemption,
  onRevokeRedemption,
}: AccessCodesTableProps) {
  const [activeCode, setActiveCode] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const columns = useMemo<ColumnDef<AccessCode, unknown>[]>(
    () => [
      {
        accessorKey: "code",
        header: "Code",
        cell: ({ getValue }) => (
          <span className="rounded-lg bg-brand-soft px-2 py-1 font-mono text-xs font-semibold tracking-wider text-brand">
            {getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: "label",
        header: "Label",
        cell: ({ getValue }) => (
          <span className="max-w-50 truncate text-[13px] text-foreground">
            {getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: "planTierId",
        header: "Plan",
        cell: ({ row }) => (
          <span className="text-[13px] text-foreground">
            {planTierLabel(row.original.planTierId)} · {row.original.durationDays}d
          </span>
        ),
      },
      {
        id: "redemptions",
        header: "Redemptions",
        cell: ({ row }) => {
          const { redemptionCount, maxRedemptions } = row.original;
          const share = redemptionShare(row.original);
          return (
            <div className="flex w-36 flex-col gap-1.5">
              <span className="font-mono text-xs tabular">
                {formatNumber(redemptionCount)} /{" "}
                {maxRedemptions ? formatNumber(maxRedemptions) : "∞"}
              </span>
              {share !== null ? (
                <Meter value={share} tone={share >= 95 ? "warning" : "brand"} />
              ) : null}
            </div>
          );
        },
      },
      {
        id: "assigned",
        header: "Roster",
        cell: ({ row }) => {
          const { assignedEmails } = row.original;
          return assignedEmails.length > 0 ? (
            <Badge variant="info">{assignedEmails.length} invited</Badge>
          ) : (
            <Badge variant="neutral">Open</Badge>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const { status, isActive } = row.original;
          if (!isActive) return <StatusBadge tone="critical">Revoked</StatusBadge>;
          const expired = isExpired(row.original);
          return (
            <div className="flex flex-col gap-1">
              <StatusBadge tone={statusTone[status]}>{statusLabel[status]}</StatusBadge>
              {expired ? <span className="text-[11px] text-critical">Expired</span> : null}
            </div>
          );
        },
      },
      {
        accessorKey: "expiresAt",
        header: "Expires",
        cell: ({ getValue }) => {
          const value = getValue<string | null>();
          return (
            <span className="text-xs text-subtle-foreground">
              {value ? formatDateTime(value) : "Never"}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        meta: { align: "right" },
        cell: ({ row }) => {
          const original = row.original;
          const hasRedemptionData = (redemptionsByCode[original.code] ?? []).length > 0;
          return (
            <div className="flex justify-end gap-1.5 opacity-70 transition-opacity group-hover/row:opacity-100">
              {hasRedemptionData ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setActiveCode(original.code);
                    setSheetOpen(true);
                  }}
                >
                  Redemptions
                </Button>
              ) : null}
              {original.isActive ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-critical hover:bg-critical-soft"
                  onClick={() => {
                    onRevokeCode(original.code);
                    toast.success(`${original.code} revoked.`);
                  }}
                >
                  Revoke
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-critical hover:bg-critical-soft"
                  onClick={() => {
                    onDeleteCode(original.code);
                    toast.success(`${original.code} deleted.`);
                  }}
                >
                  Delete
                </Button>
              )}
            </div>
          );
        },
      },
    ],
    [redemptionsByCode, onRevokeCode, onDeleteCode],
  );

  return (
    <>
      <SectionCard title="All codes" flush>
        <DataTable columns={columns} data={codes} searchPlaceholder="Search codes…" />
      </SectionCard>

      <RedemptionsSheet
        code={activeCode}
        redemptions={activeCode ? (redemptionsByCode[activeCode] ?? []) : []}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onRestore={onRestoreRedemption}
        onRevoke={onRevokeRedemption}
      />
    </>
  );
}
