import type { Metadata } from "next";
import { Catalogue } from "@/components/Catalogue";
import { TitreDeVue } from "@/components/TitreDeVue";
import { catalogueEnCache } from "@/services/en-cache";

export const metadata: Metadata = { title: "Les ateliers" };

export default async function PageAteliers() {
  const ateliers = await catalogueEnCache();
  return (
    <section>
      <TitreDeVue enfants="Les ateliers" />
      {ateliers.length === 0 ? (
        <p>Aucun atelier pour l'instant.</p>
      ) : (
        <Catalogue ateliers={ateliers} />
      )}
    </section>
  );
}
