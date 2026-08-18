import type { Metadata } from "next";
import { WishlistView } from "@/components/wishlist/WishlistView";
import { getDictionary } from "@/i18n";
import { isLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(isLocale(locale) ? (locale as Locale) : "fr");
  return { title: t.wishlist.title, robots: { index: false } };
}

export default function EnviesPage() {
  return <WishlistView />;
}
