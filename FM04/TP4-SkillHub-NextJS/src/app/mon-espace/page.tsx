import type { Metadata } from "next";
import { TitreDeVue } from "@/components/TitreDeVue";

export const metadata: Metadata = { title: "Mon espace" };

export default function MonEspace() {
  return (
    <section>
      <TitreDeVue enfants="Mon espace" />
      <p>Bienvenue sur votre espace protégé.</p>
    </section>
  );
}
