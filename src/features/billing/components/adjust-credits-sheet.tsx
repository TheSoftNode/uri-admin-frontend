"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Wallet } from "@/features/billing/types";

interface AdjustCreditsSheetProps {
  wallet: Wallet | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdjust: (walletId: string, amount: number, reason: string) => void;
}

export function AdjustCreditsSheet({
  wallet,
  open,
  onOpenChange,
  onAdjust,
}: AdjustCreditsSheetProps) {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  if (!wallet) return null;

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) {
          setAmount("");
          setReason("");
        }
      }}
    >
      <SheetContent className="w-full gap-0 overflow-y-auto sm:max-w-sm">
        <SheetHeader className="gap-1 border-b border-border pb-5">
          <SheetTitle>Adjust credits</SheetTitle>
          <SheetDescription>{wallet.email}</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-1.5">
            <p className="text-[11px] font-medium text-subtle-foreground">
              Currently {wallet.creditsRemaining} remaining
            </p>
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount, e.g. 50 or -20"
              className="h-9"
            />
          </div>
          <Input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason (goes into the audit log)"
            className="h-9"
          />
          <Button
            variant="soft"
            disabled={!amount}
            onClick={() => {
              const parsed = Number(amount);
              if (!Number.isFinite(parsed) || parsed === 0) {
                toast.error("Enter a non-zero amount.");
                return;
              }
              onAdjust(wallet.id, parsed, reason);
              toast.success(`${parsed > 0 ? "Granted" : "Removed"} ${Math.abs(parsed)} credits.`);
              onOpenChange(false);
              setAmount("");
              setReason("");
            }}
          >
            Apply adjustment
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
