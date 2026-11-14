# Rapport de résultats de vérification — campagne téléphonique

**Date :** 2026-11-14 · **Branche :** `data/tourism-research` · **Phase :** 5
**Périmètre :** analyse de l'état de la campagne. **Aucun résultat d'appel n'a été inventé. Aucun fichier JSON modifié, aucun statut changé, aucun enregistrement supprimé, aucun script d'import créé, aucune commande Git exécutée.**

---

## 0. Constat principal : la campagne n'a pas commencé

**Les 10 contacts du lot 1 n'ont fait l'objet d'aucune tentative enregistrée.** Les cinq colonnes de résultat sont vides dans les deux fichiers, et les fichiers n'ont pas été modifiés depuis leur création :

| Fichier | Lignes | `call_result` rempli | `confirmed_phone` | `confirmed_operating_status` | `last_contact_date` | `call_notes` |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `verification-batch-01.csv` | 10 | **0** | **0** | **0** | **0** | **0** |
| `phone-verification-list.csv` | 64 | **0** | **0** | **0** | **0** | **0** |

C'est conforme à la consigne de la phase 4 : aucun appel ne devait être passé. Mais cela signifie que **les tâches 1 à 3 de cette phase n'ont pas de matière** : il n'existe aucun contact abouti, aucune non-réponse, aucun refus et aucun numéro invalide à analyser, parce que personne n'a encore appelé.

Plutôt que de produire une analyse plausible mais fabriquée, ce rapport fait trois choses :

1. il établit l'état réel de la campagne et ce qui manque ;
2. il répond à ce qui **est** vérifiable dès maintenant — quels enregistrements chaque appel engagerait, ce qui exige encore une preuve, et selon quelles règles une réponse comptera ;
3. il prépare une **liste courte de publication provisoire** à partir des seules preuves documentaires existantes, en la signalant clairement comme telle.

**Ce rapport ne contient aucun résultat d'appel.** Toute case de résultat dans les fichiers de travail reste vide et doit le rester jusqu'à ce qu'un appel ait réellement eu lieu.

---

## 1. État de la campagne

| Indicateur | Valeur | Source |
| --- | ---: | --- |
| Fiches au total | 183 | JSON |
| Contacts disposant d'un téléphone | 64 | `phone-verification-list.csv` |
| Contacts prioritaires (`high`) | 32 | idem |
| Fiches sans telephone — non appelables | 119 | 183 − 64 |
| Appels planifiés dans le lot 1 | 10 | `verification-batch-01.csv` |
| **Tentatives enregistrées** | **0** | les deux fichiers |
| Contacts prioritaires hors lot 1 | 22 | 32 − 10 |
| Contacts priorité normale / basse | 32 | idem |

### 1.1 Tâche 1 — contacts aboutis, sans réponse, refusés, invalides

| Catégorie | Nombre | Détail |
| --- | ---: | --- |
| Contact abouti (`reached_*`) | **0** | aucune tentative |
| Sans réponse (`no_answer`, `busy`, `voicemail`) | **0** | aucune tentative |
| Refus (`reached_declined`) | **0** | aucune tentative |
| Numéro invalide (`wrong_number`, `disconnected`) | **0** | aucune tentative |
| **En attente d'une première tentative** | **10** | lot 1 |
| **Total** | **10** | |

Les lignes du lot 1 sont donc toutes dans l'état « à appeler ». Aucune ne peut être classée.

### 1.2 Ce qu'il faudra remplir, et avec quelles valeurs

Le vocabulaire est fixé par [`verification-campaign-guide.md`](verification-campaign-guide.md) §6.2 et §6.3. Pour mémoire, une réponse ne pourra être classée que dans l'une de ces valeurs :

- `call_result` : `reached_confirmed`, `reached_updated`, `reached_declined`, `callback_requested`, `language_barrier`, `no_answer`, `busy`, `voicemail`, `wrong_number`, `disconnected`, `unreachable_after_attempts`, `closed_permanently` ;
- `confirmed_operating_status` : `open`, `open_seasonal`, `closed_temporarily`, `closed_permanently`, `unknown`.

Une case vide signifie « question non posée ». `unknown` signifie « question posée, réponse pas claire ». Les deux ne sont pas interchangeables et ne doivent pas être fusionnées.

---

## 2. Tâche 2 — enregistrements engagés par chaque appel

