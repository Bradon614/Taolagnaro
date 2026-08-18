import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/listing/Gallery";
import { ListingRow } from "@/components/listing/ListingRow";
import { MobileActionBar } from "@/components/listing/MobileActionBar";
import { ReservationPanel } from "@/components/listing/ReservationPanel";
import { Reviews } from "@/components/listing/Reviews";
import { VisitPanel } from "@/components/listing/VisitPanel";
import { Plate } from "@/components/media/Plate";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Rating } from "@/components/ui/Rating";
import { SaveButton } from "@/components/wishlist/SaveButton";
import { ShareButton } from "@/components/wishlist/ShareButton";
import { detailFor } from "@/lib/listing-details";
import {
  LISTINGS,
  listingBySlug,
  nearbyListings,
  type Listing,
} from "@/lib/listings";
import { formatCoordinates, formatDistance } from "@/lib/geo";
import { getDictionary, fill } from "@/i18n";
import { localeHref, type Locale } from "@/i18n/config";
import {
  categoryLabel,
  listingAccess,
  listingBadge,
  listingLevel,
  listingPlace,
  listingSummary,
} from "@/lib/listing-i18n";

/**
 * One template for all six categories, per the approved design. What changes
 * is the right-hand panel: anything that accepts requests gets the reservation
 * panel, a public site gets "Y aller" instead.
 */

type Params = {
  params: Promise<{ categorie: string; slug: string; locale: Locale }>;
};

export function generateStaticParams() {
  return LISTINGS.map((listing) => ({
    categorie: listing.category,
    slug: listing.slug,
  }));
}

function resolve(categorie: string, slug: string): Listing | null {
  const listing = listingBySlug(slug);
  if (!listing || listing.category !== categorie) return null;
  return listing;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { categorie, slug } = await params;
  const listing = resolve(categorie, slug);
  if (!listing) return { title: "Fiche introuvable" };
  return { title: listing.name, description: listing.summary };
}

