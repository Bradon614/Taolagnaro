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
import { detailFor } from "@/lib/listing-details";
import {
  LISTINGS,
  listingBySlug,
  nearbyListings,
  type Listing,
} from "@/lib/listings";
import { formatCoordinates, formatDistance } from "@/lib/geo";
import { categoryBySlug } from "@/lib/site";

/**
 * One template for all six categories, per the approved design. What changes
 * is the right-hand panel: anything that accepts requests gets the reservation
 * panel, a public site gets "Y aller" instead.
 */

type Params = { params: Promise<{ categorie: string; slug: string }> };

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
  const { categorie, slug } = await params;
  const listing = resolve(categorie, slug);
  if (!listing) notFound();

  const detail = detailFor(listing.slug);
  const category = categoryBySlug(listing.category);
  const paragraphs = detail.description ?? [listing.summary];
  const plates = [listing.plate, ...(detail.gallery ?? [])];
  const nearby = nearbyListings(listing, 4);

  // Practical rows come from the rich detail when it exists, and are otherwise
  // assembled from whatever the catalog record already knows.
  const practical =
    detail.practical ??
    [
      listing.access ? { label: "Accès", value: listing.access } : null,
      listing.duration ? { label: "Durée", value: listing.duration } : null,
      listing.elevation ? { label: "Altitude", value: listing.elevation } : null,
      listing.cuisine ? { label: "Cuisine", value: listing.cuisine } : null,
      {
        label: "Distance",
        value: `${formatDistance(listing.distanceKm)} du centre de Taolagnaro`,
      },
    ].filter((row): row is { label: string; value: string } => row !== null);

  return (
    <>
      <nav
        aria-label="Fil d’ariane"
        className="mx-auto max-w-[1440px] px-4 pb-3 pt-4 font-mono text-label uppercase tracking-[0.14em] text-ink-subtle md:px-6"
      >
        <Link href="/" className="hover:text-ink">
          Accueil
        </Link>
        {" / "}
        <Link href={`/explorer/${listing.category}`} className="hover:text-ink">
          {category?.label}
        </Link>
        {" / "}
        <span className="text-ink">{listing.name}</span>
      </nav>

      <Gallery
        plates={plates}
        photoCount={detail.photoCount}
        alt={listing.name}
      />

      <div className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)] gap-8 px-4 pb-14 pt-7 md:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-11">
        <div>
          <div className="flex flex-wrap gap-2">
            {category ? <Badge>{category.label}</Badge> : null}
            {listing.level ? <Badge tone="outline">{listing.level}</Badge> : null}
            {listing.badge ? (
              <Badge tone={listing.badge.tone === "warm" ? "warm" : listing.badge.tone}>
                {listing.badge.label}
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
                showCount
              />
            ) : null}
            <span>
              ◎ {listing.place}, {formatDistance(listing.distanceKm)} du centre
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
              <h2 className="text-[1.3rem]">Équipements et services</h2>
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
              <h2 className="text-[1.3rem]">Informations pratiques</h2>
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
            <h2 className="text-[1.3rem]">Situation</h2>
            {/* Static until /carte — no tile library loads on a detail page. */}
            <Plate variant="forest" className="mt-3 h-52 rounded-plate">
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 z-[3] size-5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[50%_50%_50%_0] border-2 border-white bg-accent"
              />
              <span className="mt-auto self-end p-3">
                <Button href="/carte" variant="primary" size="sm">
                  Ouvrir dans la carte
                </Button>
              </span>
            </Plate>
            <p className="mt-2 font-mono text-label uppercase tracking-[0.12em] text-ink-subtle">
              <span className="tabular">
                {formatCoordinates(listing.coordinates)}
              </span>{" "}
              · Position approximative
            </p>
          </section>

          <Reviews
            reviews={detail.reviews ?? []}
            total={listing.rating?.count}
          />
        </div>

        <aside className="flex flex-col gap-3.5 lg:sticky lg:top-24 lg:self-start">
          {listing.acceptsRequests ? (
            <ReservationPanel listing={listing} detail={detail} />
          ) : (
            <VisitPanel listing={listing} detail={detail} />
          )}

          {detail.contact ? (
            <div className="rounded-panel border border-line p-4.5">
              <p className="font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
                Contact direct
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
          kicker="À proximité"
          title="Autres lieux tout près"
          action={{ href: "/carte", label: "Ouvrir la carte" }}
          listings={nearby}
          columns={4}
          aspect="16/9"
          className="border-t border-line bg-surface pb-24 lg:pb-14"
        />
      ) : null}

      <MobileActionBar listing={listing} />
    </>
  );
}
