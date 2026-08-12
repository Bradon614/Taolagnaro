import type { Metadata } from "next";
import { WishlistView } from "@/components/wishlist/WishlistView";

export const metadata: Metadata = {
  title: "Vos envies",
  description: "Les lieux que vous avez enregistrés à Taolagnaro.",
  robots: { index: false },
};

export default function EnviesPage() {
  return <WishlistView />;
}
