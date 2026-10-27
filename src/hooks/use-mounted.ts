import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * `true` only after hydration. Use for UI that depends on client-only state
 * (e.g. the resolved theme) to avoid server/client markup mismatches.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
