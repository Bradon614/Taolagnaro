"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { isListingDetailRoute, SITE } from "@/lib/site";

/**
 * Five destinations within thumb reach. A hamburger would hide the whole
 * product behind one tap, which is the wrong trade on a platform most people
 * will meet outdoors on a phone.
 */

const TABS = [
  { href: "/", label: "Accueil", glyph: "⌂" },
  { href: "/explorer", label: "Explorer", glyph: "⌕" },
  { href: "/carte", label: "Carte", glyph: "◎" },
  { href: "/envies", label: "Envies", glyph: "♡" },
] as const;

const MORE_LINKS = [
  { href: "/decouvrir", label: "Découvrir Taolagnaro" },
  { href: "/contact", label: "Contact" },
  { href: "/contact", label: "Référencer mon établissement" },
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
];

export function MobileTabBar() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  // Dismiss on navigation, adjusted during render rather than in an effect.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setMoreOpen(false);
  }

  const dialogRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!moreOpen) return;

    // Move focus into the sheet so keyboard users are not left tabbing
    // through the page behind the scrim.
    dialogRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMoreOpen(false);
        moreButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [moreOpen]);

  // Detail pages dock their own action bar; stand down there.
  if (isListingDetailRoute(pathname)) return null;

  return (
    <>
      {moreOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setMoreOpen(false)}
            className="absolute inset-0 bg-abyss/55"
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Plus"
            tabIndex={-1}
            className="absolute inset-x-0 bottom-0 rounded-t-2xl border-t border-line bg-surface px-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-3 outline-none"
          >
            <span
              aria-hidden="true"
              className="mx-auto mb-4 block h-1 w-9 rounded-full bg-line-strong"
            />
            <ul className="flex flex-col">
              {MORE_LINKS.map((link) => (
                <li key={link.label} className="border-b border-line last:border-0">
                  <Link href={link.href} className="block py-3">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
              <LanguageSwitcher className="text-ink" />
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                className="rounded-plate bg-whatsapp px-4 py-2 text-small font-semibold text-abyss"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      ) : null}

      <nav
        aria-label="Navigation mobile"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] text-center lg:hidden"
      >
        {TABS.map((tab) => {
          const active =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-[3.25rem] flex-col items-center justify-center gap-0.5 text-label ${
                active ? "font-semibold text-ink" : "text-ink-subtle"
              }`}
            >
              <span aria-hidden="true" className="text-base leading-none">
                {tab.glyph}
              </span>
              {tab.label}
            </Link>
          );
        })}
        <button
          ref={moreButtonRef}
          type="button"
          onClick={() => setMoreOpen(true)}
          aria-expanded={moreOpen}
          className={`flex min-h-[3.25rem] flex-col items-center justify-center gap-0.5 text-label ${
            moreOpen ? "font-semibold text-ink" : "text-ink-subtle"
          }`}
        >
          <span aria-hidden="true" className="text-base leading-none">
            ☰
          </span>
          Plus
        </button>
      </nav>
    </>
  );
}
