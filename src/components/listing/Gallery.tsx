import { Plate } from "@/components/media/Plate";
import type { PlateVariant } from "@/components/media/Plate";
import { getDictionary, fill } from "@/i18n";
import type { Locale } from "@/i18n/config";

/**
 * Mosaic on desktop, full-bleed swipe carousel on mobile.
 *
 * The layout is chosen by how many images a listing actually has, so a new
 * listing with three photos does not render a grid with a hole in it. Only
 * counts that tile cleanly are used: five, three, or one.
 *
 * The mobile version is CSS scroll-snap rather than a JS carousel — it costs
 * nothing, works before hydration, and matches the gesture people expect.
 */
export function Gallery({
  plates,
  photoCount,
  alt,
  locale = "fr",
}: {
  plates: PlateVariant[];
  photoCount?: number;
  alt: string;
  locale?: Locale;
}) {
  const t = getDictionary(locale);
  const [lead, ...rest] = plates;
  if (!lead) return null;

  // Show 4, 2 or 0 secondary tiles — never a count that leaves a gap.
  const secondaryCount = rest.length >= 4 ? 4 : rest.length >= 2 ? 2 : 0;
  const secondary = rest.slice(0, secondaryCount);
  const shown = 1 + secondaryCount;

  const total = Math.max(photoCount ?? plates.length, plates.length);
  const remaining = total - shown;

  const columns =
    secondaryCount === 4
      ? "md:grid-cols-[2fr_1fr_1fr]"
      : secondaryCount === 2
        ? "md:grid-cols-[2fr_1fr]"
        : "md:grid-cols-1";

  return (
    <>
      {/* Mobile: swipe through every image */}
      <ul
        aria-label={fill(t.detail.photos, { name: alt })}
        className="flex snap-x snap-mandatory gap-1 overflow-x-auto md:hidden"
      >
        {plates.map((plate, index) => (
          <li key={`${plate}-${index}`} className="w-full shrink-0 snap-center">
            <Plate variant={plate} className="aspect-[4/3]" />
          </li>
        ))}
      </ul>

      {/* Desktop: mosaic */}
      <div
        className={`mx-auto hidden max-w-[1440px] gap-2 px-6 md:grid md:grid-rows-2 md:[block-size:19rem] ${columns}`}
      >
        <Plate
          variant={lead}
          className={`md:row-span-2 ${secondaryCount > 0 ? "rounded-l-plate" : "rounded-plate"}`}
        />

        {secondary.map((plate, index) => {
          const isTopRight = index === 1 || (secondaryCount === 2 && index === 0);
          const isBottomRight =
            index === secondaryCount - 1 ||
            (secondaryCount === 2 && index === 1);
          const isLast = index === secondaryCount - 1;

          return (
            <Plate
              key={`${plate}-${index}`}
              variant={plate}
              className={[
                isTopRight ? "rounded-tr-plate" : "",
                isBottomRight ? "rounded-br-plate" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {isLast && remaining > 0 ? (
                <span className="absolute inset-0 z-[3] flex items-center justify-center bg-abyss/55 text-small font-semibold text-white">
                  {fill(t.detail.morePhotos, { count: remaining })}
                </span>
              ) : null}
            </Plate>
          );
        })}
      </div>
    </>
  );
}
