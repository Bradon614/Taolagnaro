/**
 * Editorial content for "Découvrir Taolagnaro".
 *
 * One source for the chapter rail and the article body, so the two cannot
 * drift apart. Written short deliberately: this page will be maintained by
 * hand in three languages, and long chapters are the first thing to rot.
 *
 * Facts here are real — dates, distances, elevations, seasons. Where something
 * is variable (road conditions, flight frequency) the copy says so rather than
 * stating a number that will be wrong by next season.
 */

import type { PlateVariant } from "@/components/media/Plate";
import { CHAPTERS_EN } from "@/lib/discover-en";

export type Figure = {
  plates: PlateVariant[];
  caption: string;
};

export type Chapter = {
  id: string;
  /** Short label for the rail. */
  label: string;
  title: string;
  paragraphs: string[];
  figure?: Figure;
  /** Optional pull-out facts rendered as a small table. */
  facts?: { label: string; value: string }[];
};

export const CHAPTERS: Chapter[] = [
  {
    id: "le-lieu",
    label: "Le lieu",
    title: "Là où la route s’arrête et où la mer commence",
    paragraphs: [
      "Taolagnaro — Fort-Dauphin sur les cartes coloniales — occupe une presqu’île étroite à l’extrême sud-est de Madagascar. La ville tient entre trois baies : Libanona et son récif, la baie des Galions au nord, Ambinanibe et ses dunes au sud-ouest. Derrière elle, le Pic Saint-Louis monte à 529 mètres, et plus loin commence la forêt épineuse, une végétation qui n’existe nulle part ailleurs sur Terre.",
      "C’est cette compression qui fait la région : en une heure de piste on passe de la mangrove à la forêt sèche, du sable blanc aux plateaux de sisal. Peu de destinations malgaches offrent une telle variété dans un rayon aussi court.",
      "Le vent fait partie du lieu. Il souffle une grande partie de l’année sur la presqu’île — c’est ce qui rend les nuits fraîches en saison chaude, ce qui a fait la réputation de Vinanibe auprès des kitesurfeurs, et ce que tout le monde ici mentionne en premier quand on parle du climat.",
    ],
    figure: {
      plates: ["forest"],
      caption: "La forêt littorale de Sainte-Luce, à 50 km au nord de la ville.",
    },
  },
  {
    id: "histoire",
    label: "Histoire",
    title: "Quatre siècles sur la même presqu’île",
    paragraphs: [
      "En 1643, la Compagnie française des Indes orientales installe ici le Fort Dauphin, premier établissement français durable sur l’île. Étienne de Flacourt en est le gouverneur de 1648 à 1655 ; il y écrit une « Histoire de la Grande Isle Madagascar » qui restera longtemps la principale source européenne sur le pays. Le comptoir est abandonné en 1674.",
      "Mais la presqu’île était habitée bien avant. C’est le pays des Antanosy, « ceux de l’île », dont les villages bordent encore les baies et l’arrière-pays. L’histoire de Taolagnaro se lit donc à deux niveaux : celle, courte et documentée, des Européens de passage, et celle, plus longue, des lignages antanosy qui n’ont jamais quitté la région.",
      "Il reste du fort ses murs, qui abritent aujourd’hui le Musée de l’Anosy. C’est le point de départ le plus simple pour comprendre la ville avant de partir vers les réserves.",
    ],
    figure: {
      plates: ["town", "sand"],
      caption: "Fort Flacourt et la vieille ville.",
    },
  },
  {
    id: "nature",
    label: "Nature & réserves",
    title: "Trois aires protégées à moins de cent kilomètres",
    paragraphs: [
      "La réserve de Nahampoana, à sept kilomètres du centre, est la plus accessible : un ancien jardin botanique où plusieurs espèces de lémuriens vivent en semi-liberté. C’est la sortie d’une demi-journée que font la plupart des visiteurs de passage.",
      "Berenty, dans la vallée du Mandrare à l’ouest, est une réserve privée célèbre pour ses makis catta et ses sifakas de Verreaux, dans une forêt-galerie de tamariniers. Il faut compter la journée : la route est longue et le départ se fait avant l’aube.",
      "Le parc national d’Andohahela est le plus remarquable des trois, et le moins visité. Il protège à la fois de la forêt humide et de la forêt épineuse de part et d’autre de la chaîne de l’Anosy — une transition écologique qu’on ne trouve pas ailleurs dans l’île. C’est aussi l’un des rares endroits où pousse le palmier trièdre, endémique de la région.",
    ],
    facts: [
      { label: "Nahampoana", value: "7 km · demi-journée · lémuriens en semi-liberté" },
      { label: "Berenty", value: "≈ 80 km · journée complète · forêt-galerie" },
      { label: "Andohahela", value: "Parc national · forêt humide et épineuse" },
      { label: "Sainte-Luce", value: "≈ 50 km · forêt littorale et lagune" },
    ],
    figure: {
      plates: ["forest", "reef"],
      caption: "Forêt-galerie et forêt littorale, à une heure d’écart.",
    },
  },
  {
    id: "plages",
    label: "Plages & océan",
    title: "Trois baies, un récif et beaucoup de vent",
    paragraphs: [
      "Libanona est la plage de la ville : un croissant de sable blanc protégé par un récif, à un quart d’heure à pied du marché. C’est là qu’on se baigne, qu’on apprend à surfer, et qu’on vient regarder le coucher du soleil depuis les rochers.",
      "Plus au sud, Ambinanibe est une longue plage de dunes, battue par le vent et peu fréquentée. Au nord-est, la presqu’île de Lokaro et la baie d’Évatraha s’atteignent en pirogue : lagunes, criques et dunes, sans route pour y arriver.",
      "De juillet à septembre, les baleines à bosse remontent le canal au large de la presqu’île. On les aperçoit parfois depuis la terre, notamment depuis le Pic Saint-Louis par temps clair.",
    ],
    figure: {
      plates: ["ocean", "sand", "sunset"],
      caption: "Libanona, Ambinanibe, Lokaro.",
    },
  },
  {
    id: "culture",
    label: "Culture antanosy",
    title: "Le pays des Antanosy",
    paragraphs: [
      "Les Antanosy forment le groupe principal de la région. Leur organisation sociale repose sur les lignages et sur le respect des ancêtres, et la vie de village est rythmée par les cérémonies familiales, les fêtes et les interdits locaux — les fady — qui varient d’un endroit à l’autre et qu’il vaut mieux demander avant de s’engager sur un sentier ou de photographier un lieu.",
      "L’artisanat le plus visible est la vannerie de mahampy, un jonc des marais tressé par les femmes de Sainte-Luce et des villages de la lagune. Nattes, paniers et chapeaux se vendent sur les marchés et constituent, pour plusieurs villages, un revenu régulier.",
      "Dans l’arrière-pays, le sisal et le zébu structurent l’économie et le paysage : plantations alignées jusqu’à l’horizon, troupeaux qui traversent la piste, charrettes qui descendent vers le marché.",
    ],
    figure: {
      plates: ["town", "sunset"],
      caption: "Marché de Taolagnaro et vannerie de mahampy.",
    },
  },
  {
    id: "communautes",
    label: "Communautés",
    title: "Un tourisme qui reste dans la région",
    paragraphs: [
      "Plusieurs des séjours proposés ici sont gérés directement par les villages — hébergement chez l’habitant à Sainte-Luce, guides formés localement, ateliers de vannerie. C’est le modèle qui laisse le plus de valeur sur place, et c’est celui que la plateforme met en avant chaque fois qu’il existe.",
      "Concrètement, cela veut dire choisir un guide de la région plutôt qu’un accompagnateur venu d’ailleurs, manger là où la cuisine est faite avec des produits du marché, et demander avant de photographier. Rien d’héroïque : ce sont les gestes ordinaires qui font la différence sur une économie de cette taille.",
      "Les fiches portant la mention « Géré par la communauté » signalent les prestataires dont les revenus reviennent à une association ou à un village.",
    ],
  },
  {
    id: "pratique",
    label: "Infos pratiques",
    title: "Ce qu’il faut savoir avant de venir",
    paragraphs: [
      "L’avion reste le moyen le plus simple d’arriver : Taolagnaro est reliée à Antananarivo par des vols réguliers, avec une escale possible selon les jours. Par la route, la RN13 depuis Ihosy est longue et l’état de la piste varie fortement avec la saison — renseignez-vous localement plutôt que sur une carte.",
      "La meilleure période va d’avril à novembre. La saison des pluies et des cyclones court grossièrement de décembre à mars ; certains établissements ferment ou réduisent leurs services à ce moment-là. Les baleines, elles, ne sont là que de juillet à septembre.",
      "La monnaie est l’ariary, et l’essentiel se règle en espèces : prévoyez du liquide en quittant la ville, les distributeurs sont rares dès qu’on s’éloigne. Le français est largement parlé dans le tourisme, le malgache partout, l’anglais plus rarement.",
    ],
    facts: [
      { label: "Saison sèche", value: "Avril à novembre" },
      { label: "Cyclones", value: "Décembre à mars, variable" },
      { label: "Baleines", value: "Juillet à septembre" },
      { label: "Monnaie", value: "Ariary (Ar) · espèces indispensables" },
      { label: "Langues", value: "Malgache, français ; anglais plus rare" },
    ],
  },
];

/** Chapters for a locale, falling back to French. */
export function chaptersFor(locale: string): Chapter[] {
  if (locale === "en") {
    // Imported lazily-by-reference to keep this module free of cycles.
    return CHAPTERS_EN;
  }
  return CHAPTERS;
}
