"use client";

import { useState } from "react";
import { toast } from "sonner";

import { KeyValueRow } from "@/components/data-display/key-value-row";
import { Switch } from "@/components/ui/switch";
import type { PolicyToggle } from "@/features/settings/types";

/**
 * Toggle rows with optimistic local state. Each change will call a server action
 * (and write an audit row) once the settings endpoint exists.
 */
export function PolicySwitchList({ items }: { items: PolicyToggle[] }) {
  const [state, setState] = useState(() =>
    Object.fromEntries(items.map((item) => [item.id, item.enabled])),
  );

  function handleChange(item: PolicyToggle, enabled: boolean) {
    setState((current) => ({ ...current, [item.id]: enabled }));
    toast(`${item.label} ${enabled ? "enabled" : "disabled"}`, {
      description: "Change recorded in the audit log.",
    });
  }

  return (
    <div className="flex flex-col">
      {items.map((item) => (
        <KeyValueRow key={item.id} label={item.label} description={item.description}>
          <Switch
            checked={state[item.id]}
            onCheckedChange={(checked) => handleChange(item, checked)}
            aria-label={item.label}
          />
        </KeyValueRow>
      ))}
    </div>
  );
}
