/**
 * Legal pages.
 *
 * IMPORTANT — this is a DRAFT for review by a qualified lawyer, not legal
 * advice and not ready to publish as-is.
 *
 * What it *is*: an accurate inventory of what this platform actually does with
 * personal data, derived from the code rather than from a template. Every
 * field, store, cookie and recipient listed below was verified against the
 * implementation. That is the part a lawyer cannot write for you and the part
 * boilerplate always gets wrong.
 *
 * What it is NOT: the publisher's identity, the host, registration numbers,
 * retention periods, or the operator's own commitments. Those appear as
 * [[PLACEHOLDER]] markers, which render as loud highlighted chips so an
 * unfilled one cannot reach production unnoticed.
 */

import type { Locale } from "@/i18n/config";

export type Block =
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "table"; rows: { label: string; value: string }[] };

export type LegalSection = { id: string; heading: string; blocks: Block[] };

export type LegalDoc = {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

/* ===================================================== mentions légales FR */

const LEGAL_FR: LegalDoc = {
  title: "Mentions légales",
  updated: "[[DATE DE MISE À JOUR]]",
  intro:
    "Informations relatives à l’éditeur de ce site, à son hébergement et aux conditions d’utilisation des contenus.",
  sections: [
    {
      id: "editeur",
      heading: "Éditeur du site",
      blocks: [
        {
          kind: "table",
          rows: [
            { label: "Dénomination", value: "[[RAISON SOCIALE]]" },
            { label: "Forme juridique", value: "[[FORME JURIDIQUE]]" },
            { label: "Siège social", value: "[[ADRESSE COMPLÈTE]]" },
            { label: "Immatriculation", value: "[[NIF / STAT / RCS]]" },
            { label: "Téléphone", value: "[[TÉLÉPHONE]]" },
            { label: "Email", value: "[[EMAIL DE CONTACT]]" },
          ],
        },
        {
          kind: "p",
          text: "Si la plateforme est éditée par une personne physique ou une association plutôt que par une société, cette section doit être adaptée en conséquence.",
        },
      ],
    },
    {
      id: "publication",
      heading: "Directeur de la publication",
      blocks: [
        { kind: "p", text: "[[NOM DU DIRECTEUR DE LA PUBLICATION]]" },
      ],
    },
    {
      id: "hebergement",
      heading: "Hébergement",
      blocks: [
        {
          kind: "table",
          rows: [
            { label: "Hébergeur", value: "[[NOM DE L’HÉBERGEUR]]" },
            { label: "Adresse", value: "[[ADRESSE DE L’HÉBERGEUR]]" },
            { label: "Contact", value: "[[CONTACT DE L’HÉBERGEUR]]" },
          ],
        },
      ],
    },
    {
      id: "role",
      heading: "Rôle de la plateforme",
      blocks: [
        {
          kind: "p",
          text: "Taolagnaro est un annuaire de découverte. La plateforme référence des lieux, des hébergements, des tables et des activités de la région Anosy, et transmet les demandes de réservation aux prestataires concernés.",
        },
        {
          kind: "list",
          items: [
            "La plateforme n’est ni une agence de voyage ni un intermédiaire de paiement.",
            "Aucune réservation n’est confirmée sur le site : une demande est un message transmis au prestataire, qui décide seul d’y donner suite.",
            "Aucun paiement n’est encaissé, et aucune commission n’est prélevée.",
            "Le contrat éventuel se forme directement entre le visiteur et le prestataire.",
          ],
        },
      ],
    },
    {
      id: "contenus",
      heading: "Contenu des fiches",
      blocks: [
        {
          kind: "p",
          text: "Les descriptions, tarifs, horaires et disponibilités affichés sont communiqués par les prestataires ou collectés par l’équipe éditoriale. Les tarifs sont indicatifs et ne constituent pas une offre ferme : seul le prestataire confirme le prix applicable.",
        },
        {
          kind: "p",
          text: "Toute erreur peut être signalée via le formulaire de contact ; les corrections sont apportées dans les meilleurs délais.",
        },
      ],
    },
    {
      id: "propriete",
      heading: "Propriété intellectuelle",
      blocks: [
        {
          kind: "p",
          text: "La structure du site, ses textes éditoriaux et son identité visuelle sont protégés. Toute reproduction sans autorisation préalable est interdite.",
        },
        {
          kind: "p",
          text: "Les noms, marques et logos des prestataires référencés restent la propriété de leurs titulaires respectifs.",
        },
      ],
    },
    {
      id: "photos",
      heading: "Photographies et crédits",
      blocks: [
        {
          kind: "p",
          text: "[[STATUT DES DROITS PHOTOGRAPHIQUES]] — préciser l’origine des images, les licences obtenues et le nom des photographes à créditer.",
        },
        {
          kind: "p",
          text: "Lorsqu’une photographie montre des personnes identifiables, une autorisation écrite doit être obtenue avant publication.",
        },
      ],
    },
    {
      id: "liens",
      heading: "Liens externes",
      blocks: [
        {
          kind: "p",
          text: "Le site renvoie vers des services tiers (WhatsApp, réseaux sociaux, sites de prestataires). Ces services ont leurs propres conditions et politiques de confidentialité, sur lesquelles la plateforme n’a aucun contrôle.",
        },
      ],
    },
    {
      id: "droit",
      heading: "Droit applicable",
      blocks: [
        { kind: "p", text: "[[DROIT APPLICABLE ET JURIDICTION COMPÉTENTE]]" },
      ],
    },
  ],
};

/* ======================================================= confidentialité FR */

const PRIVACY_FR: LegalDoc = {
  title: "Confidentialité",
  updated: "[[DATE DE MISE À JOUR]]",
  intro:
    "Ce que la plateforme collecte, pourquoi, à qui elle le transmet, et ce qui reste sur votre appareil.",
  sections: [
    {
      id: "resume",
      heading: "En résumé",
      blocks: [
        {
          kind: "list",
          items: [
            "Vous pouvez consulter tout le site sans donner la moindre information.",
            "Vos coordonnées ne sont demandées que si vous envoyez une demande de réservation ou un message.",
            "Une demande de réservation est transmise au prestataire que vous avez choisi, et à personne d’autre.",
            "Le site n’utilise ni mesure d’audience, ni publicité, ni traceur tiers.",
            "Vos envies et vos recherches récentes restent sur votre appareil et ne nous sont jamais transmises.",
          ],
        },
      ],
    },
    {
      id: "responsable",
      heading: "Responsable du traitement",
      blocks: [
        {
          kind: "table",
          rows: [
            { label: "Responsable", value: "[[RAISON SOCIALE]]" },
            { label: "Adresse", value: "[[ADRESSE COMPLÈTE]]" },
            { label: "Contact", value: "[[EMAIL DE CONTACT DONNÉES]]" },
          ],
        },
      ],
    },
    {
      id: "demande",
      heading: "Demande de réservation",
      blocks: [
        {
          kind: "p",
          text: "Lorsque vous envoyez une demande de réservation, le formulaire collecte les informations suivantes :",
        },
        {
          kind: "table",
          rows: [
            { label: "Nom complet", value: "Obligatoire — pour que le prestataire vous identifie" },
            { label: "Téléphone / WhatsApp", value: "Obligatoire — canal de réponse principal" },
            { label: "Email", value: "Obligatoire — copie de la demande" },
            { label: "Date souhaitée", value: "Obligatoire — même approximative" },
            { label: "Nombre de personnes", value: "Obligatoire" },
            { label: "Langue de réponse", value: "Facultatif" },
            { label: "Message", value: "Facultatif — le contenu que vous choisissez d’écrire" },
          ],
        },
        {
          kind: "p",
          text: "Une référence de demande (au format TAO-0000) est générée pour vous permettre d’en assurer le suivi.",
        },
      ],
    },
    {
      id: "contact",
      heading: "Formulaire de contact",
      blocks: [
        {
          kind: "p",
          text: "Le formulaire de contact collecte le sujet du message, votre nom, votre email, ainsi que — facultativement — le nom de votre établissement et votre téléphone. Il est destiné à la plateforme et non à un prestataire.",
        },
      ],
    },
    {
      id: "destinataires",
      heading: "À qui vos données sont transmises",
      blocks: [
        {
          kind: "list",
          items: [
            "Demande de réservation : au prestataire nommé sur la fiche, afin qu’il puisse vous répondre. Aucun autre prestataire n’y a accès.",
            "Message de contact : à l’équipe qui administre la plateforme.",
            "Aucune donnée n’est vendue, louée, ni transmise à des fins publicitaires.",
          ],
        },
        {
          kind: "p",
          text: "[[MODALITÉ DE TRANSMISSION AUX PRESTATAIRES]] — préciser le canal effectivement utilisé (email, SMS, boîte partagée) et les prestataires techniques éventuels, qui doivent alors être listés comme sous-traitants.",
        },
      ],
    },
    {
      id: "base",
      heading: "Base légale",
      blocks: [
        {
          kind: "p",
          text: "Le traitement repose sur votre consentement, recueilli par une case à cocher explicite avant l’envoi du formulaire. Sans ce consentement, la demande ne peut pas être transmise et le formulaire ne part pas.",
        },
      ],
    },
    {
      id: "conservation",
      heading: "Durée de conservation",
      blocks: [
        {
          kind: "p",
          text: "[[DURÉES DE CONSERVATION]] — à définir puis à indiquer explicitement : durée de conservation d’une demande de réservation, d’un message de contact, et politique de suppression.",
        },
      ],
    },
    {
      id: "appareil",
      heading: "Ce qui reste sur votre appareil",
      blocks: [
        {
          kind: "p",
          text: "Trois éléments sont enregistrés localement par votre navigateur. Ils ne nous sont pas transmis et ne quittent pas votre appareil.",
        },
        {
          kind: "table",
          rows: [
            {
              label: "tao_wishlist",
              value: "Vos envies — la liste des fiches enregistrées. Conservée jusqu’à ce que vous la vidiez.",
            },
            {
              label: "tao_recent_searches",
              value: "Vos cinq dernières recherches. Effaçables depuis la fenêtre de recherche.",
            },
            {
              label: "tao_last_request",
              value: "Cookie technique de 30 minutes contenant le récapitulatif de votre dernière demande, afin d’afficher la page de confirmation. Inaccessible au JavaScript de la page.",
            },
          ],
        },
        {
          kind: "p",
          text: "Vider les données de site de votre navigateur supprime les trois.",
        },
      ],
    },
    {
      id: "traceurs",
      heading: "Mesure d’audience et traceurs",
      blocks: [
        {
          kind: "p",
          text: "Le site n’utilise aucun outil de mesure d’audience, aucune régie publicitaire et aucun traceur tiers. Aucun bandeau de consentement aux cookies n’est nécessaire, parce qu’il n’y a pas de cookie qui en exigerait un.",
        },
        {
          kind: "p",
          text: "Si une mesure d’audience est ajoutée un jour, cette section devra être mise à jour avant sa mise en service.",
        },
      ],
    },
    {
      id: "geolocalisation",
      heading: "Géolocalisation",
      blocks: [
        {
          kind: "p",
          text: "La carte propose un bouton « Autour de moi ». Il ne se déclenche que si vous le touchez, votre navigateur vous demande alors l’autorisation, et la position obtenue sert uniquement à afficher un repère pendant votre visite. Elle n’est ni enregistrée, ni transmise.",
        },
      ],
    },
    {
      id: "droits",
      heading: "Vos droits",
      blocks: [
        {
          kind: "p",
          text: "Vous pouvez demander l’accès à vos données, leur rectification, leur suppression, ou vous opposer à leur traitement. Écrivez à [[EMAIL DE CONTACT DONNÉES]] ; conservez votre référence de demande, elle accélère la recherche.",
        },
        {
          kind: "p",
          text: "[[AUTORITÉ DE CONTRÔLE ET VOIES DE RECOURS]] — à préciser avec un juriste, en tenant compte du droit malgache applicable et, pour les visiteurs européens, du RGPD.",
        },
      ],
    },
    {
      id: "modifications",
      heading: "Modifications",
      blocks: [
        {
          kind: "p",
          text: "Toute évolution de cette politique sera publiée sur cette page, avec une date de mise à jour actualisée.",
        },
      ],
    },
  ],
};

/* ================================================================ English */

const LEGAL_EN: LegalDoc = {
  title: "Legal notice",
  updated: "[[LAST UPDATED]]",
  intro:
    "Information about the publisher of this site, its hosting, and the terms on which its content may be used.",
  sections: [
    {
      id: "editeur",
      heading: "Site publisher",
      blocks: [
        {
          kind: "table",
          rows: [
            { label: "Name", value: "[[LEGAL NAME]]" },
            { label: "Legal form", value: "[[LEGAL FORM]]" },
            { label: "Registered address", value: "[[FULL ADDRESS]]" },
            { label: "Registration", value: "[[NIF / STAT / COMPANY NUMBER]]" },
            { label: "Telephone", value: "[[TELEPHONE]]" },
            { label: "Email", value: "[[CONTACT EMAIL]]" },
          ],
        },
        {
          kind: "p",
          text: "If the platform is published by an individual or an association rather than a company, this section must be adapted accordingly.",
        },
      ],
    },
    {
      id: "publication",
      heading: "Publication director",
      blocks: [{ kind: "p", text: "[[NAME OF PUBLICATION DIRECTOR]]" }],
    },
    {
      id: "hebergement",
      heading: "Hosting",
      blocks: [
        {
          kind: "table",
          rows: [
            { label: "Host", value: "[[HOST NAME]]" },
            { label: "Address", value: "[[HOST ADDRESS]]" },
            { label: "Contact", value: "[[HOST CONTACT]]" },
          ],
        },
      ],
    },
    {
      id: "role",
      heading: "What the platform does",
      blocks: [
        {
          kind: "p",
          text: "Taolagnaro is a discovery directory. It lists places, accommodation, restaurants and activities in the Anosy region, and passes booking requests to the providers concerned.",
        },
        {
          kind: "list",
          items: [
            "The platform is neither a travel agency nor a payment intermediary.",
            "No booking is confirmed on the site: a request is a message passed to the provider, who alone decides whether to act on it.",
            "No payment is taken and no commission is charged.",
            "Any contract is formed directly between the visitor and the provider.",
          ],
        },
      ],
    },
    {
      id: "contenus",
      heading: "Listing content",
      blocks: [
        {
          kind: "p",
          text: "Descriptions, rates, opening hours and availability are supplied by the providers or gathered by the editorial team. Rates are indicative and are not a firm offer: only the provider confirms the applicable price.",
        },
        {
          kind: "p",
          text: "Any error can be reported through the contact form; corrections are made as quickly as possible.",
        },
      ],
    },
    {
      id: "propriete",
      heading: "Intellectual property",
      blocks: [
        {
          kind: "p",
          text: "The structure of the site, its editorial text and its visual identity are protected. Reproduction without prior permission is prohibited.",
        },
        {
          kind: "p",
          text: "The names, trademarks and logos of listed providers remain the property of their respective owners.",
        },
      ],
    },
    {
      id: "photos",
      heading: "Photography and credits",
      blocks: [
        {
          kind: "p",
          text: "[[PHOTOGRAPHY RIGHTS STATUS]] — state where the images come from, what licences were obtained, and which photographers must be credited.",
        },
        {
          kind: "p",
          text: "Where a photograph shows identifiable people, written permission must be obtained before publication.",
        },
      ],
    },
    {
      id: "liens",
      heading: "External links",
      blocks: [
        {
          kind: "p",
          text: "The site links to third-party services (WhatsApp, social networks, provider websites). Those services have their own terms and privacy policies, over which the platform has no control.",
        },
      ],
    },
    {
      id: "droit",
      heading: "Governing law",
      blocks: [{ kind: "p", text: "[[GOVERNING LAW AND JURISDICTION]]" }],
    },
  ],
};

const PRIVACY_EN: LegalDoc = {
  title: "Privacy",
  updated: "[[LAST UPDATED]]",
  intro:
    "What the platform collects, why, who it is passed to, and what stays on your device.",
  sections: [
    {
      id: "resume",
      heading: "In short",
      blocks: [
        {
          kind: "list",
          items: [
            "You can browse the whole site without giving any information at all.",
            "Your contact details are only asked for if you send a booking request or a message.",
            "A booking request goes to the provider you chose, and to nobody else.",
            "The site uses no analytics, no advertising and no third-party trackers.",
            "Your saved places and recent searches stay on your device and are never sent to us.",
          ],
        },
      ],
    },
    {
      id: "responsable",
      heading: "Data controller",
      blocks: [
        {
          kind: "table",
          rows: [
            { label: "Controller", value: "[[LEGAL NAME]]" },
            { label: "Address", value: "[[FULL ADDRESS]]" },
            { label: "Contact", value: "[[DATA CONTACT EMAIL]]" },
          ],
        },
      ],
    },
    {
      id: "demande",
      heading: "Booking requests",
      blocks: [
        {
          kind: "p",
          text: "When you send a booking request, the form collects the following:",
        },
        {
          kind: "table",
          rows: [
            { label: "Full name", value: "Required — so the provider can identify you" },
            { label: "Phone / WhatsApp", value: "Required — the main channel for a reply" },
            { label: "Email", value: "Required — a copy of the request" },
            { label: "Preferred date", value: "Required — approximate is fine" },
            { label: "Number of people", value: "Required" },
            { label: "Reply language", value: "Optional" },
            { label: "Message", value: "Optional — whatever you choose to write" },
          ],
        },
        {
          kind: "p",
          text: "A request reference (in the form TAO-0000) is generated so you can follow it up.",
        },
      ],
    },
    {
      id: "contact",
      heading: "Contact form",
      blocks: [
        {
          kind: "p",
          text: "The contact form collects the subject, your name and your email, plus optionally your business name and phone number. It is addressed to the platform, not to a provider.",
        },
      ],
    },
    {
      id: "destinataires",
      heading: "Who your data goes to",
      blocks: [
        {
          kind: "list",
          items: [
            "Booking request: to the provider named on the listing, so they can reply to you. No other provider has access to it.",
            "Contact message: to the team that runs the platform.",
            "No data is sold, rented, or passed on for advertising purposes.",
          ],
        },
        {
          kind: "p",
          text: "[[HOW REQUESTS REACH PROVIDERS]] — state the channel actually used (email, SMS, shared inbox) and any technical providers involved, who must then be listed as processors.",
        },
      ],
    },
    {
      id: "base",
      heading: "Legal basis",
      blocks: [
        {
          kind: "p",
          text: "Processing rests on your consent, given through an explicit tick box before the form is sent. Without it the request cannot be passed on and the form does not submit.",
        },
      ],
    },
    {
      id: "conservation",
      heading: "How long data is kept",
      blocks: [
        {
          kind: "p",
          text: "[[RETENTION PERIODS]] — to be decided and then stated explicitly: how long a booking request is kept, how long a contact message is kept, and the deletion policy.",
        },
      ],
    },
    {
      id: "appareil",
      heading: "What stays on your device",
      blocks: [
        {
          kind: "p",
          text: "Three items are stored locally by your browser. They are not sent to us and never leave your device.",
        },
        {
          kind: "table",
          rows: [
            {
              label: "tao_wishlist",
              value: "Your saved places. Kept until you clear the list.",
            },
            {
              label: "tao_recent_searches",
              value: "Your last five searches. Clearable from the search window.",
            },
            {
              label: "tao_last_request",
              value: "A 30-minute technical cookie holding the summary of your last request, so the confirmation page can be shown. Not readable by page JavaScript.",
            },
          ],
        },
        {
          kind: "p",
          text: "Clearing site data in your browser removes all three.",
        },
      ],
    },
    {
      id: "traceurs",
      heading: "Analytics and trackers",
      blocks: [
        {
          kind: "p",
          text: "The site uses no analytics tool, no ad network and no third-party tracker. No cookie banner is needed, because there is no cookie that would require one.",
        },
        {
          kind: "p",
          text: "If analytics are added one day, this section must be updated before they go live.",
        },
      ],
    },
    {
      id: "geolocalisation",
      heading: "Location",
      blocks: [
        {
          kind: "p",
          text: "The map offers an \"Around me\" button. It only fires if you tap it, your browser then asks your permission, and the position obtained is used solely to draw a marker during your visit. It is neither stored nor transmitted.",
        },
      ],
    },
    {
      id: "droits",
      heading: "Your rights",
      blocks: [
        {
          kind: "p",
          text: "You can ask for access to your data, its correction or deletion, or object to its processing. Write to [[DATA CONTACT EMAIL]]; keep your request reference, it makes finding the record faster.",
        },
        {
          kind: "p",
          text: "[[SUPERVISORY AUTHORITY AND ROUTE OF COMPLAINT]] — to be settled with a lawyer, taking account of applicable Malagasy law and, for European visitors, the GDPR.",
        },
      ],
    },
    {
      id: "modifications",
      heading: "Changes",
      blocks: [
        {
          kind: "p",
          text: "Any change to this policy will be published on this page with an updated date.",
        },
      ],
    },
  ],
};

/* ================================================================ access */

export function legalDoc(locale: Locale): LegalDoc {
  return locale === "en" ? LEGAL_EN : LEGAL_FR;
}

export function privacyDoc(locale: Locale): LegalDoc {
  return locale === "en" ? PRIVACY_EN : PRIVACY_FR;
}

/** Splits text on [[PLACEHOLDER]] markers so they can be rendered loudly. */
export function splitPlaceholders(
  text: string,
): { text: string; placeholder: boolean }[] {
  return text
    .split(/(\[\[[^\]]+\]\])/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("[[")
        ? { text: part.slice(2, -2), placeholder: true }
        : { text: part, placeholder: false },
    );
}
