import { KeyValueRow } from "@/components/data-display/key-value-row";
import { SectionCard } from "@/components/data-display/section-card";
import { PolicySwitchList } from "@/features/settings/components/policy-switch-list";
import type { SettingsPageData } from "@/features/settings/types";

export function SecurityPolicyCard({ security }: { security: SettingsPageData["security"] }) {
  return (
    <SectionCard title="Security policy" description="Applies to every console account">
      <PolicySwitchList items={security.toggles} />
      {security.values.map((value) => (
        <KeyValueRow key={value.id} label={value.label}>
          <span className="font-mono text-[12.5px] text-foreground">{value.value}</span>
        </KeyValueRow>
      ))}
    </SectionCard>
  );
}
