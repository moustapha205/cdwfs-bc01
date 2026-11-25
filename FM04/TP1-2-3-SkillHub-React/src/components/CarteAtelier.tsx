import { Link } from "react-router-dom";
import type { Atelier } from "../types";

type Props = {
  atelier: Atelier;
  inscrit: boolean;
  onInscrire: (id: string) => void;
};

export function CarteAtelier({ atelier, inscrit, onInscrire }: Props) {
  const complet = atelier.places === 0;

  return (
    <li className="flex h-full flex-col rounded-lg bg-fond p-4 text-texte shadow ring-1 ring-secondaire/20">
      <h2 className="text-m font-semibold">
        <Link to={`/ateliers/${atelier.id}`} className="hover:underline focus-visible:outline-2 focus-visible:outline-focus">
          {atelier.titre}
        </Link>
      </h2>
      <p className="text-xs text-secondaire mt-1">
        {atelier.niveau} · {atelier.prix} € · {atelier.places} place(s)
      </p>
      <p className="mt-2 flex-1 text-s text-secondaire">{atelier.resume}</p>

      {complet ? (
        <p role="status" className="mt-4 text-s font-medium text-secondaire">
          Atelier complet
        </p>
      ) : (
        <button
          type="button"
          onClick={() => onInscrire(atelier.id)}
          disabled={inscrit}
          className="mt-4 rounded bg-accent px-4 py-2 text-fond disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-focus"
        >
          {inscrit ? "Déjà inscrit" : "M'inscrire"}
        </button>
      )}
    </li>
  );
}
