import { StatusBadge } from "@/components/data-display/status-badge";
import type { TokenState } from "@/types/integrations";

/** OAuth token health, shared by Ad Platforms and Unified Inbox. */
export function TokenStatusBadge({ token }: { token: TokenState }) {
  switch (token.state) {
    case "healthy":
      return (
        <StatusBadge tone="success" dot>
          healthy
        </StatusBadge>
      );
    case "expiring":
      return <StatusBadge tone="warning">expiring in {token.inDays}d</StatusBadge>;
    case "invalid":
      return (
        <StatusBadge tone="critical" dot>
          invalid
        </StatusBadge>
      );
  }
}
