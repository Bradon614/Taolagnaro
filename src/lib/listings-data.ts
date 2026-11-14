/**
 * GENERATED FILE — do not edit by hand.
 *
 * Produced by scripts/gen-listings-data.py from the research dataset in
 * research/*.json. Re-run the script after the research changes:
 *
 *     python3 scripts/gen-listings-data.py
 *
 * Publication gate: verification_status "verified" or "partially_verified" only.
 * The 13 records excluded in research/quality-audit.md and the closed records
 * are never emitted. The 111 records still marked "needs_verification" stay out
 * of the catalogue until they are confirmed.
 *
 * Every value below is taken from the research record. Where the research has no
 * value the field is null — distance and coordinates in particular. Nothing here
 * is a placeholder, an estimate, or invented copy.
 */

import type { Listing } from "@/lib/listings";

export const RAW_LISTINGS: Listing[] = [
  {
    "slug": "plage-de-la-baie-des-galions",
    "category": "sites",
    "name": "Baie des Galions (Baie d'Italy)",
    "place": "Centre-ville",
    "distanceKm": null,
    "summary": "Baie au nord de Fort-Dauphin, décrite par cara.mg comme l'ancien refuge des pirates portugais, également appelée baie d'Italy. Elle est citée parmi les sites remarquables du littoral de la région, aux côtés des lacs de Vinanibe et Lanirano. Aucune coordonnée, aucun accès et aucune activité organisée ne sont publiés par les sources consultées.",
    "plate": "sand",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": false,
    "coordinates": null,
    "tags": []
  },
  {
    "slug": "domaine-de-la-cascade",
    "category": "sites",
    "name": "Domaine de la Cascade",
    "place": "Amboasary",
    "distanceKm": 8,
    "summary": "Domaine de 136 hectares à Manantantely (« lieu de miel »), à environ 8 km à l'ouest de Taolagnaro sur la route d'Amboasary, qui borde la dernière forêt primaire de basse altitude du grand sud. Il contient des pépinières, des plantations fruitières certifiées Ecocert, un rucher, une cascade naturelle avec bassins et 17 km de sentiers. Quatre circuits de randonnée de 30 minutes à 4 heures sont proposés avec guides.",
    "plate": "forest",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": false,
    "coordinates": {
      "lat": -24.9866952,
      "lon": 46.9317334
    },
    "tags": [
      "restaurant"
    ],
    "contact": {
      "address": "Manantantely, route d'Amboasary, Fort-Dauphin (Taolagnaro)",
      "website": "https://www.domainedelacascade.com/",
      "facebook": "https://www.facebook.com/Domaine-de-la-Cascade-Plantation-Lansargues-550124962135231/",
      "instagram": "https://www.instagram.com/domaine_de_la_cascade/"
    }
  },
  {
    "slug": "jardin-botanique-de-saiadi",
    "category": "sites",
    "name": "Jardin botanique de Saïadi",
    "place": "Nahampoana",
    "distanceKm": 6,
    "summary": "Jardin botanique de 40 hectares situé à environ 6 km au nord de Taolagnaro, créé par les propriétaires de la réserve de Berenty. Les sources le décrivent comme un parc à visiter en une demi-journée pour ses palmiers et ses fougères. Une visite peut être organisée par l'intermédiaire de l'hôtel Le Dauphin.",
    "plate": "forest",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": false,
    "coordinates": {
      "lat": -24.9875614,
      "lon": 46.9821258
    },
    "tags": []
  },
  {
    "slug": "farihy-anony",
    "category": "sites",
    "name": "Lac Anony (Farihy Anony)",
    "place": "Centre-ville",
    "distanceKm": null,
    "summary": "Lac de l'arrière-pays d'Anosy, mis en avant par l'office de tourisme régional sur sa page officielle consacrée aux sites touristiques de la destination. Le Fort-Dauphin Tourisme le cite également parmi les destinations de la région. Il s'agit d'un plan d'eau intérieur, distinct des lagunes côtières de la ville.",
    "plate": "reef",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": false,
    "coordinates": {
      "lat": -25.1270681,
      "lon": 46.511127
    },
    "tags": []
  },
  {
    "slug": "farihy-lanirano",
    "category": "sites",
    "name": "Lac Lanirano (Farihy Lanirano)",
    "place": "Lanirano",
    "distanceKm": null,
    "summary": "Lac côtier au nord de Taolagnaro, cartographié sous le nom malgache Farihy Lanirano. Il constitue le point de départ de l'itinéraire en pirogue vers Lokaro : les guides décrivent la traversée du lac Lanirano puis d'un chenal bordé de pandanus jusqu'au village d'Évatraha. cara.mg mentionne les lacs de Vinanibe et Lanirano pour les balades en bateau.",
    "plate": "reef",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": false,
    "coordinates": {
      "lat": -25.0021793,
      "lon": 46.9915656
    },
    "tags": []
  },
  {
    "slug": "lac-vinanibe",
    "category": "sites",
    "name": "Lac Vinanibe",
    "place": "Ambinanibe",
    "distanceKm": null,
    "summary": "Lac côtier du secteur de Vinanibe, à l'ouest de Fort-Dauphin, mentionné par cara.mg parmi les plans d'eau propices aux balades en bateau, aux côtés du lac Lanirano. Pendant la colonisation française, son nom était Vinany-Bé : une Société Anonyme de Vinany-Bé fut fondée à la fin du XIXe siècle pour l'exploitation des bois tropicaux. La baie de Vinanibe, exposée au vent d'Anosy, est associée à la pratique du kitesurf.",
    "plate": "reef",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": false,
    "coordinates": null,
    "tags": []
  },
  {
    "slug": "marche-artisanal-fort-dauphin",
    "category": "sites",
    "name": "Marché artisanal de Fort-Dauphin",
    "place": "Lanirano",
    "distanceKm": null,
    "summary": "Marché artisanal de Taolagnaro, situé sur la N 12a au niveau de Lanirano/Amparihy, au nord du centre. Il est cartographié dans OpenStreetMap comme lieu de vente de produits artisanaux et figure dans le répertoire des lieux notables de la ville à la rubrique « Marchés et boutiques ». Le marché central de la ville déborde par ailleurs de fruits, de poissons séchés et de paniers tressés selon les guides.",
    "plate": "town",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": false,
    "coordinates": {
      "lat": -25.0239018,
      "lon": 46.9917333
    },
    "tags": [],
    "contact": {
      "address": "N 12a, Lanirano, Amparihy, Tôlagnaro"
    }
  },
  {
    "slug": "musee-fort-flacourt",
    "category": "sites",
    "name": "Musée de Fort-Flacourt",
    "place": "Centre-ville",
    "distanceKm": null,
    "summary": "Musée installé dans le fort Flacourt, construit en 1643 par la Compagnie française de l'Orient et occupé aujourd'hui par l'armée malgache. Il présente l'histoire coloniale de la ville et de la région d'Anosy : cartes anciennes, photographies, uniformes et objets culturels antanosy. Le site officiel le présente comme un point de départ pour toute visite historique de l'Anosy, et rappelle qu'un guide est obligatoire pour la visite du fort militaire.",
    "plate": "town",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": null,
    "tags": [],
    "contact": {
      "phone": "+261 34 23 372 12",
      "email": "museeflacourt@gmail.com",
      "address": "Fort Flacourt, Taolagnaro (Fort-Dauphin)",
      "website": "https://musee-fort-flacourt.com/"
    }
  },
  {
    "slug": "parc-national-dandohahela",
    "category": "sites",
    "name": "Parc national d'Andohahela",
    "place": "Centre-ville",
    "distanceKm": null,
    "summary": "Parc national du massif de l'Anosy, au nord-ouest de Taolagnaro, qui réunit trois types de forêt sur trois parcelles distinctes : Malio, Mangoky et Tsimelahy. La parcelle de Tsimelahy, forêt de transition et la plus accessible, se parcourt en une demi-journée entre piscines naturelles et pachypodiums. Les guides le décrivent comme l'un des sites phares de l'arrière-pays.",
    "plate": "forest",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": false,
    "coordinates": {
      "lat": -24.7535919,
      "lon": 46.8174835
    },
    "tags": []
  },
  {
    "slug": "pic-saint-louis",
    "category": "sites",
    "name": "Pic Saint-Louis",
    "place": "Centre-ville",
    "distanceKm": null,
    "summary": "Point culminant de la chaîne de montagnes anosyenne qui longe Fort-Dauphin, à 529 mètres d'altitude. Depuis son sommet, la vue embrasse la ville, la presqu'île de Libanona, les trois baies et l'arrière-pays ; les milans noirs (papango) y valsèrent dans les courants ascendants. La montée demande environ deux heures et le panorama est décrit comme la récompense de l'effort.",
    "plate": "ocean",
    "price": {
      "kind": "free"
    },
    "acceptsRequests": false,
    "coordinates": {
      "lat": -25.0080734,
      "lon": 46.9652182
    },
    "tags": [
      "vue-mer"
    ]
  },
  {
    "slug": "plage-dambinanibe",
    "category": "sites",
    "name": "Plage d'Ambinanibe",
    "place": "Ambinanibe",
    "distanceKm": null,
    "summary": "Plage située entre le lagon et l'océan, à l'ouest de la ville, citée par l'office de tourisme régional parmi les plages de la destination Anôsy. L'ORTA la décrit comme un spot offrant des vagues puissantes, destiné aux surfeurs de niveau intermédiaire à expérimenté. Aucune coordonnée exacte n'est publiée par les sources consultées.",
    "plate": "sand",
    "price": {
      "kind": "free"
    },
    "acceptsRequests": false,
    "coordinates": null,
    "tags": []
  },
  {
    "slug": "plage-ankoba",
    "category": "sites",
    "name": "Plage d'Ankoba",
    "place": "Ankoba",
    "distanceKm": null,
    "summary": "Longue plage exposée aux vagues, à l'ouest du centre, citée par l'office de tourisme régional parmi les plages de la destination Anôsy. C'est aussi le spot de surf le plus accessible de la ville : l'ORTA la décrit comme un spot naturel idéal pour les amateurs de vagues puissantes, et les guides la recommandent aux surfeurs débutants pour son fond sableux.",
    "plate": "sand",
    "price": {
      "kind": "free"
    },
    "acceptsRequests": false,
    "coordinates": {
      "lat": -25.0347422,
      "lon": 46.982411
    },
    "tags": [],
    "featuredRank": 5
  },
  {
    "slug": "plage-de-libanona",
    "category": "sites",
    "name": "Plage de Libanona",
    "place": "Libanona",
    "distanceKm": null,
    "summary": "Plage de la ville, au bout de la presqu'île de Libanona, à quelques minutes à pied du centre. Son sable clair et son eau protégée de la houle en font la plage des familles, réputée pour la baignade, le masque et tuba. L'office de tourisme régional et les guides signalent un fort courant hors de l'anse, et recommandent la prudence.",
    "plate": "sand",
    "price": {
      "kind": "free"
    },
    "acceptsRequests": false,
    "coordinates": {
      "lat": -25.0386631,
      "lon": 46.9956052
    },
    "tags": [],
    "featuredRank": 4
  },
  {
    "slug": "plage-de-lokaro",
    "category": "sites",
    "name": "Plage de Lokaro",
    "place": "Lokaro",
    "distanceKm": null,
    "summary": "Plage sauvage de la baie de Lokaro, au nord-est de Fort-Dauphin, décrite par l'office de tourisme régional comme un ensemble de criques, îlots et forêt en bord de mer, « qualifié de paradis sur terre ». On y accède en pirogue depuis Taolagnaro par le lac Lanirano puis le village d'Évatraha, ou en 4×4 par une piste sableuse. Les guides signalent des courants puissants.",
    "plate": "sand",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": false,
    "coordinates": {
      "lat": -24.927741,
      "lon": 47.1140382
    },
    "tags": []
  },
  {
    "slug": "plage-monseigneur",
    "category": "sites",
    "name": "Plage de Monseigneur (Baie de Monseigneur)",
    "place": "Centre-ville",
    "distanceKm": null,
    "summary": "Baie et plage à l'est du centre-ville, facilement accessible depuis la ville. L'ORTA la présente comme un spot où les surfeurs de tous niveaux viennent à la rencontre de l'océan, et l'article de Wikipédia consacré à Tôlanaro la décrit comme offrant des vagues constantes convenant aux surfeurs de niveau intermédiaire à avancé, avec une mise en garde pour les débutants.",
    "plate": "sand",
    "price": {
      "kind": "free"
    },
    "acceptsRequests": false,
    "coordinates": {
      "lat": -25.03617,
      "lon": 46.998434
    },
    "tags": []
  },
  {
    "slug": "reserve-de-berenty",
    "category": "sites",
    "name": "Réserve de Berenty",
    "place": "Amboasary",
    "distanceKm": null,
    "summary": "Réserve privée de 200 hectares créée en 1936 dans la vallée du Mandrare, à l'ouest de Taolagnaro, qui protège une forêt-galerie de tamariniers et une forêt épineuse résiduelle au sein de l'ancienne plantation de sisal de Henry de Heaulme. Elle est réputée pour ses lémuriens : makis catta, lémurs bruns et propithèques de Verreaux, ainsi que pour ses 99 espèces d'oiseaux recensées. Un petit musée ethnographique antandroy y est signalé comme modèle.",
    "plate": "forest",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": false,
    "coordinates": {
      "lat": -25.0091667,
      "lon": 46.3022222
    },
    "tags": [],
    "contact": {
      "phone": "+261 33 23 210 07",
      "email": "fortdauphin@madagascar-resorts.com",
      "address": "Route de Berenty, Commune d'Amboasary Sud, Région Anosy",
      "website": "https://www.berenty-reserve.com/",
      "facebook": "https://www.facebook.com/Reserve2Berenty",
      "instagram": "https://www.instagram.com/berenty_reserve"
    }
  },
  {
    "slug": "reserve-de-nahampoana",
    "category": "sites",
    "name": "Réserve de Nahampoana",
    "place": "Nahampoana",
    "distanceKm": 7.5,
    "summary": "Ancienne station d'acclimatation botanique créée vers 1900, devenue réserve et jardin botanique au pied du pic Saint-Louis, à environ 7,5 km au nord de la ville. Le parc abrite des plantes endémiques (dont les didiéracées en forme de cactus), plusieurs espèces de lémuriens, des tortues, caméléons et crocodiles, ainsi qu'un parcours en barque sur la rivière. Deux maisons d'habitation et un restaurant accueillent les visiteurs.",
    "plate": "forest",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": false,
    "coordinates": {
      "lat": -24.9746126,
      "lon": 46.9802782
    },
    "tags": [
      "restaurant"
    ],
    "contact": {
      "phone": "+261 34 46 122 80",
      "website": "https://nahampoanareserve.com/"
    }
  },
  {
    "slug": "sainte-luce-reserve",
    "category": "sites",
    "name": "Réserve de Sainte-Luce",
    "place": "Sainte-Luce",
    "distanceKm": null,
    "summary": "Réserve privée de 26 hectares de forêt primaire protégeant cinq espèces de lémuriens, créée par Brett Massoud, fondateur de l'ONG SEED Madagascar. Randonnées, excursions en pirogue, promenades nocturnes et camping sont possibles, mais la réservation préalable est obligatoire. L'accès est privé selon les données cartographiques.",
    "plate": "forest",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": false,
    "coordinates": {
      "lat": -24.8019124,
      "lon": 47.1632473
    },
    "tags": []
  },
  {
    "slug": "tranovato",
    "category": "sites",
    "name": "Tranovato",
    "place": "Manantantely",
    "distanceKm": null,
    "summary": "Vestiges du fortin portugais de l'îlot Santa Cruz, antérieur à l'établissement français : des marins portugais naufragés y auraient bâti le Tranovato, une maison de pierre, sur la côte voisine. Le site est signalé comme l'un des vestiges intéressants pour les amateurs d'excursions culturelles dans la région, avec les ruines du fort Flacourt et les bâtiments coloniaux de Nahampoana.",
    "plate": "town",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": false,
    "coordinates": {
      "lat": -25.0363618,
      "lon": 46.8923591
    },
    "tags": [],
    "contact": {
      "address": "N 13, Manatantely, Soanierana, Tôlanaro"
    }
  },
  {
    "slug": "berenty-lodge",
    "category": "hotels",
    "name": "Berenty Lodge",
    "place": "Amboasary",
    "distanceKm": null,
    "summary": "Lodge de 24 chambres situé à l'intérieur même de la Réserve privée de Berenty, dans la vallée du Mandrare, sur la route de Berenty à Amboasary Sud. Il propose trois catégories d'hébergement : Bungalows Standard (lit double ou lits jumeaux, salle de bain privative avec douche, ventilateur, terrasse sur le jardin), Chambres Supérieures (lit king-size ou lits jumeaux, eau chaude, moustiquaire, coin détente, terrasse privée sur la réserve) et Suites Familiales. Séjourner sur place permet les visites de la réserve et les sorties nocturnes.",
    "plate": "ocean",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": null,
    "tags": [
      "restaurant",
      "terrasse"
    ],
    "contact": {
      "phone": "+261 33 23 210 07",
      "email": "fortdauphin@madagascar-resorts.com",
      "address": "Route de Berenty, Commune d'Amboasary Sud, Région Anosy, Madagascar",
      "website": "https://www.berenty-reserve.com/",
      "facebook": "https://www.facebook.com/Reserve2Berenty",
      "instagram": "https://www.instagram.com/berenty_reserve"
    }
  },
  {
    "slug": "chez-stephan",
    "category": "hotels",
    "name": "Chez Stephan",
    "place": "Centre-ville",
    "distanceKm": null,
    "summary": "Hébergement en bungalows du quartier Ampamakiambato, au nord de Taolagnaro, référencé par l'ORTA Anosy à la fois comme hébergement et comme hôtel-restaurant. Aucun site web ni descriptif d'équipement n'est publié.",
    "plate": "ocean",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": null,
    "tags": [
      "restaurant"
    ],
    "contact": {
      "phone": "034 10 952 88",
      "address": "Ampamakiambato, Tôlagnaro (localité indiquée par l'ORTA)"
    }
  },
  {
    "slug": "domaine-de-la-cascade-bungalows",
    "category": "hotels",
    "name": "Domaine de la Cascade (Plantation Lansargues)",
    "place": "Amboasary",
    "distanceKm": 8,
    "summary": "Domaine de 136 hectares à Manantantely (« lieu de miel »), à environ 8 km à l'ouest de Taolagnaro sur la route d'Amboasary, qui borde la dernière forêt primaire de basse altitude du grand sud. Il propose deux bungalows en exclusivité de groupe ainsi que du camping, avec petite restauration, 17 km de sentiers, deux piscines naturelles et des plantations certifiées Ecocert (vanille, baies roses). Quatre circuits de randonnée de 30 minutes à 4 heures sont proposés avec guides.",
    "plate": "ocean",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": null,
    "tags": [
      "restaurant"
    ],
    "contact": {
      "address": "Manantantely, route d'Amboasary, Fort-Dauphin (Taolagnaro), Madagascar",
      "website": "https://www.domainedelacascade.com/",
      "facebook": "https://www.facebook.com/Domaine-de-la-Cascade-Plantation-Lansargues-550124962135231/",
      "instagram": "https://www.instagram.com/domaine_de_la_cascade/"
    }
  },
  {
    "slug": "kaleta-hotel",
    "category": "hotels",
    "name": "Kaleta Hotel",
    "place": "Centre-ville",
    "distanceKm": null,
    "summary": "Kaleta Hotel est un hôtel 3 étoiles situé face à la mer, en plein cœur du quartier administratif de Fort-Dauphin, à une dizaine de kilomètres de l'aéroport. Il dispose d'un restaurant, d'un bar, d'une pâtisserie, d'un espace bien-être (spa, Balnéoforme), d'une piscine et de salles de séminaire. Quatre catégories de chambres sont proposées : Standard, Double, Familiale et Suite « Grand Large ».",
    "plate": "ocean",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -25.0286242,
      "lon": 46.9958339
    },
    "tags": [
      "wifi",
      "restaurant",
      "transfert",
      "petit-dejeuner"
    ],
    "contact": {
      "phone": "+261 20 92 212 87",
      "email": "contact@kaletahotel.com",
      "address": "Avenue Gallieni, Bazaribe, Tôlagnaro (indicatif : coordonnées OSM du bâtiment ; aucune adresse postale complète n'a été publiée sur le site officiel)",
      "website": "https://kaletahotel.com",
      "facebook": "https://www.facebook.com/hotelkaleta/"
    },
    "featuredRank": 2
  },
  {
    "slug": "lavasoa-hotel",
    "category": "hotels",
    "name": "Lavasoa Hotel",
    "place": "Libanona",
    "distanceKm": null,
    "summary": "Hébergement en bungalows situé à Libanona, la presqu'île balnéaire de Fort-Dauphin, classé en catégorie « Hébergements – Bungalow » par l'office de tourisme de l'Anosy. Aucun descriptif détaillé n'est publié par l'établissement.",
    "plate": "ocean",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -25.0401385,
      "lon": 46.995992
    },
    "tags": [],
    "contact": {
      "phone": "034 32 025 00",
      "address": "Libanona, Tôlagnaro (localité indiquée par l'ORTA)"
    }
  },
  {
    "slug": "le-dauphin",
    "category": "hotels",
    "name": "Le Dauphin",
    "place": "Centre-ville",
    "distanceKm": null,
    "summary": "Hôtel central de Fort-Dauphin disposant d'un jardin, d'un restaurant et proposant des excursions ; il est cité comme point de réservation pour visiter le Jardin Saïadi. Un restaurant « Rex Restaurant Pizzeria » partage le même numéro de téléphone, ce qui suggère un restaurant indépendant mais exploité au même endroit.",
    "plate": "ocean",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -25.0317006,
      "lon": 46.9901495
    },
    "tags": [
      "restaurant"
    ],
    "contact": {
      "phone": "+261 34 12 627 81",
      "address": "Boulevard Numéro 1, Ampototra, Bazaribe, Tôlagnaro"
    }
  },
  {
    "slug": "lokaro-lodge",
    "category": "hotels",
    "name": "Lokaro Lodge",
    "place": "Lokaro",
    "distanceKm": null,
    "summary": "Hébergement situé à Lokaro, la baie isolée au nord-est de Fort-Dauphin, accessible en pirogue via le lac Lanirano jusqu'au village d'Évatraha puis à pied, ou en 4×4 par une piste sableuse. Il est classé « Hébergements – Hotel » par l'office de tourisme régional de l'Anosy.",
    "plate": "ocean",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": null,
    "tags": [],
    "contact": {
      "phone": "034 45 190 40",
      "address": "Lokaro (localité indiquée par l'ORTA)"
    }
  },
  {
    "slug": "manafiafy-forest-lodge",
    "category": "hotels",
    "name": "Manafiafy Forest Lodge (Manafiafy Beach & Rainforest Lodge)",
    "place": "Sainte-Luce",
    "distanceKm": null,
    "summary": "Écolodge de cinq bungalows de chaume en bord de mer, niché dans une crique forestière près du village côtier de Manafiafy (baie Sainte-Luce), sur la côte sud-est. Chaque bungalow dispose d'une salle de bain privative, d'une terrasse privée avec hamac ou transats, d'une douche extérieure de plage et d'une vue sur la baie ; le lodge propose kayak, snorkeling, pique-niques sur la plage, observation des lémuriens à collier roux et des baleines à bosse de juin à octobre. L'établissement ferme chaque année du 10 janvier au 25 mars, en pleine saison des pluies.",
    "plate": "ocean",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -24.7829823,
      "lon": 47.1951993
    },
    "tags": [
      "wifi",
      "restaurant",
      "transfert",
      "terrasse"
    ],
    "contact": {
      "email": "tours@madaclassic.com",
      "website": "https://madaclassic.com/manafiafy-forest-lodge/",
      "instagram": "https://www.instagram.com/madaclassiccollection"
    }
  },
  {
    "slug": "mandrare-river-camp",
    "category": "hotels",
    "name": "Mandrare River Camp",
    "place": "Vallée du Mandrare",
    "distanceKm": null,
    "summary": "Camp de luxe sous tente, ouvert en 2007 comme premier camp tout-inclus haut de gamme de Madagascar, installé sur la rive du fleuve Mandrare à l'ombre des tamariniers, près du village antandroy d'Ifotaka et de ses forêts sacrées. Il fonctionne à l'énergie solaire et combine safari dans la forêt épineuse, observation de lémuriens et immersion culturelle. Accès par vols charters programmés deux fois par semaine (atterrissage à la piste d'Ifotaka, à cinq minutes du camp) ou par vol commercial vers Fort-Dauphin puis 3 h 30 de transfert routier privé.",
    "plate": "ocean",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": null,
    "tags": [
      "restaurant",
      "transfert",
      "generateur"
    ],
    "contact": {
      "phone": "+261 38 15 619 13",
      "email": "tours@madaclassic.com",
      "address": "Ifotaka, vallée du Mandrare, Région Anosy (adresse fournie par l'ORTA : « Ifotaka »)",
      "website": "https://madaclassic.com/mandrare-river-camp/",
      "facebook": "https://www.facebook.com/MandrareRiverCamp/",
      "instagram": "https://www.instagram.com/madaclassiccollection"
    }
  },
  {
    "slug": "sainte-luce-reserve-camp",
    "category": "hotels",
    "name": "Sainte Luce Reserve (camping / écotourisme)",
    "place": "Sainte-Luce",
    "distanceKm": null,
    "summary": "Réserve privée de 26 hectares de forêt primaire protégeant cinq espèces de lémuriens, créée par Brett Massoud, fondateur de l'ONG SEED Madagascar. La réserve propose randonnées, excursions en pirogue, promenades nocturnes et un campement, avec réservation préalable obligatoire. L'accès est privé selon la fiche cartographique.",
    "plate": "ocean",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -24.8019124,
      "lon": 47.1632473
    },
    "tags": []
  },
  {
    "slug": "talinjoo-boutique-hotel",
    "category": "hotels",
    "name": "Talinjoo Boutique Hôtel",
    "place": "Libanona",
    "distanceKm": null,
    "summary": "Talinjoo est un boutique hôtel en front de mer sur la baie de Libanona, plein ouest, à Fort-Dauphin. Il propose quatre catégories de chambres (dont King Size / Suite) et un bar-restaurant avec vue panoramique sur l'océan Indien. L'établissement met en avant son architecture et une programmation culturelle (« un lieu en mouvements »).",
    "plate": "ocean",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -25.0416569,
      "lon": 46.9956551
    },
    "tags": [
      "vue-mer",
      "wifi",
      "restaurant"
    ],
    "contact": {
      "phone": "+261 34 05 212 35",
      "email": "contact@talinjoo.com",
      "website": "https://www.talinjoo.com",
      "facebook": "https://www.facebook.com/hoteltalinjoo/"
    },
    "featuredRank": 3
  },
  {
    "slug": "villa-oceania",
    "category": "hotels",
    "name": "Villa Oceania (Villa Océane)",
    "place": "Libanona",
    "distanceKm": null,
    "summary": "Appart-hôtel situé à Libanona, sur la presqu'île de Fort-Dauphin, classé « Hébergements – Appart-Hotel » par l'office de tourisme de l'Anosy. Il combine hébergement et restauration selon la catégorie ORTA (« Hébergements »).",
    "plate": "ocean",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -25.0377731,
      "lon": 46.995079
    },
    "tags": [],
    "contact": {
      "phone": "034 02 745 71",
      "address": "Libanona, Tôlagnaro (localité indiquée par l'ORTA)"
    }
  },
  {
    "slug": "chez-anita",
    "category": "restaurants",
    "name": "Chez Anita",
    "place": "Libanona",
    "distanceKm": null,
    "summary": "Adresse de Libanona référencée dans OpenStreetMap à la fois comme restaurant et comme hébergement (« Anita's Hotel »). L'office de tourisme ORTA Anosy la classe en « Hôtel Restaurant » et Le Petit Voyageur Madagascar la présente comme des « chambres d'hôtes simples vue sur la plage de Libanona ». La restauration y est donc liée à l'hébergement et son ouverture aux clients extérieurs n'est pas confirmée.",
    "plate": "sunset",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -25.0335268,
      "lon": 46.9937151
    },
    "tags": [
      "plage"
    ],
    "contact": {
      "phone": "+261 33 12 513 42"
    }
  },
  {
    "slug": "chez-mirana-et-bernard",
    "category": "restaurants",
    "name": "Chez Mirana et Bernard",
    "place": "Ambinanibe",
    "distanceKm": null,
    "summary": "Restaurant membre de l'office de tourisme ORTA Anosy, classé dans la catégorie « Restaurants » avec l'adresse « Ambinanikely » et le téléphone 034 01 637 04. Aucune description de la carte, aucun horaire ni prix n'est publié sur la fiche consultée. Le nom figure avec la coquille « Bernanrd » sur le site de l'ORTA.",
    "plate": "sunset",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": null,
    "tags": [],
    "contact": {
      "phone": "+261 34 01 637 04",
      "address": "Ambinanikely"
    }
  },
  {
    "slug": "grill-de-lac",
    "category": "restaurants",
    "name": "Grill de Lac",
    "place": "Lanirano",
    "distanceKm": null,
    "summary": "Restaurant membre de l'office de tourisme ORTA Anosy, classé dans sa catégorie « Restaurants » avec l'adresse « Lanorano Amparihy », c'est-à-dire le secteur du lac Lanirano, sur l'itinéraire vers Lokaro. Le nom suggère une formule de grillades en bord de lac ; aucune description rédigée, horaire ou prix n'est publié sur la fiche ORTA.",
    "plate": "sunset",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": null,
    "tags": [],
    "contact": {
      "address": "Lanorano Amparihy"
    }
  },
  {
    "slug": "joo-restaurant-joo-bar-talinjoo",
    "category": "restaurants",
    "name": "Joo Restaurant & Joo Bar (Talinjoo)",
    "place": "Libanona",
    "distanceKm": null,
    "summary": "Le restaurant et le bar du Talinjoo Boutique Hôtel, situés face à la baie de Libanona, proposent une cuisine « créative » mêlant romazava malgache, sashimi, langouste et grandes salades, avec du pain fait maison. Le site officiel décrit le lieu comme « à la fois bar et restaurant », avec un espace bar ouvert sur l'horizon, un salon, une terrasse et une carte de cocktails au coucher du soleil. La réservation d'une table se fait au +261 34 05 212 35.",
    "plate": "sunset",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -25.0416313,
      "lon": 46.9956451
    },
    "tags": [
      "vue-mer",
      "restaurant",
      "terrasse"
    ],
    "contact": {
      "phone": "+261 34 05 212 35",
      "email": "contact@talinjoo.com",
      "address": "Libanona, Fort-Dauphin, Madagascar",
      "website": "https://talinjoo.com/bar-restraurant/"
    },
    "featuredRank": 1
  },
  {
    "slug": "larrivage",
    "category": "restaurants",
    "name": "L'Arrivage",
    "place": "Centre-ville",
    "distanceKm": null,
    "summary": "Restaurant de bord de mer de Taolagnaro, référencé comme restaurant « french;regional » avec fruits de mer dans OpenStreetMap et classé par l'office de tourisme ORTA Anosy dans la catégorie « Restaurants ». Le Petit Voyageur Madagascar le décrit comme une « cuisine traditionnelle et fruits de mer, terrasse vue mer ». Les sources divergent sur le téléphone et l'adresse : OSM indique +261 38 54 93 861, l'ORTA 034 73 577 84, et Le Petit Voyageur +261 34 80 493 37.",
    "plate": "sunset",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -25.034218,
      "lon": 46.9832557
    },
    "tags": [
      "terrasse"
    ],
    "contact": {
      "phone": "+261 38 54 93 861",
      "address": "Ankoba (selon ORTA)",
      "facebook": "https://www.facebook.com/people/LArrivage-Fort-dauphin/100083207743581/"
    }
  },
  {
    "slug": "la-kabane",
    "category": "restaurants",
    "name": "La Kabane",
    "place": "Centre-ville",
    "distanceKm": null,
    "summary": "Bar de Taolagnaro référencé dans OpenStreetMap comme bar à tapas et burgers, avec Wi-Fi, ouvert du mercredi au dimanche de 11 h à 23 h. Une page Facebook sert de site web dans les données OSM. Aucune description rédactionnelle de l'établissement n'a été trouvée dans les sources consultées.",
    "plate": "sunset",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -25.0292226,
      "lon": 46.9843201
    },
    "tags": [
      "wifi"
    ],
    "contact": {
      "phone": "+261 34 12 60 643",
      "facebook": "https://www.facebook.com/profile.php?id=100064052106468"
    }
  },
  {
    "slug": "la-reine-du-sud-chez-georges",
    "category": "restaurants",
    "name": "La Reine du Sud (Chez Georges)",
    "place": "Centre-ville",
    "distanceKm": null,
    "summary": "Restaurant cité par Le Petit Voyageur Madagascar dans sa rubrique « Restaurants à découvrir » à Fort-Dauphin, présenté comme une « cuisine malgache authentique » et associé au téléphone +261 34 08 546 97. Aucune adresse, aucun horaire et aucun prix ne sont indiqués par la source.",
    "plate": "sunset",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": null,
    "tags": [],
    "contact": {
      "phone": "+261 34 08 546 97"
    }
  },
  {
    "slug": "le-tournesol",
    "category": "restaurants",
    "name": "Le Tournesol",
    "place": "Centre-ville",
    "distanceKm": null,
    "summary": "Établissement référencé dans OpenStreetMap comme restaurant et classé par l'office de tourisme ORTA Anosy dans la catégorie « Hôtel Restaurant ». Aucune description de la carte ni horaire n'a été trouvé dans les sources consultées.",
    "plate": "sunset",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -25.0261785,
      "lon": 46.9877471
    },
    "tags": []
  },
  {
    "slug": "mahamanina",
    "category": "restaurants",
    "name": "Mahamanina",
    "place": "Centre-ville",
    "distanceKm": null,
    "summary": "Restaurant membre de l'office de tourisme ORTA Anosy, classé dans la catégorie « Restaurants » avec l'adresse « Bazarikely » et le téléphone 034 15 510 68. OpenStreetMap référence par ailleurs un « Snack Bar Mahamanina » dans le centre de Taolagnaro (téléphone différent) et un autre point « Mahamanina » à une quinzaine de kilomètres à l'ouest : l'identité exacte de la fiche ORTA n'est pas établie.",
    "plate": "sunset",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": null,
    "tags": [],
    "contact": {
      "phone": "+261 34 15 510 68",
      "address": "Bazarikely"
    }
  },
  {
    "slug": "rex-restaurant-pizzeria",
    "category": "restaurants",
    "name": "Rex Restaurant Pizzeria",
    "place": "Centre-ville",
    "distanceKm": null,
    "summary": "Restaurant et pizzeria cité par Le Petit Voyageur Madagascar dans sa rubrique « Restaurants à découvrir » à Fort-Dauphin, présenté comme une « cuisine italienne et internationale ». La source indique le téléphone +261 34 12 627 81, qui est également le numéro donné par la même page pour l'hôtel Le Dauphin.",
    "plate": "sunset",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": null,
    "tags": [],
    "contact": {
      "phone": "+261 34 12 627 81"
    }
  },
  {
    "slug": "spot",
    "category": "restaurants",
    "name": "SPOT",
    "place": "Libanona",
    "distanceKm": null,
    "summary": "Restaurant membre de l'office de tourisme ORTA Anosy, classé dans la catégorie « Restaurants » avec l'adresse « Libanona ». Aucune description de la cuisine, des horaires ou des prix n'est publiée sur la fiche ORTA consultée.",
    "plate": "sunset",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": null,
    "tags": [],
    "contact": {
      "phone": "+261 38 23 304 20",
      "address": "Libanona"
    }
  },
  {
    "slug": "saint-pas",
    "category": "restaurants",
    "name": "Saint Pas",
    "place": "Centre-ville",
    "distanceKm": null,
    "summary": "Restaurant référencé dans OpenStreetMap avec les attributs « french;regional;malagasy;coffee_shop », ouvert du lundi au samedi de 7 h à 20 h et proposant la vente à emporter. L'office de tourisme ORTA Anosy le classe dans sa catégorie « Restaurants » avec l'adresse « Ampotatra ». Une page Facebook dédiée existe (saintpasfd).",
    "plate": "sunset",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -25.0341286,
      "lon": 46.9865452
    },
    "tags": [],
    "contact": {
      "phone": "+261 34 50 25 506",
      "address": "Ampotatra (selon ORTA)",
      "facebook": "https://www.facebook.com/saintpasfd/"
    }
  },
  {
    "slug": "sucre-sale",
    "category": "restaurants",
    "name": "Sucré Salé",
    "place": "Libanona",
    "distanceKm": null,
    "summary": "Restaurant membre de l'office de tourisme ORTA Anosy, classé dans la catégorie « Restaurants » avec l'adresse « Libanona Marimar ». Le nom suggère une offre sucrée et salée, mais aucune description, horaire ou prix n'est publié sur la fiche consultée.",
    "plate": "sunset",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": null,
    "tags": [],
    "contact": {
      "phone": "+261 34 59 526 20",
      "address": "Libanona Marimar"
    }
  },
  {
    "slug": "randonnee-pic-saint-louis",
    "category": "activites",
    "name": "Ascension du pic Saint-Louis",
    "place": "Centre-ville",
    "distanceKm": null,
    "summary": "Ascension du pic Saint-Louis, point culminant de la chaîne anosyenne à 529 mètres d'altitude, qui domine la ville, la presqu'île de Libanona et les trois baies. La montée dure environ deux heures et le panorama récompense l'effort ; les milans noirs (papango) y volent dans les courants ascendants. madavoyage.com classe l'ascension en demi-journée, pour marcheurs et amateurs de panoramas.",
    "plate": "ocean",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -25.0080734,
      "lon": 46.9652182
    },
    "tags": [
      "vue-mer"
    ],
    "duration": "Environ 2 heures de montée ; demi-journée pour l'ascension complète",
    "level": "Randonnée ; marcheurs"
  },
  {
    "slug": "baignade-et-detente-plage-de-libanona",
    "category": "activites",
    "name": "Baignade et détente à la plage de Libanona",
    "place": "Libanona",
    "distanceKm": null,
    "summary": "Baignade et détente sur la plage de Libanona, la plage de la ville, à quelques minutes à pied du centre. Son eau protégée de la houle et son sable clair en font la plage des familles, et les guides la considèrent comme la plage la plus facile d'accès de Fort-Dauphin. tourismer.mg signale toutefois un fort courant et recommande la prudence, notamment à l'aube et au crépuscule.",
    "plate": "ocean",
    "price": {
      "kind": "free"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -25.0386631,
      "lon": 46.9956052
    },
    "tags": [
      "plage"
    ],
    "duration": "Une heure à une journée selon madavoyage.com",
    "level": "En famille"
  },
  {
    "slug": "balade-en-bateau-lac-lanirano",
    "category": "activites",
    "name": "Balade en bateau sur le lac Lanirano",
    "place": "Lanirano",
    "distanceKm": null,
    "summary": "Balade en bateau sur le lac Lanirano, lagune côtière au nord de Taolagnaro. cara.mg cite les lacs de Vinanibe et Lanirano parmi les plans d'eau de la région propices aux balades en bateau. Le lac constitue également le point de départ de l'itinéraire nautique vers Évatraha et Lokaro, décrit par les guides comme une traversée suivie d'un chenal bordé de pandanus.",
    "plate": "ocean",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -25.0021793,
      "lon": 46.9915656
    },
    "tags": []
  },
  {
    "slug": "excursion-4x4-vers-evatraha",
    "category": "activites",
    "name": "Excursion en 4×4 vers Évatraha",
    "place": "Lokaro",
    "distanceKm": null,
    "summary": "Accès en 4×4 au village d'Évatraha par une piste sableuse, alternative à la pirogue pour rejoindre la baie de Lokaro. Les guides décrivent Évatraha comme le village entre Libanona et Lokaro, étape d'une marche de 45 minutes vers la baie. La documentation touristique mentionne par ailleurs cinq bungalows appartenant à l'exploitant Népenthès dans ce secteur.",
    "plate": "ocean",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": null,
    "tags": [
      "transfert"
    ]
  },
  {
    "slug": "kitesurf-et-planche-a-voile-ankoba",
    "category": "activites",
    "name": "Kitesurf et planche à voile à Ankoba",
    "place": "Ankoba",
    "distanceKm": null,
    "summary": "Pratique du kitesurf et de la planche à voile dans la baie de Fort-Dauphin et sur la plage d'Ankoba. Selon l'office de tourisme régional, la géographie de Fort-Dauphin — une presqu'île entourée de plages et de spots de glisse — favorise les sports nautiques, et selon le sens du vent un spot devient plus propice qu'un autre. Le vent d'alizé, signature du lieu, souffle une bonne partie de l'année et la région est décrite comme un terrain de jeu pour le kitesurf, débutants compris.",
    "plate": "ocean",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -25.0347422,
      "lon": 46.982411
    },
    "tags": [],
    "level": "Débutants compris selon madavoyage.com"
  },
  {
    "slug": "observation-des-lemuriens-nahampoana",
    "category": "activites",
    "name": "Observation des lémuriens à la réserve de Nahampoana",
    "place": "Nahampoana",
    "distanceKm": 7.5,
    "summary": "Observation de lémuriens en semi-liberté dans la réserve de Nahampoana, à environ 7,5 km au nord de la ville, au pied du pic Saint-Louis. Le parc abrite plusieurs espèces de lémuriens habituées aux visiteurs, ainsi que des tortues, caméléons et crocodiles, dans un ancien jardin botanique colonial de plantes endémiques. Un parcours en barque sur la rivière complète la visite ; une matinée suffit et le transport peut être fourni par l'exploitant.",
    "plate": "ocean",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -24.9746126,
      "lon": 46.9802782
    },
    "tags": [
      "restaurant"
    ],
    "duration": "Une matinée selon madavoyage.com ; une journée entière selon tourismer.mg",
    "level": "En famille",
    "contact": {
      "phone": "+261 34 46 122 80",
      "website": "https://nahampoanareserve.com/"
    }
  },
  {
    "slug": "observation-des-oiseaux-berenty",
    "category": "activites",
    "name": "Observation des oiseaux à Berenty",
    "place": "Berenty",
    "distanceKm": null,
    "summary": "Observation ornithologique dans la réserve de Berenty, où 99 espèces aviaires ont été recensées. Certaines sont endémiques du Domaine du Sud — coua coureur, thamnornis, newtonie d'Archbold, vanga de Lafresnaye — tandis que d'autres sont plus répandues à Madagascar, comme le héron de Humblot, l'épervier de Madagascar, le coua géant ou le martin-pêcheur malgache. La forêt-galerie de tamariniers et le bush épineux qui bordent le Mandrare constituent le cadre de l'observation.",
    "plate": "ocean",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -25.0091667,
      "lon": 46.3022222
    },
    "tags": [],
    "contact": {
      "phone": "+261 33 23 210 07",
      "email": "fortdauphin@madagascar-resorts.com",
      "address": "Route de Berenty, Commune d'Amboasary Sud, Région Anosy",
      "website": "https://www.berenty-reserve.com/",
      "facebook": "https://www.facebook.com/Reserve2Berenty",
      "instagram": "https://www.instagram.com/berenty_reserve"
    }
  },
  {
    "slug": "plongee-masque-et-tuba-libanona",
    "category": "activites",
    "name": "Plongée avec masque et tuba à Libanona",
    "place": "Libanona",
    "distanceKm": null,
    "summary": "Pratique du masque et tuba sur la plage de Libanona, protégée par un récif. tourismer.mg cite explicitement Libanona pour la baignade, la plongée avec masque et tuba et les marées, tout en signalant un fort courant. L'ORTA mentionne le récif et la barre qui se forme au large, sans décrire d'activité encadrée.",
    "plate": "ocean",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -25.0386631,
      "lon": 46.9956052
    },
    "tags": []
  },
  {
    "slug": "randonnee-domaine-de-la-cascade",
    "category": "activites",
    "name": "Randonnée au Domaine de la Cascade",
    "place": "Amboasary",
    "distanceKm": 8,
    "summary": "Randonnée sur les 17 km de sentiers du Domaine de la Cascade, à Manantantely, environ 8 km à l'ouest de Taolagnaro. Quatre circuits de 30 minutes à 4 heures sont proposés avec guides, à travers pépinières, plantations fruitières, rucher et la dernière forêt primaire de basse altitude du grand sud. Une cascade naturelle avec bassins de baignade complète la visite, et l'accueil se fait en camping ou en bungalows.",
    "plate": "ocean",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -24.9866952,
      "lon": 46.9317334
    },
    "tags": [
      "restaurant"
    ],
    "duration": "4 circuits de 30 minutes à 4 heures",
    "level": "Tous niveaux ; circuits progressifs",
    "contact": {
      "address": "Manantantely, route d'Amboasary, Fort-Dauphin (Taolagnaro)",
      "website": "https://www.domainedelacascade.com/",
      "facebook": "https://www.facebook.com/Domaine-de-la-Cascade-Plantation-Lansargues-550124962135231/",
      "instagram": "https://www.instagram.com/domaine_de_la_cascade/"
    }
  },
  {
    "slug": "surf-plage-dambinanibe",
    "category": "activites",
    "name": "Surf à la plage d'Ambinanibe",
    "place": "Ambinanibe",
    "distanceKm": null,
    "summary": "Session de surf à la plage d'Ambinanibe, entre lagon et océan, à l'ouest de la ville. L'office de tourisme régional décrit ce spot comme offrant des vagues puissantes destinées aux surfeurs de niveau intermédiaire à expérimenté. Le secteur est peu développé et essentiellement fréquenté par les pêcheurs locaux.",
    "plate": "ocean",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": null,
    "tags": [],
    "level": "Intermédiaire à expérimenté"
  },
  {
    "slug": "surf-plage-ankoba",
    "category": "activites",
    "name": "Surf à la plage d'Ankoba",
    "place": "Ankoba",
    "distanceKm": null,
    "summary": "Session de surf sur la plage d'Ankoba, le spot le plus accessible de Fort-Dauphin, à l'ouest du centre. L'office de tourisme régional le décrit comme un spot naturel idéal pour les amateurs de vagues puissantes, exposé de tous côtés aux houles du sud et du sud-est. Les guides le recommandent aux surfeurs débutants en raison de son fond sableux, tout en signalant des courants de déchirure potentiels.",
    "plate": "ocean",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -25.0347422,
      "lon": 46.982411
    },
    "tags": [
      "plage"
    ],
    "level": "Débutant à confirmé",
    "featuredRank": 6
  },
  {
    "slug": "surf-plage-de-libanona",
    "category": "activites",
    "name": "Surf à la plage de Libanona",
    "place": "Libanona",
    "distanceKm": null,
    "summary": "Session de surf sur la plage de Libanona, la plage de la ville, protégée par un récif. L'ORTA cite Libanona parmi les plages du littoral de l'Anôsy, et les guides la présentent comme la plage de baignade et de surf la plus accessible de Fort-Dauphin. Les conditions y sont plus abritées qu'à Ankoba ou Lokaro, mais la prudence reste recommandée près des pointes rocheuses.",
    "plate": "ocean",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -25.0386631,
      "lon": 46.9956052
    },
    "tags": [],
    "level": "Débutant selon la description des guides"
  },
  {
    "slug": "surf-baie-de-monseigneur",
    "category": "activites",
    "name": "Surf à la plage de Monseigneur",
    "place": "Centre-ville",
    "distanceKm": null,
    "summary": "Session de surf à la baie de Monseigneur, spot facilement accessible depuis le centre-ville de Fort-Dauphin. L'office de tourisme régional indique que les surfeurs de tous niveaux viennent y rencontrer l'océan, tandis que l'article de Wikipédia consacré à Tôlagnaro précise que les vagues plus fortes et puissantes le destinent plutôt aux niveaux intermédiaire à avancé et le déconseillent aux débutants.",
    "plate": "ocean",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -25.03617,
      "lon": 46.998434
    },
    "tags": [],
    "level": "Intermédiaire à avancé selon Wikipédia ; tous niveaux selon l'ORTA",
    "featuredRank": 7
  },
  {
    "slug": "air-fort-services",
    "category": "excursions",
    "name": "Air Fort Services",
    "place": "Centre-ville",
    "distanceKm": null,
    "summary": "Agence de voyage et tour-opérateur local de Fort-Dauphin, établie depuis 1990 selon sa propre présentation. Elle organise des séjours dans toute la région — plages, parcs nationaux, grottes — jusqu'à Lavanono et le cap Sainte-Marie, ainsi que dans le reste du sud de Madagascar, et propose également la location de voitures. Air Fort Services gère par ailleurs le parc de Nahampoana, dont elle peut assurer le transport des visiteurs.",
    "plate": "forest",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -25.0268261,
      "lon": 46.9933836
    },
    "tags": [],
    "contact": {
      "phone": "+261 20 92 212 24",
      "email": "contact@airfortservices.com",
      "website": "https://www.airfortservices.com/"
    }
  },
  {
    "slug": "dadamanga",
    "category": "excursions",
    "name": "Dadamanga",
    "place": "Centre-ville",
    "distanceKm": null,
    "summary": "Tour-opérateur référencé par l'office de tourisme régional de l'Anôsy en catégorie « Tour Opérateur », avec une antenne à Fort-Dauphin. L'entreprise organise des circuits à travers Madagascar, y compris dans le sud-est au départ de Fort-Dauphin, et sa page dédiée « Fort Dauphin & South East » décrit cette région. Les témoignages publiés sur son site évoquent une organisation complète incluant chauffeurs et guides.",
    "plate": "forest",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": null,
    "tags": [],
    "contact": {
      "phone": "034 20 258 62",
      "website": "https://www.dadamanga.com/"
    }
  },
  {
    "slug": "excursion-cap-sainte-marie-et-lavanono",
    "category": "excursions",
    "name": "Excursion vers le cap Sainte-Marie et Lavanono",
    "place": "Centre-ville",
    "distanceKm": null,
    "summary": "Circuit vers l'extrême sud de Madagascar proposé au départ de Fort-Dauphin, menant jusqu'au cap Sainte-Marie et à Lavanono, en passant par les plages, les parcs nationaux et les grottes de la région. L'agence AirFortServices, établie à Fort-Dauphin depuis 1990, est décrite comme capable d'organiser des séjours vers ces destinations ainsi que partout ailleurs dans le sud de la Grande Île.",
    "plate": "forest",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": null,
    "tags": [],
    "contact": {
      "phone": "+261 20 92 212 24",
      "email": "contact@airfortservices.com",
      "website": "https://www.airfortservices.com/"
    }
  },
  {
    "slug": "excursion-lokaro-en-pirogue",
    "category": "excursions",
    "name": "Excursion à Lokaro en pirogue",
    "place": "Lanirano",
    "distanceKm": null,
    "summary": "Journée d'excursion en pirogue depuis Fort-Dauphin jusqu'à la baie de Lokaro. Selon les guides, la pirogue traverse le lac Lanirano puis un chenal bordé de pandanus jusqu'au village d'Évatraha, d'où une marche de 45 minutes à travers les collines débouche sur la baie : criques, rochers et eau translucide. Une alternative en 4×4 rejoint Évatraha par une piste sableuse. L'ORTA qualifie la baie de Lokaro de « paradis sur terre ».",
    "plate": "forest",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -24.927741,
      "lon": 47.1140382
    },
    "tags": [],
    "duration": "Une journée",
    "level": "Marche de 45 minutes à l'arrivée selon madavoyage.com"
  },
  {
    "slug": "excursion-baie-sainte-luce-manafiafy",
    "category": "excursions",
    "name": "Excursion à la baie Sainte-Luce et Manafiafy",
    "place": "Sainte-Luce",
    "distanceKm": null,
    "summary": "Excursion vers la baie Sainte-Luce et le village côtier de Manafiafy, à environ une heure à une heure quinze de route de Fort-Dauphin. Le secteur abrite la réserve de Sainte-Luce, 26 hectares de forêt primaire protégeant cinq espèces de lémuriens, où randonnées, excursions en pirogue, promenades nocturnes et camping sont possibles avec réservation préalable. Le littoral y est encore largement préservé du tourisme de masse.",
    "plate": "forest",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -24.7762593,
      "lon": 47.197984
    },
    "tags": [],
    "duration": "Une heure à une heure quinze de route depuis Taolagnaro selon le site officiel du lodge"
  },
  {
    "slug": "mandrare-river-camp-tour-operator",
    "category": "excursions",
    "name": "Mandrare River Camp (activité tour-opérateur)",
    "place": "Vallée du Mandrare",
    "distanceKm": null,
    "summary": "Opérateur de safari et de séjours tout-inclus installé sur la rive du fleuve Mandrare, près du village antandroy d'Ifotaka. Il organise les activités guidées dans la forêt épineuse et les forêts sacrées antandroy, l'observation de lémuriens et les sorties culturelles, ainsi que les transferts et vols charters (deux rotations hebdomadaires vers la piste d'Ifotaka, ou vol commercial vers Fort-Dauphin suivi de 3 h 30 de transfert routier privé).",
    "plate": "forest",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -24.8231207,
      "lon": 46.1763489
    },
    "tags": [
      "transfert"
    ],
    "contact": {
      "phone": "+261 38 15 619 13",
      "email": "tours@madaclassic.com",
      "address": "Ifotaka, vallée du Mandrare, Région Anosy",
      "website": "https://madaclassic.com/mandrare-river-camp/",
      "facebook": "https://www.facebook.com/MandrareRiverCamp/",
      "instagram": "https://www.instagram.com/madaclassiccollection"
    }
  },
  {
    "slug": "observation-des-lemuriens-berenty",
    "category": "excursions",
    "name": "Observation des lémuriens à la réserve de Berenty",
    "place": "Berenty",
    "distanceKm": null,
    "summary": "Observation des lémuriens dans la réserve privée de Berenty, créée en 1936 dans la vallée du Mandrare. La réserve est un lieu privilégié pour l'observation de trois espèces de lémuriens diurnes — makis catta, lémurs bruns et propithèques de Verreaux, surnommés « danseurs » — ainsi que de 99 espèces d'oiseaux recensées, dont le coua coureur et la newtonie d'Archbold. Une sortie nocturne complète la journée et l'observation est presque garantie selon les guides.",
    "plate": "forest",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -25.0091667,
      "lon": 46.3022222
    },
    "tags": [],
    "duration": "Une journée sur place ; les guides recommandent une nuit pour la sortie nocturne",
    "level": "En famille",
    "contact": {
      "phone": "+261 33 23 210 07",
      "email": "fortdauphin@madagascar-resorts.com",
      "address": "Route de Berenty, Commune d'Amboasary Sud, Région Anosy",
      "website": "https://www.berenty-reserve.com/",
      "facebook": "https://www.facebook.com/Reserve2Berenty",
      "instagram": "https://www.instagram.com/berenty_reserve"
    }
  },
  {
    "slug": "randonnee-andohahela-tsimelahy",
    "category": "excursions",
    "name": "Randonnée à Andohahela, parcelle de Tsimelahy",
    "place": "Andohahela",
    "distanceKm": null,
    "summary": "Randonnée dans la parcelle de Tsimelahy du parc national d'Andohahela, forêt de transition et la plus accessible des trois parcelles du parc. Le parcours se fait en une demi-journée entre piscines naturelles et pachypodiums. Les guides recommandent d'enchaîner Berenty et Andohahela sur une même boucle de deux jours, les deux sites bordant la RN13 à l'ouest de Taolagnaro.",
    "plate": "forest",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -24.7535919,
      "lon": 46.8174835
    },
    "tags": [],
    "duration": "Une demi-journée selon madavoyage.com",
    "level": "Randonneurs"
  },
  {
    "slug": "air-madagascar",
    "category": "experiences",
    "name": "Air Madagascar",
    "place": "Centre-ville",
    "distanceKm": null,
    "summary": "Compagnie aérienne nationale assurant la desserte de Taolagnaro depuis Antananarivo. L'office de tourisme régional de l'Anôsy la référence parmi ses liens utiles, et les guides consultés présentent l'avion comme la seule option raisonnable pour rejoindre Fort-Dauphin : le vol intérieur depuis Antananarivo dure un peu moins de deux heures, alors que la route exige plusieurs jours de piste par la RN13. La compagnie est également citée comme alternative pour rejoindre Fort-Dauphin avant un transfert routier vers la vallée du Mandrare.",
    "plate": "town",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": null,
    "tags": [],
    "contact": {
      "website": "https://madagascarairlines.com/"
    }
  },
  {
    "slug": "marche-central-et-artisanat-de-taolagnaro",
    "category": "experiences",
    "name": "Marché central et artisanat de Taolagnaro",
    "place": "Centre-ville",
    "distanceKm": null,
    "summary": "Visite du marché central de Taolagnaro, décrit par les guides comme débordant de fruits, de poissons séchés et de paniers tressés. L'artisanat local est également présent au marché artisanal de la N 12a à Lanirano/Amparihy, ainsi que chez plusieurs artisans membres de l'office de tourisme régional, dont des vannières de Sainte-Luce travaillant le jonc de mahampy. La visite se combine naturellement avec celle des vestiges du fort.",
    "plate": "town",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -25.0334208,
      "lon": 46.9923734
    },
    "tags": [],
    "duration": "Deux heures selon madavoyage.com pour le marché et les vestiges du fort",
    "level": "En famille"
  },
  {
    "slug": "office-regional-du-tourisme-danosy",
    "category": "experiences",
    "name": "Office Régional du Tourisme d'Anôsy (ORTA)",
    "place": "Centre-ville",
    "distanceKm": null,
    "summary": "Office régional du tourisme de l'Anôsy, organisme officiel de promotion et d'information touristique de la région, dont le siège est à Taolagnaro. Il regroupe plus de 100 membres de l'industrie touristique régionale — hébergements, restaurants, activités de loisirs, artisans, agences de voyage et prestataires de services — et tient un annuaire public de ses adhérents. Ses équipes renseignent les visiteurs sur la destination et peuvent orienter vers les prestataires.",
    "plate": "town",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": {
      "lat": -25.0290728,
      "lon": 46.997058
    },
    "tags": [],
    "contact": {
      "phone": "+261 34 29 373 83",
      "address": "3 Rue Abel Realy, Tôlagnaro, Madagascar, 614",
      "website": "https://fortdauphin.com/"
    }
  },
  {
    "slug": "visite-du-musee-fort-flacourt",
    "category": "experiences",
    "name": "Visite du musée de Fort-Flacourt",
    "place": "Centre-ville",
    "distanceKm": null,
    "summary": "Visite guidée du musée installé dans le fort Flacourt, construit en 1643 et aujourd'hui occupé par l'armée malgache. Le petit musée de l'Anosy expose de vieilles cartes, des photographies, des uniformes et d'autres objets culturels antanosy. Un guide est obligatoire pour visiter l'enceinte militaire, et le site officiel recommande de prévoir la dernière entrée au moins 30 minutes avant la fermeture.",
    "plate": "town",
    "price": {
      "kind": "on-request"
    },
    "acceptsRequests": true,
    "coordinates": null,
    "tags": [],
    "duration": "Deux heures selon madavoyage.com (marché et vestiges du fort)",
    "contact": {
      "phone": "+261 34 23 372 12",
      "email": "museeflacourt@gmail.com",
      "address": "Fort Flacourt, Taolagnaro (Fort-Dauphin)",
      "website": "https://musee-fort-flacourt.com/"
    }
  }
];
