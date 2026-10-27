"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { EntityCell } from "@/components/data-display/entity-cell";
import { Button } from "@/components/ui/button";
import { AdminBadge, SubscriptionBadge, TrialBadge } from "@/features/users/components/user-status";
import { displayName } from "@/features/users/lib";
import type { AdminUserDetails } from "@/features/users/types";
import { formatDateTime, formatNumber } from "@/lib/format";

export function createUsersColumns(
  onView: (user: AdminUserDetails) => void,
): ColumnDef<AdminUserDetails, unknown>[] {
  return [
    {
      id: "name",
      accessorFn: (user) => displayName(user),
      header: "User",
      cell: ({ row }) => (
        <EntityCell name={displayName(row.original)} meta={row.original.email} avatar />
      ),
    },
    {
      id: "subscription",
      accessorFn: (user) => user.subscriptionTier ?? "free",
      header: "Subscription",
      cell: ({ row }) => <SubscriptionBadge user={row.original} />,
    },
    {
      id: "trial",
      accessorFn: (user) => user.trialEnd ?? "",
      header: "Trial",
      cell: ({ row }) => <TrialBadge user={row.original} />,
    },
    {
      accessorKey: "creditsBalance",
      header: "Credits",
      cell: ({ getValue }) => (
        <span className="font-mono tabular">{formatNumber(getValue<number>() ?? 0)}</span>
      ),
    },
    {
      id: "admin",
      accessorFn: (user) => (user.isAdmin ? "admin" : ""),
      header: "Role",
      cell: ({ row }) => <AdminBadge user={row.original} />,
    },
    {
      accessorKey: "createdAt",
      header: "Joined",
      cell: ({ getValue }) => (
        <span className="text-xs text-subtle-foreground">{formatDateTime(getValue<string>())}</span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      meta: { align: "right" },
      cell: ({ row }) => (
        <div className="flex justify-end opacity-70 transition-opacity group-hover/row:opacity-100">
          <Button variant="ghost" size="sm" onClick={() => onView(row.original)}>
            View
          </Button>
        </div>
      ),
    },
  ];
}
