import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = { title: "Découvrir Taolagnaro" };

export default function DecouvrirPage() {
  return (
    <PagePlaceholder
      kicker="Région Anosy · Sud-est de Madagascar"
      title="Taolagnaro, au bout de la route du sud"
      description="Une presqu’île, trois baies, une forêt épineuse et près de quatre siècles d’histoire entre les Antanosy, les Français et l’océan Indien."
    />
  );
}
