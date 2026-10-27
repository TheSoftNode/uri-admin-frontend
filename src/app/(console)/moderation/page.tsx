import type { Metadata } from "next";

import { getModeration } from "@/features/moderation/api/get-moderation";
import { ModerationConsole } from "@/features/moderation/components/moderation-console";

export const metadata: Metadata = { title: "Content & Moderation" };

export default async function ModerationPage() {
  const data = await getModeration();

  return <ModerationConsole data={data} />;
}
