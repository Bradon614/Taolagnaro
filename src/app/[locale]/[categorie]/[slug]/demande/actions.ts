"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { listingBySlug } from "@/lib/listings";
import { isLocale, type Locale } from "@/i18n/config";
import {
  CONFIRMATION_COOKIE,
  deliverRequest,
  generateReference,
  validate,
  type RequestFormState,
  type ReservationRequest,
} from "@/lib/requests";

export async function submitReservationRequest(
  _previous: RequestFormState,
  formData: FormData,
): Promise<RequestFormState> {
  const read = (key: string) => String(formData.get(key) ?? "").trim();

  const localeRaw = read("locale");
  const locale: Locale = isLocale(localeRaw) ? localeRaw : "fr";
  const listingSlug = read("listingSlug");
  const listing = listingBySlug(listingSlug);

  const values = {
    fullName: read("fullName"),
    phone: read("phone"),
    email: read("email"),
    language: read("language") || "Français",
    date: read("date"),
    people: read("people"),
    message: read("message"),
  };

  if (!listing) {
    return {
      errors: {},
      formError:
        "Cette prestation n’est plus disponible. Revenez à la fiche et réessayez.",
      values,
    };
  }

  const people = Number(values.people);
  const consent = formData.get("consent") === "on";

  const errors = validate({
    fullName: values.fullName,
    phone: values.phone,
    email: values.email,
    date: values.date,
    people,
    consent,
  }, locale);

  if (Object.keys(errors).length > 0) {
    return { errors, values };
  }

  const request: ReservationRequest = {
    reference: generateReference(),
    listingSlug: listing.slug,
    listingName: listing.name,
    fullName: values.fullName,
    phone: values.phone,
    email: values.email,
    language: values.language,
    date: values.date,
    people,
    message: values.message,
    channel: formData.get("canal") === "whatsapp" ? "whatsapp" : "form",
    submittedAt: new Date().toISOString(),
  };

  await deliverRequest(request);

  // Hand the summary to the confirmation page out of band. Personal details
  // must never travel in the URL, so this goes in a short-lived httpOnly
  // cookie rather than a query string.
  const store = await cookies();
  store.set(CONFIRMATION_COOKIE, JSON.stringify(request), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 30,
  });

  redirect(
    locale === "fr"
      ? `/demande/${request.reference}`
      : `/${locale}/demande/${request.reference}`,
  );
}
