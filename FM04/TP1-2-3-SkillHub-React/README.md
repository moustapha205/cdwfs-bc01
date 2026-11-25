# SkillHub — Front-end React (TP 1 à TP 3)

## 1. Choix du framework
Nous avons choisi **React avec TypeScript et Vite** (face à Vue 3 et Angular) :
- **Marché** : React est le plus demandé en Île-de-France et en alternance.
- **Continuité** : JSX étant du JavaScript, nos types (`types.ts`) et services (`api.ts`) restent du TypeScript pur.
- **Taille du projet** : SkillHub est adapté à React + React Router ; Angular serait surdimensionné.

## 2. Justification de l'architecture
- **Séparation réseau (`src/services/` et `src/hooks/`)** : Seul `api.ts` connaît `fetch` et `VITE_API_URL`. Le hook `useAteliers` gère les états (`chargement`, `erreur`, `succes`) et annule les 
requêtes via `AbortController`.
- **Routage (`src/router/`)** : `react-router-dom` avec `Layout` (`<Outlet />`), paramètre `:id`, garde `ExigeConnexion`, route `*`, et découpage paresseux (`lazy` + `Suspense`) sur `/mon-espace`.
- **État partagé (`src/contexts/`)** : Contexte React optimisé avec `useMemo` et exposé via `useInscriptions()`. Le filtre catalogue vit dans l'URL (`useSearchParams`).

## 3. Organisation des composants
- `src/components/` : Briques réutilisables (`CarteAtelier`, `TitreDeVue`, `Layout`).
- `src/views/` : Une vue par route (`Catalogue`, `FicheAtelier`, `Dashboard`, `MesAteliers`, `CreerAtelier`, `PageIntrouvable`).
- `src/types.ts` : Contrats TypeScript purs.

## 4. Mesures de performance et accessibilité (TP 3)
- **Découpage par route** : Le chunk `Dashboard` est chargé à la demande via `React.lazy` + `Suspense`.
- **Accessibilité** : `TitreDeVue` gère le focus (`tabIndex={-1}`), le titre et le scroll ; attributs `aria-live`, `aria-busy`, `aria-invalid`, `aria-describedby` et `role="alert"`.
