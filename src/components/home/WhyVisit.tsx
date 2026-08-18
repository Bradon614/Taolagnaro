import { Button } from "@/components/ui/Button";
import { getDictionary } from "@/i18n";
import { localeHref, type Locale } from "@/i18n/config";


/**
 * Facts, not adjectives. Three bays, 529 m, three protected areas, a whale
 * season — concrete numbers persuade where "unspoilt paradise" does not, and
 * they survive translation into three languages without losing meaning.
 */

export function WhyVisit({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const facts = [
    { figure: "3", detail: t.home.fact1 },
    { figure: "529 m", detail: t.home.fact2 },
    { figure: "3", detail: t.home.fact3 },
    { figure: locale === "en" ? "Jul–Sep" : "Juil–Sep", detail: t.home.fact4 },
  ];

  return (
    <section className="bg-bay px-4 py-14 text-quartz-200 md:px-6">
      <div className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <div>
          <p className="font-mono text-label uppercase tracking-[0.16em] opacity-60">
            {t.home.whyKicker}
          </p>
          <h2 className="mt-2.5 max-w-[18ch] text-section text-white md:text-[2.1rem] md:leading-[1.1]">
            {t.home.whyTitle}
          </h2>
          <p className="mt-4 max-w-[48ch] text-small leading-relaxed opacity-85 md:text-base">
            {t.home.whyBody}
          </p>
          <Button href={localeHref(locale, "/decouvrir")} variant="ghost" className="mt-6">
            {t.home.whyCta}
          </Button>
        </div>

        <dl className="grid gap-px overflow-hidden border border-white/15 bg-white/15 sm:grid-cols-2">
          {facts.map((fact) => (
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
