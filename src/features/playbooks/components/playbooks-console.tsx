"use client";

import { ShieldQuestion } from "lucide-react";
import { useState } from "react";

import { Callout, Code } from "@/components/data-display/callout";
import { StatCard } from "@/components/data-display/stat-card";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { PlatformShareCard } from "@/features/playbooks/components/platform-share-card";
import { PlaybookDetailSheet } from "@/features/playbooks/components/playbook-detail-sheet";
import { PlaybooksTable } from "@/features/playbooks/components/playbooks-table";
import type { Playbook, PlaybooksPageData } from "@/features/playbooks/types";

export function PlaybooksConsole({ data }: { data: PlaybooksPageData }) {
  const [selected, setSelected] = useState<Playbook | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <Callout tone="warning" icon={ShieldQuestion}>
        <Code>guardrails</Code> and <Code>compliance_notes</Code> are self-reported by the brand
        owner — there is no moderation step on this data today. This view exists so support can see
        them without a database query.
      </Callout>
      <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.kpis.map((kpi) => (
          <StaggerItem key={kpi.id}>
            <StatCard label={kpi.label} value={kpi.value} hint={kpi.hint} tone={kpi.tone} />
          </StaggerItem>
        ))}
        <StaggerItem>
          <PlatformShareCard shares={data.platformShares} />
        </StaggerItem>
      </Stagger>
      <PlaybooksTable
        playbooks={data.playbooks}
        onView={(playbook) => {
          setSelected(playbook);
          setSheetOpen(true);
        }}
      />

      <PlaybookDetailSheet playbook={selected} open={sheetOpen} onOpenChange={setSheetOpen} />
    </div>
  );
}
