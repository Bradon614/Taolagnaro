import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExploreView } from "@/components/explore/ExploreView";
import type { SearchParams } from "@/lib/filters";
import { CATEGORIES, categoryBySlug } from "@/lib/site";
import { getDictionary } from "@/i18n";
import { isLocale, type Locale } from "@/i18n/config";

type Params = {
  params: Promise<{ categorie: string; locale: Locale }>;
  searchParams: Promise<SearchParams>;
};

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ categorie: category.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { categorie, locale } = await params;
  const category = categoryBySlug(categorie);
  if (!category) return { title: "404" };
  const t = getDictionary(isLocale(locale) ? locale : "fr");
  const label = t.categories[category.slug];
  return {
    title: label.label,
    description: `${label.tagline} — ${category.count}.`,
  };
}

export default async function CategoryPage({ params, searchParams }: Params) {
  const { categorie, locale } = await params;
  const category = categoryBySlug(categorie);
  if (!category) notFound();

  const t = getDictionary(locale);
  const label = t.categories[category.slug];

  return (
    <ExploreView
      params={await searchParams}
      basePath={`/explorer/${category.slug}`}
      locale={locale}
      forcedCategory={category.slug}
      title={label.label}
      intro={`${label.tagline}. ${category.count} ${t.common.places}.`}
    />
  );
}
