import type { PlatformAlert } from "@/features/alerts/types";
import type { Tone } from "@/types/tone";

export function isActive(alert: PlatformAlert): boolean {
  return alert.dismissedAt === null;
}

/** Derived display tier from occurrence count — the real model has no
 * severity field, so this is a presentation-only heuristic, not data. */
export function occurrenceTone(occurrences: number): Tone {
  if (occurrences >= 50) return "critical";
  if (occurrences >= 10) return "warning";
  return "info";
}
