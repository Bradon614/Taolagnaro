import { LANGUAGES } from "@/lib/site";

/**
 * Language is a first-class control, not a footer link — a francophone or
 * anglophone visitor looks for it immediately.
 *
 * Display-only until the i18n slice wires up routing; French is the default
 * and the other two are shown so their presence is visible from the start.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  return (
    <p
      className={`flex items-center gap-1.5 font-mono text-label tracking-[0.1em] ${className ?? ""}`}
      title="Traductions en préparation"
    >
      <span className="sr-only">Langue :</span>
      {LANGUAGES.map((language) => (
        <span
          key={language.code}
          lang={language.code}
          aria-current={language.code === "fr" ? "true" : undefined}
          className={
            language.code === "fr" ? "font-semibold" : "opacity-45"
          }
        >
          {language.label}
        </span>
      ))}
    </p>
  );
}
