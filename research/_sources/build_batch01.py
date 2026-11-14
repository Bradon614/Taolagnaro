#!/usr/bin/env python3
"""Build research/verification-batch-01.csv — the first 10 calls.

Every original column is copied verbatim from phone-verification-list.csv; the
batch adds ordering, rationale and blank result columns. Nothing is fabricated
and nothing is pre-filled.
"""
import csv
import os

HERE = os.path.dirname(os.path.abspath(__file__))
RESEARCH = os.path.dirname(HERE)

# (slug, priority_reason, also_resolves, success_criteria)
BATCH = [
    ("office-regional-du-tourisme-danosy",
     "Appel pilote à forte valeur. L'ORTA tient l'annuaire des 56 membres dont dépendent "
     "32 des 64 contacts : une seule conversation peut dire quels membres sont à jour, qui a "
     "cessé son activité, à qui appartiennent les trois numéros partagés, et répondre sur "
     "Mandena / COGEMA.",
     "Indirectement les 32 fiches appuyées sur une page membre ORTA ; foret-de-mandena (accès du public, existence de COGEMA).",
     "Nom et fonction de l'interlocuteur ; date de mise à jour de l'annuaire ; réponse sur Mandena."),
    ("espace-sophie-amboasary",
     "Conflit de numéro : 034 97 674 92 est aussi attribué à grill-de-lac (restaurant au lac "
     "Lanirano, autre commune). Un appel détermine à laquelle des deux fiches le numéro "
     "appartient réellement.",
     "grill-de-lac",
     "Savoir qui répond ; obtenir le bon numéro de l'autre établissement si possible."),
    ("takasira",
     "Conflit de numéro : 034 37 974 67 est aussi attribué à safari-laka (tour-opérateur). "
     "Un appart-hôtel et un tour-opérateur ne peuvent pas partager une ligne.",
     "safari-laka",
     "Savoir qui répond ; obtenir le bon numéro de l'autre établissement si possible."),
    ("shtm",
     "Conflit de numéro : 034 46 122 80 est le numéro que le site officiel du parc de "
     "Nahampoana publie pour la réserve. Appeler SHTM teste son existence même. Sur 19 "
     "prestataires, 14 ne sont pas vérifiés : SHTM en est un cas représentatif.",
     "reserve-de-nahampoana et observation-des-lemuriens-nahampoana (attribution du numéro)",
     "SHTM existe-t-il à ce numéro ? Sinon, à qui appartient la ligne ?"),
    ("domaine-de-la-cascade-bungalows",
     "Numéro malformé : 8 chiffres après +261 au lieu de 9, donc injoignable en l'état. La "
     "fiche est en Tier 1 et possède un site officiel : un numéro correct la fait passer de "
     "partially_verified à verified et débloque une fiche publiable.",
     "randonnee-domaine-de-la-cascade et domaine-de-la-cascade (même exploitant)",
     "Un numéro à 9 chiffres ; horaires ; fourchette de prix des circuits et des nuitées."),
    ("vahiny-lodge",
     "Deux numéros dans un seul champ, preuve OpenStreetMap uniquement, secteur isolé "
     "(Manafiafy / Sainte-Luce). L'appel tranche l'existence et le lien éventuel avec "
     "vahinn-sainte-luce, fiche homonyme de l'annuaire ORTA.",
     "vahinn-sainte-luce (homonymie)",
     "Quel numéro fonctionne ; l'établissement existe-t-il ; est-ce le même que Vah'inn ?"),
    ("libanona-woods",
     "Membre ORTA sans coordonnée, sur la presqu'île de Libanona. Obtenir l'adresse fournit la "
     "coordonnée et fait passer la fiche de Tier 2 (une lacune) à Tier 1.",
     "-",
     "Adresse précise (pour la coordonnée) ; ouverture ; tarif de l'emplacement de camping."),
    ("lakananosy",
     "Seul guide de tout l'annuaire, sur 56 membres. Le confirmer comble le manque le mieux "
     "documenté du jeu de données ; l'infirmer prouve que ce manque est réel et non un oubli "
     "de recherche.",
     "Aucune, mais informe la couverture « guides » de tout le jeu de données.",
     "Nom, langues pratiquées, zone d'activité, tarif indicatif, numéro de guide officiel."),
    ("snack-bar-mahamanina",
     "Preuve OpenStreetMap uniquement — la classe d'evidence la plus faible du jeu de données. "
     "Teste aussi l'homonymie avec mahamanina, fiche distincte de l'annuaire ORTA.",
     "mahamanina (homonymie)",
     "Existe-t-il ? Est-ce le même établissement que la fiche ORTA Mahamanina ?"),
    ("motel-m1-manantenina",
     "Étape isolée sur la route côtière nord vers Manafiafy, invérifiable autrement. La fiche "
     "a fusionné deux entrées d'annuaire : l'appel confirme l'établissement et son emplacement.",
     "motel-m1 (l'autre entrée d'annuaire du même établissement)",
     "Existe-t-il ? Adresse et distance depuis Taolagnaro ; nombre de chambres ; tarif."),
]


def main():
    master_path = os.path.join(RESEARCH, "phone-verification-list.csv")
    with open(master_path, encoding="utf-8") as fh:
        master = list(csv.DictReader(fh))
    by_slug = {r["slug"]: r for r in master}

    base_cols = list(master[0].keys())
    extra = ["batch_order", "priority_reason", "also_resolves", "success_criteria"]
    cols = ["batch_order"] + base_cols + ["priority_reason", "also_resolves", "success_criteria"]

    rows = []
    for i, (slug, reason, also, success) in enumerate(BATCH, 1):
        if slug not in by_slug:
            raise SystemExit(f"slug not in master list: {slug}")
        src = by_slug[slug]
        row = {c: src[c] for c in base_cols}      # verbatim copy
        row["batch_order"] = i
        row["priority_reason"] = reason
        row["also_resolves"] = also
        row["success_criteria"] = success
        # result columns must start blank — nothing is pre-filled
        for c in ("call_result", "confirmed_phone", "confirmed_operating_status",
                  "last_contact_date", "call_notes"):
            row[c] = ""
        rows.append(row)

    out = os.path.join(RESEARCH, "verification-batch-01.csv")
    with open(out, "w", encoding="utf-8", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=cols)
        w.writeheader()
        w.writerows(rows)

    print(f"verification-batch-01.csv: {len(rows)} rows, {len(cols)} columns")

    # integrity: every copied value must match the master exactly
    bad = 0
    for row in rows:
        src = by_slug[row["slug"]]
        for c in base_cols:
            if row[c] != src[c]:
                bad += 1
                print(f"  MISMATCH {row['slug']}.{c}")
    print(f"  original-data mismatches: {bad}")
    printed = sum(1 for r in rows for c in ("call_result", "confirmed_phone",
                   "confirmed_operating_status", "last_contact_date", "call_notes") if r[c])
    print(f"  pre-filled result cells (must be 0): {printed}")
    print(f"  excluded records in this batch (must be 0): "
          f"{sum(1 for r in rows if r['slug'] in {'club-sandwich'})}")


if __name__ == "__main__":
    main()