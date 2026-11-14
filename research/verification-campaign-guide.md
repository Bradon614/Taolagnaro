# Campagne de vérification téléphonique — guide de préparation

**Version :** 1 · **Date :** 2026-11-14 · **Branche :** `data/tourism-research`
**Périmètre :** préparation uniquement. **Aucun appel n'a été passé, aucun message n'a été envoyé, aucun résultat n'a été saisi, aucun statut n'a été modifié.**

Ce guide sert au propriétaire du projet pour la première campagne d'appels. Les fichiers de travail sont :

| Fichier | Rôle |
| --- | --- |
| [`phone-verification-list.csv`](phone-verification-list.csv) | liste maîtresse, 64 contacts, 17 colonnes — c'est ici que les résultats finaux sont consignés |
| [`verification-batch-01.csv`](verification-batch-01.csv) | premier lot de 10 appels, données d'origine recopiées telles quelles, colonnes de résultat vides |

---

## 1. Objectifs de la campagne

Le jeu de données compte **183 fiches**. L'essentiel de ce qui manque ne peut pas être obtenu par la recherche documentaire : **111 fiches restent en `needs_verification`**. Et sur l'ensemble du jeu de données, **75 fiches ne reposent que sur un objet OpenStreetMap** — un nom et une position, sans rien qui confirme qu'une entreprise existe derrière (71 d'entre elles sont précisément dans ces 111).

Objectifs, par ordre d'importance :

1. **Établir quels établissements existent réellement** et sont en activité. C'est l'objectif principal : sans lui, aucune publication n'est défendable.
2. **Résoudre les conflits de numéros.** Trois numéros sont partagés par **cinq établissements** qui ne peuvent pas être le même exploitant. Un appel peut corriger deux fiches d'un coup.
3. **Corriger les numéros inutilisables.** Deux fiches porte des numéros malformés : sans correction, l'établissement est injoignable pour toujours.
4. **Obtenir ce qu'aucun site ne publie** : horaires, fourchettes de prix, adresse exacte (donc coordonnée), langues parlées, services réels.
5. **Recueillir le consentement** à figurer dans le guide. Un établissement qui refuse ne doit pas être publié, même s'il est bien documenté.

**Ce que cette campagne n'est pas :** ce n'est pas une campagne de vente, et elle ne décide d'aucune publication. Un appel réussi produit de la *preuve*, pas un statut.

### Ce que « vérifié » veut dire ici

Une fiche n'est pas vérifiée parce qu'un numéro a sonné. Elle l'est quand quelqu'un a **parlé au bon établissement** et confirmé son activité. Un répondeur, une ligne occupée ou un silence ne confirment rien — et un numéro qui appartient à quelqu'un d'autre est une information utile en soi.

---

## 2. Procédure de contact

### 2.1 Avant d'appeler

| Point | Consigne |
| --- | --- |
| Fuseau | Madagascar = UTC+3, toute l'année (pas d'heure d'été). |
| Créneaux | **08h30–11h30** et **14h30–17h00**, du lundi au vendredi. Samedi matin toléré. **Ne pas appeler le dimanche**, ni avant 08h00, ni après 18h00. |
| Ordre | Appeler dans l'ordre du lot (`batch_order`). Les appels 2 à 4 sont groupés par nature de conflit et se lisent mieux à la suite. |
| Préparation | Ouvrir `verification-batch-01.csv`, garder à portée de main le script ci-dessous et la fiche (`verification_notes`) : elle dit exactement **ce qui reste à confirmer**. |
| Langue | Français d'abord ; si l'interlocuteur est plus à l'aise en malgache, une phrase d'ouverture en malgache aide beaucoup. L'anglais est rare — ne pas compter dessus. |
| Silence | Se présenter d'emblée avec son nom et l'objet de l'appel. Un appel sans présentation est pris pour du démarchage et raccroché. |
| Enregistrement | **Ne pas enregistrer l'audio.** Cela exige un consentement explicite et n'apporte rien ici. Prendre des notes écrites. |
| Données personnelles | Les fiches contiennent souvent des mobiles personnels. Ne rien publier d'un numéro personnel sans accord explicite de la personne. |

