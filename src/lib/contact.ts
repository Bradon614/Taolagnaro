/**
 * Contact messages to the platform itself — distinct from a reservation
 * request, which goes to a provider.
 */

export const CONTACT_SUBJECTS = [
  { value: "referencer", label: "Référencer mon établissement" },
  { value: "erreur", label: "Signaler une erreur" },
  { value: "question", label: "Question générale" },
  { value: "presse", label: "Presse & partenariats" },
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number]["value"];

export type ContactFieldErrors = Partial<
  Record<"fullName" | "email" | "message" | "subject", string>
>;

export type ContactFormState = {
  errors: ContactFieldErrors;
  sent?: boolean;
  values?: Record<string, string>;
};

export type ContactMessage = {
  subject: string;
  fullName: string;
  business: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
};

export function validateContact(input: {
  subject: string;
  fullName: string;
  email: string;
  message: string;
}): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (!CONTACT_SUBJECTS.some((entry) => entry.value === input.subject)) {
    errors.subject = "Choisissez un sujet pour que le message arrive au bon endroit.";
  }

  if (input.fullName.trim().length < 2) {
    errors.fullName = "Indiquez le nom auquel vous répondre.";
  }

  const email = input.email.trim();
  if (!email.includes("@")) {
    errors.email = "Il manque le « @ ». Exemple : vous@exemple.mg";
  } else {
    const [local, domain] = email.split("@");
    if (!local || !domain || !domain.includes(".") || domain.endsWith(".")) {
      errors.email =
        "Il manque la partie après « @ ». Exemple : vous@exemple.mg";
    }
  }

  if (input.message.trim().length < 10) {
    errors.message =
      "Décrivez votre demande en quelques mots — au moins une phrase.";
  }

  return errors;
}

/**
 * The delivery seam, as for reservation requests: the single place that
 * changes once the shared inbox exists. Logged meanwhile so a message sent
 * during development is never silently dropped.
 */
export async function deliverContactMessage(
  message: ContactMessage,
): Promise<void> {
  console.info(
    `[contact] ${message.subject} · ${message.fullName} · ${message.email}`,
  );
}
