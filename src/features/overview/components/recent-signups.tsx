import Link from "next/link";

import { Stagger, StaggerItem } from "@/components/motion/stagger";
import type { Signup } from "@/features/overview/types";
import { getInitials } from "@/lib/format";

export function RecentSignups({ signups }: { signups: Signup[] }) {
  return (
    <section aria-labelledby="recent-signups" className="flex flex-col gap-4">
      <div className="flex items-baseline gap-3">
        <h2 id="recent-signups" className="eyebrow">
          Recent signups
        </h2>
        <Link href="/users" className="text-xs font-bold text-brand">
          View all users
        </Link>
      </div>
      <Stagger stagger={0.05} className="flex gap-5 overflow-x-auto pb-1">
        {signups.map((signup) => (
          <StaggerItem
            key={signup.id}
            className="flex w-[78px] shrink-0 flex-col items-center gap-2"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-linear-to-br from-brand-soft to-accent text-xs font-bold text-brand shadow-card">
              {getInitials(signup.name)}
            </span>
            <span className="w-full truncate text-center text-[11px] font-medium text-secondary-foreground">
              {signup.name}
            </span>
            <span className="font-mono text-[10px] text-subtle-foreground">{signup.ago}</span>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