### 2.2 Déroulé d'un appel (5 étapes)

1. **Ouvrir** — se nommer, nommer l'établissement, vérifier qu'on est au bon endroit (script §3.1).
2. **Situer** — expliquer en une phrase pourquoi on appelle, si la question est posée (script §3.2).
3. **Vérifier** — poser les questions du §4 dans l'ordre, en s'adaptant au type d'établissement.
4. **Consentir** — demander l'accord pour figurer dans le guide (§4.6).
5. **Clore** — proposer un récapitulatif écrit par WhatsApp, demander le meilleur créneau, remercier (§3.5).

### 2.3 Combien de temps

Compter **3 à 6 minutes** par appel. Les 10 appels du lot 1 représentent une demi-journée de travail, entretiens et saisie compris.

---

## 3. Script téléphonique (français)

> Script court, prévu pour des lignes de mauvaise qualité. Les crochets `[…]` sont à remplacer. Ne pas lire mot à mot : garder le fil.

### 3.1 Ouverture

> « Bonjour, bonjour. Je m'appelle **[Prénom Nom]**, je vous appelle de **[structure]**. Est-ce que je suis bien chez **[nom de l'établissement]** ? »

*(Variante malgache en ouverture, si l'on veut détendre l'échange : « Manao ahoana ! »)*

