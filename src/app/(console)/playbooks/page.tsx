import { ShieldQuestion } from "lucide-react";
import type { Metadata } from "next";

import { Callout, Code } from "@/components/data-display/callout";
import { StatCard } from "@/components/data-display/stat-card";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { getPlaybooks } from "@/features/playbooks/api/get-playbooks";
import { PlatformShareCard } from "@/features/playbooks/components/platform-share-card";
import { PlaybooksTable } from "@/features/playbooks/components/playbooks-table";

export const metadata: Metadata = { title: "Brand Playbooks" };

export default async function PlaybooksPage() {
  const { kpis, platformShares, playbooks } = await getPlaybooks();

  return (
    <div className="flex flex-col gap-5">
      <Callout tone="warning" icon={ShieldQuestion}>
        <Code>guardrails</Code> and <Code>compliance_notes</Code> are self-reported by the brand
        owner — there is no moderation step on this data today. This view exists so support can see
        them without a database query.
      </Callout>
      <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <StaggerItem key={kpi.id}>
            <StatCard label={kpi.label} value={kpi.value} hint={kpi.hint} tone={kpi.tone} />
          </StaggerItem>
        ))}
        <StaggerItem>
          <PlatformShareCard shares={platformShares} />
        </StaggerItem>
      </Stagger>
      <PlaybooksTable playbooks={playbooks} />
    </div>
  );
}
