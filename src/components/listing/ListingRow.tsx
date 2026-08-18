import { ListingCard } from "@/components/listing/ListingCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Listing } from "@/lib/listings";
import type { Locale } from "@/i18n/config";

const COLUMNS: Record<3 | 4, string> = {
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/**
 * A titled shelf of cards. On mobile it becomes a horizontal scroll rail so a
 * phone user can flick through four hotels without scrolling past all four.
 */
export function ListingRow({
  kicker,
  title,
  action,
  listings,
  locale,
  columns = 4,
  aspect = "4/3",
  className,
}: {
  kicker: string;
  title: string;
  action?: { href: string; label: string };
  listings: Listing[];
  locale: Locale;
  columns?: 3 | 4;
  aspect?: "4/3" | "16/9" | "3/2";
  className?: string;
}) {
  return (
    <section className={`px-4 py-12 md:px-6 md:py-14 ${className ?? ""}`}>
      <div className="mx-auto max-w-[1440px]">
        <SectionHeader kicker={kicker} title={title} action={action} />

        <ul
          className={`-mx-4 grid auto-cols-[78%] grid-flow-col gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:auto-cols-auto sm:grid-flow-row sm:overflow-visible sm:px-0 sm:pb-0 ${COLUMNS[columns]}`}
        >
          {listings.map((listing) => (
            <li key={listing.slug} className="flex">
              <ListingCard listing={listing} locale={locale} aspect={aspect} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
