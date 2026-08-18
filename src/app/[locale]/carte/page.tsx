import type { Metadata } from "next";
import { Suspense } from "react";
import { MapExplorer } from "@/components/map/MapExplorer";
import { TOTAL_LISTINGS } from "@/lib/site";
import { getDictionary, fill } from "@/i18n";
import { isLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(isLocale(locale) ? (locale as Locale) : "fr");
  return {
    title: t.map.title,
    description: fill(t.map.description, { count: TOTAL_LISTINGS }),
  };
}

export default function CartePage() {
  return (
    <Suspense fallback={<div className="h-[70vh]" />}>
      <MapExplorer />
    </Suspense>
  );
}
