"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Reads a media query as an external store.
 *
 * useSyncExternalStore rather than an effect: it gives a defined server
 * snapshot, subscribes without a render side-effect, and cannot get out of
 * step with the DOM.
 */
export function useMediaQuery(query: string, serverValue = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => serverValue);
}
