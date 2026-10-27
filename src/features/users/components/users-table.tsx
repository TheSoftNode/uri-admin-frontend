"use client";

import { Download } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { DataTable } from "@/components/data-display/data-table";
import { PageToolbar } from "@/components/layout/page-toolbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUsersColumns } from "@/features/users/components/users-columns";
import { UserDetailSheet } from "@/features/users/components/user-detail-sheet";
import { PLAN_TIERS, planTierLabel } from "@/features/users/lib";
import type { AdminUserDetails } from "@/features/users/types";

export function UsersTable({ users: initialUsers }: { users: AdminUserDetails[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const visible = useMemo(
    () =>
      tierFilter === "all"
        ? users
        : users.filter((user) => (user.subscriptionTier ?? "free") === tierFilter),
    [users, tierFilter],
  );

  const selectedUser = users.find((user) => user.id === selectedUserId) ?? null;

  const updateUser = (userId: string, patch: Partial<AdminUserDetails>) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, ...patch } : user)));
  };

  const columns = useMemo(
    () =>
      createUsersColumns((user) => {
        setSelectedUserId(user.id);
        setSheetOpen(true);
      }),
    [],
  );

  return (
    <div className="flex flex-col gap-4">
      <PageToolbar
        actions={
          <>
            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger className="w-40" aria-label="Filter by plan">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All plans</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                {PLAN_TIERS.map((tier) => (
                  <SelectItem key={tier} value={tier}>
                    {planTierLabel(tier)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() =>
                toast.success(`Exported ${users.length} email${users.length === 1 ? "" : "s"}.`)
              }
            >
              <Download />
              Export emails
            </Button>
          </>
        }
      />

      <Card className="py-3">
        <div className="px-3">
          <DataTable
            columns={columns}
            data={visible}
            searchPlaceholder="Search name or email…"
            pageSize={8}
            emptyMessage="No users match these filters."
          />
        </div>
      </Card>

      <UserDetailSheet
        user={selectedUser}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onAdjustCredits={(userId, amount) => {
          const user = users.find((u) => u.id === userId);
          if (!user) return;
          updateUser(userId, { creditsBalance: Math.max(0, (user.creditsBalance ?? 0) + amount) });
        }}
        onAdjustTrialCredits={(userId, amount) => {
          const user = users.find((u) => u.id === userId);
          if (!user) return;
          updateUser(userId, { creditsBalance: Math.max(0, (user.creditsBalance ?? 0) + amount) });
        }}
        onExpireTrial={(userId) => {
          updateUser(userId, { trialEnd: new Date().toISOString(), creditsBalance: 0 });
        }}
        onSetSubscription={(userId, planTierId) => {
          updateUser(userId, {
            subscriptionTier: planTierId,
            trialStart: undefined,
            trialEnd: undefined,
          });
        }}
        onClearSubscription={(userId) => {
          updateUser(userId, { subscriptionTier: undefined });
        }}
        onToggleAdmin={(userId, nextIsAdmin) => {
          updateUser(userId, { isAdmin: nextIsAdmin });
        }}
      />
    </div>
  );
}
