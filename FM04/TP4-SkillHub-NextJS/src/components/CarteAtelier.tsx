import Link from "next/link";
import type { Atelier } from "../types";

type Props = {
  atelier: Atelier;
  inscrit: boolean;
  onInscrire: (id: string) => void;
};

export function CarteAtelier({ atelier, inscrit, onInscrire }: Props) {
  const complet = atelier.places === 0;

  return (
    <li className="flex h-full flex-col rounded-lg bg-white p-4 shadow border">
      <h2 className="text-lg font-semibold">
        <Link href={`/ateliers/${atelier.id}`} className="hover:underline">
          {atelier.titre}
        </Link>
      </h2>
      <p className="text-sm text-slate-600 mt-1">
        {atelier.niveau} · {atelier.prix} € · {atelier.places} place(s)
      </p>
      <p className="mt-2 flex-1 text-slate-700">{atelier.resume}</p>
      {complet ? (
        <p role="status" className="mt-4 font-medium text-slate-600">Atelier complet</p>
      ) : (
        <button
          type="button"
          onClick={() => onInscrire(atelier.id)}
          disabled={inscrit}
          className="mt-4 rounded bg-amber-700 px-4 py-2 text-white disabled:opacity-50"
        >
          {inscrit ? "Déjà inscrit" : "M'inscrire"}
        </button>
      )}
    </li>
  );
}
