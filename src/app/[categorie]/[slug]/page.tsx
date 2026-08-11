import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { LISTINGS, listingBySlug } from "@/lib/listings";
import { categoryBySlug } from "@/lib/site";

/**
 * Detail route, per the approved sitemap: /:category/:slug. Static segments
 * (/explorer, /carte, /contact, /decouvrir) win over this dynamic one, so
 * there is no collision.
 *
 * Placeholder until the detail page is built.
 */

type Params = { params: Promise<{ categorie: string; slug: string }> };

export function generateStaticParams() {
  return LISTINGS.map((listing) => ({
    categorie: listing.category,
    slug: listing.slug,
  }));
}

function resolve(categorie: string, slug: string) {
  const listing = listingBySlug(slug);
  if (!listing || listing.category !== categorie) return null;
  return listing;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { categorie, slug } = await params;
  const listing = resolve(categorie, slug);
  return { title: listing?.name ?? "Fiche introuvable" };
}

export default async function ListingDetailPage({ params }: Params) {
  const { categorie, slug } = await params;
  const listing = resolve(categorie, slug);
  if (!listing) notFound();

  const category = categoryBySlug(listing.category);

  return (
    <PagePlaceholder
      kicker={`Accueil / ${category?.label ?? categorie} / ${listing.name}`}
      title={listing.name}
      description={`${listing.summary} — ${listing.place}, à ${listing.distanceKm} km du centre.`}
    />
  );
}
