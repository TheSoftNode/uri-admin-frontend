import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Stagger, StaggerItem } from "@/components/motion/stagger";
import type { PlatformSection } from "@/features/overview/types";
import { toneBg } from "@/lib/tone";
import { cn } from "@/lib/utils";

/** Live summary of every console section, each tile a shortcut into it. */
export function PlatformDirectory({ sections }: { sections: PlatformSection[] }) {
  return (
    <section aria-labelledby="platform-directory" className="flex flex-col gap-3">
      <h2 id="platform-directory" className="eyebrow">
        Across the platform
      </h2>
      <Stagger
        stagger={0.03}
        className="grid grid-cols-1 gap-2 rounded-2xl border bg-card p-2 shadow-card sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {sections.map((section) => (
          <StaggerItem key={section.href}>
            <Link
              href={section.href}
              className="group relative flex h-full flex-col gap-1.5 rounded-xl bg-muted px-4 py-3.5 transition-[background-color,transform,box-shadow] duration-200 outline-none hover:-translate-y-0.5 hover:bg-accent hover:shadow-card focus-visible:ring-[3px] focus-visible:ring-ring/30"
            >
              <span className="flex items-center justify-between gap-2 text-xs font-semibold text-muted-foreground">
                {section.name}
                <ArrowUpRight className="size-3.5 -translate-x-1 text-brand opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </span>
              <span className="font-mono text-lg leading-tight font-semibold tracking-tight text-foreground tabular">
                {section.stat}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-subtle-foreground">
                <span className={cn("size-1.5 shrink-0 rounded-full", toneBg[section.tone])} />
                {section.meta}
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
