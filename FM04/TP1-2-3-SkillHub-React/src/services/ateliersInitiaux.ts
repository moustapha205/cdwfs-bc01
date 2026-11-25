import type { Atelier } from "../types";

export const ATELIERS_INITIAUX: Atelier[] = [
  {
    id: "a1",
    titre: "React en 3 jours",
    niveau: "Débutant",
    prix: 450,
    places: 8,
    resume: "Composants, props, état local et routage avec React Router.",
  },
  {
    id: "a2",
    titre: "CSS Grid & Flexbox",
    niveau: "Intermédiaire",
    prix: 300,
    places: 0,
    resume: "Maîtriser les mises en page responsives sans débordement.",
  },
  {
    id: "a3",
    titre: "TypeScript avancé",
    niveau: "Avancé",
    prix: 550,
    places: 5,
    resume: "Types génériques, unions discriminées et typage strict.",
  },
];
