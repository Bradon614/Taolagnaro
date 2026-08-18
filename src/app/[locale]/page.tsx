import { Hero } from "@/components/home/Hero";
import { CategoryStrip } from "@/components/home/CategoryStrip";
import { FeaturedMosaic } from "@/components/home/FeaturedMosaic";
import { WhyVisit } from "@/components/home/WhyVisit";
import { CultureStrip } from "@/components/home/CultureStrip";
import { MapPreview } from "@/components/home/MapPreview";
import { ClosingCta } from "@/components/home/ClosingCta";
import { ListingRow } from "@/components/listing/ListingRow";
import { listingsByCategory } from "@/lib/listings";
import { getDictionary } from "@/i18n";
import { localeHref, type Locale } from "@/i18n/config";

/**
 * Ordered the way a first-time visitor decides: what kind of thing, then which
 * specific thing, then why this place at all.
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const href = (path: string) => localeHref(locale, path);
  const hotels = listingsByCategory("hotels").slice(0, 4);
  const restaurants = listingsByCategory("restaurants").slice(0, 3);
  const activities = [
    ...listingsByCategory("activites"),
    ...listingsByCategory("excursions"),
    ...listingsByCategory("experiences"),
  ].slice(0, 4);

  return (
    <>
      <Hero locale={locale} />
      <CategoryStrip locale={locale} />
      <FeaturedMosaic locale={locale} />

      <ListingRow
        kicker={t.home.staysKicker}
        title={t.home.staysTitle}
        action={{ href: href("/explorer/hotels"), label: t.home.staysAction }}
        listings={hotels}
        locale={locale}
        columns={4}
        className="border-y border-line bg-surface"
      />

      <ListingRow
        kicker={t.home.eatKicker}
        title={t.home.eatTitle}
        action={{ href: href("/explorer/restaurants"), label: t.home.eatAction }}
        listings={restaurants}
        locale={locale}
        columns={3}
        aspect="16/9"
      />

      <ListingRow
        kicker={t.home.doKicker}
        title={t.home.doTitle}
        action={{ href: href("/explorer/activites"), label: t.common.seeAll }}
        listings={activities}
        locale={locale}
        columns={4}
        aspect="3/2"
        className="border-t border-line bg-surface"
      />

      <WhyVisit locale={locale} />
      <CultureStrip locale={locale} />
      <MapPreview locale={locale} />
      <ClosingCta locale={locale} />
    </>
  );
}
