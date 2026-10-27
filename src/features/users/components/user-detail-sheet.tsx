"use client";

import { ShieldCheck, ShieldOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { AdminBadge, SubscriptionBadge, TrialBadge } from "@/features/users/components/user-status";
import { displayName } from "@/features/users/lib";
import type { AdminUserDetails } from "@/features/users/types";
import { formatDateTime, formatNumber, getInitials } from "@/lib/format";
import { PLAN_TIERS, planTierLabel } from "@/lib/plans";

interface UserDetailSheetProps {
  user: AdminUserDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdjustCredits: (userId: string, amount: number, reason: string) => void;
  onAdjustTrialCredits: (userId: string, amount: number, reason: string) => void;
  onExpireTrial: (userId: string) => void;
  onSetSubscription: (
    userId: string,
    planTierId: string,
    durationDays: number,
    reason: string,
  ) => void;
  onClearSubscription: (userId: string, reason: string) => void;
  onToggleAdmin: (userId: string, nextIsAdmin: boolean) => void;
}

export function UserDetailSheet({
  user,
  open,
  onOpenChange,
  onAdjustCredits,
  onAdjustTrialCredits,
  onExpireTrial,
  onSetSubscription,
  onClearSubscription,
  onToggleAdmin,
}: UserDetailSheetProps) {
  const [creditAmount, setCreditAmount] = useState("");
  const [creditReason, setCreditReason] = useState("");
  const [trialAmount, setTrialAmount] = useState("");
  const [trialReason, setTrialReason] = useState("");
  const [planTier, setPlanTier] = useState<string>(PLAN_TIERS[0]);
  const [durationDays, setDurationDays] = useState("30");
  const [subReason, setSubReason] = useState("");

  if (!user) return null;

  const resetForms = () => {
    setCreditAmount("");
    setCreditReason("");
    setTrialAmount("");
    setTrialReason("");
    setSubReason("");
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) resetForms();
      }}
    >
      <SheetContent className="w-full gap-0 overflow-y-auto sm:max-w-md">
        <SheetHeader className="gap-3 border-b border-border pb-5">
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[13px] font-bold text-brand">
              {getInitials(displayName(user))}
            </span>
            <div className="min-w-0">
              <SheetTitle className="truncate">{displayName(user)}</SheetTitle>
              <SheetDescription className="truncate">{user.email}</SheetDescription>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <SubscriptionBadge user={user} />
            <TrialBadge user={user} />
            <AdminBadge user={user} />
          </div>
        </SheetHeader>

        <div className="flex flex-col gap-6 p-4">
          <section className="grid grid-cols-2 gap-3 text-[13px]">
            <div>
              <p className="text-[11px] font-medium text-subtle-foreground">Credits balance</p>
              <p className="font-mono font-semibold text-foreground tabular">
                {formatNumber(user.creditsBalance ?? 0)}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-subtle-foreground">Joined</p>
              <p className="text-foreground">{formatDateTime(user.createdAt)}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-subtle-foreground">Content generated</p>
              <p className="font-mono text-foreground tabular">{formatNumber(user.contentCount)}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-subtle-foreground">Phone</p>
              <p className="text-foreground">{user.phone || "—"}</p>
            </div>
          </section>

          {user.brandProfiles.length > 0 && (
            <section className="flex flex-col gap-2">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase">
                Brand profiles
              </p>
              <div className="flex flex-col gap-1.5">
                {user.brandProfiles.map((brand) => (
                  <div
                    key={brand.id}
                    className="flex items-center justify-between rounded-xl bg-muted/40 px-3 py-2"
                  >
                    <span className="truncate text-[13px] font-medium text-foreground">
                      {brand.brandName || "Untitled brand"}
                    </span>
                    <span className="shrink-0 text-xs text-subtle-foreground">
                      {brand.industry || "—"}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {user.workspaces.length > 0 && (
            <section className="flex flex-col gap-2">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase">
                Workspaces
              </p>
              <div className="flex flex-wrap gap-1.5">
                {user.workspaces.map((workspace) => (
                  <Badge key={workspace.id} variant="secondary">
                    {workspace.name || "Untitled workspace"}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          <Separator />

          <section className="flex flex-col gap-2.5">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase">
              Adjust credits
            </p>
            <div className="flex gap-2">
              <Input
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
                placeholder="Amount, e.g. 50 or -20"
                className="h-9"
              />
            </div>
            <Input
              value={creditReason}
              onChange={(e) => setCreditReason(e.target.value)}
              placeholder="Reason (goes into the audit log)"
              className="h-9"
            />
            <Button
              size="sm"
              variant="soft"
              disabled={!creditAmount}
              onClick={() => {
                const amount = Number(creditAmount);
                if (!Number.isFinite(amount) || amount === 0) {
                  toast.error("Enter a non-zero amount.");
                  return;
                }
                onAdjustCredits(user.id, amount, creditReason);
                toast.success(`${amount > 0 ? "Granted" : "Removed"} ${Math.abs(amount)} credits.`);
                setCreditAmount("");
                setCreditReason("");
              }}
            >
              Apply credit adjustment
            </Button>
          </section>

          <Separator />

          <section className="flex flex-col gap-2.5">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase">Trial</p>
            <div className="flex gap-2">
              <Input
                value={trialAmount}
                onChange={(e) => setTrialAmount(e.target.value)}
                placeholder="Trial credit amount, e.g. 10 or -5"
                className="h-9"
              />
            </div>
            <Input
              value={trialReason}
              onChange={(e) => setTrialReason(e.target.value)}
              placeholder="Reason"
              className="h-9"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="soft"
                disabled={!trialAmount}
                onClick={() => {
                  const amount = Number(trialAmount);
                  if (!Number.isFinite(amount) || amount === 0) {
                    toast.error("Enter a non-zero amount.");
                    return;
                  }
                  onAdjustTrialCredits(user.id, amount, trialReason);
                  toast.success("Trial credits adjusted.");
                  setTrialAmount("");
                  setTrialReason("");
                }}
              >
                Adjust trial credits
              </Button>
              <Button
                size="sm"
                variant="destructive"
                disabled={!user.trialEnd}
                onClick={() => {
                  onExpireTrial(user.id);
                  toast.success("Trial expired.");
                }}
              >
                Expire trial
              </Button>
            </div>
          </section>

          <Separator />

          <section className="flex flex-col gap-2.5">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase">
              Subscription
            </p>
            <div className="flex gap-2">
              <Select value={planTier} onValueChange={setPlanTier}>
                <SelectTrigger className="h-9 flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PLAN_TIERS.map((tier) => (
                    <SelectItem key={tier} value={tier}>
                      {planTierLabel(tier)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
                placeholder="Days"
                className="h-9 w-20"
              />
            </div>
            <Input
              value={subReason}
              onChange={(e) => setSubReason(e.target.value)}
              placeholder="Reason"
              className="h-9"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="soft"
                onClick={() => {
                  const days = Number(durationDays);
                  if (!Number.isFinite(days) || days <= 0) {
                    toast.error("Enter a valid number of days.");
                    return;
                  }
                  onSetSubscription(user.id, planTier, days, subReason);
                  toast.success(`Set to ${planTierLabel(planTier)} for ${days} days.`);
                  setSubReason("");
                }}
              >
                Set subscription
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={!user.subscriptionTier}
                onClick={() => {
                  onClearSubscription(user.id, subReason);
                  toast.success("Reverted to free.");
                  setSubReason("");
                }}
              >
                Clear
              </Button>
            </div>
          </section>

          <Separator />

          <section className="flex flex-col gap-2.5">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase">
              Admin access
            </p>
            {user.isAdmin ? (
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  onToggleAdmin(user.id, false);
                  toast.success("Admin access revoked.");
                }}
              >
                <ShieldOff />
                Revoke admin access
              </Button>
            ) : (
              <Button
                size="sm"
                variant="soft"
                onClick={() => {
                  onToggleAdmin(user.id, true);
                  toast.success("Admin access granted.");
                }}
              >
                <ShieldCheck />
                Grant admin access
              </Button>
            )}
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
