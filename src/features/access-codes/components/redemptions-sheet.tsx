"use client";

import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { redemptionStatusLabel, redemptionStatusTone } from "@/features/access-codes/lib";
import type { AccessCodeRedemption } from "@/features/access-codes/types";
import { formatDateTime } from "@/lib/format";
import { planTierLabel } from "@/lib/plans";

interface RedemptionsSheetProps {
  code: string | null;
  redemptions: AccessCodeRedemption[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRestore: (code: string, email: string) => void;
  onRevoke: (code: string, email: string) => void;
  onResend: (code: string, email: string) => void;
}

export function RedemptionsSheet({
  code,
  redemptions,
  open,
  onOpenChange,
  onRestore,
  onRevoke,
  onResend,
}: RedemptionsSheetProps) {
  if (!code) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 overflow-y-auto sm:max-w-md">
        <SheetHeader className="gap-1 border-b border-border pb-5">
          <SheetTitle className="font-mono">{code}</SheetTitle>
          <SheetDescription>
            Who has redeemed this code, and what each redemption&apos;s access window looks like.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-3 p-4">
          {redemptions.length === 0 ? (
            <p className="py-8 text-center text-sm text-subtle-foreground">
              No redemptions recorded yet.
            </p>
          ) : (
            redemptions.map((r) => (
              <div
                key={r.email ?? r.userId ?? r.redeemedAt}
                className="flex flex-col gap-2 rounded-xl border border-border bg-card p-3.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold text-foreground">
                      {r.email || "Unknown"}
                    </p>
                    <p className="text-xs text-subtle-foreground">{planTierLabel(r.planTierId)}</p>
                  </div>
                  <Badge variant={redemptionStatusTone[r.effectiveStatus]}>
                    {redemptionStatusLabel[r.effectiveStatus]}
                  </Badge>
                </div>

                {r.accessStart && r.accessEnd ? (
                  <p className="text-xs text-subtle-foreground">
                    {formatDateTime(r.accessStart)} → {formatDateTime(r.accessEnd)}
                  </p>
                ) : null}
                {r.revocationReason ? (
                  <p className="text-xs text-critical">{r.revocationReason}</p>
                ) : null}

                <div className="flex gap-1.5 pt-1">
                  {r.effectiveStatus === "active" ? (
                    <Button
                      size="xs"
                      variant="destructive"
                      onClick={() => {
                        if (!r.email) return;
                        onRevoke(code, r.email);
                        toast.success(`Revoked ${r.email}'s access.`);
                      }}
                    >
                      Revoke access
                    </Button>
                  ) : null}
                  {r.effectiveStatus === "revoked" || r.effectiveStatus === "lapsed" ? (
                    <Button
                      size="xs"
                      variant="soft"
                      onClick={() => {
                        if (!r.email) return;
                        onRestore(code, r.email);
                        toast.success(`Restored ${r.email}'s access.`);
                      }}
                    >
                      Restore
                    </Button>
                  ) : null}
                  {r.effectiveStatus === "not_redeemed" ? (
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() => {
                        if (!r.email) return;
                        onResend(code, r.email);
                        toast.success(`Resent the code to ${r.email}.`);
                      }}
                    >
                      Resend code
                    </Button>
                  ) : null}
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
