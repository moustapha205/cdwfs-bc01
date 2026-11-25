import { notFound } from "next/navigation";
import Link from "next/link";
import { TitreDeVue } from "@/components/TitreDeVue";
import { catalogueEnCache, ficheEnCache } from "@/services/en-cache";

export async function generateStaticParams() {
  return (await catalogueEnCache()).map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const atelier = await ficheEnCache((await params).id);
  return { title: atelier?.titre ?? "Atelier introuvable" };
}

export default async function FicheAtelier({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const atelier = await ficheEnCache(id);
  if (!atelier) notFound();

  return (
    <article className="space-y-4">
      <TitreDeVue enfants={atelier.titre} />
      <p>Niveau {atelier.niveau} · {atelier.prix} € · {atelier.places} places</p>
      <p>{atelier.resume}</p>
      <Link href="/ateliers" className="underline text-amber-700">Retour au catalogue</Link>
    </article>
  );
}
