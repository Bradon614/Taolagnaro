import type { Metadata } from "next";
import { Suspense } from "react";
import { MapExplorer } from "@/components/map/MapExplorer";
import { TOTAL_LISTINGS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Carte de l’Anosy",
  description: `${TOTAL_LISTINGS} lieux, six catégories, une carte. Situez sites, hôtels, tables et activités autour de Taolagnaro.`,
};

export default function CartePage() {
  return (
    <Suspense fallback={<div className="h-[70vh]" />}>
      <MapExplorer />
    </Suspense>
  );
}
