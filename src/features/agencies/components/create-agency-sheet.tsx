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
import { AGENCY_TIERS, agencyTierLabel } from "@/features/agencies/lib";
import type { Agency, AgencyTier } from "@/features/agencies/types";

export function CreateAgencySheet({ onCreate }: { onCreate: (agency: Agency) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [tier, setTier] = useState<AgencyTier>("agency_starter");

  const submit = () => {
    if (!name.trim() || !ownerEmail.trim()) {
      toast.error("Name and owner email are required.");
      return;
    }
    onCreate({
      id: `agcy_${Math.random().toString(36).slice(2, 10)}`,
      name: name.trim(),
      ownerUserId: "",
      ownerEmail: ownerEmail.trim(),
      tier,
      brands: 0,
      maxBrands: tier === "agency_enterprise" ? null : tier === "agency_pro" ? 30 : 10,
      walletCredits: 0,
      perBrandCaps: true,
      status: "active",
    });
    toast.success(`Created ${name.trim()}.`);
    setOpen(false);
    setName("");
    setOwnerEmail("");
    setTier("agency_starter");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus />
          Create agency
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full gap-0 overflow-y-auto sm:max-w-sm">
        <SheetHeader className="gap-1 border-b border-border pb-5">
          <SheetTitle>Create agency</SheetTitle>
          <SheetDescription>Sets up the shared wallet and plan tier.</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-subtle-foreground">Agency name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="h-9" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-subtle-foreground">Owner email</label>
            <Input
              value={ownerEmail}
              onChange={(e) => setOwnerEmail(e.target.value)}
              placeholder="owner@agency.com"
              className="h-9"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-subtle-foreground">Plan tier</label>
            <Select value={tier} onValueChange={(v) => setTier(v as AgencyTier)}>
              <SelectTrigger className="h-9 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AGENCY_TIERS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {agencyTierLabel[t]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="soft" onClick={submit}>
            Create agency
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
