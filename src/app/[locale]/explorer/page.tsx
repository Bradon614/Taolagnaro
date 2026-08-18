import type { Metadata } from "next";
import { ExploreView } from "@/components/explore/ExploreView";
import type { SearchParams } from "@/lib/filters";
import { TOTAL_LISTINGS } from "@/lib/site";
import type { Locale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "Explorer l’Anosy",
  description:
    "Tous les sites, hôtels, restaurants, activités et excursions référencés à Taolagnaro et dans la région Anosy.",
};

export default async function ExplorerPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  return (
    <ExploreView
      params={await searchParams}
      basePath="/explorer"
      locale={locale}
      title="Explorer l’Anosy"
      intro={`${TOTAL_LISTINGS} lieux et offres référencés à Taolagnaro et dans la région. Filtrez, comparez, puis envoyez une demande.`}
    />
  );
}
