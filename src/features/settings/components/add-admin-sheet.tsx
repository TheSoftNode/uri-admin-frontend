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
import type { AdminAccount } from "@/features/settings/types";

export function AddAdminSheet({ onAdd }: { onAdd: (admin: AdminAccount) => void }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<AdminAccount["role"]>("support");

  const submit = () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Enter a valid email.");
      return;
    }
    onAdd({ email: email.trim(), role });
    toast.success(`Granted admin access to ${email.trim()}.`);
    setOpen(false);
    setEmail("");
    setRole("support");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="soft" size="sm">
          <Plus />
          Add admin
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full gap-0 overflow-y-auto sm:max-w-sm">
        <SheetHeader className="gap-1 border-b border-border pb-5">
          <SheetTitle>Grant admin access</SheetTitle>
          <SheetDescription>
            Adds the email to the ADMIN_EMAILS allowlist and sets is_admin on their account.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-subtle-foreground">Email</label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="person@urisocial.com"
              className="h-9"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-subtle-foreground">Role</label>
            <Select value={role} onValueChange={(v) => setRole(v as AdminAccount["role"])}>
              <SelectTrigger className="h-9 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="super admin">Super admin</SelectItem>
                <SelectItem value="support">Support</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="soft" onClick={submit}>
            Grant access
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
