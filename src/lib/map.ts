/**
 * Map projection and clustering.
 *
 * Web Mercator, normalised to a 0–1 square so the view transform is a plain
 * scale-and-offset. Keeping the maths here means the basemap can be swapped
 * for vector tiles later without touching the pin, cluster or popover logic —
 * a tile layer uses exactly this projection.
 */

import type { Coordinates } from "@/lib/geo";

export type Point = { x: number; y: number };

export function project({ lat, lon }: Coordinates): Point {
  const clampedLat = Math.max(-85.05112878, Math.min(85.05112878, lat));
  const radians = (clampedLat * Math.PI) / 180;
  return {
    x: (lon + 180) / 360,
    y:
      (1 -
        Math.log(Math.tan(radians) + 1 / Math.cos(radians)) / Math.PI) /
      2,
  };
}

export function unproject({ x, y }: Point): Coordinates {
  const n = Math.PI * (1 - 2 * y);
  return {
    lon: x * 360 - 180,
    lat: (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))),
  };
}

export type Bounds = { min: Point; max: Point };

export function boundsOf(points: Coordinates[]): Bounds {
  const projected = points.map(project);
  const xs = projected.map((p) => p.x);
  const ys = projected.map((p) => p.y);
  return {
    min: { x: Math.min(...xs), y: Math.min(...ys) },
    max: { x: Math.max(...xs), y: Math.max(...ys) },
  };
}

/**
 * Fits bounds into a box, returning the scale and offset that place a
 * normalised point at a pixel position. Never zooms in past `maxSpan` so a
 * single result does not leave the viewer staring at an empty square.
 */
export function fitTransform(
  bounds: Bounds,
  width: number,
  height: number,
  padding = 56,
): { scale: number; offsetX: number; offsetY: number } {
  const minSpan = 0.0006;
  const spanX = Math.max(bounds.max.x - bounds.min.x, minSpan);
  const spanY = Math.max(bounds.max.y - bounds.min.y, minSpan);

  const usableW = Math.max(width - padding * 2, 60);
  const usableH = Math.max(height - padding * 2, 60);
  const scale = Math.min(usableW / spanX, usableH / spanY);

  const centreX = (bounds.min.x + bounds.max.x) / 2;
  const centreY = (bounds.min.y + bounds.max.y) / 2;

  return {
    scale,
    offsetX: width / 2 - centreX * scale,
    offsetY: height / 2 - centreY * scale,
  };
}

/* ------------------------------------------------------------- clustering */

export type Cluster<T> = {
  /** Screen position in container pixels. */
  x: number;
  y: number;
  items: T[];
};

/**
 * Greedy screen-space clustering. Taolagnaro's centre would otherwise be an
 * unreadable pile of overlapping pins at city zoom.
 */
export function clusterByScreen<T>(
  entries: { item: T; x: number; y: number }[],
  radius = 38,
): Cluster<T>[] {
  const clusters: Cluster<T>[] = [];

  for (const entry of entries) {
    const near = clusters.find(
      (cluster) =>
        Math.hypot(cluster.x - entry.x, cluster.y - entry.y) <= radius,
    );

    if (near) {
      // Keep the cluster marker at the running centroid of its members.
      const n = near.items.length;
      near.x = (near.x * n + entry.x) / (n + 1);
      near.y = (near.y * n + entry.y) / (n + 1);
      near.items.push(entry.item);
    } else {
      clusters.push({ x: entry.x, y: entry.y, items: [entry.item] });
    }
  }

  return clusters;
}

/** Kilometres per pixel at the current scale, for the scale bar. */
export function kmPerPixel(scale: number, atLatitude: number): number {
  const earthCircumferenceKm = 40075.017;
  const metresPerNormalisedUnit =
    earthCircumferenceKm * Math.cos((atLatitude * Math.PI) / 180);
  return metresPerNormalisedUnit / scale;
}

/** A round number of km that fits in roughly the given pixel width. */
export function niceScaleBar(
  kmPerPx: number,
  targetPx = 90,
): { km: number; px: number } {
  const raw = kmPerPx * targetPx;
  const steps = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200];
  const km = steps.find((step) => step >= raw) ?? 200;
  return { km, px: km / kmPerPx };
}
