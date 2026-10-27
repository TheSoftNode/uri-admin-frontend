import { Sparkline } from "@/components/charts/sparkline";
import { AnimatedNumber } from "@/components/motion/animated-number";
import type { OverviewData } from "@/features/overview/types";

interface PulseStripProps {
  pulse: OverviewData["pulse"];
}

/** Today's throughput at a glance: tiles inside one card, no dividers. */
export function PulseStrip({ pulse }: PulseStripProps) {
  return (
    <section
      aria-label="Today's platform pulse"
      className="grid grid-cols-1 gap-2 rounded-2xl border bg-card p-2 shadow-card sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1.35fr]"
    >
      <PulseTile label="Posts published today">
        <AnimatedNumber value={pulse.postsToday} />
      </PulseTile>
      <PulseTile label="DM replies sent">
        <AnimatedNumber value={pulse.dmRepliesToday} />
      </PulseTile>
      <PulseTile label="Ads spend today">
        <AnimatedNumber value={pulse.adSpendTodayNgn} format="ngn-compact" />
      </PulseTile>
      <div className="flex items-center justify-between gap-4 rounded-xl bg-muted px-4 py-3.5">
        <div className="flex flex-col gap-1.5">
          <p className="flex items-center gap-1.5 eyebrow">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
            </span>
            Signal
          </p>
          <p className="text-xs text-muted-foreground">Collection + publish throughput</p>
        </div>
        <Sparkline values={pulse.signal} />
      </div>
    </section>
  );
}

function PulseTile({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-muted px-4 py-3.5">
      <p className="eyebrow">{label}</p>
      <p className="font-mono text-[22px] leading-none font-semibold tracking-tight text-foreground tabular">
        {children}
      </p>
    </div>
  );
}
