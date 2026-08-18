import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { SearchProvider } from "@/components/search/SearchProvider";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { getDictionary } from "@/i18n";
import { isLocale, LOCALE_META, LOCALES, type Locale } from "@/i18n/config";
import "../globals.css";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(isLocale(locale) ? locale : "fr");

  return {
    metadataBase: new URL("https://taolagnaro.mg"),
    title: {
      default: `Taolagnaro — ${t.common.discover}`,
      template: "%s · Taolagnaro",
    },
    description: t.home.heroLead,
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_GB" : locale === "mg" ? "mg_MG" : "fr_MG",
      siteName: "Taolagnaro",
    },
    alternates: {
      canonical: locale === "fr" ? "/" : `/${locale}`,
      languages: {
        fr: "/",
        en: "/en",
        mg: "/mg",
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef0eb" },
    { media: "(prefers-color-scheme: dark)", color: "#071a1d" },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale as Locale);

  return (
    <html lang={LOCALE_META[locale].htmlLang}>
      <body className="flex min-h-screen flex-col">
        <LocaleProvider locale={locale}>
          <SearchProvider>
            <a href="#contenu" className="skip-link">
              {t.common.skipToContent}
            </a>
            <SiteHeader />
            {/* Bottom padding clears the mobile tab bar. */}
            <main id="contenu" className="flex-1 pb-20 lg:pb-0">
              {children}
            </main>
            <SiteFooter locale={locale} />
            <MobileTabBar />
          </SearchProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
