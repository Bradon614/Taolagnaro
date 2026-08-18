import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { legalDoc } from "@/lib/legal";
import { isLocale, type Locale } from "@/i18n/config";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const doc = legalDoc(isLocale(locale) ? locale : "fr");
  return { title: doc.title, description: doc.intro };
}

export default async function Page({ params }: Params) {
  const { locale } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "fr";
  return <LegalPage doc={legalDoc(resolved)} locale={resolved} />;
}
