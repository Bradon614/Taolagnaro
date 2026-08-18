import Link from "next/link";
import { Alert } from "@/components/ui/Alert";
import { splitPlaceholders, type Block, type LegalDoc } from "@/lib/legal";
import { getDictionary } from "@/i18n";
import { localeHref, type Locale } from "@/i18n/config";

/**
 * Shared layout for the legal documents. Narrow reading measure, anchored
 * sections, and a standing notice that the text is a draft.
 *
 * Placeholders render as loud amber chips rather than quiet italics. An
 * unfilled "[[FULL ADDRESS]]" should be impossible to miss on the page — the
 * failure mode to design against is publishing a template with the blanks
 * still in it.
 */

function Text({ value }: { value: string }) {
  return (
    <>
      {splitPlaceholders(value).map((part, index) =>
        part.placeholder ? (
          <mark
            key={index}
            className="mx-0.5 rounded-sm border border-accent bg-accent/15 px-1.5 py-0.5 font-mono text-label uppercase tracking-[0.08em] text-accent"
          >
            {part.text}
          </mark>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </>
  );
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="mt-3 flex flex-col gap-3.5">
      {blocks.map((block, index) => {
        if (block.kind === "p") {
          return (
            <p key={index} className="max-w-[62ch] leading-relaxed">
              <Text value={block.text} />
            </p>
          );
        }

        if (block.kind === "list") {
          return (
            <ul key={index} className="flex max-w-[62ch] flex-col gap-2">
              {block.items.map((item) => (
                <li key={item} className="flex gap-2.5 leading-relaxed">
                  <span aria-hidden="true" className="text-ink-subtle">
                    ◦
                  </span>
                  <span>
                    <Text value={item} />
                  </span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <dl
            key={index}
            className="overflow-hidden rounded-plate border border-line text-small"
          >
            {block.rows.map((row, rowIndex) => (
              <div
                key={row.label}
                className={`grid sm:grid-cols-[13rem_minmax(0,1fr)] ${rowIndex > 0 ? "border-t border-line" : ""}`}
              >
                <dt className="bg-surface px-3.5 py-2.5 font-mono text-label uppercase tracking-[0.12em] text-ink-subtle">
                  {row.label}
                </dt>
                <dd className="px-3.5 py-2.5 text-ink-muted">
                  <Text value={row.value} />
                </dd>
              </div>
            ))}
          </dl>
        );
      })}
    </div>
  );
}

export function LegalPage({
  doc,
  locale,
}: {
  doc: LegalDoc;
  locale: Locale;
}) {
  const t = getDictionary(locale);
  const isEnglish = locale === "en";

  return (
    <div className="mx-auto grid max-w-[64rem] grid-cols-[minmax(0,1fr)] gap-0 px-4 pb-16 pt-8 md:px-6 lg:grid-cols-[13rem_minmax(0,1fr)]">
      <nav
        aria-label={doc.title}
        className="hidden lg:sticky lg:top-24 lg:block lg:self-start lg:pr-7"
      >
        <p className="mb-3 font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
          {doc.title}
        </p>
        <ul className="flex flex-col gap-2">
          {doc.sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="block text-small text-ink-muted hover:text-ink"
              >
                {section.heading}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <article className="lg:border-l lg:border-line lg:pl-11">
        <p className="font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
          <Link href={localeHref(locale, "/")} className="hover:text-ink">
            {t.common.home}
          </Link>{" "}
          / {doc.title}
        </p>

        <h1 className="mt-2.5 text-page">{doc.title}</h1>
        <p className="mt-2.5 max-w-[58ch] text-ink-muted">{doc.intro}</p>

        <p className="mt-3 font-mono text-label uppercase tracking-[0.12em] text-ink-subtle">
          {isEnglish ? "Last updated" : "Mise à jour"} :{" "}
          <Text value={doc.updated} />
        </p>

        <div className="mt-6">
          <Alert
            tone="season"
            title={
              isEnglish
                ? "Draft — not yet reviewed by a lawyer."
                : "Brouillon — pas encore relu par un juriste."
            }
          >
            {isEnglish
              ? "The description of what this platform does with data is accurate and taken from the code itself. Everything highlighted in amber still has to be supplied, and the whole text needs review by a qualified lawyer before the site goes live."
              : "La description de ce que la plateforme fait de vos données est exacte : elle est tirée du code lui-même. Tout ce qui apparaît en surbrillance reste à compléter, et l’ensemble doit être relu par un juriste avant la mise en ligne."}
          </Alert>
        </div>

        {doc.sections.map((section) => (
          <section key={section.id} id={section.id} className="mt-9 scroll-mt-24">
            <h2 className="text-[1.3rem]">{section.heading}</h2>
            <Blocks blocks={section.blocks} />
          </section>
        ))}
      </article>
    </div>
  );
}
