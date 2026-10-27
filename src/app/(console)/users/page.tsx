import type { Metadata } from "next";

import { KpiGrid } from "@/components/data-display/kpi-grid";
import { getUsers } from "@/features/users/api/get-users";
import { UsersTable } from "@/features/users/components/users-table";

export const metadata: Metadata = { title: "Users" };

export default async function UsersPage() {
  const { kpis, users, totalCount } = await getUsers();

  return (
    <div className="flex flex-col gap-5">
      <KpiGrid items={kpis} />
      <UsersTable users={users} totalCount={totalCount} />
    </div>
  );
}
