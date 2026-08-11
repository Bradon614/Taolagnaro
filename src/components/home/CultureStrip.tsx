import Link from "next/link";
import { Plate } from "@/components/media/Plate";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { PlateVariant } from "@/components/media/Plate";

const CULTURE: {
  title: string;
  note: string;
  plate: PlateVariant;
  href: string;
  wide?: boolean;
}[] = [
  {
    title: "Le hira gasy et les fêtes de village",
    note: "Musique, joutes oratoires et danse — encore vivants dans l’Anosy",
    plate: "town",
    href: "/decouvrir#culture",
    wide: true,
  },
  {
    title: "Vannerie de mahampy",
    note: "Le jonc des marais tressé à Sainte-Luce",
    plate: "sunset",
    href: "/experiences/vannerie-de-mahampy",
  },
  {
    title: "Le sisal et le zébu",
    note: "Ce qui fait vivre l’arrière-pays",
    plate: "forest",
    href: "/decouvrir#culture",
  },
];

export function CultureStrip() {
  return (
    <section className="px-4 py-12 md:px-6 md:py-14">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeader
          kicker="Culture antanosy"
          title="Le pays des Antanosy"
          action={{ href: "/decouvrir#culture", label: "Lire la suite" }}
        />

        <ul className="grid gap-4 lg:grid-cols-[1.3fr_1fr_1fr]">
          {CULTURE.map((item) => (
            <li key={item.title}>
              <Link href={item.href} className="group block rounded-plate">
                <Plate
                  variant={item.plate}
                  className="h-48 rounded-plate transition-opacity group-hover:opacity-90 md:h-56"
                >
                  <span className="mt-auto p-4 md:p-5">
                    <span
                      className={`block font-display leading-tight text-white ${item.wide ? "text-xl md:text-[1.4rem]" : "text-lg"}`}
                    >
                      {item.title}
                    </span>
                    <span className="mt-1 block text-small text-white/85">
                      {item.note}
                    </span>
                  </span>
                </Plate>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
