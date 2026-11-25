import { useCallback, useEffect, useState } from "react";
import { chargerAteliers } from "../services/api";
import type { Atelier } from "../types";

export type Requete<T> =
  | { statut: "chargement" }
  | { statut: "erreur"; message: string }
  | { statut: "succes"; donnees: T };

export function useAteliers() {
  const [req, setReq] = useState<Requete<Atelier[]>>({ statut: "chargement" });
  const [tick, setTick] = useState(0);

  const recharger = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    setReq({ statut: "chargement" });
    const ctrl = new AbortController();

    chargerAteliers(ctrl.signal)
      .then((donnees) => setReq({ statut: "succes", donnees }))
      .catch((err: Error) => {
        if (err.name === "AbortError") return;
        setReq({ statut: "erreur", message: err.message || "Erreur réseau" });
      });

    return () => ctrl.abort();
  }, [tick]);

  return { req, recharger };
}
