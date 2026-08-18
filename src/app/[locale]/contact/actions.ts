"use server";

import { isLocale, type Locale } from "@/i18n/config";
import {
  deliverContactMessage,
  validateContact,
  type ContactFormState,
} from "@/lib/contact";

export async function submitContactMessage(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const read = (key: string) => String(formData.get(key) ?? "").trim();

  const values = {
    subject: read("subject"),
    fullName: read("fullName"),
    business: read("business"),
    email: read("email"),
    phone: read("phone"),
    message: read("message"),
  };

  const localeRaw = String(formData.get("locale") ?? "fr");
  const locale: Locale = isLocale(localeRaw) ? localeRaw : "fr";
  const errors = validateContact(values, locale);
  if (Object.keys(errors).length > 0) {
    return { errors, values };
  }

  await deliverContactMessage({
    ...values,
    submittedAt: new Date().toISOString(),
  });

  // Success is shown in place rather than on a separate page: there is no
  // reference to carry, and a confirmation screen for a one-line message
  // would be more ceremony than the message deserves.
  return { errors: {}, sent: true };
}
