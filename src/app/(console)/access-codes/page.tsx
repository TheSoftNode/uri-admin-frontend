import { Plus } from "lucide-react";
import type { Metadata } from "next";

import { Callout, Code } from "@/components/data-display/callout";
import { KpiGrid } from "@/components/data-display/kpi-grid";
import { PageToolbar } from "@/components/layout/page-toolbar";
import { Button } from "@/components/ui/button";
import { getAccessCodes } from "@/features/access-codes/api/get-access-codes";
import { AccessCodesTable } from "@/features/access-codes/components/access-codes-table";

export const metadata: Metadata = { title: "Access Codes" };

export default async function AccessCodesPage() {
  const { kpis, codes } = await getAccessCodes();

  return (
    <div className="flex flex-col gap-5">
      <PageToolbar
        actions={
          <Button>
            <Plus />
            Create code
          </Button>
        }
      />
      <Callout tone="info">
        Every redeemed code mints straight into the wallet&apos;s own <Code>bonus_credits</Code>{" "}
        field — the same field real promo and influencer grants already use. There&apos;s no
        separate code ledger today; this view is the front end for it.
      </Callout>
      <KpiGrid items={kpis} />
      <AccessCodesTable codes={codes} />
    </div>
  );
}
