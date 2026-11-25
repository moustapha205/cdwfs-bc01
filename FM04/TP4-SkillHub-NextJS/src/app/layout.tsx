import type { Metadata } from "next";
import Link from "next/link";
import { FournisseurInscriptions } from "@/contexts/Inscriptions";
import "./globals.css";

export const metadata: Metadata = {
  title: { template: "%s · SkillHub", default: "SkillHub" },
};

export default function LayoutRacine({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <header className="border-b p-4">
          <nav aria-label="Navigation principale" className="flex gap-4 max-w-6xl mx-auto">
            <Link href="/ateliers" className="hover:underline">Les ateliers</Link>
            <Link href="/mon-espace" className="hover:underline">Mon espace</Link>
          </nav>
        </header>
        <FournisseurInscriptions>
          <main className="flex-1 p-4 max-w-6xl w-full mx-auto">{children}</main>
        </FournisseurInscriptions>
      </body>
    </html>
  );
}
