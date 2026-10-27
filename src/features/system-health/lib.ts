import type { ServiceHealth } from "@/features/system-health/types";
import type { Tone } from "@/types/tone";

export function serviceTone(service: ServiceHealth): Tone {
  if (service.status === "healthy") return "success";
  if (service.status === "down") return "critical";
  return service.severity ?? "warning";
}

export function criticalCount(services: ServiceHealth[]): number {
  return services.filter((s) => serviceTone(s) === "critical").length;
}
