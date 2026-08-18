import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExploreView } from "@/components/explore/ExploreView";
import type { SearchParams } from "@/lib/filters";
import { CATEGORIES, categoryBySlug } from "@/lib/site";
import type { Locale } from "@/i18n/config";

type Params = {
  params: Promise<{ categorie: string; locale: Locale }>;
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
  const { categorie, locale } = await params;
  const category = categoryBySlug(categorie);
  if (!category) notFound();

  return (
    <ExploreView
      params={await searchParams}
      basePath={`/explorer/${category.slug}`}
      locale={locale}
      forcedCategory={category.slug}
      title={category.label}
      intro={`${category.tagline}. ${category.count} adresses référencées dans la région Anosy.`}
    />
  );
}
