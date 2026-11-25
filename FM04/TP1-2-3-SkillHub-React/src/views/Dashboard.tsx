import { TitreDeVue } from "../components/TitreDeVue";
import { useInscriptions } from "../contexts/Inscriptions";
import type { Atelier } from "../types";

export function Dashboard({ ateliers }: { ateliers: Atelier[] }) {
  const { inscrits, annuler } = useInscriptions();
  const ateliersSuivis = ateliers.filter((a) => inscrits.includes(a.id));

  return (
    <section>
      <TitreDeVue enfants="Mon tableau de bord" />

      <p aria-live="polite" className="mb-4 text-s text-secondaire">
        Vous êtes inscrit à {ateliersSuivis.length} atelier(s).
      </p>

      {ateliersSuivis.length === 0 ? (
        <p>Vous n'êtes inscrit à aucun atelier pour le moment.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ateliersSuivis.map((a) => (
            <li key={a.id} className="border rounded-lg p-4 flex flex-col justify-between shadow-sm">
              <div>
                <h2 className="font-semibold text-m">{a.titre}</h2>
                <p className="text-xs text-secondaire mt-1">Places restantes : {a.places}</p>
              </div>
              <button
                type="button"
                onClick={() => annuler(a.id)}
                className="mt-4 rounded bg-red-600 text-fond px-4 py-2 hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-focus"
              >
                Se désinscrire
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
