import type { Atelier, Niveau } from "../../TP2-Modale-TypeScript/src/types.js";
import { chargerAteliers } from "./api.js";
import { etatUI } from "./etatUI.js";

type EtatFiltre = {
  niveau: Niveau | "tous";
  recherche: string;
  triPrix: "aucun" | "asc";
};

export function attendreLaFin<A extends unknown[]>(fn: (...args: A) => void, delai = 300) {
  let minuterie: ReturnType<typeof setTimeout>;
  return (...args: A) => {
    clearTimeout(minuterie);
    minuterie = setTimeout(() => fn(...args), delai);
  };
}

export async function initialiserCatalogue(racine: HTMLElement): Promise<void> {
  let etat: EtatFiltre = { niveau: "tous", recherche: "", triPrix: "aucun" };
  let catalogueComplet: Atelier[] = [];
  let controleur: AbortController | undefined;

  function rendre() {
    const q = etat.recherche.trim().toLowerCase();
    let visibles = catalogueComplet
      .filter((a) => etat.niveau === "tous" || a.niveau === etat.niveau)
      .filter((a) => a.titre.toLowerCase().includes(q));

    if (etat.triPrix === "asc") {
      visibles = [...visibles].sort((a, b) => a.prix - b.prix);
    }

    etatUI(visibles.length ? "succes" : "vide", visibles);
  }

  function majEtat(partiel: Partial<EtatFiltre>) {
    etat = { ...etat, ...partiel };
    rendre();
  }

  async function executerChargement() {
    controleur?.abort();
    controleur = new AbortController();
    etatUI("chargement");

    try {
      catalogueComplet = await chargerAteliers(controleur.signal);
      rendre();
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      etatUI("erreur", err as Error, executerChargement);
    }
  }

  const surSaisie = attendreLaFin((valeur: string) => majEtat({ recherche: valeur }), 300);

  racine.addEventListener("input", (e) => {
    const cible = e.target as HTMLInputElement;
    if (cible.id === "recherche") surSaisie(cible.value);
  });

  racine.addEventListener("change", (e) => {
    const cible = e.target as HTMLSelectElement;
    if (cible.id === "niveau") majEtat({ niveau: cible.value as Niveau | "tous" });
    if (cible.id === "tri") majEtat({ triPrix: cible.value as "aucun" | "asc" });
  });

  await executerChargement();
}
