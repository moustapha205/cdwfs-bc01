"use client";
import { useState } from "react";
import { CarteAtelier } from "./CarteAtelier";
import { useInscriptions } from "../contexts/Inscriptions";
import type { Atelier } from "../types";

export function Catalogue({ ateliers }: { ateliers: Atelier[] }) {
  const [recherche, setRecherche] = useState("");
  const { inscrits, inscrire } = useInscriptions();

  const visibles = ateliers.filter((a) =>
    a.titre.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="q" className="block font-medium mb-1">Rechercher un atelier</label>
        <input
          id="q"
          type="search"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="border rounded p-2 w-full max-w-md"
        />
      </div>
      <p aria-live="polite" className="mb-4 text-sm text-slate-600">
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
    </div>
  );
}
