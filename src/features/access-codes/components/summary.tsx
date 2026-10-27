import { Ban, Gift, Ticket, Users as UsersIcon } from "lucide-react";

import { AnimatedNumber } from "@/components/motion/animated-number";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { StatCard } from "@/components/data-display/stat-card";
import type { AccessCode } from "@/features/access-codes/types";

/** Rolled up client-side from the code list — there's no separate stats
 * endpoint for access codes, the same way a real admin would read it off
 * `listAccessCodes()`. */
export function Summary({ codes }: { codes: AccessCode[] }) {
  const active = codes.filter((c) => c.isActive).length;
  const totalRedemptions = codes.reduce((sum, c) => sum + c.redemptionCount, 0);
  const invited = codes.filter((c) => c.assignedEmails.length > 0).length;
  const revoked = codes.filter((c) => !c.isActive).length;

  return (
    <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StaggerItem>
        <StatCard icon={Ticket} label="Active codes" value={<AnimatedNumber value={active} />} />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={Gift}
          tone="brand"
          label="Total redemptions"
          value={<AnimatedNumber value={totalRedemptions} />}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={UsersIcon}
          tone="info"
          label="Invite-only codes"
          value={<AnimatedNumber value={invited} />}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          icon={Ban}
          tone="critical"
          label="Revoked"
          value={<AnimatedNumber value={revoked} />}
        />
      </StaggerItem>
    </Stagger>
  );
}
