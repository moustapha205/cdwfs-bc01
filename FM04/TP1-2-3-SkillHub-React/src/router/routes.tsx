import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Catalogue } from "../views/Catalogue";
import { CreerAtelier } from "../views/CreerAtelier";
import { FicheAtelier } from "../views/FicheAtelier";
import { MesAteliers } from "../views/MesAteliers";
import { PageIntrouvable } from "../views/PageIntrouvable";
import type { Atelier } from "../types";

const Dashboard = lazy(() =>
  import("../views/Dashboard").then((m) => ({ default: m.Dashboard }))
);

function ExigeConnexion() {
  const utilisateurConnecte = true;
  return utilisateurConnecte ? <Outlet /> : <Navigate to="/ateliers" replace />;
}

export function Routeur({ ateliers, onCree }: { ateliers: Atelier[]; onCree: (a: Atelier) => void }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/ateliers" replace />} />
          <Route path="ateliers" element={<Catalogue ateliers={ateliers} />} />
          <Route path="ateliers/:id" element={<FicheAtelier ateliers={ateliers} />} />
          <Route element={<ExigeConnexion />}>
            <Route
              path="mon-espace"
              element={
                <Suspense fallback={<p aria-busy="true">Chargement du tableau de bord...</p>}>
                  <Dashboard ateliers={ateliers} />
                </Suspense>
              }
            />
            <Route path="mes-ateliers" element={<MesAteliers ateliers={ateliers} />} />
            <Route path="creer-atelier" element={<CreerAtelier onCree={onCree} />} />
          </Route>
          <Route path="*" element={<PageIntrouvable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
