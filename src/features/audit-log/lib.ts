import type { AuditEntry } from "@/features/audit-log/types";

export type AuditRange = "7d" | "30d" | "90d";

const RANGE_DAYS: Record<AuditRange, number> = { "7d": 7, "30d": 30, "90d": 90 };

export function withinRange(entry: AuditEntry, range: AuditRange, now = new Date()): boolean {
  const cutoff = now.getTime() - RANGE_DAYS[range] * 24 * 60 * 60 * 1000;
  return new Date(entry.whenIso).getTime() >= cutoff;
}

function csvEscape(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

export function toCsv(entries: AuditEntry[]): string {
  const header = ["Time", "Actor", "Action", "Target", "Detail", "Category"];
  const rows = entries.map((e) => [e.whenIso, e.actor, e.action, e.target, e.detail, e.category]);
  return [header, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");
}

export function downloadTextFile(filename: string, content: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
