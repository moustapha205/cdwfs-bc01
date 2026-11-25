import type { Atelier } from "../../TP2-Modale-TypeScript/src/types.js";

export async function chargerAteliers(signal?: AbortSignal): Promise<Atelier[]> {
  const reponse = await fetch("./data/ateliers.json", {
    headers: { Accept: "application/json" },
    signal,
  });

  if (!reponse.ok) {
    throw new Error(`Chargement impossible (${reponse.status})`);
  }

  return reponse.json() as Promise<Atelier[]>;
}