*(Variante horaire : après 12h, « Bonsoir » est d'usage courant à Madagascar et ne surprend personne.)*

### 3.2 Si l'on vous demande qui vous êtes

> « Nous préparons un guide des établissements touristiques de Taolagnaro et de la région Anôsy. Nous recensons les adresses pour orienter les visiteurs. Je voudrais simplement vérifier quelques informations avec vous — ça prend deux minutes. »

### 3.3 Si l'on vous demande combien ça coûte

> « Ce n'est pas un appel commercial, je ne vends rien aujourd'hui. Sur les conditions, je préfère vous les écrire et vous les faire valider — je peux vous envoyer un message WhatsApp si vous êtes d'accord. »

*Ne jamais improviser de conditions commerciales : voir l'encadré §3.7.*

### 3.4 Si la ligne est mauvaise

> « Excusez-moi, la ligne est mauvaise. Est-ce que je peux vous rappeler, ou vous envoyer un message WhatsApp ? »

### 3.5 Clôture

> « Merci beaucoup pour votre temps. Je note tout ça. Est-ce que je peux vous envoyer un message WhatsApp pour vous confirmer par écrit ce que j'ai noté ? […] Quelle est la meilleure heure pour vous joindre si besoin ? Merci, bonne journée. »

### 3.6 Mauvais numéro

> « Excusez-moi, je me suis trompé de numéro. Bonne journée. »

*Ne pas insister. Voir §7.2 pour ce qu'il est légitime de demander.*

### 3.7 Ce qu'il ne faut pas dire

À éviter absolument, car **rien de tout cela n'est décidé** :

- « Vous serez référencé gratuitement » / « nous prenons 10 % » / tout taux de commission ;
- « vous aurez X visiteurs », « vous serez en tête des résultats », « en exclusivité » ;
- « vous êtes déjà dans notre guide » — ce n'est pas vrai ;
- laisser croire que l'appel vient de l'ORTA, de la mairie ou d'un organisme officiel.

Si l'interlocuteur demande des engagements : **noter la question** dans `call_notes` et dire qu'on reviendra vers lui par écrit. C'est une information de pilotage utile pour la suite du projet.

---

## 4. Questions à poser

Poser dans cet ordre : les deux premières suffisent à qualifier la fiche, les suivantes l'enrichissent.

### 4.1 Les deux questions décisives (toujours)

1. **« Est-ce que l'établissement est toujours en activité ? »** — la réponse commande tout le reste.
2. **« Est-ce que je suis au bon numéro pour vous joindre ? Sinon, quel numéro préférez-vous ? »** — c'est ainsi qu'on résout les cinq conflits.

### 4.2 Localisation (toujours)

3. **« Quelle est l'adresse exacte, pour que les visiteurs vous trouvent ? »** — 50 fiches n'ont pas de coordonnée ; une adresse précise en fournit une.

### 4.3 Horaires et prix (toujours)

4. **« Quels sont vos horaires d'ouverture ? »**
5. **« Quels sont vos tarifs, environ ? »** — pour un hébergement : prix par nuit, basse et haute saison. Pour un restaurant : fourchette par personne. Pour une prestation : prix par personne.

### 4.4 Hébergements

6. « Combien de chambres ou de bungalows avez-vous ? »
7. « Qu'est-ce que vous proposez sur place ? » — eau chaude, wifi, restaurant, parking, groupe électrogène, transfert aéroport, piscine.
8. « Vous acceptez la carte bancaire, ou espèces seulement ? »

### 4.5 Prestataires, guides, artisans

9. « Quelles prestations proposez-vous exactement ? »
10. « Quelles langues parlez-vous ? »
11. « Êtes-vous enregistré comme guide ou comme agence ? » — **ne pas demander de numéro de licence si la question gêne** ; noter seulement « enregistré : oui / non / ne sait pas ».

### 4.6 Consentement (toujours, avant de raccrocher)

12. **« Est-ce que vous êtes d'accord pour que ces informations figurent dans ce guide ? »**

Réponse à noter telle quelle : `accord`, `refus`, `à voir plus tard`. **Un refus est un résultat parfaitement valable** et doit empêcher la publication.

---

## 5. Message WhatsApp (appels sans réponse)

WhatsApp est très utilisé à Madagascar : c'est la bonne relance après un appel infructueux. **Un seul message par établissement, deux au maximum** dans toute la campagne.

### 5.1 Modèle principal — après un appel sans réponse

```
Bonjour, ici [Prénom Nom] de [structure].

Je vous ai appelé à l'instant au sujet d'un guide des
établissements touristiques de Taolagnaro et de la région Anôsy.
Je n'ai pas pu vous joindre.

Auriez-vous deux minutes pour me confirmer trois points ?
1. L'établissement est-il toujours en activité ?
2. Ce numéro est-il le bon pour vous joindre ?
3. Vos horaires et vos tarifs actuels.

Si vous préférez, dites-moi un créneau et je vous rappelle.

Merci beaucoup, et bonne journée.
```

### 5.2 Variante courte — prise de contact sans appel préalable

```
Bonjour, ici [Prénom Nom] de [structure].

Nous préparons un guide des établissements touristiques de
Taolagnaro et de l'Anôsy. Je souhaite vérifier deux ou trois
informations sur [nom de l'établissement] — activité actuelle,
horaires, tarifs.

Quel serait le bon moment pour vous appeler ?

Merci, bonne journée.
```

### 5.3 Variante de confirmation — après un accord oral

```
Merci pour votre accueil au téléphone. Voici ce que j'ai noté :

• Établissement : [nom]
• Activité : [ouverte / fermée / saisonnière]
• Téléphone : [numéro]
• Adresse : [adresse]
• Horaires : [horaires]
• Tarifs : [tarifs]

Dites-moi si quelque chose est inexact. Merci !
```

### 5.4 Règles WhatsApp

- Se présenter et donner l'objet **dès le premier message** : un message sans contexte est ignoré ou signalé.
- **Pas de pièce jointe, pas de lien** au premier contact.
- **Ne pas ajouter** le contact à un groupe, ne pas transférer son numéro.
- **Deux messages maximum.** Pas de relance quotidienne.
- Consigner l'envoi dans `call_notes` : `WA envoyé 2026-11-20`.

---

## 6. Comment consigner chaque réponse

Tout se saisit dans [`phone-verification-list.csv`](phone-verification-list.csv), colonnes `call_result`, `confirmed_phone`, `confirmed_operating_status`, `last_contact_date` et `call_notes`.

### 6.1 La règle unique

> **N'écrire que ce qui a été entendu.** Si l'interlocuteur n'a pas répondu à une question, le champ correspondant reste vide. Le silence n'est pas une confirmation.

Corollaire : **« sans réponse » est un résultat**, et un bon résultat. Il vaut infiniment mieux qu'un champ rempli par déduction.

### 6.2 `call_result` — vocabulaire contrôlé

Une seule valeur par ligne, prise dans cette liste. Ne pas inventer d'autres valeurs : le tri et les statistiques en dépendent.

| Valeur | Signification | Suite |
| --- | --- | --- |
| `reached_confirmed` | Bon établissement, informations confirmées | fiche consolidée |
| `reached_updated` | Bon établissement, mais les informations diffèrent de la fiche | noter l'écart dans `call_notes` |
| `reached_declined` | Bon établissement, refuse de répondre ou de figurer | ne pas publier |
| `callback_requested` | Demande à être rappelé | noter le créneau demandé |
| `language_barrier` | Quelqu'un a répondu mais l'échange n'a pas abouti | relancer en WhatsApp |
| `no_answer` | A sonné, pas de réponse | réessayer (§7.1) |
| `busy` | Ligne occupée | réessayer |
| `voicemail` | Répondeur | passer en WhatsApp |
| `wrong_number` | Quelqu'un d'autre a répondu | §7.2 |
| `disconnected` | Numéro non attribué | §7.3 |
| `unreachable_after_attempts` | Toutes les tentatives épuisées | classer, ne pas insister |
| `closed_permanently` | Activité cessée, confirmation explicite | **preuve** pour un statut `closed` |

### 6.3 `confirmed_operating_status` — vocabulaire contrôlé

| Valeur | Quand l'utiliser |
| --- | --- |
| `open` | Ouvert, en activité toute l'année |
| `open_seasonal` | Ouvert, mais seulement une partie de l'année |
| `closed_temporarily` | Fermé pour l'instant, réouverture annoncée |
| `closed_permanently` | Fermé définitivement |
| `unknown` | La question a été posée, la réponse n'est pas claire |

Laisser **vide** si la question n'a pas été posée. `unknown` et vide ne veulent pas dire la même chose : `unknown` signifie qu'on a demandé.

### 6.4 `confirmed_phone`

- Le numéro **que l'établissement déclare** comme le bon, à 9 chiffres après +261 ou 10 avec le 0 initial, au format où il a été donné.
- Si l'interlocuteur confirme que le numéro composé est le sien, recopier ce numéro : c'est une confirmation.
- **Ne jamais** y placer un numéro trouvé sur un annuaire, déduit d'un autre établissement, ou donné par un tiers (§7.2).

### 6.5 `last_contact_date`

Date du **dernier** contact tenté, quelle que soit l'issue, au format `AAAA-MM-JJ` (ex. `2026-11-20`). Une tentative sans réponse compte.

### 6.6 `call_notes` — journal daté

Une ligne par tentative, séparées par ` | `. Format : `date heure issue — détail`.

```
2026-11-20 09:15 no_answer | 2026-11-21 15:40 reached_confirmed — Mme R. confirme ouverture, 8 chambres, 90 000 Ar/nuit basse saison, accord de publication
```

C'est ici que vont : le nom de l'interlocuteur, son rôle, les écarts constatés, le refus, l'envoi du WhatsApp, les questions restées sans réponse.

### 6.7 Exemple de saisie — **illustration fictive**

> ⚠️ L'exemple ci-dessous est **inventé pour montrer le format**. Ce n'est pas un résultat et il ne doit pas être recopié dans le fichier.

| colonne | valeur d'exemple |
| --- | --- |
| `call_result` | `reached_confirmed` |
| `confirmed_phone` | `034 00 000 00` |
| `confirmed_operating_status` | `open` |
| `last_contact_date` | `2026-11-20` |
| `call_notes` | `2026-11-20 09:15 reached_confirmed — interlocuteur fictif, exemple de format uniquement` |

### 6.8 Ce qu'on ne fait pas en saisissant

- Ne **pas** modifier `verification_status` ni les fichiers JSON : le changement de statut est une décision séparée, prise avec la preuve sous les yeux (§9).
- Ne **pas** supprimer la ligne d'un établissement fermé ou injoignable : la ligne devient la trace du constat.
- Ne **pas** écraser le numéro d'origine dans `phone` : le numéro confirmé va dans `confirmed_phone`, l'ancien reste visible pour l'audit.

---

## 7. Appels sans réponse et numéros incorrects

### 7.1 Sans réponse

1. **Tentative 1** — matin (09h00–11h00).
2. **Tentative 2** — **jour ouvré suivant**, autre créneau (15h00–17h00). Ne pas rappeler dans l'heure : c'est perçu comme du harcèlement.
3. **WhatsApp** — un message (§5.1), puis attendre.
4. **Après 5 jours ouvrés** sans retour → `unreachable_after_attempts`, avec le journal complet en `call_notes`.

Un répondeur ne compte pas comme une tentative aboutie : passer directement au WhatsApp.

### 7.2 Mauvais numéro

- Saisir `wrong_number`. **Ne pas effacer le numéro d'origine** du champ `phone`.
- Il est légitime de demander : « Je cherchais [établissement] — est-ce que vous savez s'il est joignable autrement ? » Si une réponse est obtenue, la noter dans `call_notes` **comme piste**, pas dans `confirmed_phone`.
- **Ne jamais inscrire dans `confirmed_phone` un numéro obtenu auprès d'un tiers.** Ce n'est pas une confirmation par l'établissement. Recomposer ce numéro ; c'est seulement si l'établissement décroche et confirme que le numéro est validé.
- **Ne jamais inventer ni déduire un numéro** à partir d'un autre établissement, d'un annuaire ou d'un schéma de numérotation.

### 7.3 Numéro non attribué, ou établissement fermé

- `disconnected` : numéro mort. Ne pas le remplacer au hasard ; la fiche reste sans contact fiable.
- `closed_permanently` : **seulement** si l'interlocuteur l'affirme clairement (« c'est fermé », « l'établissement n'existe plus »). Une absence de réponse, un local vide ou un voisin qui « croit que » ne suffisent pas.
- Dans les deux cas : consigner, ne pas supprimer la fiche.

### 7.4 Les trois numéros partagés du lot 1

Trois appels du lot tranchent une ambiguïté qui touche six fiches. Méthode :

1. Composer le numéro.
2. Demander **le nom de l'établissement** avant toute autre chose.
3. Celui qui répond est le propriétaire du numéro : `confirmed_phone` pour lui, `wrong_number` pour l'autre fiche.
4. Demander le bon numéro de l'autre établissement — en `call_notes` seulement.

Autrement dit : **un appel corrige deux fiches.** Ne pas appeler deux fois la même ligne.

---

## 8. Suivi

| Étape | Quand | Action |
| --- | --- | --- |
| Saisie | Immédiatement après l'appel | Remplir les 5 colonnes, à chaud — pas le soir. |
| Bilan du lot | Fin de journée | Compter les `reached_*` ; vérifier qu'aucune ligne n'est restée vide par oubli. |
| Relances | J+1 ouvré | Deuxième tentative sur les `no_answer` / `busy`. |
| WhatsApp | J+1 ou J+2 | Un message sur les `no_answer`, `voicemail`, `language_barrier`. |
| Clôture de fiche | J+5 ouvrés | `unreachable_after_attempts` ; la fiche sort de la campagne en cours. |
| Remontée | Fin de chaque lot | Lister les corrections de numéro et de statut **à valider** ; ne rien appliquer sans revue. |

**Règle de survie du fichier :** ne jamais saisir deux fois le même établissement dans deux lots. Un lot = les lignes de son propre fichier `verification-batch-*.csv`, recopiées ensuite dans la liste maîtresse.

---

## 9. Des résultats à la décision de statut

Cette campagne **ne change aucun statut**. Elle produit la preuve qui permettra de le changer, dans une étape distincte et revue.

| Constat | Statut envisageable | Condition |
| --- | --- | --- |
| `reached_confirmed`, activité ouverte, contact valide | `verified` | Preuve écrite de l'appel (date, interlocuteur) + coordonnée ou adresse |
| `reached_confirmed` mais une lacune (coordonnée, prix) | `partially_verified` | — |
| `reached_updated` | statut inchangé jusqu'à mise à jour de la fiche | corriger d'abord |
| `callback_requested`, `no_answer` | **inchangé** | — |
| `wrong_number`, `disconnected` | **inchangé**, mais contact = `null` | le numéro n'est plus une preuve |
| `closed_permanently` | `closed` | `closed_evidence` renseigné |
| `reached_declined` | inchangé, **plus exclusion de publication** | le refus est une donnée |

Après application éventuelle, relancer `python3 research/_sources/validate_dataset.py`.

---

## 10. Premier lot — 10 appels

Fichier de travail : [`verification-batch-01.csv`](verification-batch-01.csv). Les données d'origine y sont **recopiées à l'identique** (vérifié : 0 écart), les colonnes de résultat sont **vides**, et aucun enregistrement exclu de publication n'y figure.

Ordre conçu pour que chaque appel rapporte le maximum d'information.

| # | Téléphone | Fiche | Pourquoi à cette position |
| --- | --- | --- | --- |
| 1 | `+261 34 29 373 83` | `office-regional-du-tourisme-danosy` (ORTA) | **Appel pilote.** L'ORTA tient l'annuaire des 56 membres dont dépendent 32 des 64 contacts. Une conversation peut dire quels membres sont à jour, qui a cessé son activité, à qui appartiennent les trois numéros partagés, et répondre sur Mandena / COGEMA. **Meilleur rendement de la journée.** |
| 2 | `034 97 674 92` | `espace-sophie-amboasary` | Conflit : numéro aussi attribué à `grill-de-lac`, restaurant au lac Lanirano — **autre commune**. Un appel désigne le vrai propriétaire et corrige deux fiches. |
| 3 | `034 37 974 67` | `takasira` | Conflit : numéro aussi attribué à `safari-laka`, tour-opérateur. Un appart-hôtel et un tour-opérateur ne partagent pas une ligne. |
| 4 | `034 46 122 80` | `shtm` | Conflit : c'est le numéro que le **site officiel du parc de Nahampoana** publie pour la réserve. Appeler SHTM teste son existence même. 14 des 19 prestataires ne sont pas vérifiés ; SHTM en est le cas représentatif. |
| 5 | `+261 34 20 973 2` | `domaine-de-la-cascade-bungalows` | Numéro **malformé** (8 chiffres au lieu de 9) : injoignable en l'état. Fiche Tier 1 avec site officiel — un numéro correct la fait passer en `verified` et débloque une fiche publiable. |
| 6 | `+261 32 02 468 22` / `+261 32 43 964 93` | `vahiny-lodge` | **Deux numéros dans un champ**, preuve OpenStreetMap seule, secteur isolé (Manafiafy). Tranche l'existence et l'éventuelle homonymie avec `vahinn-sainte-luce`. |
| 7 | `034 02 918 26` | `libanona-woods` | Membre ORTA **sans coordonnée**, sur la presqu'île de Libanona. Une adresse fournit la coordonnée : la fiche passe de Tier 2 à Tier 1. |
| 8 | `034 92 241 52` | `lakananosy` | **Seul guide de tout l'annuaire**, sur 56 membres. Le confirmer comble le manque le mieux documenté du jeu de données ; l'infirmer prouve que le manque est réel. |
| 9 | `+261 34 16 86 276` | `snack-bar-mahamanina` | Preuve OpenStreetMap seule — la classe d'evidence la plus faible. Teste aussi l'homonymie avec `mahamanina`, fiche distincte de l'annuaire ORTA. |
| 10 | `038 50 773 41` | `motel-m1-manantenina` | Étape isolée sur la route côtière nord, **invérifiable autrement**. La fiche a fusionné deux entrées d'annuaire : l'appel confirme l'établissement et son emplacement. |

**Couverture réelle : 10 appels, 14 fiches concernées.** L'appel 2 implique aussi `grill-de-lac`, l'appel 3 aussi `safari-laka`, et l'appel 4 aussi `reserve-de-nahampoana` et `observation-des-lemuriens-nahampoana` — soit 10 + 4.

**Ordre conseillé dans la journée :** 1 → 2 → 3 → 4 le matin (les conflits se lisent mieux à la suite et l'ORTA peut être recontacté pour le reste), puis 5 → 6 → 7 l'après-midi, 8 → 9 → 10 en fin de journée ou le lendemain.

### 10.1 Ce qui compte comme réussite

| # | Réussite |
| --- | --- |
| 1 | Nom et fonction de l'interlocuteur ; date de mise à jour de l'annuaire ; réponse sur Mandena |
| 2–3 | Savoir qui répond ; obtenir le bon numéro de l'autre établissement |
| 4 | SHTM existe-t-il à ce numéro ? Sinon, à qui appartient la ligne ? |
| 5 | Un numéro à 9 chiffres ; horaires ; fourchette de prix |
| 6 | Quel numéro fonctionne ; l'établissement existe-t-il ; est-ce Vah'inn ? |
| 7 | Adresse précise ; ouverture ; tarif de l'emplacement de camping |
| 8 | Nom, langues, zone d'activité, tarif indicatif, statut de guide |
| 9 | Existe-t-il ? Est-ce la même fiche que Mahamanina (ORTA) ? |
| 10 | Existe-t-il ? Adresse, distance depuis Taolagnaro, nombre de chambres |

### 10.2 Fiches volontairement écartées du lot 1

- **`club-sandwich`** figure parmi les 32 contacts prioritaires, mais il est **exclu de publication** (deux objets OSM contradictoires, dont un nommé « temporarily closed »). L'appeler aurait un intérêt — lever l'ambiguïté — mais ce n'est pas l'objet du lot 1. À traiter dans un lot « exclusions à réexaminer », avec l'accord du propriétaire.
- **Les artisans** (`foi-artisanat-anosy`, `fimmasm`, `lovasoa-mahavonjy`, `association-mifankatia`) sont reportés : ils ne sont ni hébergement ni transport, et leur intérêt touristique n'est pas établi. Mieux vaut d'abord savoir si l'ORTA les recommande (appel 1).

---

## 11. Rappel des limites

- **Aucun appel n'a été passé**, aucun message envoyé, aucune réponse inventée. Toutes les colonnes de résultat sont vides.
- **Aucun statut n'a été modifié**, aucun fichier JSON touché, aucun script d'import créé, aucune commande Git exécutée.
- Ce guide suppose que l'appelant est autorisé à parler au nom du projet. Les conditions commerciales (gratuité, commission, mise en avant) **ne sont pas décidées** : le script est écrit pour ne rien promettre.
- Les numéros proviennent d'annuaires et de données cartographiques : **un certain nombre ne fonctionnera pas**. C'est normal et c'est précisément ce que la campagne mesure.
- Les fiches restent, après cette campagne, au même statut qu'avant : la campagne produit de la preuve, pas des décisions.