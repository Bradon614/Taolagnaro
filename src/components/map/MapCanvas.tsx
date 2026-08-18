"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  boundsOf,
  clusterByScreen,
  fitTransform,
  kmPerPixel,
  niceScaleBar,
  project,
  unproject,
} from "@/lib/map";
import { formatCoordinates, type Coordinates } from "@/lib/geo";
import type { Listing } from "@/lib/listings";
import { CATEGORY_GLYPH } from "@/components/map/glyphs";
import { getDictionary, fill } from "@/i18n";
import type { Locale } from "@/i18n/config";

/**
 * The map surface.
 *
 * There is no tile layer yet — see the note in MapExplorer. What is here is
 * real: every pin sits at its true Web Mercator position, the graticule is
 * computed, and the scale bar is derived from actual ground distance. Swapping
 * in vector tiles means adding a layer beneath the pins and reusing this same
 * projection, not rewriting any of it.
 */
export function MapCanvas({
  listings,
  locale,
  selected,
  onSelect,
}: {
  listings: Listing[];
  locale: Locale;
  selected: Listing | null;
  onSelect: (listing: Listing | null) => void;
}) {
  const t = getDictionary(locale);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [view, setView] = useState({ zoom: 1, panX: 0, panY: 0 });
  const [locating, setLocating] = useState(false);
  const [me, setMe] = useState<Coordinates | null>(null);

  // Reset the viewport when the visible set changes — keeping a deep zoom
  // after the filters moved would leave the visitor staring at empty water.
  const signature = listings.map((l) => l.slug).join("|");
  const [renderedSignature, setRenderedSignature] = useState(signature);
  if (renderedSignature !== signature) {
    setRenderedSignature(signature);
    setView({ zoom: 1, panX: 0, panY: 0 });
  }

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new ResizeObserver((entries) => {
      const box = entries[0].contentRect;
      setSize({ width: box.width, height: box.height });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const points = listings.length > 0 ? listings.map((l) => l.coordinates) : [];
  const base =
    size.width > 0 && points.length > 0
      ? fitTransform(boundsOf(points), size.width, size.height)
      : { scale: 1, offsetX: 0, offsetY: 0 };

  // Zoom around the container centre, then apply the pan.
  const scale = base.scale * view.zoom;
  const offsetX =
    size.width / 2 - (size.width / 2 - base.offsetX) * view.zoom + view.panX;
  const offsetY =
    size.height / 2 - (size.height / 2 - base.offsetY) * view.zoom + view.panY;

  const toScreen = useCallback(
    (coords: Coordinates) => {
      const p = project(coords);
      return { x: p.x * scale + offsetX, y: p.y * scale + offsetY };
    },
    [scale, offsetX, offsetY],
  );

  /* ------------------------------------------------------------- panning */

  const drag = useRef<{ x: number; y: number; moved: boolean } | null>(null);

  function onPointerDown(event: React.PointerEvent) {
    if ((event.target as HTMLElement).closest("[data-pin]")) return;
    drag.current = { x: event.clientX, y: event.clientY, moved: false };
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent) {
    if (!drag.current) return;
    const dx = event.clientX - drag.current.x;
    const dy = event.clientY - drag.current.y;
    if (Math.abs(dx) + Math.abs(dy) > 3) drag.current.moved = true;
    drag.current.x = event.clientX;
    drag.current.y = event.clientY;
    setView((v) => ({ ...v, panX: v.panX + dx, panY: v.panY + dy }));
  }

  function onPointerUp() {
    // A drag should not also be read as "deselect".
    if (drag.current && !drag.current.moved) onSelect(null);
    drag.current = null;
  }

  const zoomBy = (factor: number) =>
    setView((v) => ({
      ...v,
      zoom: Math.max(0.6, Math.min(60, v.zoom * factor)),
    }));

  /* ------------------------------------------------------- around me */

  function locate() {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Used only to draw a marker in this session. Never stored or sent.
        setMe({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: false, timeout: 8000 },
    );
  }

  /* -------------------------------------------------------- graticule */

  const graticule: { lines: { x1: number; y1: number; x2: number; y2: number }[]; labels: { x: number; y: number; text: string }[] } =
    { lines: [], labels: [] };

  if (size.width > 0 && scale > 0) {
    const topLeft = unproject({
      x: (0 - offsetX) / scale,
      y: (0 - offsetY) / scale,
    });
    const bottomRight = unproject({
      x: (size.width - offsetX) / scale,
      y: (size.height - offsetY) / scale,
    });

    const spanLon = Math.abs(bottomRight.lon - topLeft.lon);
    const step =
      [0.02, 0.05, 0.1, 0.25, 0.5, 1].find((s) => spanLon / s <= 6) ?? 1;

    for (
      let lon = Math.ceil(topLeft.lon / step) * step;
      lon <= bottomRight.lon;
      lon += step
    ) {
      const x = project({ lat: topLeft.lat, lon }).x * scale + offsetX;
      graticule.lines.push({ x1: x, y1: 0, x2: x, y2: size.height });
      graticule.labels.push({
        x: x + 4,
        y: size.height - 26,
        text: `${lon.toFixed(2)}°E`,
      });
    }

    for (
      let lat = Math.ceil(bottomRight.lat / step) * step;
      lat <= topLeft.lat;
      lat += step
    ) {
      const y = project({ lat, lon: topLeft.lon }).y * scale + offsetY;
      graticule.lines.push({ x1: 0, y1: y, x2: size.width, y2: y });
      graticule.labels.push({
        x: 8,
        y: y - 5,
        text: `${Math.abs(lat).toFixed(2)}°S`,
      });
    }
  }

  /* --------------------------------------------------------- clusters */

  const positioned = listings.map((listing) => ({
    item: listing,
    ...toScreen(listing.coordinates),
  }));
  const clusters = clusterByScreen(positioned, 40);

  const centreLat = listings[0]?.coordinates.lat ?? -25;
  const bar =
    scale > 0 ? niceScaleBar(kmPerPixel(scale, centreLat)) : { km: 1, px: 60 };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      // Absolutely positioned so the canvas can never feed its own measured
      // size back into the layout that measures it.
      className="plate plate-ocean absolute inset-0 cursor-grab touch-none select-none active:cursor-grabbing"
    >
      {/* Graticule */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 z-[2] size-full"
        width={size.width}
        height={size.height}
      >
        {graticule.lines.map((line, index) => (
          <line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="rgb(255 255 255 / 0.16)"
            strokeWidth="1"
          />
        ))}
        {graticule.labels.map((label, index) => (
          <text
            key={index}
            x={label.x}
            y={label.y}
            fill="rgb(255 255 255 / 0.4)"
            fontSize="9"
            fontFamily="var(--font-mono)"
            letterSpacing="0.08em"
          >
            {label.text}
          </text>
        ))}
      </svg>

      {/* Your position, if you asked for it */}
      {me ? (
        <span
          aria-hidden="true"
          className="absolute z-[3] size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-reef shadow-[0_0_0_6px_rgb(111_191_176_/_0.3)]"
          style={{ left: toScreen(me).x, top: toScreen(me).y }}
        />
      ) : null}

      {/* Pins and clusters */}
      <div className="absolute inset-0 z-[4]">
        {clusters.map((cluster) => {
          if (cluster.items.length === 1) {
            const listing = cluster.items[0];
            const isSelected = selected?.slug === listing.slug;
            return (
              <button
                key={listing.slug}
                data-pin
                type="button"
                onClick={() => onSelect(isSelected ? null : listing)}
                aria-pressed={isSelected}
                title={listing.name}
                className={`absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[50%_50%_50%_0] border-2 border-white shadow-[0_2px_8px_rgb(0_0_0_/_0.35)] ${
                  isSelected
                    ? "z-[6] size-8 bg-accent text-accent-contrast"
                    : "z-[5] size-6 bg-bay text-white"
                }`}
                style={{
                  left: cluster.x,
                  top: cluster.y,
                  transform: "translate(-50%,-50%) rotate(-45deg)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="rotate-45 text-[0.6rem] leading-none"
                >
                  {CATEGORY_GLYPH[listing.category]}
                </span>
                <span className="sr-only">{listing.name}</span>
              </button>
            );
          }

          return (
            <button
              key={`cluster-${Math.round(cluster.x)}-${Math.round(cluster.y)}`}
              data-pin
              type="button"
              onClick={() => zoomBy(2)}
              className="tabular absolute z-[5] grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-bay font-mono text-label text-white shadow-[0_2px_8px_rgb(0_0_0_/_0.35)]"
              style={{ left: cluster.x, top: cluster.y }}
            >
              {cluster.items.length}
              <span className="sr-only">
                {fill(t.map.expandCluster, { count: cluster.items.length })}
              </span>
            </button>
          );
        })}
      </div>

      {/* Controls */}
      <div className="absolute left-4 top-4 z-[7] flex flex-wrap gap-2">
        <button
          type="button"
          onClick={locate}
          disabled={locating}
          className="rounded-plate border border-line-strong bg-surface px-3 py-2 text-small font-semibold text-ink disabled:opacity-60"
        >
          {locating ? t.map.locating : t.map.aroundMe}
        </button>
        <button
          type="button"
          onClick={() => setView({ zoom: 1, panX: 0, panY: 0 })}
          className="rounded-plate border border-line-strong bg-surface px-3 py-2 text-small text-ink"
        >
          {t.map.recentre}
        </button>
      </div>

      <div className="absolute right-4 top-4 z-[7] flex flex-col overflow-hidden rounded-plate border border-line-strong">
        <button
          type="button"
          onClick={() => zoomBy(1.6)}
          aria-label={t.map.zoomIn}
          className="size-8 border-b border-line bg-surface text-base text-ink"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => zoomBy(1 / 1.6)}
          aria-label={t.map.zoomOut}
          className="size-8 bg-surface text-base text-ink"
        >
          −
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[7] hidden rounded-plate bg-surface px-3 py-2.5 sm:block">
        <p className="mb-1.5 font-mono text-label uppercase tracking-[0.13em] text-ink-subtle">
          {t.map.legend}
        </p>
        <ul className="flex flex-wrap gap-x-3.5 gap-y-1 text-label text-ink-muted">
          <li>{CATEGORY_GLYPH.sites} {t.categories.sites.short}</li>
          <li>{CATEGORY_GLYPH.hotels} {t.categories.hotels.short}</li>
          <li>{CATEGORY_GLYPH.restaurants} {t.categories.restaurants.short}</li>
          <li>{CATEGORY_GLYPH.activites} {t.categories.activites.short}</li>
        </ul>
      </div>

      {/* Scale bar + attribution */}
      <div className="absolute bottom-4 right-4 z-[7] flex items-center gap-3 font-mono text-label text-white/70">
        <span className="flex items-center gap-1.5">
          <span className="tabular">{bar.km} km</span>
          <span
            aria-hidden="true"
            className="block h-2 border-x border-b border-white/60"
            style={{ width: Math.round(bar.px) }}
          />
        </span>
        <span className="tabular hidden sm:inline">
          {formatCoordinates(
            unproject({
              x: (size.width / 2 - offsetX) / scale,
              y: (size.height / 2 - offsetY) / scale,
            }),
          )}
        </span>
      </div>
    </div>
  );
}
