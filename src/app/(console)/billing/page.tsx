import type { Metadata } from "next";

import { getBilling } from "@/features/billing/api/get-billing";
import { BillingConsole } from "@/features/billing/components/billing-console";

export const metadata: Metadata = { title: "Billing & Revenue" };

export default async function BillingPage() {
  const data = await getBilling();

  return <BillingConsole data={data} />;
}
