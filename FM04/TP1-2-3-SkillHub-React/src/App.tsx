import { FournisseurInscriptions } from "./contexts/Inscriptions";
import { useAteliers } from "./hooks/useAteliers";
import { Routeur } from "./router/routes";

function ContenuApp() {
  const { req, recharger } = useAteliers();

  switch (req.statut) {
    case "chargement":
      return <p aria-busy="true" className="p-8 text-center">Chargement des ateliers en cours...</p>;
    case "erreur":
      return (
        <div role="alert" className="p-8 text-center space-y-4">
          <p className="text-red-600">Erreur : {req.message}</p>
          <button type="button" onClick={recharger} className="rounded bg-accent px-4 py-2 text-fond">
            Réessayer
          </button>
        </div>
      );
    case "succes":
      return <Routeur ateliers={req.donnees} onCree={recharger} />;
  }
}

export default function App() {
  return (
    <FournisseurInscriptions>
      <ContenuApp />
    </FournisseurInscriptions>
  );
}
