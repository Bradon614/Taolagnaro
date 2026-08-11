import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { CATEGORIES, categoryBySlug } from "@/lib/site";

type Params = { params: Promise<{ categorie: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ categorie: category.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const category = categoryBySlug((await params).categorie);
  return { title: category?.label ?? "Catégorie introuvable" };
}

export default async function CategoryPage({ params }: Params) {
  const category = categoryBySlug((await params).categorie);
  if (!category) notFound();

  return (
    <PagePlaceholder
      kicker={`Accueil / Explorer / ${category.label}`}
      title={category.label}
      description={`${category.tagline}. ${category.count} résultats dans la région Anosy.`}
    />
  );
}
