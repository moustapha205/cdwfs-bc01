# TP 3 — Justification des points de rupture et contrôle responsive (Sans framework)

## 1. Tableau des trois paliers testés

| Palier | Largeur testée | Point de rupture CSS | Comportement observé à l'écran | Débordement horizontal |
| :--- | :---: | :--- | :--- | :---: |
| **Mobile** | `360 px` | Aucun (Mobile-First par défaut) | 1 colonne sur toute la page, cartes empilées, cibles tactiles >= 44 px. | **0 px** (Aucun) |
| **Tablette** | `768 px` | `@media (min-width: 48em)` | Les valeurs passent en 3 colonnes et les formateurs en 2 colonnes ; le catalogue `auto-fit` passe à 2 cartes côte à côte. | **0 px** (Aucun) |
| **Bureau** | `1280 px` | `@media (min-width: 64em)` | Activation de `grid-template-areas` avec la colonne latérale `<aside>` de `18rem` à droite du `<main>` et 3 cartes d'ateliers par ligne. | **0 px** (Aucun) |

## 2. Choix techniques (Critère C1.1 — EC01)
- **Zéro framework CSS :** Aucun Bootstrap ni Tailwind ; uniquement CSS Grid (`repeat(auto-fit, minmax(16rem, 1fr))` et `grid-template-areas`) et Flexbox.
- **Unités relatives :** `rem` pour les espacements et tailles, `em` pour les media queries afin de respecter le zoom texte utilisateur, `clamp()` sur le `<h1>`, et `65ch` sur les paragraphes.
