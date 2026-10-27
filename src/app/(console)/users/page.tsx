import type { Metadata } from "next";

import { getUsers } from "@/features/users/api/get-users";
import { StatsPanel } from "@/features/users/components/stats-panel";
import { UsersTable } from "@/features/users/components/users-table";

export const metadata: Metadata = { title: "Users" };

export default async function UsersPage() {
  const { stats, users } = await getUsers();

  return (
    <div className="flex flex-col gap-5">
      <StatsPanel stats={stats} />
      <UsersTable users={users} />
    </div>
  );
}