export default async function ListingDetailPage({ params }: Params) {
  const { categorie, slug, locale } = await params;
  const listing = resolve(categorie, slug);
  if (!listing) notFound();

  const t = getDictionary(locale);
  const href = (path: string) => localeHref(locale, path);
  const detail = detailFor(listing.slug);
  const category = categoryLabel(listing.category, locale);
  const badge = listingBadge(listing, locale);
  const level = listingLevel(listing, locale);
  const paragraphs =
    locale === "en" && !detail.descriptionEn
      ? [listingSummary(listing, locale)]
      : ((locale === "en" ? detail.descriptionEn : detail.description) ??
        detail.description ?? [listingSummary(listing, locale)]);
  const plates = [listing.plate, ...(detail.gallery ?? [])];
  const nearby = nearbyListings(listing, 4);

  // Practical rows come from the rich detail when it exists, and are otherwise
  // assembled from whatever the catalog record already knows.
  const practical =
    detail.practical ??
    [
      listingAccess(listing, locale)
        ? { label: t.detail.accessRow, value: listingAccess(listing, locale)! }
        : null,
      listing.duration
        ? { label: t.detail.durationRow, value: listing.duration }
        : null,
      listing.elevation
        ? { label: t.detail.elevationRow, value: listing.elevation }
        : null,
      listing.cuisine
        ? { label: t.detail.cuisineRow, value: listing.cuisine }
        : null,
      {
        label: t.detail.distanceRow,
        value: fill(t.detail.fromCentre, {
          distance: formatDistance(listing.distanceKm),
        }),
      },
    ].filter((row): row is { label: string; value: string } => row !== null);

  return (
    <>
      <nav
        aria-label={t.common.home}
        className="mx-auto max-w-[1440px] px-4 pb-3 pt-4 font-mono text-label uppercase tracking-[0.14em] text-ink-subtle md:px-6"
      >
        <Link href={href("/")} className="hover:text-ink">
          {t.common.home}
        </Link>
        {" / "}
        <Link href={href(`/explorer/${listing.category}`)} className="hover:text-ink">
          {category.label}
        </Link>
        {" / "}
        <span className="text-ink">{listing.name}</span>
      </nav>

      <Gallery
        plates={plates}
        photoCount={detail.photoCount}
        alt={listing.name}
        locale={locale}
      />

      <div className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)] gap-8 px-4 pb-14 pt-7 md:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-11">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge>{category.label}</Badge>
            {level ? <Badge tone="outline">{level}</Badge> : null}
            {badge ? (
              <Badge tone={badge.tone === "warm" ? "warm" : badge.tone}>
                {badge.label}
              </Badge>
            ) : null}
          </div>

          <h1 className="mt-3 text-page md:text-[2.6rem] md:leading-[1.04]">
            {listing.name}
          </h1>

          <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-line pb-5 text-small text-ink-muted">
            {listing.rating ? (
              <Rating
                score={listing.rating.score}
                count={listing.rating.count}
                locale={locale}
                showCount
              />
            ) : null}
            <span>
              ◎ {listingPlace(listing, locale)}, {formatDistance(listing.distanceKm)} {t.common.from}
            </span>
            <span className="tabular font-mono text-label text-ink-subtle">
              {formatCoordinates(listing.coordinates)}
            </span>
          </div>

          {detail.seasonNote ? (
            <p className="mt-5 flex gap-3 rounded-plate border border-accent bg-accent/8 p-3.5 text-small text-ink-muted">
              <span aria-hidden="true" className="text-accent">
                ◈
              </span>
              <span>{detail.seasonNote}</span>
            </p>
          ) : null}

          <div className="mt-5 flex max-w-[62ch] flex-col gap-3.5 leading-relaxed">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          {detail.features?.length ? (
            <section className="mt-8">
              <h2 className="text-[1.3rem]">{t.detail.features}</h2>
              <ul className="mt-3 grid gap-x-6 gap-y-2 text-small text-ink-muted sm:grid-cols-2 lg:grid-cols-3">
                {detail.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span aria-hidden="true" className="text-ink-subtle">
                      ◦
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {practical.length ? (
            <section className="mt-8">
              <h2 className="text-[1.3rem]">{t.detail.practical}</h2>
              <dl className="mt-3 overflow-hidden rounded-plate border border-line text-small">
                {practical.map((row, index) => (
                  <div
                    key={row.label}
                    className={`grid sm:grid-cols-[10rem_1fr] ${index > 0 ? "border-t border-line" : ""}`}
                  >
                    <dt className="bg-surface px-3.5 py-2.5 font-mono text-label uppercase tracking-[0.12em] text-ink-subtle">
                      {row.label}
                    </dt>
                    <dd className="px-3.5 py-2.5 text-ink-muted">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          <section className="mt-8">
            <h2 className="text-[1.3rem]">{t.detail.location}</h2>
            {/* Static until /carte — no tile library loads on a detail page. */}
            <Plate variant="forest" className="mt-3 h-52 rounded-plate">
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 z-[3] size-5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[50%_50%_50%_0] border-2 border-white bg-accent"
              />
              <span className="mt-auto self-end p-3">
                <Button href={href("/carte")} variant="primary" size="sm">
                  {t.detail.openInMap}
                </Button>
              </span>
            </Plate>
            <p className="mt-2 font-mono text-label uppercase tracking-[0.12em] text-ink-subtle">
              <span className="tabular">
                {formatCoordinates(listing.coordinates)}
              </span>{" "}
              · {t.detail.approxPosition}
            </p>
          </section>

          <Reviews
            reviews={detail.reviews ?? []}
            total={listing.rating?.count}
            locale={locale}
          />
        </div>

        <aside className="flex flex-col gap-3.5 lg:sticky lg:top-24 lg:self-start">
          {listing.acceptsRequests ? (
            <ReservationPanel listing={listing} detail={detail} locale={locale} />
          ) : (
            <VisitPanel listing={listing} detail={detail} locale={locale} />
          )}

          <div className="grid grid-cols-2 gap-2.5">
            <SaveButton
              slug={listing.slug}
              name={listing.name}
              variant="labelled"
            />
            <ShareButton title={listing.name} />
          </div>

          {detail.contact ? (
            <div className="rounded-panel border border-line p-4.5">
              <p className="font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
                {t.detail.directContact}
              </p>
              <address className="mt-2.5 flex flex-col gap-1.5 text-small not-italic text-ink-muted">
                {detail.contact.phone ? (
                  <a
                    href={`tel:${detail.contact.phone.replace(/\s/g, "")}`}
                    className="tabular font-mono text-ink hover:underline"
                  >
                    {detail.contact.phone}
                  </a>
                ) : null}
                {detail.contact.email ? (
                  <a
                    href={`mailto:${detail.contact.email}`}
                    className="hover:underline"
                  >
                    {detail.contact.email}
                  </a>
                ) : null}
                <span>{detail.contact.address}</span>
              </address>
            </div>
          ) : null}
        </aside>
      </div>

      {nearby.length ? (
        <ListingRow
          kicker={t.detail.nearbyKicker}
          title={t.detail.nearbyTitle}
          action={{ href: href("/carte"), label: t.common.openMap }}
          listings={nearby}
          locale={locale}
          columns={4}
          aspect="16/9"
          className="border-t border-line bg-surface pb-24 lg:pb-14"
        />
      ) : null}

      <MobileActionBar listing={listing} locale={locale} />
    </>
  );
}
