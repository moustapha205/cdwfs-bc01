import { TitreDeVue } from "../components/TitreDeVue";
import type { Atelier } from "../types";

export function MesAteliers({ ateliers }: { ateliers: Atelier[] }) {
  return (
    <section>
      <TitreDeVue enfants="Mes ateliers" />
      <p className="mb-4 text-s text-secondaire">Vue d'ensemble des ateliers ({ateliers.length}).</p>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ateliers.map((a) => (
          <li key={a.id} className="border rounded-lg p-4">
            <h2 className="font-semibold text-m">{a.titre}</h2>
            <p className="text-xs text-secondaire mt-1">{a.niveau} · {a.places} place(s)</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
