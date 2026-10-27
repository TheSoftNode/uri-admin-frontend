/**
 * Semantic tones used across badges, indicators, charts and callouts.
 * Domain data carries a tone, never a raw colour, so the theme stays in charge.
 */
export type Tone = "neutral" | "brand" | "info" | "success" | "warning" | "critical";

export interface Kpi {
  id: string;
  label: string;
  value: string;
  hint?: string;
  tone?: Tone;
}
