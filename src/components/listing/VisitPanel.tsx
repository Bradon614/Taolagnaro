import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/money";
import type { Listing } from "@/lib/listings";
import type { ListingDetail } from "@/lib/listing-details";
import { getDictionary } from "@/i18n";
import { localeHref, type Locale } from "@/i18n/config";
import { listingAccess } from "@/lib/listing-i18n";

/**
 * What a tourist site gets instead of a reservation panel.
 *
 * A public beach has nobody to receive a request, so the panel answers the
 * question a visitor actually has — how do I get there, and what does it cost
 * — rather than pretending there is someone to book with.
 */
export function VisitPanel({
  listing,
  detail,
  locale,
}: {
  listing: Listing;
  detail: ListingDetail;
  locale: Locale;
}) {
  const t = getDictionary(locale);
  const gettingThere =
    (locale === "en" ? detail.gettingThereEn : detail.gettingThere) ??
    detail.gettingThere;
  return (
    <div className="flex flex-col gap-3.5 rounded-panel border border-line-strong bg-surface p-5">
      <div className="border-b border-line pb-4">
        <p className="font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
          {t.detail.getThere}
        </p>
        <p className="tabular mt-1.5 font-mono text-xl leading-tight">
          {formatPrice(listing.price, locale)}
        </p>
        {listingAccess(listing, locale) ? (
          <p className="text-small text-ink-subtle">
            {listingAccess(listing, locale)}
          </p>
        ) : null}
      </div>

      {gettingThere?.length ? (
        <ul className="flex flex-col gap-2.5 text-small text-ink-muted">
          {gettingThere.map((line) => (
            <li key={line} className="flex gap-2.5">
              <span aria-hidden="true" className="text-ink-subtle">
                ◦
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-small text-ink-muted">
          {t.detail.freeAccessNote}
        </p>
      )}

      <Button href={localeHref(locale, "/carte")} variant="secondary" fullWidth>
        {t.detail.locateOnMap}
      </Button>
      <Button href={localeHref(locale, "/explorer/activites")} variant="tertiary" fullWidth>
        {t.detail.findGuide}
      </Button>
    </div>
  );
}
