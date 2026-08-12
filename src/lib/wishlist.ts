"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * "Envies" — the visitor's shortlist.
 *
 * Device-local, in localStorage, with no account. That is a deliberate limit
 * of this version: asking someone to register before they can keep a list of
 * beaches would lose more visitors than the feature gains. The trade-off is
 * that the list does not follow them to another device, which the page says
 * out loud rather than leaving them to discover it.
 *
 * Built on useSyncExternalStore so every save button, the tab-bar count and
 * the Envies page stay in step, server rendering has a defined empty
 * snapshot, and a change in another tab is picked up.
 */

const KEY = "tao_wishlist";
const EMPTY: string[] = [];

const listeners = new Set<() => void>();

// getSnapshot must return a referentially stable value while nothing has
// changed, so the parsed array is cached against the raw string.
let cachedRaw: string | null = null;
let cachedList: string[] = EMPTY;

function parse(raw: string | null): string[] {
  if (!raw) return EMPTY;
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value) ? (value as string[]) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function readSnapshot(): string[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    return EMPTY;
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedList = parse(raw);
  }
  return cachedList;
}

function serverSnapshot(): string[] {
  return EMPTY;
}

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  // Keeps two open tabs in agreement.
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function write(next: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Private browsing or a full quota: the rest of the site still works.
  }
  listeners.forEach((listener) => listener());
}

export function useWishlist() {
  const slugs = useSyncExternalStore(subscribe, readSnapshot, serverSnapshot);

  const toggle = useCallback((slug: string) => {
    const current = readSnapshot();
    write(
      current.includes(slug)
        ? current.filter((entry) => entry !== slug)
        : [slug, ...current],
    );
  }, []);

  const clear = useCallback(() => write([]), []);

  return {
    slugs,
    count: slugs.length,
    has: (slug: string) => slugs.includes(slug),
    toggle,
    clear,
  };
}
