import { useSearchParams } from "react-router-dom";
import { CarteAtelier } from "../components/CarteAtelier";
import { TitreDeVue } from "../components/TitreDeVue";
import { useInscriptions } from "../contexts/Inscriptions";
import type { Atelier } from "../types";

export function Catalogue({ ateliers }: { ateliers: Atelier[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const recherche = searchParams.get("q") ?? "";
  const { inscrits, inscrire } = useInscriptions();

  const visibles = ateliers.filter((a) =>
    a.titre.toLowerCase().includes(recherche.toLowerCase())
  );

  function gererRecherche(valeur: string) {
    if (valeur) {
      setSearchParams({ q: valeur }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }

  return (
    <section>
      <TitreDeVue enfants="Catalogue des ateliers" />

      <div className="mb-4">
        <label htmlFor="q" className="block font-medium mb-1">Rechercher un atelier</label>
        <input
          id="q"
          type="search"
          value={recherche}
          onChange={(e) => gererRecherche(e.target.value)}
          placeholder="Ex : React, CSS..."
          className="border rounded p-2 w-full max-w-md focus-visible:outline-2 focus-visible:outline-focus"
        />
      </div>

      <p aria-live="polite" className="mb-4 text-s text-secondaire">
        {visibles.length} atelier(s) trouvé(s)
      </p>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibles.map((a) => (
          <CarteAtelier
            key={a.id}
            atelier={a}
            inscrit={inscrits.includes(a.id)}
            onInscrire={inscrire}
          />
        ))}
      </ul>
    </section>
  );
}
