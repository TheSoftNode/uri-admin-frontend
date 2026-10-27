/** OAuth token health for a connected third-party account. */
export type TokenState =
  { state: "healthy" } | { state: "expiring"; inDays: number } | { state: "invalid" };