Ceci est établi à partir des fiches, **pas d'un appel**. C'est l'information la plus utile disponible aujourd'hui : elle montre exactement ce qu'une réponse modifierait.

| # | Appel (fiche du lot) | Téléphone | Fiches potentiellement concernées par la réponse |
| ---: | --- | --- | --- |
| 1 | `office-regional-du-tourisme-danosy` | `+261 34 29 373 83` | elle-même + **indirectement les 32 contacts appuyés sur une page membre ORTA** + `foret-de-mandena` |
| 2 | `espace-sophie-amboasary` | `034 97 674 92` | elle-même + **`grill-de-lac`** |
| 3 | `takasira` | `034 37 974 67` | elle-même + **`safari-laka`** |
| 4 | `shtm` | `034 46 122 80` | elle-même + **`reserve-de-nahampoana`** + **`observation-des-lemuriens-nahampoana`** |
| 5 | `domaine-de-la-cascade-bungalows` | `+261 34 20 973 2` | elle-même + `domaine-de-la-cascade` + `randonnee-domaine-de-la-cascade` (même exploitant) |
| 6 | `vahiny-lodge` | `+261 32 02 468 22` / `+261 32 43 964 93` | elle-même + `vahinn-sainte-luce` (homonymie à trancher) |
| 7 | `libanona-woods` | `034 02 918 26` | elle-même |
| 8 | `lakananosy` | `034 92 241 52` | elle-même |
| 9 | `snack-bar-mahamanina` | `+261 34 16 86 276` | elle-même + `mahamanina` (homonymie à trancher) |
| 10 | `motel-m1-manantenina` | `038 50 773 41` | elle-même + `motel-m1` (autre entrée du même établissement) |

**Couverture : 10 appels, 14 fiches directement engagées.** Les appels 1 et 5 peuvent de surcroît faire bouger plusieurs fiches liées.

### 2.1 Les trois appels décisifs

Trois appels tranchent une ambiguïté qui touche deux fiches à la fois. Ce sont eux qui changeront le plus de choses :

- **Appel 2** — `034 97 674 92`. Un restaurant au lac Lanirano et un hôtel à Amboasary ne peuvent pas partager une ligne. Celui qui décroche est le propriétaire du numéro ; l'autre fiche passe à `wrong_number`.
- **Appel 3** — `034 37 974 67`. Même logique entre un appart-hôtel et un tour-opérateur.
- **Appel 4** — `034 46 122 80`. C'est le numéro que le **site officiel du parc de Nahampoana** publie pour la réserve. Si SHTM répond à ce numéro, SHTM existe ; si c'est le parc qui répond, la fiche SHTM est probablement une erreur d'annuaire.

---

## 3. Tâche 3 — les quatre dimensions de confirmation

La consigne demande de distinguer quatre choses que l'on confond facilement. Elles sont indépendantes : une fiche peut exister sans être ouverte, être ouverte sans que le numéro soit bon, et n'avoir jamais donné son accord.

| Dimension | Ce que cela veut dire | Preuve exigée | État actuel des 10 fiches du lot |
| --- | --- | --- | --- |
| **1. Existence confirmée** | L'établissement est réel, ce n'est pas une entrée d'annuaire fantôme | Quelqu'un décroche et se présente sous ce nom, ou un document officiel le nomme | **Aucune** — 0 appel |
| **2. Activité actuelle confirmée** | Il est en activité **maintenant** | Réponse explicite à la question « êtes-vous toujours en activité ? » | **Aucune** — 0 appel |
| **3. Numéro confirmé** | Ce numéro joint bien cet établissement | L'établissement déclare le numéro comme le sien | **Aucune** — les numéros sont seulement *publiés* par un annuaire ou une carte |
| **4. Autorisation de publication** | L'établissement accepte de figurer dans le guide | Un accord explicite, daté, attribué à une personne | **Aucune pour les 183 fiches** |

### 3.1 Le point le plus important de ce rapport

**Aucune fiche du jeu de données n'a d'autorisation de publication.** Personne n'a été interrogé. Aucune source documentaire — site officiel, annuaire, page Wikipédia, objet OpenStreetMap — ne peut fournir cette autorisation : elle ne s'obtient qu'auprès de l'établissement.

Conséquence directe pour la tâche 6 : la liste courte ci-dessous est une liste de **candidats à proposer**, pas une liste de fiches publiables. La publication reste subordonnée à un accord, qui n'existe pour l'instant pour aucun établissement.

