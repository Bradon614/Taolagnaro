import Link from "next/link";
import { Plate } from "@/components/media/Plate";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Rating } from "@/components/ui/Rating";
import { SaveButton } from "@/components/wishlist/SaveButton";
import { formatPrice, priceUnit } from "@/lib/money";
import { listingHref, type Listing } from "@/lib/listings";
import {
  categoryLabel,
  listingAccess,
  listingBadge,
  listingCuisine,
  listingDuration,
  listingLevel,
  listingPlace,
  listingSummary,
} from "@/lib/listing-i18n";
import { getDictionary } from "@/i18n";
import { localeHref, type Locale } from "@/i18n/config";
import { formatDistance } from "@/lib/geo";

/**
 * One shell, six category fills. The structure never changes — image, kicker,
 * title, two-line summary, footer with price and action. What varies is what
 * the kicker and the price *mean*: distance and rating for a hotel, cuisine
 * for a restaurant, duration for an activity, access for a site.
 */

type Aspect = "4/3" | "16/9" | "3/2";

const ASPECT: Record<Aspect, string> = {
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-[16/9]",
  "3/2": "aspect-[3/2]",
};

/** The left-hand half of the kicker line, chosen per category. */
function kickerLeft(listing: Listing, locale: Locale): string {
  const place = listingPlace(listing, locale);
  const distance = formatDistance(listing.distanceKm);

  switch (listing.category) {
    case "restaurants":
      return [listingCuisine(listing, locale), place].filter(Boolean).join(" · ");
    case "activites":
    case "experiences":
      return [listingDuration(listing, locale), place].filter(Boolean).join(" · ");
    case "excursions":
      return [listingDuration(listing, locale), distance].filter(Boolean).join(" · ");
    case "sites":
      return [place, listing.elevation ?? distance].filter(Boolean).join(" · ");
    default:
      return `${place} · ${distance}`;
  }
}

export function ListingCard({
  listing,
  locale,
  aspect = "4/3",
  showCategory = true,
}: {
  listing: Listing;
  locale: Locale;
  aspect?: Aspect;
  showCategory?: boolean;
}) {
  const t = getDictionary(locale);
  const href = (path: string) => localeHref(locale, path);

  const price = formatPrice(listing.price, locale);
  const unit = priceUnit(listing.price, locale);
  const isFree = listing.price.kind === "free";
  const badge = listingBadge(listing, locale);
  const level = listingLevel(listing, locale);
  const access = listingAccess(listing, locale);

  // Activities lead with a difficulty chip; everything else with its rating.
  const kickerRight = level ? (
    <Badge tone="outline">{level}</Badge>
  ) : listing.rating ? (
    <Rating score={listing.rating.score} count={listing.rating.count} locale={locale} />
  ) : access ? (
    <Badge tone="outline">{access}</Badge>
  ) : null;

  return (
    <article className="relative flex h-full w-full flex-col overflow-hidden rounded-plate border border-line bg-surface-raised transition-shadow hover:shadow-[0_10px_24px_-18px_rgb(0_0_0_/_0.5)]">
      <div className="relative">
        <Plate variant={listing.plate} className={ASPECT[aspect]} />

        {/* Badges share the top-left so the heart owns the top-right corner.
            Anything over a plate carries its own contrast: only the gold
            accent keeps its tone, warm is tinted so it still reads as a
            caution rather than a neutral note. */}
        <div className="absolute left-2.5 top-2.5 z-[3] flex flex-wrap gap-1.5 pr-11">
          {showCategory ? (
            <Badge tone="floating">
              {categoryLabel(listing.category, locale).short}
            </Badge>
          ) : null}
          {badge ? (
            <Badge
              tone={badge.tone === "accent" ? "accent" : "floating"}
              className={badge.tone === "warm" ? "text-[#f4b49b]" : ""}
            >
              {badge.label}
            </Badge>
          ) : null}
        </div>

        <SaveButton
          slug={listing.slug}
          name={listing.name}
          className="absolute right-2.5 top-2.5 z-[4]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 px-3.5 pb-4 pt-3">
        <div className="flex items-start justify-between gap-2 font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
          <span>{kickerLeft(listing, locale)}</span>
          {kickerRight}
        </div>

        <h3 className="text-card">
          {/* Stretched link: the whole card is the target, but the action
              button below stays independently clickable. */}
          <Link
            href={href(listingHref(listing))}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {listing.name}
          </Link>
        </h3>

        <p className="line-clamp-2 text-small text-ink-muted">
          {listingSummary(listing, locale)}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-2.5">
          <p
            className={`tabular font-mono text-small ${isFree ? "text-ink-subtle" : "text-ink"}`}
          >
            {price}
            {unit ? (
              <span className="ml-1 font-sans text-label uppercase tracking-[0.1em] text-ink-subtle">
                {unit}
              </span>
            ) : null}
          </p>

          {listing.acceptsRequests ? (
            <Button
              href={href(`${listingHref(listing)}/demande`)}
              variant="primary"
              size="sm"
              className="relative z-[2]"
            >
              {t.common.request}
            </Button>
          ) : (
            <Button
              href={href(listingHref(listing))}
              variant="secondary"
              size="sm"
              className="relative z-[2]"
            >
              {t.common.viewSite}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
