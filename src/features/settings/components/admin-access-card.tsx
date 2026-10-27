import { Plus } from "lucide-react";

import { KeyValueRow } from "@/components/data-display/key-value-row";
import { SectionCard } from "@/components/data-display/section-card";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Button } from "@/components/ui/button";
import type { AdminAccount } from "@/features/settings/types";

export function AdminAccessCard({ admins }: { admins: AdminAccount[] }) {
  return (
    <SectionCard
      title="Admin access"
      description="ADMIN_EMAILS allowlist + per-user is_admin flag"
      action={
        <Button variant="soft" size="sm">
          <Plus />
          Add admin
        </Button>
      }
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
            <Button variant="ghost" size="sm" className="text-critical hover:bg-critical-soft">
              Remove
            </Button>
          </KeyValueRow>
        ))}
      </div>
    </SectionCard>
  );
}