### 3.2 Ce que les documents apportent déjà — et ne apportent pas

Pour être précis sur ce que l'on sait **sans** appel :

| Dimension | Ce que la recherche documentaire peut établir | Ce qu'elle ne peut pas établir |
| --- | --- | --- |
| Existence | Qu'un établissement est **listé** (annuaire ORTA, OSM) ou **décrit par un tiers** (site officiel, guide) | Qu'il est toujours en activité |
| Activité actuelle | Rien de fiable : une inscription d'annuaire ne dit pas si l'entreprise existe encore | — |
| Numéro | Qu'un numéro est **publié** par une source | Qu'il joint réellement l'établissement |
| Autorisation | Rien | Tout |

C'est exactement pour cette raison que 111 fiches restent en `needs_verification` : la recherche documentaire ne peut pas franchir ces limites. Seul l'appel le peut.

### 3.3 La règle sur les déclarations de tiers

**Une déclaration de tiers n'est pas une confirmation par l'établissement.** Concrètement :

- Si quelqu'un décroche au numéro de `grill-de-lac` et dit « Grill de Lac ? non, ici c'est Espace Sophie », cela confirme **qui possède le numéro** — mais ne confirme **ni l'existence ni l'activité de Grill de Lac**.
- Si un voisin ou un gérant d'hôtel donne le numéro d'un autre établissement, c'est une **piste**, à enregistrer dans `call_notes`, jamais dans `confirmed_phone`.
- Si l'ORTA affirme qu'un membre est actif, c'est une **déclaration d'un tiers** : utile, à noter, mais elle ne remplace pas le contact direct pour la dimension 2.

Cette règle est reprise du guide §7.2 et s'appliquera telle quelle au dépouillement.

---

## 4. Tâche 4 — ce qui exige encore un appel ou une preuve indépendante

Cette partie est entièrement vérifiable aujourd'hui.

### 4.1 Appels nécessaires — 54 des 64 contacts n'ont pas encore été planifiés

| Groupe | Fiches | Situation |
| --- | ---: | --- |
| Lot 1 — à appeler | 10 | prêt, `verification-batch-01.csv` |
| Prioritaires hors lot 1 | 22 | à planifier en lot 2 |
| Priorité normale / basse | 32 | lots 3+ |
| **Total restant** | **64** | |

### 4.2 Corrections de numéro à obtenir

| Fiche | Numéro actuel | Problème |
| --- | --- | --- |
| `domaine-de-la-cascade-bungalows` | `+261 34 20 973 2` | 8 chiffres au lieu de 9 — **injoignable** |
| `vahiny-lodge` | deux numéros dans un champ | seul le premier composerait |

### 4.3 Conflits non résolus (3 numéros, 5 fiches)

`grill-de-lac` / `espace-sophie-amboasary` · `takasira` / `safari-laka` · `shtm` / `reserve-de-nahampoana`. Lesquels sont dans le lot 1 ; un seul appel suffit par paire.

### 4.4 Fiches qui ne peuvent **pas** être résolues par téléphone — 119

| Raison | Fiches | Ce qu'il faudrait à la place |
| --- | ---: | --- |
| Aucun téléphone au dossier | 119 | Visite sur place, page officielle, ou contact obtenu par un tiers puis **re-vérifié** auprès de l'établissement |
| Dont : sites publics (plages, lacs, belvédères) | — | Pas de contact par nature : vérification par observation ou source officielle, pas par appel |
| Dont : `foret-de-mandena` | 1 | Question d'accès à poser à l'ORTA (appel 1) |

### 4.5 Preuves indépendantes encore manquantes

- **50 fiches sans coordonnée.** Pour les 14 hébergements concernés, un appel peut donner l'adresse. Pour les autres (artisans, compagnie aérienne), une coordonnée n'a peut-être pas de sens : c'est à trancher, pas à inventer.
- **`foret-de-mandena`** : l'existence de visites repose sur un seul opérateur commercial. Il faut une confirmation officielle ou un contact direct.
- **`lakananosy`** : seul guide de l'annuaire. S'il n'existe pas, il faudra une autre source pour la catégorie « guide local », qui restera sinon vide.
- **`sainte-luce-reserve`** : les données cartographiques portent `access=private`. L'ouverture au public n'est pas établie — et un appel n'est pas possible, il n'y a pas de numéro.

---

## 5. Tâche 5 — ce rapport

