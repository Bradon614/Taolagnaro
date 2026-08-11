import Link from "next/link";
import { Plate } from "@/components/media/Plate";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { featuredListings, listingHref } from "@/lib/listings";

/**
 * The five places that define the region, weighted so the first one leads.
 * A mosaic rather than a card row: these are destinations, not products, and
 * they should not carry a price or a request button.
 */
export function FeaturedMosaic() {
  const [lead, ...rest] = featuredListings();
  if (!lead) return null;

  return (
    <section className="px-4 py-12 md:px-6 md:py-14">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeader
          kicker="Incontournables"
          title="Les lieux qui définissent l’Anosy"
          action={{ href: "/explorer/sites", label: "Voir tous les sites" }}
        />

        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr_1fr] lg:grid-rows-2">
          <Link
            href={listingHref(lead)}
            className="group rounded-plate lg:row-span-2"
          >
            <Plate
              variant={lead.plate}
              className="h-64 rounded-plate transition-opacity group-hover:opacity-90 lg:h-full"
            >
              <Badge tone="floating" className="absolute left-3 top-3">
                Site touristique
              </Badge>
              <span className="mt-auto p-5">
                <span className="block font-display text-[1.8rem] leading-tight text-white">
                  {lead.name}
                </span>
                <span className="mt-1.5 block max-w-[42ch] text-small text-white/85">
                  {lead.summary}
                </span>
              </span>
            </Plate>
          </Link>

          {rest.map((listing) => (
            <Link
              key={listing.slug}
              href={listingHref(listing)}
              className="group rounded-plate"
            >
              <Plate
                variant={listing.plate}
                className="h-40 rounded-plate transition-opacity group-hover:opacity-90 lg:h-full"
              >
                <span className="mt-auto p-4">
                  <span className="block font-display text-lg leading-tight text-white">
                    {listing.name}
                  </span>
                  <span className="mt-0.5 block text-label text-white/80">
                    {listing.access ?? listing.duration} ·{" "}
                    {listing.distanceKm} km
                  </span>
                </span>
              </Plate>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
