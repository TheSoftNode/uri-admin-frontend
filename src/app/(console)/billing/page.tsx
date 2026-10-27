import { Download } from "lucide-react";
import type { Metadata } from "next";

import { KpiGrid } from "@/components/data-display/kpi-grid";
import { PageToolbar } from "@/components/layout/page-toolbar";
import { Button } from "@/components/ui/button";
import { getBilling } from "@/features/billing/api/get-billing";
import { RevenueCard } from "@/features/billing/components/revenue-card";
import { TrialFunnelCard } from "@/features/billing/components/trial-funnel-card";
import { WalletsTable } from "@/features/billing/components/wallets-table";

export const metadata: Metadata = { title: "Billing & Revenue" };

export default async function BillingPage() {
  const { kpis, revenue, funnel, wallets } = await getBilling();

  return (
    <div className="flex flex-col gap-5">
      <PageToolbar
        actions={
          <Button>
            <Download />
            Export revenue report
          </Button>
        }
      />
      <KpiGrid items={kpis} />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.6fr_1fr]">
        <RevenueCard revenue={revenue} />
        <TrialFunnelCard funnel={funnel} />
      </div>
      <WalletsTable wallets={wallets} />
    </div>
  );
}
