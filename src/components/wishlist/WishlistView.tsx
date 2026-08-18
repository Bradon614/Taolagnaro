"use client";

import { ListingCard } from "@/components/listing/ListingCard";
import { Button } from "@/components/ui/Button";
import { LISTINGS } from "@/lib/listings";
import { useWishlist } from "@/lib/wishlist";
import { useHref, useLocale } from "@/i18n/LocaleProvider";
import { fill } from "@/i18n";

/**
 * The shortlist. Rendered client-side because the list only exists on the
 * device — there is nothing for the server to know about it.
 */
export function WishlistView() {
  const { slugs, count, clear } = useWishlist();
  const { locale, t } = useLocale();
  const href = useHref();

  // Preserve the order they were saved in, newest first.
  const saved = slugs
    .map((slug) => LISTINGS.find((listing) => listing.slug === slug))
    .filter((listing): listing is (typeof LISTINGS)[number] => Boolean(listing));

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-16 pt-8 md:px-6">
      <p className="font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
        {t.common.home} / {t.common.wishlist}
      </p>

      <div className="mt-2.5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-page">{t.wishlist.title}</h1>
          <p className="mt-2 max-w-[56ch] text-ink-muted">
            {count > 0
              ? t.wishlist.leadFull
              : t.wishlist.leadEmpty}
          </p>
        </div>

        {count > 0 ? (
          <button
            type="button"
            onClick={clear}
            className="text-small text-brand hover:underline"
          >
            {fill(t.wishlist.removeAll, { count })}
          </button>
        ) : null}
      </div>

      {saved.length === 0 ? (
        <div className="mt-8 rounded-plate border border-dashed border-line-strong px-5 py-14 text-center">
          <p aria-hidden="true" className="text-2xl text-ink-subtle">
            ♡
          </p>
          <p className="mt-2 font-semibold">{t.wishlist.emptyTitle}</p>
          <p className="mx-auto mt-1.5 max-w-[42ch] text-small text-ink-muted">
            {t.wishlist.emptyBody}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button href={href("/explorer")} variant="primary">
              {t.wishlist.exploreCta}
            </Button>
            <Button href={href("/carte")} variant="secondary">
              {t.common.openMap}
            </Button>
          </div>
        </div>
      ) : (
        <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {saved.map((listing) => (
            <li key={listing.slug} className="flex">
              <ListingCard listing={listing} locale={locale} />
            </li>
          ))}
        </ul>
      )}

      <p className="mt-8 max-w-[56ch] text-small text-ink-subtle">
        {t.wishlist.deviceNote}
      </p>
    </div>
  );
}
