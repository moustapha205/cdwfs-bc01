import { Link, useParams } from "react-router-dom";
import { TitreDeVue } from "../components/TitreDeVue";
import { useInscriptions } from "../contexts/Inscriptions";
import type { Atelier } from "../types";

export function FicheAtelier({ ateliers }: { ateliers: Atelier[] }) {
  const { id } = useParams();
  const { inscrits, inscrire } = useInscriptions();
  const atelier = ateliers.find((a) => a.id === id);

  if (!atelier) {
    return (
      <section>
        <TitreDeVue enfants="Atelier introuvable" />
        <Link to="/ateliers" className="underline text-accent">Retour au catalogue</Link>
      </section>
    );
  }

  const inscrit = inscrits.includes(atelier.id);

  return (
    <article className="max-w-2xl space-y-4">
      <TitreDeVue enfants={atelier.titre} />
      <p className="text-s text-secondaire">
        Niveau : {atelier.niveau} · Prix : {atelier.prix} € · {atelier.places} place(s) restante(s)
      </p>
      <p>{atelier.resume}</p>
      <div className="flex gap-4 items-center">
        <button
          type="button"
          onClick={() => inscrire(atelier.id)}
          disabled={inscrit || atelier.places === 0}
          className="rounded bg-accent px-4 py-2 text-fond disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-focus"
        >
          {atelier.places === 0 ? "Complet" : inscrit ? "Déjà inscrit" : "M'inscrire"}
        </button>
        <Link to="/ateliers" className="underline text-secondaire">Retour</Link>
      </div>
    </article>
  );
}
