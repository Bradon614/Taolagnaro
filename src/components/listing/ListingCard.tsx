import Link from "next/link";
import { Plate } from "@/components/media/Plate";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Rating } from "@/components/ui/Rating";
import { SaveButton } from "@/components/wishlist/SaveButton";
import { formatPrice, priceUnit } from "@/lib/money";
import { categoryBySlug } from "@/lib/site";
import { listingHref, type Listing } from "@/lib/listings";

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

function formatDistance(km: number): string {
  const value = km < 10 ? km.toString().replace(".", ",") : Math.round(km);
  return `${value} km`;
}

/** The left-hand half of the kicker line, chosen per category. */
function kickerLeft(listing: Listing): string {
  switch (listing.category) {
    case "restaurants":
      return [listing.cuisine, listing.place].filter(Boolean).join(" · ");
    case "activites":
    case "experiences":
      return [listing.duration, listing.place].filter(Boolean).join(" · ");
    case "excursions":
      return [listing.duration, formatDistance(listing.distanceKm)]
        .filter(Boolean)
        .join(" · ");
    case "sites":
      return [listing.place, listing.elevation ?? formatDistance(listing.distanceKm)]
        .filter(Boolean)
        .join(" · ");
    default:
      return `${listing.place} · ${formatDistance(listing.distanceKm)}`;
  }
}

export function ListingCard({
  listing,
  aspect = "4/3",
  showCategory = true,
}: {
  listing: Listing;
  aspect?: Aspect;
  showCategory?: boolean;
}) {
  const category = categoryBySlug(listing.category);
  const price = formatPrice(listing.price);
  const unit = priceUnit(listing.price);
  const isFree = listing.price.kind === "free";

  // Activities lead with a difficulty chip; everything else with its rating.
  const kickerRight = listing.level ? (
    <Badge tone="outline">{listing.level}</Badge>
  ) : listing.rating ? (
    <Rating score={listing.rating.score} count={listing.rating.count} />
  ) : listing.access ? (
    <Badge tone="outline">{listing.access}</Badge>
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
          {showCategory && category ? (
            <Badge tone="floating">
              {category.label.replace(" touristiques", "")}
            </Badge>
          ) : null}
          {listing.badge ? (
            <Badge
              tone={listing.badge.tone === "accent" ? "accent" : "floating"}
              className={listing.badge.tone === "warm" ? "text-[#f4b49b]" : ""}
            >
              {listing.badge.label}
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
          <span>{kickerLeft(listing)}</span>
          {kickerRight}
        </div>

        <h3 className="text-card">
          {/* Stretched link: the whole card is the target, but the action
              button below stays independently clickable. */}
          <Link
            href={listingHref(listing)}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {listing.name}
          </Link>
        </h3>

        <p className="line-clamp-2 text-small text-ink-muted">
          {listing.summary}
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
              href={`${listingHref(listing)}/demande`}
              variant="primary"
              size="sm"
              className="relative z-[2]"
            >
              Demander
            </Button>
          ) : (
            <Button
              href={listingHref(listing)}
              variant="secondary"
              size="sm"
              className="relative z-[2]"
            >
              Voir le site
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
