import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Plate } from "@/components/media/Plate";
import { Button } from "@/components/ui/Button";
import { formatCoordinates, TOWN_CENTRE } from "@/lib/geo";
import { SITE } from "@/lib/site";
import { getDictionary } from "@/i18n";
import { localeHref, type Locale } from "@/i18n/config";


export const metadata: Metadata = {
  title: "Nous écrire",
  description:
    "Contacter la plateforme Taolagnaro : référencer un établissement, signaler une erreur, presse et partenariats.",
};

const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "WhatsApp", href: `https://wa.me/${SITE.whatsapp}` },
];

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ sujet?: string }>;
}) {
  const { locale } = await params;
  const { sujet } = await searchParams;
  const t = getDictionary(locale);

  return (
    <div className="mx-auto grid max-w-[68rem] grid-cols-[minmax(0,1fr)] gap-10 px-4 pb-16 pt-8 md:px-6 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-12">
      <div>
        <p className="font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
          {t.common.home} / {t.common.contact}
        </p>
        <h1 className="mt-2.5 text-page">{t.contact.title}</h1>
        <p className="mt-2.5 max-w-[54ch] text-ink-muted">
          {t.contact.lead}
        </p>

        <div className="mt-7">
          <Suspense fallback={null}>
            <ContactForm initialSubject={sujet} />
          </Suspense>
        </div>
      </div>

      <aside className="flex flex-col gap-3.5">
        <Plate variant="town" className="h-44 rounded-panel">
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 z-[3] size-5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[50%_50%_50%_0] border-2 border-white bg-accent"
          />
        </Plate>

        <div className="rounded-panel border border-line p-4.5">
          <p className="font-mono text-label uppercase tracking-[0.14em] text-ink-subtle">
            {t.contact.details}
          </p>
          <dl className="mt-3 flex flex-col gap-3 text-small">
            <div>
              <dt className="font-semibold">{t.contact.phone}</dt>
              <dd className="tabular font-mono text-ink-muted">
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="hover:underline"
                >
                  {SITE.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold">{t.contact.email}</dt>
              <dd className="text-ink-muted">
                <a href={`mailto:${SITE.email}`} className="hover:underline">
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold">{t.contact.address}</dt>
              <dd className="text-ink-muted">
                Taolagnaro, {t.discover.kicker}
                <br />
                <span className="tabular font-mono text-label">
                  {formatCoordinates(TOWN_CENTRE)}
                </span>
              </dd>
            </div>
            <div>
              <dt className="font-semibold">{t.contact.replyTime}</dt>
              <dd className="text-ink-muted">{t.contact.replyTimeValue}</dd>
            </div>
          </dl>

          <ul className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-block rounded-sm border border-line-strong px-2.5 py-1 font-mono text-label uppercase tracking-[0.12em] text-ink-muted hover:text-ink"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-panel bg-surface p-4.5">
          <p className="text-small font-semibold">
            {t.contact.providerTitle}
          </p>
          <p className="mt-1.5 text-small text-ink-muted">
            {t.contact.providerBody}
          </p>
          <div className="mt-3.5">
            <Button
              href={localeHref(locale, "/contact?sujet=referencer")}
              variant="secondary"
              size="sm"
            >
              {t.contact.providerCta}
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
