import type { InboxConnection } from "@/features/inbox/types";

export function isAtRisk(connection: InboxConnection): boolean {
  return connection.token.state !== "healthy";
}
