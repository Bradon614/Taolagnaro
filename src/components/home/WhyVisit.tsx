import { Button } from "@/components/ui/Button";

/**
 * Facts, not adjectives. Three bays, 529 m, three protected areas, a whale
 * season — concrete numbers persuade where "unspoilt paradise" does not, and
 * they survive translation into three languages without losing meaning.
 */

const FACTS = [
  {
    figure: "3",
    detail: "baies dans la même ville — Libanona, Galions, Ambinanibe",
  },
  {
    figure: "529 m",
    detail: "le Pic Saint-Louis, montée depuis le niveau de la mer",
  },
  {
    figure: "3",
    detail:
      "aires protégées à moins de 100 km : Andohahela, Berenty, Nahampoana",
  },
  {
    figure: "Juil–Sep",
    detail: "baleines à bosse au large de la presqu’île",
  },
];

export function WhyVisit() {
  return (
    <section className="bg-bay px-4 py-14 text-quartz-200 md:px-6">
      <div className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <div>
          <p className="font-mono text-label uppercase tracking-[0.16em] opacity-60">
            Pourquoi venir
          </p>
          <h2 className="mt-2.5 max-w-[18ch] text-section text-white md:text-[2.1rem] md:leading-[1.1]">
            Là où la forêt épineuse rencontre l’océan Indien
          </h2>
          <p className="mt-4 max-w-[48ch] text-small leading-relaxed opacity-85 md:text-base">
            Taolagnaro tient sur une presqu’île entre trois baies. En une
            journée on passe d’une plage de récif à une forêt à lémuriens, d’un
            fort du XVII<sup>e</sup> siècle à un village de pêcheurs antanosy.
            Peu de destinations à Madagascar concentrent autant sur si peu de
            kilomètres.
          </p>
          <Button href="/decouvrir" variant="ghost" className="mt-6">
            Découvrir la région →
          </Button>
        </div>

        <dl className="grid gap-px overflow-hidden border border-white/15 bg-white/15 sm:grid-cols-2">
          {FACTS.map((fact) => (
            <div key={fact.detail} className="bg-bay p-5">
              <dt className="tabular font-mono text-[1.7rem] leading-none text-sisal-bright">
                {fact.figure}
              </dt>
              <dd className="mt-1.5 text-small opacity-80">{fact.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
