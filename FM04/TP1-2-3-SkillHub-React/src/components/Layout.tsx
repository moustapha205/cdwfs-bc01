import { NavLink, Outlet } from "react-router-dom";

export function Layout() {
  const styleLien = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "font-bold underline text-accent focus-visible:outline-2 focus-visible:outline-focus"
      : "hover:underline focus-visible:outline-2 focus-visible:outline-focus";

  return (
    <div className="min-h-screen flex flex-col bg-fond text-texte">
      <header className="border-b p-4">
        <nav aria-label="Navigation principale" className="flex flex-wrap gap-4 max-w-6xl mx-auto">
          <NavLink to="/ateliers" className={styleLien}>Catalogue</NavLink>
          <NavLink to="/mon-espace" className={styleLien}>Mon espace</NavLink>
          <NavLink to="/mes-ateliers" className={styleLien}>Mes ateliers</NavLink>
          <NavLink to="/creer-atelier" className={styleLien}>Créer un atelier</NavLink>
        </nav>
      </header>

      <main className="flex-1 p-4 max-w-6xl w-full mx-auto">
        <Outlet />
      </main>

      <footer className="border-t p-4 text-xs text-secondaire text-center">
        SkillHub · Formation CDWFS
      </footer>
    </div>
  );
}
