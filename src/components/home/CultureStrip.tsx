import Link from "next/link";
import { Plate } from "@/components/media/Plate";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { PlateVariant } from "@/components/media/Plate";
import { getDictionary } from "@/i18n";
import { localeHref, type Locale } from "@/i18n/config";



export function CultureStrip({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const href = (path: string) => localeHref(locale, path);

  const culture: {
    title: string;
    note: string;
    plate: PlateVariant;
    href: string;
    wide?: boolean;
  }[] = [
    { title: t.home.culture1Title, note: t.home.culture1Note, plate: "town", href: "/decouvrir#culture", wide: true },
    { title: t.home.culture2Title, note: t.home.culture2Note, plate: "sunset", href: "/experiences/vannerie-de-mahampy" },
    { title: t.home.culture3Title, note: t.home.culture3Note, plate: "forest", href: "/decouvrir#culture" },
  ];

  return (
    <section className="px-4 py-12 md:px-6 md:py-14">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeader
          kicker={t.home.cultureKicker}
          title={t.home.cultureTitle}
          action={{ href: href("/decouvrir#culture"), label: t.home.cultureAction }}
        />

        <ul className="grid gap-4 lg:grid-cols-[1.3fr_1fr_1fr]">
          {culture.map((item) => (
            <li key={item.title}>
              <Link href={href(item.href)} className="group block rounded-plate">
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
