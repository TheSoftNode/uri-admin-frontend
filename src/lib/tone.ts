import type { Tone } from "@/types/tone";

/** CSS colour for a tone, for SVG strokes/fills and inline indicator styles. */
export const toneColor: Record<Tone, string> = {
  neutral: "var(--subtle-foreground)",
  brand: "var(--brand)",
  info: "var(--info)",
  success: "var(--success)",
  warning: "var(--warning)",
  critical: "var(--critical)",
};

/** Tailwind text class for a tone. */
export const toneText: Record<Tone, string> = {
  neutral: "text-foreground",
  brand: "text-brand",
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  critical: "text-critical",
};

/** Tailwind background class for a tone (solid). */
export const toneBg: Record<Tone, string> = {
  neutral: "bg-subtle-foreground",
  brand: "bg-brand",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  critical: "bg-critical",
};
