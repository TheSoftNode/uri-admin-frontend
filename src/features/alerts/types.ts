/** Mirrors AdminService.ts's PlatformAlert exactly (camelCase in place of
 * the real snake_case wire fields). Infrastructure/account-level failures
 * (e.g. a shared OpenAI key running out of credit) — not business-reported
 * issues. There is no severity or affected-platform field on the real
 * model; `kind` is the stable identifier dismiss acts on. */
export interface PlatformAlert {
  kind: string;
  title: string;
  detail: string;
  firstSeen: string;
  lastSeen: string;
  occurrences: number;
  lastEmailedAt: string | null;
  dismissedAt: string | null;
}

export interface AlertsStats {
  activeCount: number;
  totalOccurrencesActive: number;
  dismissedLast7d: number;
  emailedCount: number;
}

export interface AlertsPageData {
  stats: AlertsStats;
  /** Active and dismissed together — the real API's own `include_dismissed`
   * toggle is applied client-side here since both are already in hand. */
  alerts: PlatformAlert[];
}
