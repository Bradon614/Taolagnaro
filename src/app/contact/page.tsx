import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = { title: "Nous écrire" };

export default function ContactPage() {
  return (
    <PagePlaceholder
      kicker="Accueil / Contact"
      title="Nous écrire"
      description="Pour une réservation, passez par la fiche du lieu concerné — c’est plus rapide. Ce formulaire est destiné à la plateforme."
    />
  );
}
