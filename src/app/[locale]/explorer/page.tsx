import type { Metadata } from "next";
import { ExploreView } from "@/components/explore/ExploreView";
import type { SearchParams } from "@/lib/filters";
import { TOTAL_LISTINGS } from "@/lib/site";
import { getDictionary, fill } from "@/i18n";
import { isLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const t = getDictionary(
    isLocale((await params).locale) ? ((await params).locale as Locale) : "fr",
  );
  return {
    title: t.explore.title,
    description: fill(t.explore.intro, { count: TOTAL_LISTINGS }),
  };
}

export default async function ExplorerPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  const t = getDictionary(locale);
  return (
    <ExploreView
      params={await searchParams}
      basePath="/explorer"
      locale={locale}
      title={t.explore.title}
      intro={fill(t.explore.intro, { count: TOTAL_LISTINGS })}
    />
  );
}
