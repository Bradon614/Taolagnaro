"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MapCanvas } from "@/components/map/MapCanvas";
import { MapResultCard } from "@/components/map/MapResultCard";
import { CATEGORY_GLYPH } from "@/components/map/glyphs";
import { LISTINGS, type Listing } from "@/lib/listings";
import { CATEGORIES, type CategorySlug } from "@/lib/site";
import { useHref, useLocale } from "@/i18n/LocaleProvider";
import { localeHref } from "@/i18n/config";

/**
 * The catalog, spatially.
 *
 * Category selection lives in the URL so a map view is shareable, exactly as
 * on Explore. Which pin is open is transient and stays in component state.
 *
 * BASEMAP: there is no tile layer behind the pins yet. Choosing one is a
 * decision with cost and licensing attached (see the note in the page), so
 * rather than quietly committing the project to a provider, the surface
 * renders the bathymetric ground with a computed graticule and scale bar.
 * MapCanvas already projects in Web Mercator, so a tile layer drops in
 * underneath without touching pins, clusters or selection.
 */
export function MapExplorer() {
  const router = useRouter();
  const { locale, t } = useLocale();
  const href = useHref();
  const params = useSearchParams();
  const [selected, setSelected] = useState<Listing | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const active = (params.get("categories") ?? "")
    .split(",")
    .filter(Boolean) as CategorySlug[];

  const visible =
    active.length > 0
      ? LISTINGS.filter((listing) => active.includes(listing.category))
      : LISTINGS;

  // A pin hidden by a category change must not stay selected.
  const [renderedKey, setRenderedKey] = useState(active.join(","));
  if (renderedKey !== active.join(",")) {
    setRenderedKey(active.join(","));
    if (selected && !visible.some((l) => l.slug === selected.slug)) {
      setSelected(null);
    }
  }

  function toggleCategory(slug: CategorySlug) {
    const next = active.includes(slug)
      ? active.filter((entry) => entry !== slug)
      : [...active, slug];
    const query = next.length > 0 ? `?categories=${next.join(",")}` : "";
    router.replace(localeHref(locale, `/carte${query}`), { scroll: false });
  }

  // Selecting a pin scrolls its card into view in the panel.
  const listRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (!selected) return;
    const node = listRef.current?.querySelector(
      `[data-slug="${selected.slug}"]`,
    );
    node?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selected]);

  const panel = (
    <>
      <div className="border-b border-line px-4 py-3.5">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-lg">
            <span className="tabular">{visible.length}</span> {t.map.shown}
          </h2>
          <Link
            href={href("/explorer")}
            className="text-small text-brand hover:underline"
          >
            {t.map.seeList}
          </Link>
        </div>

        <ul className="mt-3 flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const on = active.length === 0 || active.includes(category.slug);
            return (
              <li key={category.slug}>
                <button
                  type="button"
                  onClick={() => toggleCategory(category.slug)}
                  aria-pressed={active.includes(category.slug)}
                  className={`rounded-plate border px-2.5 py-1.5 text-label ${
                    active.includes(category.slug)
                      ? "border-accent bg-accent font-semibold text-accent-contrast"
                      : on
                        ? "border-line-strong text-ink-muted"
                        : "border-line text-ink-subtle opacity-55"
                  }`}
                >
                  {CATEGORY_GLYPH[category.slug]}{" "}
                  {t.categories[category.slug].short}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <ul
        ref={listRef}
        className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-4 py-3.5"
      >
        {visible.map((listing) => (
          <li key={listing.slug} data-slug={listing.slug}>
            <MapResultCard
              listing={listing}
              locale={locale}
              selected={selected?.slug === listing.slug}
              onSelect={() =>
                setSelected(selected?.slug === listing.slug ? null : listing)
              }
            />
          </li>
        ))}
      </ul>
    </>
  );

  return (
    // grid-rows-[minmax(0,1fr)]: without it the row sizes to the tallest
    // child (the results list) and the map grows past the viewport.
    <div className="relative lg:grid lg:h-[calc(100dvh-4rem)] lg:grid-cols-[23.5rem_minmax(0,1fr)] lg:grid-rows-[minmax(0,1fr)] lg:overflow-hidden">
      {/* Desktop: list beside the map */}
      <aside className="hidden min-h-0 flex-col border-r border-line bg-ground lg:flex">
        {panel}
      </aside>

      {/* Map. Full-bleed on mobile, with the results in a sheet over it.
          The height is always definite — the canvas measures itself against
          it, so an auto height would chase its own tail. */}
      <div className="relative h-[calc(100dvh-12rem)] overflow-hidden lg:h-full">
        <MapCanvas
          listings={visible}
          locale={locale}
          selected={selected}
          onSelect={setSelected}
        />

        {selected ? (
          <div className="pointer-events-auto absolute bottom-16 left-1/2 z-[8] w-[19rem] -translate-x-1/2 lg:bottom-20">
            <MapResultCard
              listing={selected}
              locale={locale}
              selected
              onSelect={() => setSelected(null)}
            />
          </div>
        ) : null}
      </div>

      {/* Mobile: draggable-feel sheet at two heights */}
      <div
        // Sits above the global tab bar rather than behind it.
        className={`fixed inset-x-0 bottom-[calc(3.25rem+env(safe-area-inset-bottom))] z-30 flex flex-col rounded-t-2xl border-t border-line bg-ground transition-[height] lg:hidden ${
          sheetOpen ? "h-[60dvh]" : "h-[9.75rem]"
        }`}
      >
        <button
          type="button"
          onClick={() => setSheetOpen((open) => !open)}
          aria-expanded={sheetOpen}
          className="shrink-0 py-2.5"
        >
          <span
            aria-hidden="true"
            className="mx-auto block h-1 w-9 rounded-full bg-line-strong"
          />
          <span className="sr-only">
            {sheetOpen ? t.map.hideList : t.map.showList}
          </span>
        </button>
        <div className="flex min-h-0 flex-1 flex-col">{panel}</div>
      </div>
    </div>
  );
}
