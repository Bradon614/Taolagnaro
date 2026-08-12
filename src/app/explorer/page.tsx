import type { Metadata } from "next";
import { ExploreView } from "@/components/explore/ExploreView";
import type { SearchParams } from "@/lib/filters";
import { TOTAL_LISTINGS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Explorer l’Anosy",
  description:
    "Tous les sites, hôtels, restaurants, activités et excursions référencés à Taolagnaro et dans la région Anosy.",
};

export default async function ExplorerPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <ExploreView
      params={await searchParams}
      basePath="/explorer"
      title="Explorer l’Anosy"
      intro={`${TOTAL_LISTINGS} lieux et offres référencés à Taolagnaro et dans la région. Filtrez, comparez, puis envoyez une demande.`}
    />
  );
}
