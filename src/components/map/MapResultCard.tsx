"use client";

import Link from "next/link";
import { Plate } from "@/components/media/Plate";
import { Rating } from "@/components/ui/Rating";
import { formatPrice, priceUnit } from "@/lib/money";
import { listingHref, type Listing } from "@/lib/listings";
import { getDictionary, fill } from "@/i18n";
import { localeHref, type Locale } from "@/i18n/config";
import { categoryLabel, listingAccess, listingPlace } from "@/lib/listing-i18n";

/**
 * The horizontal card used in the map's results panel. Selecting it highlights
 * the matching pin rather than navigating — the map is for orienting, and
 * leaving the page on every tap would defeat that.
 */
export function MapResultCard({
  listing,
  locale,
  selected,
  onSelect,
}: {
  listing: Listing;
  locale: Locale;
  selected: boolean;
  onSelect: () => void;
}) {
  const t = getDictionary(locale);
  const category = categoryLabel(listing.category, locale);
  const unit = priceUnit(listing.price, locale);

  return (
    <div
      className={`flex gap-3 rounded-plate border bg-surface-raised p-2.5 ${
        selected ? "border-accent" : "border-line"
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className="shrink-0"
      >
        <Plate variant={listing.plate} className="h-16 w-20 rounded-sm" />
        <span className="sr-only">{fill(t.map.locateOn, { name: listing.name })}</span>
      </button>

      <div className="flex min-w-0 flex-1 flex-col">
        <p className="font-mono text-label uppercase tracking-[0.13em] text-ink-subtle">
          {category.short} · {listingPlace(listing, locale)}
        </p>

        <button
          type="button"
          onClick={onSelect}
          className="mt-0.5 text-left font-display text-[1.02rem] leading-tight"
        >
          {listing.name}
        </button>

        {listing.rating ? (
          <div className="mt-0.5">
            <Rating score={listing.rating.score} count={listing.rating.count} locale={locale} />
          </div>
        ) : (
          <p className="mt-0.5 text-label text-ink-muted">{listingAccess(listing, locale)}</p>
        )}

        <div className="mt-1.5 flex items-center justify-between gap-2">
          <p className="tabular font-mono text-small">
            {formatPrice(listing.price, locale)}
            {unit ? (
              <span className="ml-1 font-sans text-label text-ink-subtle">
                {unit}
              </span>
            ) : null}
          </p>
          <Link
            href={localeHref(
              locale,
              listing.acceptsRequests
                ? `${listingHref(listing)}/demande`
                : listingHref(listing),
            )}
            className={`rounded-plate border px-2.5 py-1.5 text-label font-semibold ${
              listing.acceptsRequests
                ? "border-accent bg-accent text-accent-contrast"
                : "border-line-strong text-ink"
            }`}
          >
            {listing.acceptsRequests ? t.common.request : t.common.view}
          </Link>
        </div>
      </div>
    </div>
  );
}
