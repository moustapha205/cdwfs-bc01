import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const TITRES: Record<string, string> = {
  "/ateliers": "Les ateliers · SkillHub",
  "/mon-espace": "Mon espace · SkillHub",
  "/mes-ateliers": "Mes ateliers · SkillHub",
  "/creer-atelier": "Créer un atelier · SkillHub",
};

export function TitreDeVue({ enfants }: { enfants: string }) {
  const { pathname } = useLocation();
  const ancre = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    document.title = TITRES[pathname] ?? "SkillHub";
    window.scrollTo(0, 0);
    ancre.current?.focus();
  }, [pathname]);

  return (
    <h1 ref={ancre} tabIndex={-1} className="text-xl font-bold mb-4 outline-none">
      {enfants}
    </h1>
  );
}
