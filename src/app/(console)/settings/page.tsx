import type { Metadata } from "next";

import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { getSettings } from "@/features/settings/api/get-settings";
import { AdminAccessCard } from "@/features/settings/components/admin-access-card";
import { BudgetCapsCard } from "@/features/settings/components/budget-caps-card";
import { ListeningSourcesCard } from "@/features/settings/components/listening-sources-card";
import { SecurityPolicyCard } from "@/features/settings/components/security-policy-card";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const { admins, security, budgets, listeningSources } = await getSettings();

  return (
    <Stagger className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      <StaggerItem>
        <AdminAccessCard admins={admins} />
      </StaggerItem>
      <StaggerItem>
        <SecurityPolicyCard security={security} />
      </StaggerItem>
      <StaggerItem>
        <BudgetCapsCard budgets={budgets} />
      </StaggerItem>
      <StaggerItem>
        <ListeningSourcesCard sources={listeningSources} />
      </StaggerItem>
    </Stagger>
  );
}
