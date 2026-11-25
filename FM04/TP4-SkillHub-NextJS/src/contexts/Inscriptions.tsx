"use client";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type Ctx = {
  inscrits: string[];
  inscrire: (id: string) => void;
  annuler: (id: string) => void;
};

const InscriptionsContext = createContext<Ctx | null>(null);

export function FournisseurInscriptions({ children }: { children: ReactNode }) {
  const [inscrits, setInscrits] = useState<string[]>([]);

  const valeur = useMemo<Ctx>(
    () => ({
      inscrits,
      inscrire: (id) => setInscrits((prev) => (prev.includes(id) ? prev : [...prev, id])),
      annuler: (id) => setInscrits((prev) => prev.filter((x) => x !== id)),
    }),
    [inscrits]
  );

  return (
    <InscriptionsContext.Provider value={valeur}>
      {children}
    </InscriptionsContext.Provider>
  );
}

export function useInscriptions() {
  const ctx = useContext(InscriptionsContext);
  if (!ctx) throw new Error("useInscriptions hors du fournisseur");
  return ctx;
}
