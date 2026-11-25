# TP 2 — Rapport de performance Lighthouse (Avant / Après)

## 1. Tableau comparatif des métriques (Lighthouse Mobile)

| Métrique Core Web Vitals | Avant optimisation | Après optimisation | Seuil recommandé | Geste technique responsable du gain |
| :--- | :---: | :---: | :---: | :--- |
| **LCP** (Largest Contentful Paint) | 3,8 s | **1,1 s** | <= 2,5 s | Conversion de l'image d'accroche en WebP redimensionné (`800w`) + suppression de `loading="lazy"` sur le hero + CSS critique en ligne. |
| **CLS** (Cumulative Layout Shift) | 0,24 | **0,00** | <= 0,10 | Ajout systématique des attributs `width` et `height` sur toutes les images + `font-display: swap` sur les polices auto-hébergées. |
| **TBT** (Total Blocking Time) | 310 ms | **20 ms** | <= 200 ms | Ajout de l'attribut `defer` sur la balise `<script>` pour ne plus bloquer l'analyse du DOM. |

## 2. Liste des textes de remplacement (`alt`) par catégorie
1. **Image informative (photo de formateur) :** `alt="Sarah Benali, formatrice en développement front-end"` (transmet l'identité de la personne).
2. **Image fonctionnelle (logo dans le lien d'accueil) :** `alt="SkillHub — Retour à l'accueil"` (décrit la destination du lien).
3. **Image décorative (motif géométrique / icône accompagnée d'un titre) :** `alt=""` et `aria-hidden="true"` sur les `<svg>` en ligne pour éviter toute redondance vocale.
