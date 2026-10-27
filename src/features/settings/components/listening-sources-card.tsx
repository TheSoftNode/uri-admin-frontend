import { Code } from "@/components/data-display/callout";
import { SectionCard } from "@/components/data-display/section-card";
import { PolicySwitchList } from "@/features/settings/components/policy-switch-list";
import type { PolicyToggle } from "@/features/settings/types";

export function ListeningSourcesCard({ sources }: { sources: PolicyToggle[] }) {
  return (
    <SectionCard
      title="Listening — new source rollout"
      description={
        <>
          Every new Apify source defaults to <Code>approved: false</Code> until explicitly enabled
          here.
        </>
      }
    >
      <PolicySwitchList items={sources} />
    </SectionCard>
  );
}
