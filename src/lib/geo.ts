/**
 * Coordinates are part of the visual language here — they appear on the
 * detail page meta line and in the footer, set in the monospace face.
 */

export type Coordinates = { lat: number; lon: number };

/** Taolagnaro town centre — the origin distances are measured from. */
export const TOWN_CENTRE: Coordinates = { lat: -25.0347, lon: 46.9883 };

function toDegreesMinutes(value: number, positive: string, negative: string) {
  const hemisphere = value >= 0 ? positive : negative;
  const absolute = Math.abs(value);
  const degrees = Math.floor(absolute);
  const minutes = Math.round((absolute - degrees) * 60);
  // 60′ rounds up into the next degree.
  const carried = minutes === 60;
  return `${carried ? degrees + 1 : degrees}°${String(carried ? 0 : minutes).padStart(2, "0")}′${hemisphere}`;
}

/**
 * e.g. "25°02′S 46°59′E". Returns "" when no position is known, so callers can
 * drop the element rather than print a made-up coordinate.
 */
export function formatCoordinates(coords: Coordinates | null): string {
  if (!coords) return "";
  const { lat, lon } = coords;
  return `${toDegreesMinutes(lat, "N", "S")} ${toDegreesMinutes(lon, "E", "W")}`;
}

const EARTH_RADIUS_KM = 6371;

/** Great-circle distance. Straight-line, not road distance — the road to Sainte-Luce is considerably longer. */
export function distanceKm(a: Coordinates, b: Coordinates): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

/**
 * "6 km" / "0,8 km". Returns "" when the distance is unknown: printing "0 km"
 * or an invented figure would mislead a visitor and would also corrupt any
 * sort that treats the value as a real measurement.
 */
export function formatDistance(km: number | null): string {
  if (km === null || !Number.isFinite(km)) return "";
  if (km < 10) return `${km.toFixed(1).replace(".", ",").replace(",0", "")} km`;
  return `${Math.round(km)} km`;
}
