import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExploreView } from "@/components/explore/ExploreView";
import type { SearchParams } from "@/lib/filters";
import { CATEGORIES, categoryBySlug } from "@/lib/site";

type Params = {
  params: Promise<{ categorie: string }>;
  searchParams: Promise<SearchParams>;
};

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ categorie: category.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const category = categoryBySlug((await params).categorie);
  if (!category) return { title: "Catégorie introuvable" };
  return {
    title: category.label,
    description: `${category.tagline} — ${category.count} adresses à Taolagnaro et dans la région Anosy.`,
  };
}

export default async function CategoryPage({ params, searchParams }: Params) {
  const category = categoryBySlug((await params).categorie);
  if (!category) notFound();

  return (
    <ExploreView
      params={await searchParams}
      basePath={`/explorer/${category.slug}`}
      forcedCategory={category.slug}
      title={category.label}
      intro={`${category.tagline}. ${category.count} adresses référencées dans la région Anosy.`}
    />
  );
}
