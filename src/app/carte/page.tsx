import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { TOTAL_LISTINGS } from "@/lib/site";

export const metadata: Metadata = { title: "Carte de l’Anosy" };

export default function CartePage() {
  return (
    <PagePlaceholder
      kicker="Accueil / Carte"
      title="Carte de l’Anosy"
      description={`${TOTAL_LISTINGS} lieux, six catégories, une carte. Trouvez ce qui est à dix minutes de votre hôtel.`}
    />
  );
}
