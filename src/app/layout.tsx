import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://taolagnaro.mg"),
  title: {
    default: "Taolagnaro — Découvrir Fort-Dauphin et la région Anosy",
    template: "%s · Taolagnaro",
  },
  description:
    "Explorez la beauté naturelle, la culture et les expériences de Taolagnaro (Fort-Dauphin). Sites, hôtels, restaurants, activités et excursions de la région Anosy, à Madagascar.",
  openGraph: {
    type: "website",
    locale: "fr_MG",
    siteName: "Taolagnaro",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef0eb" },
    { media: "(prefers-color-scheme: dark)", color: "#071a1d" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="flex min-h-screen flex-col">
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <SiteHeader />
        {/* Bottom padding clears the mobile tab bar. */}
        <main id="contenu" className="flex-1 pb-20 lg:pb-0">
          {children}
        </main>
        <SiteFooter />
        <MobileTabBar />
      </body>
    </html>
  );
}