Le rapport demandé est celui-ci. Il ne contient pas de résultats de campagne, parce qu'il n'y en a pas. La section 7 précise ce qui sera produit dès que les 10 appels auront été saisis.

---

## 6. Tâche 6 — liste courte de publication proposée

> ⚠️ **Statut : proposition documentaire, non publiée, non approuvée.** Établie à partir des seules preuves existantes (sources, coordonnées, contact). Elle ne tient compte d'**aucun** résultat d'appel — il n'y en a pas — et **aucune fiche n'a d'accord de publication**. Aucun statut n'a été modifié.

Critères appliqués : hors des 13 exclusions de publication ; non fermée ; coordonnée connue ; au moins une source propre à l'établissement (pas seulement OpenStreetMap) ; contact ou site public de nature publique.

**32 fiches** satisfont ces critères, réparties en trois niveaux.

### 6.1 Niveau A — position documentaire la plus solide (15 fiches, `verified`)

| Fiche | Type | Contact | Image |
| --- | --- | :-: | :-: |
| `kaleta-hotel` | hébergement | oui (site + tél) | — |
| `talinjoo-boutique-hotel` | hébergement | oui | — |
| `manafiafy-forest-lodge` | hébergement | site seulement | — |
| `domaine-de-la-cascade` | site | site | — |
| `randonnee-domaine-de-la-cascade` | activité | site | — |
| `reserve-de-nahampoana` | site | oui | oui |
| `observation-des-lemuriens-nahampoana` | activité | oui | — |
| `observation-des-lemuriens-berenty` | activité | oui | — |
| `pic-saint-louis` | site | — (lieu public) | oui |
| `plage-de-libanona` | site | — (lieu public) | oui |
| `plage-ankoba` | site | — (lieu public) | — |
| `plage-monseigneur` | site | — (lieu public) | — |
| `air-fort-services` | prestataire | oui | — |
| `mandrare-river-camp-tour-operator` | prestataire | oui | — |
| `joo-restaurant-joo-bar-talinjoo` | restaurant | oui | — |

### 6.2 Niveau B — solide, avec une réserve documentée (15 fiches, `partially_verified`)

`lavasoa-hotel`, `villa-oceania`, `le-dauphin`, `chez-anita`, `larrivage`, `saint-pas`, `reserve-de-berenty`, `observation-des-oiseaux-berenty`, `plage-de-lokaro`, `parc-national-dandohahela`, `sainte-luce-reserve`, `jardin-botanique-de-saiadi`, `farihy-lanirano`, `farihy-anony`, `tranovato`

Réserves à porter devant la revue : `sainte-luce-reserve` est marquée `access=private` dans les données cartographiques ; `plage-de-lokaro` porte la coordonnée du hameau, pas de la plage ; `parc-national-dandohahela` n'a ni tarif ni horaire ; `reserve-de-berenty` a un désaccord de durée de trajet entre sources.

### 6.3 Hors liste courte — 2 fiches du niveau « candidat » mais pas prêtes

| Fiche | Pourquoi elle attend |
| --- | --- |
| `foret-de-mandena` | Les visites reposent sur un seul opérateur commercial ; l'accès du public n'est pas confirmé. À trancher par l'appel 1 (ORTA). |
| `le-nepenthes-village` | En `needs_verification`, identité recoupée mais rattachement à l'exploitant non confirmé. |

### 6.4 Ce qui reste hors de toute liste courte

- **13 fiches exclues de publication** — inchangées, toujours présentes dans les données. Inclut `club-sandwich`, qui figure pourtant parmi les 32 contacts prioritaires : son ambiguïté (« temporarily closed ») n'est pas levée et il n'est pas dans le lot 1.
- **2 fiches fermées** (`ancien-hotel-miramar`, `formerly-sahil-hotel`).
- **Toutes les autres** : position documentaire insuffisante (OpenStreetMap seul, ou aucune source propre).

### 6.5 Ce qui manque encore pour que cette liste devienne publiable

