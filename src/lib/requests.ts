/**
 * Reservation requests.
 *
 * This version has no inventory, no availability and no payment. A request is
 * a message: it is recorded, given a reference, and handed to the provider,
 * who confirms directly with the visitor. Everything the UI says is built
 * around that being literally true.
 */

export type RequestChannel = "form" | "whatsapp";

export type ReservationRequest = {
  reference: string;
  listingSlug: string;
  listingName: string;
  fullName: string;
  phone: string;
  email: string;
  language: string;
  date: string;
  people: number;
  message: string;
  channel: RequestChannel;
  submittedAt: string;
};

/** Name of the short-lived httpOnly cookie carrying the confirmation summary. */
export const CONFIRMATION_COOKIE = "tao_last_request";

export type RequestFormState = {
  errors: FieldErrors;
  /** Non-field failure, e.g. the listing vanished between render and submit. */
  formError?: string;
  /** Echoed back so a failed submit never empties the form. */
  values?: Record<string, string>;
};

import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

export type FieldErrors = Partial<
  Record<
    "fullName" | "phone" | "email" | "date" | "people" | "consent",
    string
  >
>;

/**
 * TAO-4192. Short enough to read down a phone line, which is how it will
 * actually be used when a visitor chases an unanswered request.
 */
export function generateReference(): string {
  const n = 1000 + Math.floor(Math.random() * 9000);
  return `TAO-${n}`;
}

export function isValidReference(value: string): boolean {
  return /^TAO-\d{4}$/.test(value);
}

/**
 * Errors name the fix rather than the rule — "invalid email" tells someone
 * nothing they can act on.
 */
export function validate(input: {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  people: number;
  consent: boolean;
}, locale: Locale = "fr"): FieldErrors {
  const e = getDictionary(locale).errors;
  const errors: FieldErrors = {};

  if (input.fullName.trim().length < 2) {
    errors.fullName = e.fullName;
  }

  const digits = input.phone.replace(/[^\d]/g, "");
  if (digits.length < 8) {
    errors.phone = e.phone;
  }

  const email = input.email.trim();
  if (!email.includes("@")) {
    errors.email = e.emailAt;
  } else {
    const [local, domain] = email.split("@");
    if (!local || !domain || !domain.includes(".") || domain.endsWith(".")) {
      errors.email = e.emailDomain;
    }
  }

  if (!input.date) {
    errors.date = e.date;
  }

  if (!Number.isFinite(input.people) || input.people < 1 || input.people > 30) {
    errors.people = e.people;
  }

  if (!input.consent) {
    errors.consent = e.consent;
  }

  return errors;
}

/**
 * The delivery seam.
 *
 * Nothing is persisted yet: this is the single place that changes when the
 * answer to "where does a request actually land?" is settled. The intended
 * shape is an email plus an SMS to the provider and a copy into a shared
 * inbox the platform operator watches — see the open question in the design
 * proposal. Until then it records to the server log so a submitted request is
 * never silently lost during development.
 */
export async function deliverRequest(
  request: ReservationRequest,
): Promise<void> {
  console.info(
    `[reservation] ${request.reference} · ${request.listingName} · ${request.date} · ${request.people} pers. · ${request.channel}`,
  );
}

/** "14 septembre 2026" */
export function formatDate(iso: string, locale: Locale = "fr"): string {
  if (!iso) return "";
  const date = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
