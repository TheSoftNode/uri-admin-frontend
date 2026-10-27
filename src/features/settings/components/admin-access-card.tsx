"use client";

import { useState } from "react";
import { toast } from "sonner";

import { KeyValueRow } from "@/components/data-display/key-value-row";
import { SectionCard } from "@/components/data-display/section-card";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Button } from "@/components/ui/button";
import { AddAdminSheet } from "@/features/settings/components/add-admin-sheet";
import type { AdminAccount } from "@/features/settings/types";

export function AdminAccessCard({ admins: initial }: { admins: AdminAccount[] }) {
  const [admins, setAdmins] = useState(initial);

  return (
    <SectionCard
      title="Admin access"
      description="ADMIN_EMAILS allowlist + per-user is_admin flag"
      action={<AddAdminSheet onAdd={(admin) => setAdmins((prev) => [...prev, admin])} />}
    >
      <div className="flex flex-col">
        {admins.map((admin) => (
          <KeyValueRow
            key={admin.email}
            label={
              <span className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[12.5px]">{admin.email}</span>
                <StatusBadge tone={admin.role === "super admin" ? "brand" : "neutral"}>
                  {admin.role}
                </StatusBadge>
              </span>
            }
          >
            <Button
              variant="ghost"
              size="sm"
              className="text-critical hover:bg-critical-soft"
              onClick={() => {
                setAdmins((prev) => prev.filter((a) => a.email !== admin.email));
                toast.success(`Revoked admin access for ${admin.email}.`);
              }}
            >
              Remove
            </Button>
          </KeyValueRow>
        ))}
      </div>
    </SectionCard>
  );
}
