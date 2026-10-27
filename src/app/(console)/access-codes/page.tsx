import type { Metadata } from "next";

import { getAccessCodes } from "@/features/access-codes/api/get-access-codes";
import { AccessCodesConsole } from "@/features/access-codes/components/access-codes-console";

export const metadata: Metadata = { title: "Access Codes" };

export default async function AccessCodesPage() {
  const data = await getAccessCodes();

  return <AccessCodesConsole data={data} />;
}
