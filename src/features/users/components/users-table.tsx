"use client";

import { Download } from "lucide-react";
import { useMemo, useState } from "react";

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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usersColumns } from "@/features/users/components/users-columns";
import type { Plan, PlatformUser, UserSegment } from "@/features/users/types";

const segments: { value: UserSegment; label: string }[] = [
  { value: "all", label: "All users" },
  { value: "admins", label: "Admins" },
  { value: "support", label: "Support access" },
  { value: "flagged", label: "Flagged" },
];

const plans: Plan[] = ["Starter", "Growth", "Pro", "Agency"];

function matchesSegment(user: PlatformUser, segment: UserSegment): boolean {
  switch (segment) {
    case "admins":
      return user.role === "admin";
    case "support":
      return user.role === "support";
    case "flagged":
      return user.flagged;
    default:
      return true;
  }
}

interface UsersTableProps {
  users: PlatformUser[];
  totalCount: number;
}

export function UsersTable({ users, totalCount }: UsersTableProps) {
  const [segment, setSegment] = useState<UserSegment>("all");
  const [plan, setPlan] = useState<Plan | "all">("all");

  const visible = useMemo(
    () =>
      users.filter(
        (user) => matchesSegment(user, segment) && (plan === "all" || user.plan === plan),
      ),
    [users, segment, plan],
  );

  return (
    <div className="flex flex-col gap-4">
      <PageToolbar
        actions={
          <>
            <Select value={plan} onValueChange={(value) => setPlan(value as Plan | "all")}>
              <SelectTrigger className="w-36" aria-label="Filter by plan">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All plans</SelectItem>
                {plans.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button>
              <Download />
              Export CSV
            </Button>
          </>
        }
      >
        <Tabs value={segment} onValueChange={(value) => setSegment(value as UserSegment)}>
          <TabsList>
            {segments.map((s) => (
              <TabsTrigger key={s.value} value={s.value}>
                {s.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </PageToolbar>

      <Card className="py-3">
        <div className="px-3">
          <DataTable
            columns={usersColumns}
            data={visible}
            searchPlaceholder="Search name or email…"
            pageSize={8}
            totalCount={segment === "all" && plan === "all" ? totalCount : undefined}
            emptyMessage="No users match these filters."
          />
        </div>
      </Card>
    </div>
  );
}
