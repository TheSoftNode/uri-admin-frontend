"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { parseEmailList } from "@/features/access-codes/lib";
import type { AccessCode } from "@/features/access-codes/types";
import { PLAN_TIERS, planTierLabel } from "@/lib/plans";

interface CreateCodeSheetProps {
  onCreate: (code: AccessCode) => void;
}

export function CreateCodeSheet({ onCreate }: CreateCodeSheetProps) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [planTierId, setPlanTierId] = useState<string>(PLAN_TIERS[0]);
  const [durationDays, setDurationDays] = useState("30");
  const [maxRedemptions, setMaxRedemptions] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [label, setLabel] = useState("");
  const [assignedEmailsRaw, setAssignedEmailsRaw] = useState("");
  const [sendEmail, setSendEmail] = useState(true);

  const reset = () => {
    setCode("");
    setPlanTierId(PLAN_TIERS[0]);
    setDurationDays("30");
    setMaxRedemptions("");
    setExpiresAt("");
    setLabel("");
    setAssignedEmailsRaw("");
    setSendEmail(true);
  };

  const submit = () => {
    const days = Number(durationDays);
    if (!Number.isFinite(days) || days <= 0) {
      toast.error("Enter a valid duration in days.");
      return;
    }
    if (!label.trim()) {
      toast.error("Give this code a label so it's identifiable later.");
      return;
    }
    const assignedEmails = parseEmailList(assignedEmailsRaw);
    const generatedCode =
      code.trim().toUpperCase() || `CODE${Math.floor(Math.random() * 9000 + 1000)}`;

    onCreate({
      code: generatedCode,
      planTierId,
      durationDays: days,
      maxRedemptions: maxRedemptions ? Number(maxRedemptions) : null,
      redemptionCount: 0,
      isActive: true,
      expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
      label: label.trim(),
      createdBy: "urifusion@gmail.com",
      createdAt: new Date().toISOString(),
      assignedEmails,
      status: assignedEmails.length > 0 ? "pending" : "unassigned",
    });

    toast.success(
      assignedEmails.length > 0 && sendEmail
        ? `Created ${generatedCode} and emailed ${assignedEmails.length} invite${assignedEmails.length === 1 ? "" : "s"}.`
        : `Created ${generatedCode}.`,
    );
    setOpen(false);
    reset();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus />
          Create code
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full gap-0 overflow-y-auto sm:max-w-md">
        <SheetHeader className="gap-1 border-b border-border pb-5">
          <SheetTitle>Create access code</SheetTitle>
          <SheetDescription>
            Grants the plan tier below for the given duration the moment it&apos;s redeemed.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-subtle-foreground">
              Code (optional — auto-generated if blank)
            </label>
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. PARTNER2026"
              className="h-9 font-mono"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-subtle-foreground">Label</label>
            <Input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="What this code is for"
              className="h-9"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium text-subtle-foreground">Plan tier</label>
              <Select value={planTierId} onValueChange={setPlanTierId}>
                <SelectTrigger className="h-9 w-full">
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
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium text-subtle-foreground">
                Duration (days)
              </label>
              <Input
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
                className="h-9"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium text-subtle-foreground">
                Max redemptions
              </label>
              <Input
                value={maxRedemptions}
                onChange={(e) => setMaxRedemptions(e.target.value)}
                placeholder="Unlimited"
                className="h-9"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium text-subtle-foreground">Expires</label>
              <Input
                type="date"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="h-9"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-subtle-foreground">
              Assigned emails (optional — blank makes a shared/open code)
            </label>
            <Textarea
              value={assignedEmailsRaw}
              onChange={(e) => setAssignedEmailsRaw(e.target.value)}
              placeholder="One per line, or comma-separated"
              className="min-h-20 text-[13px]"
            />
          </div>

          {parseEmailList(assignedEmailsRaw).length > 0 ? (
            <label className="flex items-center gap-2 text-[13px] text-foreground">
              <input
                type="checkbox"
                checked={sendEmail}
                onChange={(e) => setSendEmail(e.target.checked)}
                className="accent-brand"
              />
              Email the code to this roster right away
            </label>
          ) : null}

          <Button variant="soft" onClick={submit}>
            Create code
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
