import type { Metadata } from "next";

import { getInbox } from "@/features/inbox/api/get-inbox";
import { InboxConsole } from "@/features/inbox/components/inbox-console";

export const metadata: Metadata = { title: "Unified Inbox" };

export default async function InboxPage() {
  const data = await getInbox();

  return <InboxConsole data={data} />;
}
