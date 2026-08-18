import Link from "next/link";
import { LogoGlyph } from "@/components/brand/Logo";
import { FooterColumn } from "@/components/layout/FooterColumn";
import { CATEGORIES, SITE } from "@/lib/site";
import { getDictionary } from "@/i18n";
import { localeHref, type Locale } from "@/i18n/config";

const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "WhatsApp", href: `https://wa.me/${SITE.whatsapp}` },
];

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const href = (path: string) => localeHref(locale, path);

  const columns = [
    {
      heading: t.footer.explore,
      links: CATEGORIES.map((category) => ({
        href: `/explorer/${category.slug}`,
        label: category.label,
      })),
    },
    {
      heading: t.footer.region,
      links: [
        { href: "/decouvrir", label: t.common.discover },
        { href: "/decouvrir#histoire", label: t.footer.history },
        { href: "/decouvrir#nature", label: t.footer.nature },
        { href: "/decouvrir#culture", label: t.footer.culture },
        { href: "/decouvrir#pratique", label: t.footer.practical },
        { href: "/carte", label: t.common.map },
      ],
    },
    {
      heading: t.footer.providers,
      links: [
        { href: "/contact", label: t.nav.listBusiness },
        { href: "/contact", label: t.footer.howItWorks },
        { href: "/contact", label: t.common.contact },
        { href: "/mentions-legales", label: t.nav.legal },
        { href: "/confidentialite", label: t.nav.privacy },
      ],
    },
  ];

  return (
    <footer className="mt-auto bg-footer text-footer-ink">
      <div className="mx-auto max-w-[1440px] px-4 pb-6 pt-11 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2 font-display text-xl text-white">
              <LogoGlyph />
              {SITE.name}
            </p>
            <p className="mt-3 max-w-[36ch] text-small opacity-75">
              {t.footer.blurb}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    rel="noreferrer noopener"
                    target="_blank"
                    className="inline-block rounded-sm border border-white/30 px-2.5 py-1 font-mono text-label uppercase tracking-[0.12em] hover:border-white/60"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((column) => (
            <FooterColumn key={column.heading} heading={column.heading}>
              <ul className="flex flex-col gap-2 text-small">
                {column.links.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link href={href(link.href)} className="opacity-85 hover:opacity-100">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-between gap-4 border-t border-white/15 pt-4 font-mono text-label uppercase tracking-[0.1em] opacity-60">
          <span>
            © {new Date().getFullYear()} {SITE.name} · {SITE.region}
          </span>
          <span>FR · EN · MG</span>
          <span className="tabular">{SITE.coordinates}</span>
        </div>
      </div>
    </footer>
  );
}
