import type { AdConnection } from "@/features/ad-platforms/types";

export function isAtRisk(connection: AdConnection): boolean {
  return connection.token.state !== "healthy";
}

export function errorTone(rate: number): string {
  if (rate >= 5) return "text-critical font-semibold";
  if (rate >= 1) return "text-warning font-semibold";
  return "text-success";
}
