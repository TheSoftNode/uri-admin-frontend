import type { Metadata } from "next";

import { getPlaybooks } from "@/features/playbooks/api/get-playbooks";
import { PlaybooksConsole } from "@/features/playbooks/components/playbooks-console";

export const metadata: Metadata = { title: "Brand Playbooks" };

export default async function PlaybooksPage() {
  const data = await getPlaybooks();

  return <PlaybooksConsole data={data} />;
}
