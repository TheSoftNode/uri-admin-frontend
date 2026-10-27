"use client";

import { Ban, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { agencyStatusTone, agencyTierLabel } from "@/features/agencies/lib";
import type { Agency } from "@/features/agencies/types";
import { formatNumber } from "@/lib/format";

interface AgencyDetailSheetProps {
  agency: Agency | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTopUp: (agencyId: string, credits: number) => void;
  onTogglePerBrandCaps: (agencyId: string, enabled: boolean) => void;
  onRename: (agencyId: string, name: string) => void;
  onSetStatus: (agencyId: string, status: Agency["status"]) => void;
}

export function AgencyDetailSheet({
  agency,
  open,
  onOpenChange,
  onTopUp,
  onTogglePerBrandCaps,
  onRename,
  onSetStatus,
}: AgencyDetailSheetProps) {
  const [topUpAmount, setTopUpAmount] = useState("");
  const [name, setName] = useState(agency?.name ?? "");

  if (!agency) return null;

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setTopUpAmount("");
      }}
    >
      <SheetContent className="w-full gap-0 overflow-y-auto sm:max-w-md">
        <SheetHeader className="gap-3 border-b border-border pb-5">
          <div className="min-w-0">
            <SheetTitle className="truncate">{agency.name}</SheetTitle>
            <SheetDescription className="truncate">{agency.ownerEmail}</SheetDescription>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="brand">{agencyTierLabel[agency.tier]}</Badge>
            <Badge variant={agencyStatusTone[agency.status]}>{agency.status}</Badge>
          </div>
        </SheetHeader>

        <div className="flex flex-col gap-6 p-4">
          <section className="grid grid-cols-2 gap-3 text-[13px]">
            <div>
              <p className="text-[11px] font-medium text-subtle-foreground">Wallet credits</p>
              <p className="font-mono font-semibold text-foreground tabular">
                {formatNumber(agency.walletCredits)}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-subtle-foreground">Brands</p>
              <p className="font-mono text-foreground tabular">
                {agency.brands} / {agency.maxBrands ?? "∞"}
              </p>
            </div>
          </section>

          <Separator />

          <section className="flex flex-col gap-2.5">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase">Rename</p>
            <div className="flex gap-2">
              <Input value={name} onChange={(e) => setName(e.target.value)} className="h-9" />
              <Button
                size="sm"
                variant="outline"
                disabled={!name.trim() || name === agency.name}
                onClick={() => {
                  onRename(agency.id, name.trim());
                  toast.success("Agency renamed.");
                }}
              >
                Save
              </Button>
            </div>
          </section>

          <Separator />

          <section className="flex flex-col gap-2.5">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase">
              Top up wallet
            </p>
            <div className="flex gap-2">
              <Input
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                placeholder="Credits to add"
                className="h-9"
              />
              <Button
                size="sm"
                variant="soft"
                disabled={!topUpAmount}
                onClick={() => {
                  const credits = Number(topUpAmount);
                  if (!Number.isFinite(credits) || credits <= 0) {
                    toast.error("Enter a positive amount.");
                    return;
                  }
                  onTopUp(agency.id, credits);
                  toast.success(`Added ${formatNumber(credits)} credits.`);
                  setTopUpAmount("");
                }}
              >
                Top up
              </Button>
            </div>
          </section>

          <Separator />

          <section className="flex flex-col gap-2.5">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase">
              Per-brand caps
            </p>
            <div className="flex items-center justify-between rounded-xl bg-muted/40 px-3.5 py-2.5">
              <span className="text-[13px] text-foreground">
                {agency.perBrandCaps ? "Enabled" : "Disabled"}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  onTogglePerBrandCaps(agency.id, !agency.perBrandCaps);
                  toast.success(
                    agency.perBrandCaps ? "Per-brand caps disabled." : "Per-brand caps enabled.",
                  );
                }}
              >
                {agency.perBrandCaps ? "Disable" : "Enable"}
              </Button>
            </div>
          </section>

          <Separator />

          <section className="flex flex-col gap-2.5">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase">Status</p>
            {agency.status === "active" ? (
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  onSetStatus(agency.id, "suspended");
                  toast.success("Agency suspended.");
                }}
              >
                <Ban />
                Suspend agency
              </Button>
            ) : agency.status === "suspended" ? (
              <Button
                size="sm"
                variant="soft"
                onClick={() => {
                  onSetStatus(agency.id, "active");
                  toast.success("Agency reactivated.");
                }}
              >
                <CheckCircle2 />
                Reactivate agency
              </Button>
            ) : (
              <p className="text-[13px] text-subtle-foreground">
                This agency was cancelled by its owner.
              </p>
            )}
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
