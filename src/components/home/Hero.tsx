import Link from "next/link";
import { SearchTrigger } from "@/components/search/SearchTrigger";
import { Plate } from "@/components/media/Plate";
import { SITE } from "@/lib/site";
import { getDictionary } from "@/i18n";
import { localeHref, type Locale } from "@/i18n/config";


/**
 * The hero has one job: say where you are and let you start looking.
 * Headline and search sit at the bottom, over the darkest part of the plate,
 * so contrast holds whichever photograph eventually replaces it.
 */

const POPULAR = [
  { label: "Libanona", href: "/sites/plage-de-libanona" },
  { label: "Pic Saint-Louis", href: "/sites/pic-saint-louis" },
  { label: "Berenty", href: "/excursions/reserve-de-berenty" },
  { label: "Sainte-Luce", href: "/sites/baie-de-sainte-luce" },
];

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const href = (path: string) => localeHref(locale, path);

  const fields = [
    { label: t.home.fieldWhat, placeholder: t.home.placeholderWhat, grow: "sm:flex-[1.4]" },
    { label: t.home.fieldWhere, placeholder: t.home.placeholderWhere, grow: "sm:flex-1" },
    { label: t.home.fieldWhen, placeholder: t.home.placeholderWhen, grow: "sm:flex-[0.85]" },
  ];

  return (
    <Plate variant="ocean" className="min-h-[34rem] md:min-h-[38rem]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-4 pb-10 pt-28 md:px-6 md:pb-14">
        <p className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-label uppercase tracking-[0.18em] text-white/70">
          <span>{t.discover.kicker}</span>
          <span className="tabular">{SITE.coordinates}</span>
        </p>

        <h1 className="mt-4 max-w-[14ch] text-[2.75rem] leading-[1.02] text-white md:text-hero">
          {t.home.heroTitle}
        </h1>

        <p className="mt-4 max-w-[50ch] text-white/90 md:text-lg">
{t.home.heroLead}
        </p>

        {/* Opens the search overlay. Dates stay decorative for now — there is
            no availability to check against, and the field exists to set the
            provider's expectation, not to filter. */}
        <SearchTrigger
          label={t.search.inputLabel}
          className="mt-7 flex w-full max-w-3xl flex-col gap-1 rounded-2xl bg-surface p-2 text-left sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:py-1.5 sm:pl-6 sm:pr-1.5"
        >
          {fields.map((field, index) => (
            <span
              key={field.label}
              className={`flex flex-col px-4 py-2 sm:px-0 sm:py-1 ${field.grow} ${
                index > 0 ? "sm:border-l sm:border-line sm:pl-5" : ""
              }`}
            >
              <span className="font-mono text-[0.53rem] uppercase tracking-[0.14em] text-ink-subtle">
                {field.label}
              </span>
              <span className="text-small text-ink-subtle">
                {field.placeholder}
              </span>
            </span>
          ))}
          <span className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-small font-semibold text-accent-contrast sm:mt-0">
            <span aria-hidden="true">⌕</span> {t.common.search}
          </span>
        </SearchTrigger>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-label uppercase tracking-[0.14em] text-white/55">
            {t.home.popular}
          </span>
          {POPULAR.map((item) => (
            <Link
              key={item.label}
              href={href(item.href)}
              className="rounded-plate border border-white/40 bg-white/15 px-3.5 py-1.5 text-small text-white backdrop-blur-sm hover:bg-white/25"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </Plate>
  );
}
