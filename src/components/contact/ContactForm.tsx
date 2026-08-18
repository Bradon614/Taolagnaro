"use client";

import { useActionState, useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Field, inputClass } from "@/components/ui/Field";
import { submitContactMessage } from "@/app/[locale]/contact/actions";
import { CONTACT_SUBJECTS, type ContactFormState } from "@/lib/contact";

const EMPTY: ContactFormState = { errors: {} };

/**
 * Subject first, because it determines what the rest of the form is for — a
 * provider wanting to be listed and someone reporting a wrong phone number
 * need different things from us.
 */
export function ContactForm({ initialSubject }: { initialSubject?: string }) {
  const [state, formAction, pending] = useActionState(
    submitContactMessage,
    EMPTY,
  );
  const [subject, setSubject] = useState(
    CONTACT_SUBJECTS.some((entry) => entry.value === initialSubject)
      ? (initialSubject as string)
      : CONTACT_SUBJECTS[0].value,
  );

  const value = (key: string) => state.values?.[key] ?? "";

  if (state.sent) {
    return (
      <Alert tone="success" title="Votre message a bien été envoyé.">
        Nous répondons sous deux jours ouvrés. Si votre demande concerne une
        réservation, passez plutôt par la fiche du lieu — c’est direct et plus
        rapide.
      </Alert>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-4">
      <input type="hidden" name="subject" value={subject} />

      <fieldset className="flex flex-col gap-1.5">
        <legend className="mb-1.5 font-mono text-label uppercase tracking-[0.13em] text-ink-subtle">
          Votre message concerne
        </legend>
        <div className="flex flex-wrap gap-2">
          {CONTACT_SUBJECTS.map((entry) => (
            <button
              key={entry.value}
              type="button"
              onClick={() => setSubject(entry.value)}
              aria-pressed={subject === entry.value}
              className={`rounded-plate border px-3.5 py-2 text-small ${
                subject === entry.value
                  ? "border-accent font-semibold text-ink"
                  : "border-line-strong text-ink-muted hover:text-ink"
              }`}
            >
              {entry.label}
            </button>
          ))}
        </div>
        {state.errors.subject ? (
          <p className="text-small text-warn">{state.errors.subject}</p>
        ) : null}
      </fieldset>

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
            className={inputClass(state.errors.fullName)}
          />
        </Field>

        <Field label="Établissement" name="business">
          <input
            id="business"
            name="business"
            defaultValue={value("business")}
            placeholder="Nom de votre hôtel, table ou service"
            className={inputClass()}
          />
        </Field>

        <Field label="Email" name="email" required error={state.errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={value("email")}
            placeholder="vous@exemple.mg"
            aria-invalid={state.errors.email ? true : undefined}
            className={inputClass(state.errors.email)}
          />
        </Field>

        <Field label="Téléphone / WhatsApp" name="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={value("phone")}
            placeholder="+261 34 00 000 00"
            className={inputClass()}
          />
        </Field>

        <Field
          label="Message"
          name="message"
          required
          error={state.errors.message}
          className="sm:col-span-2"
        >
          <textarea
            id="message"
            name="message"
            rows={5}
            defaultValue={value("message")}
            placeholder="Décrivez votre établissement, sa localisation et ce que vous proposez."
            aria-invalid={state.errors.message ? true : undefined}
            className={inputClass(state.errors.message, "resize-y")}
          />
        </Field>
      </div>

      <div>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-plate border border-accent bg-accent px-6 py-3.5 font-semibold text-accent-contrast disabled:opacity-40"
        >
          {pending ? "Envoi en cours…" : "Envoyer le message"}
        </button>
      </div>
    </form>
  );
}
