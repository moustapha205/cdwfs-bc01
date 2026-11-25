import { Link } from "react-router-dom";
import { TitreDeVue } from "../components/TitreDeVue";

export function PageIntrouvable() {
  return (
    <section>
      <TitreDeVue enfants="Page introuvable (404)" />
      <p className="mb-4">L'adresse demandée n'existe pas.</p>
      <Link to="/ateliers" className="underline text-accent">Retourner au catalogue</Link>
    </section>
  );
}
