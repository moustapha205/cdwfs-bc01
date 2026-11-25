import type { Atelier } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function chargerAteliers(signal?: AbortSignal): Promise<Atelier[]> {
  const rep = await fetch(`${BASE_URL}/ateliers`, { signal });
  if (!rep.ok) throw new Error(`Erreur serveur (${rep.status})`);
  return rep.json();
}

export async function creerAtelierApi(donnees: Omit<Atelier, "id">): Promise<Atelier> {
  const rep = await fetch(`${BASE_URL}/ateliers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(donnees),
  });
  if (!rep.ok) throw new Error("Impossible de créer l'atelier");
  return rep.json();
}
