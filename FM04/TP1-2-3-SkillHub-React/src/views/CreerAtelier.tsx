import { useState } from "react";
import { TitreDeVue } from "../components/TitreDeVue";
import { creerAtelierApi } from "../services/api";
import type { Atelier } from "../types";

export function CreerAtelier({ onCree }: { onCree: (a: Atelier) => void }) {
  const [titre, setTitre] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const [envoi, setEnvoi] = useState(false);

  async function soumettre(e: React.FormEvent) {
    e.preventDefault();
    if (titre.trim().length < 5) {
      setErreur("Le titre doit faire au moins 5 caractères.");
      return;
    }
    setErreur(null);
    setEnvoi(true);
    try {
      const cree = await creerAtelierApi({
        titre: titre.trim(),
        niveau: "Débutant",
        prix: 0,
        places: 10,
        resume: "Atelier créé via l'API.",
      });
      onCree(cree);
      setTitre("");
    } catch {
      setErreur("L'enregistrement a échoué. Vérifiez que json-server tourne.");
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <section>
      <TitreDeVue enfants="Créer un atelier" />
      <form onSubmit={soumettre} noValidate className="max-w-md space-y-4">
        <div>
          <label htmlFor="titre" className="block font-medium mb-1">Titre de l'atelier</label>
          <input
            id="titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            aria-invalid={!!erreur}
            aria-describedby={erreur ? "err-titre" : undefined}
            className="border rounded p-2 w-full focus-visible:outline-2 focus-visible:outline-focus"
          />
          {erreur && <p id="err-titre" role="alert" className="text-red-600 text-xs mt-1">{erreur}</p>}
        </div>
        <button
          type="submit"
          disabled={envoi}
          className="rounded bg-accent text-fond px-4 py-2 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-focus"
        >
          {envoi ? "Envoi..." : "Créer l'atelier"}
        </button>
      </form>
    </section>
  );
}