| Prérequis | État |
| --- | --- |
| Accord de l'établissement | **0 / 32** — personne n'a été interrogé |
| Contact confirmé | **0 / 64** — aucun numéro vérifié par appel |
| Coordonnée pour les fiches carte | 32 / 32 pour cette liste courte (critère d'entrée), mais 59 fiches hors liste n'en ont pas |
| Affichage des crédits photo (CC BY-SA) | non implémenté |
| Retrait des avis fabriqués de `listing-details.ts` | non fait — bloquant |

Le dernier point reste le plus important : **`src/lib/listing-details.ts` contient des avis, notes et prix inventés et attribués à des personnes nommées.** Publier de vrais établissements à côté de faux avis leur attribuerait des propos qu'ils n'ont jamais tenus. Aucune liste courte ne doit être publiée avant que ce fichier soit traité.

---

## 7. Ce que produira l'analyse une fois les 10 appels saisis

Dès que `verification-batch-01.csv` sera rempli, l'analyse suivante sera possible et sera produite sans nouvelle collecte :

1. décompte des aboutis / sans réponse / refus / numéros invalides ;
2. pour chaque appel, les fiches effectivement modifiées (le tableau §2 sert de base) ;
3. pour chaque fiche touchée, l'état des **quatre dimensions** du §3 ;
4. les fiches qui remontent en `verified`, celles qui doivent passer en `closed`, et celles dont le numéro doit être annulé ;
5. les fiches à réappeler, avec le nombre de tentatives restantes ;
6. une liste courte révisée, tenant compte des accords obtenus.

### Ce dont j'ai besoin

Le fichier `research/verification-batch-01.csv` avec les cinq colonnes de résultat renseignées, ou les mêmes informations sous forme de notes brutes. Tant que ces colonnes restent vides, toute analyse de résultats serait une invention.

### Modèle de tableau de dépouillement — **vide, à remplir**

> Illustration de format uniquement. Aucune valeur ci-dessous n'est un résultat.

| # | Fiche | `call_result` | `confirmed_operating_status` | `confirmed_phone` | Accord | Dimensions acquises |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | `office-regional-du-tourisme-danosy` | *(à remplir)* | *(à remplir)* | *(à remplir)* | *(à remplir)* | — |
| 2 | `espace-sophie-amboasary` | *(à remplir)* | *(à remplir)* | *(à remplir)* | *(à remplir)* | — |
| 3 | `takasira` | *(à remplir)* | *(à remplir)* | *(à remplir)* | *(à remplir)* | — |
| 4 | `shtm` | *(à remplir)* | *(à remplir)* | *(à remplir)* | *(à remplir)* | — |
| 5 | `domaine-de-la-cascade-bungalows` | *(à remplir)* | *(à remplir)* | *(à remplir)* | *(à remplir)* | — |
| 6 | `vahiny-lodge` | *(à remplir)* | *(à remplir)* | *(à remplir)* | *(à remplir)* | — |
| 7 | `libanona-woods` | *(à remplir)* | *(à remplir)* | *(à remplir)* | *(à remplir)* | — |
| 8 | `lakananosy` | *(à remplir)* | *(à remplir)* | *(à remplir)* | *(à remplir)* | — |
| 9 | `snack-bar-mahamanina` | *(à remplir)* | *(à remplir)* | *(à remplir)* | *(à remplir)* | — |
| 10 | `motel-m1-manantenina` | *(à remplir)* | *(à remplir)* | *(à remplir)* | *(à remplir)* | — |

---

## 8. Contraintes respectées

| Contrainte | État |
| --- | --- |
| Ne jamais inventer de réponse d'appel | **Aucune réponse inventée** ; les 10 fiches restent « à appeler » |
| Ne pas modifier les JSON ni les statuts | 5/5 JSON **identiques au bit près** à `HEAD` ; statuts inchangés : 23 / 47 / 111 / 2 |
| Ne pas supprimer d'enregistrement | 183 fiches, 13 exclusions toujours présentes |
| Ne pas créer de script d'import | aucun |
| Ne pas modifier le code applicatif | aucun fichier hors `research/` touché |
| Ne pas exécuter de commande Git | aucune |
| Ne pas traiter une déclaration de tiers comme une confirmation | règle explicite §3.3 |
| Identifier clairement l'information manquante | §3.1, §4.4, §6.5, §7 |

### Fichiers de cette phase

- **Créé :** `research/verification-results-report.md` (ce fichier)
- **Modifié :** aucun
- **Fichiers de données vérifiés et laissés intacts :** `verification-batch-01.csv` (toutes les cases de résultat vides), `phone-verification-list.csv` (idem), les cinq JSON.

---

**Arrêt après le rapport et la liste courte.** Aucune fiche n'a été publiée, aucun statut n'a été changé, et aucune analyse de résultats n'a été fabriquée en l'absence de résultats.