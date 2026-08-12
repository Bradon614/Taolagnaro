"use client";

import { useSearch } from "@/components/search/SearchProvider";

/**
 * Anything that opens the search overlay. Rendered as a button rather than a
 * link because it opens a dialog — screen readers should not announce it as
 * navigation.
 */
export function SearchTrigger({
  className,
  children,
  label = "Rechercher un lieu",
}: {
  className?: string;
  children: React.ReactNode;
  label?: string;
}) {
  const { open } = useSearch();

  return (
    <button type="button" onClick={open} aria-label={label} className={className}>
      {children}
    </button>
  );
}
