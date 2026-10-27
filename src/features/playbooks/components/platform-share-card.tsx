import { Meter } from "@/components/data-display/meter";
import type { PlatformShare } from "@/features/playbooks/types";

/** Sits in the KPI row: which platforms brands most often target. */
export function PlatformShareCard({ shares }: { shares: PlatformShare[] }) {
  return (
    <div className="flex h-full flex-col gap-3 rounded-2xl border bg-card p-5 shadow-card">
      <p className="text-[12px] font-semibold text-muted-foreground">
        Most-stated target_platforms
      </p>
      <ul className="flex flex-col gap-2.5">
        {shares.map((item) => (
          <li key={item.platform} className="grid grid-cols-[70px_1fr_36px] items-center gap-3">
            <span className="font-mono text-xs text-secondary-foreground">{item.platform}</span>
            <Meter value={item.share} label={item.platform} />
            <span className="text-right font-mono text-xs text-subtle-foreground tabular">
              {item.share}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
