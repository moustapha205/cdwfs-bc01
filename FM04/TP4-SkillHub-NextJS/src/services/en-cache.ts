import { cacheLife } from "next/cache";
import { chargerAteliers } from "./api";

export async function catalogueEnCache() {
  "use cache";
  cacheLife("hours");
  return chargerAteliers();
}

export async function ficheEnCache(id: string) {
  const ateliers = await catalogueEnCache();
  return ateliers.find((a) => a.id === id);
}
