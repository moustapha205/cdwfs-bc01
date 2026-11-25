import type { Metadata } from "next";
import { TitreDeVue } from "@/components/TitreDeVue";

export const metadata: Metadata = { title: "Connexion" };

export default function Connexion() {
  return (
    <section>
      <TitreDeVue enfants="Connexion" />
      <p>Veuillez vous authentifier pour accéder à votre espace.</p>
    </section>
  );
}
