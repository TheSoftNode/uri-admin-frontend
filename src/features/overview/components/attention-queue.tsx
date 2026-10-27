import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { SectionCard } from "@/components/data-display/section-card";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Badge } from "@/components/ui/badge";
import type { AttentionItem } from "@/features/overview/types";
import { toneBg } from "@/lib/tone";
import { cn } from "@/lib/utils";

export function AttentionQueue({ items }: { items: AttentionItem[] }) {
  return (
    <SectionCard
      title="Needs your attention"
      action={
        <Badge variant="brand" className="font-mono">
          {items.length} open
        </Badge>
      }
      flush
    >
      <Stagger className="flex flex-col gap-0.5">
        {items.map((item) => (
          <StaggerItem key={item.id}>
            <div
              className={cn(
                "group flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-muted",
                item.tone === "critical" && "bg-critical-soft hover:bg-critical-soft",
              )}
            >
              <span
                className={cn("h-7 w-1 shrink-0 rounded-full", toneBg[item.tone])}
                aria-hidden
              />
              <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <p className="text-[13.5px] font-bold text-foreground">{item.title}</p>
                <p className="text-xs text-subtle-foreground">
                  {item.meta} · {item.age}
                </p>
              </div>
              <Link
                href={item.href}
                className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-brand"
              >
                {item.action}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </SectionCard>
  );
}
