import { Sparkles } from "lucide-react";

import { SectionCard } from "@/components/data-display/section-card";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import type { JaneActivity as JaneActivityItem } from "@/features/overview/types";

export function JaneActivity({ items }: { items: JaneActivityItem[] }) {
  return (
    <SectionCard
      title={
        <span className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-lg bg-brand-soft text-brand">
            <Sparkles className="size-3.5" />
          </span>
          Jane — agent activity
        </span>
      }
      flush
    >
      <Stagger className="flex flex-col gap-0.5">
        {items.map((item) => (
          <StaggerItem key={item.id}>
            <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-muted">
              <span className="h-5 w-1 shrink-0 rounded-full bg-brand" aria-hidden />
              <p className="flex-1 text-[13px] text-secondary-foreground">{item.text}</p>
              <span className="font-mono text-[11px] text-subtle-foreground">{item.ago}</span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </SectionCard>
  );
}
