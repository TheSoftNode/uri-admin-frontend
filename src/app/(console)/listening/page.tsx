import type { Metadata } from "next";

import { getListening } from "@/features/listening/api/get-listening";
import { ListeningConsole } from "@/features/listening/components/listening-console";

export const metadata: Metadata = { title: "Listening Curation" };

export default async function ListeningPage() {
  const data = await getListening();

  return <ListeningConsole data={data} />;
}
