import Link from "next/link";
import { TitreDeVue } from "@/components/TitreDeVue";

export default function NotFound() {
  return (
    <section>
      <TitreDeVue enfants="Page introuvable (404)" />
      <Link href="/ateliers" className="underline text-amber-700">Retourner au catalogue</Link>
    </section>
  );
}
