import { Button } from "@/components/ui/Button";
import { TOTAL_LISTINGS } from "@/lib/site";
import { getDictionary, fill } from "@/i18n";
import { localeHref, type Locale } from "@/i18n/config";


export function ClosingCta({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section className="px-4 py-14 text-center md:px-6 md:py-16">
      <h2 className="mx-auto max-w-[20ch] text-section md:text-[2.1rem] md:leading-[1.12]">
        {t.home.ctaTitle}
      </h2>
      <p className="mx-auto mt-3 max-w-[46ch] text-ink-muted">
        {t.home.ctaBody}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button href={localeHref(locale, "/explorer")} variant="primary" size="lg">
          {fill(t.home.ctaExplore, { count: TOTAL_LISTINGS })}
        </Button>
        <Button href={localeHref(locale, "/contact")} variant="secondary" size="lg">
          {t.home.ctaContact}
        </Button>
      </div>
    </section>
  );
}
