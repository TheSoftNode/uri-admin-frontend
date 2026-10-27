import { ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { lifecycleStatus, planTierLabel, trialDaysRemaining } from "@/features/users/lib";
import type { AdminUser } from "@/features/users/types";

export function SubscriptionBadge({ user }: { user: AdminUser }) {
  if (!user.subscriptionTier) return <Badge variant="neutral">Free</Badge>;
  return <Badge variant="brand">{planTierLabel(user.subscriptionTier)}</Badge>;
}

export function TrialBadge({ user }: { user: AdminUser }) {
  const status = lifecycleStatus(user);
  if (status === "trial-active") {
    return <Badge variant="info">Trial · {trialDaysRemaining(user)}d left</Badge>;
  }
  if (status === "trial-ended") return <Badge variant="warning">Trial ended</Badge>;
  return <span className="text-xs text-subtle-foreground">—</span>;
}

export function AdminBadge({ user }: { user: AdminUser }) {
  if (!user.isAdmin) return null;
  return (
    <Badge variant="success">
      <ShieldCheck />
      Admin
    </Badge>
  );
}
