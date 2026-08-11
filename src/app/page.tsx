import { Hero } from "@/components/home/Hero";
import { CategoryStrip } from "@/components/home/CategoryStrip";
import { FeaturedMosaic } from "@/components/home/FeaturedMosaic";
import { WhyVisit } from "@/components/home/WhyVisit";
import { CultureStrip } from "@/components/home/CultureStrip";
import { MapPreview } from "@/components/home/MapPreview";
import { ClosingCta } from "@/components/home/ClosingCta";
import { ListingRow } from "@/components/listing/ListingRow";
import { listingsByCategory } from "@/lib/listings";

/**
 * Ordered the way a first-time visitor decides: what kind of thing, then which
 * specific thing, then why this place at all.
 */
export default function Home() {
  const hotels = listingsByCategory("hotels").slice(0, 4);
  const restaurants = listingsByCategory("restaurants").slice(0, 3);
  const activities = [
    ...listingsByCategory("activites"),
    ...listingsByCategory("excursions"),
    ...listingsByCategory("experiences"),
  ].slice(0, 4);

  return (
    <>
      <Hero />
      <CategoryStrip />
      <FeaturedMosaic />

      <ListingRow
        kicker="Où dormir"
        title="Hébergements recommandés"
        action={{ href: "/explorer/hotels", label: "Voir tous les hôtels" }}
        listings={hotels}
        columns={4}
        className="border-y border-line bg-surface"
      />

      <ListingRow
        kicker="Où manger"
        title="Tables populaires"
        action={{
          href: "/explorer/restaurants",
          label: "Voir tous les restaurants",
        }}
        listings={restaurants}
        columns={3}
        aspect="16/9"
      />

      <ListingRow
        kicker="Activités & expériences"
        title="À faire pendant votre séjour"
        action={{ href: "/explorer/activites", label: "Tout voir" }}
        listings={activities}
        columns={4}
        aspect="3/2"
        className="border-t border-line bg-surface"
      />

      <WhyVisit />
      <CultureStrip />
      <MapPreview />
      <ClosingCta />
    </>
  );
}
