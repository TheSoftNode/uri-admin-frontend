"use client";

import { Download } from "lucide-react";
import { useState } from "react";

import { PageToolbar } from "@/components/layout/page-toolbar";
import { Button } from "@/components/ui/button";
import { AdjustCreditsSheet } from "@/features/billing/components/adjust-credits-sheet";
import { BillingStatsPanel } from "@/features/billing/components/billing-stats";
import { RevenueCard } from "@/features/billing/components/revenue-card";
import { TrialFunnelCard } from "@/features/billing/components/trial-funnel-card";
import { WalletsTable } from "@/features/billing/components/wallets-table";
import type { BillingPageData } from "@/features/billing/types";

export function BillingConsole({ data }: { data: BillingPageData }) {
  const [wallets, setWallets] = useState(data.wallets);
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const selectedWallet = wallets.find((w) => w.id === selectedWalletId) ?? null;

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
      <BillingStatsPanel stats={data.stats} />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.6fr_1fr]">
        <RevenueCard revenue={data.revenue} className="h-full" />
        <TrialFunnelCard funnel={data.funnel} className="h-full" />
      </div>
      <WalletsTable
        wallets={wallets}
        onAdjust={(wallet) => {
          setSelectedWalletId(wallet.id);
          setSheetOpen(true);
        }}
      />

      <AdjustCreditsSheet
        wallet={selectedWallet}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onAdjust={(walletId, amount) => {
          setWallets((prev) =>
            prev.map((w) =>
              w.id === walletId
                ? { ...w, creditsRemaining: Math.max(0, w.creditsRemaining + amount) }
                : w,
            ),
          );
        }}
      />
    </div>
  );
}
