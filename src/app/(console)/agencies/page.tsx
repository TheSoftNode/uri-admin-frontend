import type { Metadata } from "next";

import { getAgencies } from "@/features/agencies/api/get-agencies";
import { AgenciesConsole } from "@/features/agencies/components/agencies-console";

export const metadata: Metadata = { title: "Agencies" };

export default async function AgenciesPage() {
  const data = await getAgencies();

  return <AgenciesConsole data={data} />;
}
