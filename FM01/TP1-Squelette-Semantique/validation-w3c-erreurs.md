# TP 1 — Validation W3C et relecture sans CSS

## 1. Résultat du validateur W3C (`validator.w3.org`)
- **Statut final :** Document validé avec **0 erreur** et **0 avertissement** (HTML5).
- **Relecture sans CSS :** L'ordre de lecture linéaire est logique du lien d'évitement jusqu'au pied de page.

## 2. Les trois erreurs corrigées pendant la validation
1. **Deux `<h1>` dans la page :** Le logo `<p><strong>SkillHub</strong></p>` avait initialement été balisé en `<h1>`. Corrigé en `<p>` pour réserver l'unique `<h1>` au sujet principal de la page.
2. **Absence d'attribut `lang="fr"` sur `<html>` :** Signalé par le validateur ; ajouté pour garantir la prononciation française par les lecteurs d'écran.
3. **Section sans titre :** Une `<section>` de mise en page sans `<h2>` déclenchait un avertissement W3C ; remplacée par un regroupement titré avec `aria-labelledby`.
