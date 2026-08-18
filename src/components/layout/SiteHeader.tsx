"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ExploreMenu } from "@/components/layout/ExploreMenu";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { SearchTrigger } from "@/components/search/SearchTrigger";
import { OVERLAY_HEADER_ROUTES, PRIMARY_NAV } from "@/lib/site";
import { useHref, useLocale } from "@/i18n/LocaleProvider";
import { splitLocale } from "@/i18n/config";

/**
 * Four primary destinations, a search field, the language switcher and one
 * gold action. On routes with a full-bleed hero the header sits transparently
 * over the image; everywhere else it is a solid sticky bar.
 */
export function SiteHeader() {
  const rawPathname = usePathname();
  // The proxy rewrites French URLs to /fr/..., so compare against the
  // locale-free path or every overlay route check fails outside French.
  const { path: pathname } = splitLocale(rawPathname);
  const isOverlay = OVERLAY_HEADER_ROUTES.includes(pathname);
  const { t } = useLocale();
  const href = useHref();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  // A route change must always dismiss the panel. Adjusted during render
  // rather than in an effect, so the panel never paints on the new page.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        triggerRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // On routes with a full-bleed hero the header starts transparent over the
  // image and turns solid once the hero is behind you — otherwise a long page
  // (Découvrir runs to seven chapters) is left with no navigation at all.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (!isOverlay) return;
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOverlay]);

  function openMenu() {
    clearTimeout(closeTimer.current);
    setMenuOpen(true);
  }

  // A small grace period stops the panel flickering shut as the pointer
  // travels from the trigger down into it.
  function scheduleClose() {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenuOpen(false), 120);
  }

  // On mobile the header is two rows tall and the bottom bar is already the
  // persistent navigation, so the solid variant only sticks from lg upwards.
  const headerTone = isOverlay
    ? scrolled
      ? "fixed inset-x-0 top-0 z-40 border-line bg-surface text-ink shadow-[0_1px_0_var(--line)]"
      : "absolute inset-x-0 top-0 z-40 border-white/20 text-white"
    : "z-40 border-line bg-surface text-ink lg:sticky lg:top-0";

  return (
    <header className={`border-b ${headerTone}`}>
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-4 md:px-6">
        <Link
          href={href("/")}
          className="shrink-0 rounded-plate"
          aria-label={t.nav.homeAria}
        >
          <Logo />
        </Link>

        {/* Primary navigation — desktop only; mobile uses the bottom bar.
            The panel lives inside this wrapper so an outside-click check does
            not tear it down before a link inside it registers its click. */}
        <div
          ref={wrapperRef}
          className="hidden lg:block"
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
        >
          <nav aria-label={t.nav.primary}>
          <ul className="flex items-center gap-5 text-small">
            {PRIMARY_NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              if (!item.hasMenu) {
                return (
                  <li key={item.href}>
                    <Link
                      href={href(item.href)}
                      className={`inline-block rounded-sm py-1 ${
                        active
                          ? "font-semibold opacity-100"
                          : "opacity-80 hover:opacity-100"
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {t.common[item.key]}
                    </Link>
                  </li>
                );
              }

              // Explorer is a real destination as well as a disclosure: the
              // panel opens on hover and on focus, and following the link goes
              // to the full catalog. Toggling on click would just fight the
              // hover that a mouse user has already triggered.
              return (
                <li key={item.href}>
                  <Link
                    ref={triggerRef}
                    href={href(item.href)}
                    aria-expanded={menuOpen}
                    aria-controls={menuId}
                    onFocus={openMenu}
                    className={`inline-flex items-center gap-1.5 rounded-sm py-1 ${
                      active || menuOpen
                        ? "font-semibold opacity-100"
                        : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    {t.common[item.key]}
                    <span aria-hidden="true" className="text-[0.7em]">
                      {menuOpen ? "▲" : "▼"}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          </nav>

          {menuOpen ? (
            <ExploreMenu id={menuId} onNavigate={() => setMenuOpen(false)} />
          ) : null}
        </div>

        <div className="ml-auto flex items-center gap-3 md:gap-4">
          <SearchTrigger
            className={`hidden items-center gap-2 rounded-full border px-4 py-2 text-small md:inline-flex ${
              isOverlay && !scrolled
                ? "border-white/35 text-white/80 hover:text-white"
                : "border-line-strong text-ink-subtle hover:text-ink"
            }`}
          >
            <span aria-hidden="true">⌕</span>
            <span className="hidden xl:inline">{t.nav.searchPlaceholder}</span>
            <span className="xl:hidden">{t.common.search}</span>
          </SearchTrigger>

          <LanguageSwitcher />

          <Link
            href={href("/explorer")}
            className="hidden rounded-plate bg-accent px-4 py-2.5 text-small font-semibold text-accent-contrast hover:opacity-90 lg:inline-block"
          >
            {t.common.requestFull}
          </Link>
        </div>
      </div>

      {/* On mobile the search moves to its own row. Overlay routes are skipped:
          their hero already carries a search field. */}
      {isOverlay ? null : (
        <div className="border-t border-line px-4 py-2.5 md:hidden">
          <SearchTrigger className="flex w-full items-center gap-2 rounded-full border border-line-strong px-4 py-2.5 text-small text-ink-subtle">
            <span aria-hidden="true">⌕</span>
            {t.nav.searchPlaceholderShort}
          </SearchTrigger>
        </div>
      )}
    </header>
  );
}
