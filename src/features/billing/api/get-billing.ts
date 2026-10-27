import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { billingFixture } from "@/features/billing/data/billing.fixtures";
import type { BillingPageData } from "@/features/billing/types";
import { cacheTags } from "@/lib/api/cache";

export async function getBilling(): Promise<BillingPageData> {
  "use cache";
  cacheLife("minutes");
  cacheTag(cacheTags.billing);

  // TODO(api): replace with `GET /api/admin/stats` (mrr/subscriptions) and a
  // wallet-attention listing built on `CreditService`/`UserCreditWallet`.
  return billingFixture;
}
