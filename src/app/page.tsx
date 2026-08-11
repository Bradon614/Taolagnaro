import { Logo } from "@/components/brand/Logo";

/**
 * Holding page. This exists so the design tokens can be verified in a browser
 * in both themes; it is replaced by the real home page in the next step.
 */

const PALETTE = [
  { name: "Abyss", value: "#071a1d", note: "Dark ground" },
  { name: "Bay", value: "#0b3b3c", note: "Primary brand" },
  { name: "Lagoon", value: "#14706b", note: "Links, active states" },
  { name: "Reef", value: "#6fbfb0", note: "Brand on dark" },
  { name: "Sisal", value: "#c98a16", note: "The single accent" },
  { name: "Laterite", value: "#b14a2a", note: "Semantic warm" },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-10 px-6 py-16">
      <header className="flex items-baseline justify-between gap-4 border-b border-line pb-5">
        <Logo />
        <span className="font-mono text-label uppercase tracking-[0.13em] text-ink-subtle">
          25°02′S 46°59′E
        </span>
      </header>

      <div>
        <p className="font-mono text-label uppercase tracking-[0.13em] text-ink-subtle">
          Région Anosy · Madagascar
        </p>
        <h1 className="mt-4 font-display text-page leading-[1.05] sm:text-hero sm:leading-[0.98]">
          Découvrez Taolagnaro
        </h1>
        <p className="mt-4 max-w-[52ch] text-ink-muted">
          Explorez la beauté naturelle, la culture et les expériences de
          Fort-Dauphin.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="font-mono text-label uppercase tracking-[0.13em] text-ink-subtle">
          Palette
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {PALETTE.map((swatch) => (
            <li
              key={swatch.name}
              className="overflow-hidden rounded-plate border border-line bg-surface"
            >
              <div
                className="h-14"
                style={{ backgroundColor: swatch.value }}
                aria-hidden="true"
              />
              <div className="px-3 py-2.5">
                <p className="text-small font-semibold">{swatch.name}</p>
                <p className="font-mono text-label uppercase tracking-[0.1em] text-ink-subtle">
                  {swatch.value}
                </p>
                <p className="mt-1.5 text-small text-ink-muted">{swatch.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-mono text-label uppercase tracking-[0.13em] text-ink-subtle">
          Typographie
        </h2>
        <div className="divide-y divide-line rounded-plate border border-line bg-surface px-5">
          <p className="py-3 font-display text-section">
            Baie de Sainte-Luce
          </p>
          <p className="py-3">
            Explorez les plages, les réserves et les tables de l’Anosy.
          </p>
          <p className="tabular py-3 font-mono text-small">
            180 000 Ar ≈ 36 € · 12,4 km · 3 h 30
          </p>
        </div>
      </section>

      <p className="text-small text-ink-subtle">
        Page temporaire — remplacée par la page d’accueil à l’étape suivante.
      </p>
    </main>
  );
}
