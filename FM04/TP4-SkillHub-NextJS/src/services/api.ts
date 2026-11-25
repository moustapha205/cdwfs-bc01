import type { Atelier } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function chargerAteliers(): Promise<Atelier[]> {
  const rep = await fetch(`${BASE_URL}/ateliers`);
  if (!rep.ok) throw new Error(`Erreur serveur (${rep.status})`);
  return rep.json();
}
