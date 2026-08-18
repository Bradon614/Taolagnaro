import type { Metadata } from "next";
import { ChapterRail } from "@/components/discover/ChapterRail";
import { Plate } from "@/components/media/Plate";
import { Button } from "@/components/ui/Button";
import { chaptersFor } from "@/lib/discover";
import { getDictionary, fill } from "@/i18n";
import { isLocale, localeHref, type Locale } from "@/i18n/config";
import { TOTAL_LISTINGS } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(isLocale(locale) ? (locale as Locale) : "fr");
  return { title: t.discover.title, description: t.discover.lead };
}

/**
 * The page that makes someone want to come at all.
 *
 * Deliberately unlike the rest of the platform: one narrow column of text set
 * at a reading measure, images between chapters, and no cards, filters or
 * prices anywhere.
 */
export default async function DecouvrirPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const chapters = chaptersFor(locale);
  return (
    <>
      <Plate variant="sunset" className="min-h-[26rem] md:min-h-[30rem]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-4 pb-11 pt-28 text-center md:px-6 md:pb-14">
          <p className="font-mono text-label uppercase tracking-[0.18em] text-white/70">
            {t.discover.kicker}
          </p>
          <h1 className="mx-auto mt-3.5 max-w-[16ch] text-[2.6rem] leading-[1.03] text-white md:text-[3.4rem]">
            {t.discover.title}
          </h1>
          <p className="mx-auto mt-4 max-w-[56ch] text-white/90">
            {t.discover.lead}
          </p>
        </div>
      </Plate>

      <div className="mx-auto grid max-w-[68rem] grid-cols-[minmax(0,1fr)] gap-0 px-4 md:px-6 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <ChapterRail chapters={chapters} />

        <article className="pb-4 pt-8 lg:border-l lg:border-line lg:pl-11 lg:pt-12">
          {chapters.map((chapter, index) => (
            <section
              key={chapter.id}
              id={chapter.id}
              className="scroll-mt-24 pb-11"
            >
              <p className="font-mono text-label uppercase tracking-[0.16em] text-accent">
                {fill(t.discover.chapter, { n: index + 1, label: chapter.label })}
              </p>
              <h2 className="mt-2.5 max-w-[22ch] text-section md:text-[2rem] md:leading-[1.12]">
                {chapter.title}
              </h2>

              <div className="mt-4 flex flex-col gap-4">
                {chapter.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="max-w-[62ch] text-[1.06rem] leading-[1.7]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {chapter.facts ? (
                <dl className="mt-6 overflow-hidden rounded-plate border border-line text-small">
                  {chapter.facts.map((fact, factIndex) => (
                    <div
                      key={fact.label}
                      className={`grid sm:grid-cols-[9rem_1fr] ${factIndex > 0 ? "border-t border-line" : ""}`}
                    >
                      <dt className="bg-surface px-3.5 py-2.5 font-mono text-label uppercase tracking-[0.12em] text-ink-subtle">
                        {fact.label}
                      </dt>
                      <dd className="px-3.5 py-2.5 text-ink-muted">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              {chapter.figure ? (
                <figure className="mt-7">
                  <div
                    className={`grid gap-3 ${
                      chapter.figure.plates.length === 3
                        ? "sm:grid-cols-3"
                        : chapter.figure.plates.length === 2
                          ? "sm:grid-cols-2"
                          : ""
                    }`}
                  >
                    {chapter.figure.plates.map((plate, plateIndex) => (
                      <Plate
                        key={`${plate}-${plateIndex}`}
                        variant={plate}
                        className={`rounded-plate ${
                          chapter.figure!.plates.length === 1
                            ? "h-56 md:h-72"
                            : "h-44"
                        }`}
                      />
                    ))}
                  </div>
                  <figcaption className="mt-2 text-small text-ink-subtle">
                    {chapter.figure.caption}{" "}
                    <span className="font-mono text-label uppercase tracking-[0.1em]">
                      {t.discover.photoCredit}
                    </span>
                  </figcaption>
                </figure>
              ) : null}
            </section>
          ))}
        </article>
      </div>

      <section className="bg-bay px-4 py-14 text-center text-quartz-200 md:px-6">
        <h2 className="mx-auto max-w-[20ch] text-section text-white md:text-[2rem] md:leading-[1.12]">
          {t.discover.ctaTitle}
        </h2>
        <p className="mx-auto mt-3 max-w-[48ch] text-small opacity-85 md:text-base">
          {t.discover.ctaBody}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href={localeHref(locale, "/explorer")} variant="primary" size="lg">
            {fill(t.home.ctaExplore, { count: TOTAL_LISTINGS })}
          </Button>
          <Button href={localeHref(locale, "/carte")} variant="ghost" size="lg">
            {t.common.openMap}
          </Button>
        </div>
      </section>
    </>
  );
}
