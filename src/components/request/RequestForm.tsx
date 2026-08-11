"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Field, inputClass } from "@/components/ui/Field";
import { Alert } from "@/components/ui/Alert";
import { formatPrice } from "@/lib/money";
import { listingHref, type Listing } from "@/lib/listings";
import { LANGUAGES } from "@/lib/site";
import { submitReservationRequest } from "@/app/[categorie]/[slug]/demande/actions";
import type { RequestFormState } from "@/lib/requests";
import { Plate } from "@/components/media/Plate";

const EMPTY: RequestFormState = { errors: {} };

/**
 * Seven fields, one screen, no account.
 *
 * A plain form posting to a server action: it works before hydration, which
 * matters on the connections most visitors will be using. Validation runs on
 * the server and the answers come back with it, so a failed submit never
 * empties the form.
 */
export function RequestForm({
  listing,
  defaultDate,
  defaultPeople,
}: {
  listing: Listing;
  defaultDate?: string;
  defaultPeople?: string;
}) {
  const [state, formAction, pending] = useActionState(
    submitReservationRequest,
    EMPTY,
  );

  const value = (key: string, fallback = "") =>
    state.values?.[key] ?? fallback;

  return (
    // noValidate: the browser's built-in bubbles ("Please enter an email
    // address") are generic and inconsistent across engines. Server validation
    // is the single source of truth so everyone sees the same message, one
    // that names the fix.
    <form action={formAction} noValidate className="flex flex-col gap-4">
      <input type="hidden" name="listingSlug" value={listing.slug} />

      {state.formError ? (
        <Alert tone="error" title="La demande n’est pas partie.">
          {state.formError}
        </Alert>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-label uppercase tracking-[0.13em] text-ink-subtle">
          Prestation choisie
        </span>
        <div className="flex items-center gap-3 rounded-plate border border-line bg-surface p-2.5">
          <Plate
            variant={listing.plate}
            className="size-11 shrink-0 rounded-sm"
          />
          <span className="min-w-0 flex-1">
            <strong className="block truncate text-small font-semibold">
              {listing.name}
            </strong>
            <span className="block text-label text-ink-subtle">
              {listing.place} · {formatPrice(listing.price)}
              {listing.price.kind === "from" || listing.price.kind === "range"
                ? " (indicatif)"
                : ""}
            </span>
          </span>
          <Link
            href={listingHref(listing)}
            className="shrink-0 text-small text-brand hover:underline"
          >
            Changer
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Nom complet"
          name="fullName"
          required
          error={state.errors.fullName}
        >
          <input
            id="fullName"
            name="fullName"
            autoComplete="name"
            defaultValue={value("fullName")}
            placeholder="Prénom et nom"
            aria-invalid={state.errors.fullName ? true : undefined}
            aria-describedby={state.errors.fullName ? "fullName-error" : undefined}
            className={inputClass(state.errors.fullName)}
          />
        </Field>

        <Field
          label="Téléphone / WhatsApp"
          name="phone"
          required
          error={state.errors.phone}
          hint="C’est le moyen le plus rapide d’obtenir une réponse."
        >
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={value("phone")}
            placeholder="+261 34 00 000 00"
            aria-invalid={state.errors.phone ? true : undefined}
            aria-describedby={state.errors.phone ? "phone-error" : "phone-hint"}
            className={inputClass(state.errors.phone)}
          />
        </Field>

        <Field label="Email" name="email" required error={state.errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={value("email")}
            placeholder="vous@exemple.com"
            aria-invalid={state.errors.email ? true : undefined}
            aria-describedby={state.errors.email ? "email-error" : undefined}
            className={inputClass(state.errors.email)}
          />
        </Field>

        <Field label="Langue de réponse" name="language">
          <select
            id="language"
            name="language"
            defaultValue={value("language", "Français")}
            className={inputClass()}
          >
            {LANGUAGES.map((language) => (
              <option key={language.code} value={language.name}>
                {language.name}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Date souhaitée"
          name="date"
          required
          error={state.errors.date}
          hint="Approximative si vous n’êtes pas sûr."
        >
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={value("date", defaultDate ?? "")}
            aria-invalid={state.errors.date ? true : undefined}
            aria-describedby={state.errors.date ? "date-error" : "date-hint"}
            className={inputClass(state.errors.date)}
          />
        </Field>

        <Field
          label="Nombre de personnes"
          name="people"
          required
          error={state.errors.people}
        >
          <input
            id="people"
            name="people"
            type="number"
            min={1}
            max={30}
            defaultValue={value("people", defaultPeople ?? "2")}
            aria-invalid={state.errors.people ? true : undefined}
            aria-describedby={state.errors.people ? "people-error" : undefined}
            className={inputClass(state.errors.people, "tabular")}
          />
        </Field>

        <Field
          label="Message (facultatif)"
          name="message"
          className="sm:col-span-2"
        >
          <textarea
            id="message"
            name="message"
            rows={4}
            defaultValue={value("message")}
            placeholder="Nuits souhaitées, heure d’arrivée, besoins particuliers, transfert depuis l’aéroport…"
            className={inputClass(undefined, "resize-y")}
          />
        </Field>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-2.5 text-small text-ink-muted">
          <input
            type="checkbox"
            name="consent"
            defaultChecked={false}
            aria-invalid={state.errors.consent ? true : undefined}
            aria-describedby={state.errors.consent ? "consent-error" : undefined}
            className="mt-0.5 size-4 shrink-0 accent-[var(--accent)]"
          />
          <span className="max-w-[62ch]">
            J’accepte que mes coordonnées soient transmises à {listing.name}{" "}
            afin de traiter cette demande. Elles ne seront utilisées pour rien
            d’autre.{" "}
            <Link href="/confidentialite" className="text-brand hover:underline">
              Confidentialité
            </Link>
          </span>
        </label>
        {state.errors.consent ? (
          <p id="consent-error" className="text-small text-warn">
            {state.errors.consent}
          </p>
        ) : null}
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-plate border border-accent bg-accent px-6 py-3.5 font-semibold text-accent-contrast disabled:opacity-40"
        >
          {pending ? "Envoi en cours…" : "Envoyer la demande de réservation"}
        </button>
        <button
          type="submit"
          name="canal"
          value="whatsapp"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 rounded-plate border border-whatsapp bg-whatsapp px-4.5 py-2.5 text-small font-semibold text-abyss disabled:opacity-40"
        >
          Envoyer et continuer sur WhatsApp
        </button>
      </div>

      <p className="text-label text-ink-subtle">
        <span aria-hidden="true" className="text-accent">
          *
        </span>{" "}
        Champs obligatoires. Votre demande est enregistrée même si vous
        poursuivez sur WhatsApp.
      </p>
    </form>
  );
}
