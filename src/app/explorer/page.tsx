import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { TOTAL_LISTINGS } from "@/lib/site";

export const metadata: Metadata = { title: "Explorer l’Anosy" };

export default function ExplorerPage() {
  return (
    <PagePlaceholder
      kicker="Accueil / Explorer"
      title="Explorer l’Anosy"
      description={`${TOTAL_LISTINGS} lieux et offres référencés à Taolagnaro et dans la région. Filtrez, comparez, puis envoyez une demande.`}
    />
  );
}
