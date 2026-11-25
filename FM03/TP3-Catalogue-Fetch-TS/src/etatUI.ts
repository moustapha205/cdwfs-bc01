import type { Atelier } from "../../TP2-Modale-TypeScript/src/types.js";

export type EtatRequete = "chargement" | "vide" | "erreur" | "succes";

export function carteAtelier(a: Atelier): HTMLLIElement {
  const li = document.createElement("li");
  li.className = "carte";
  li.dataset.id = a.id;

  const h3 = document.createElement("h3");
  h3.id = `titre-${a.id}`;
  h3.textContent = a.titre;

  const meta = document.createElement("p");
  meta.className = "meta";
  meta.textContent = `${a.niveau} · ${a.prix} € · ${a.places} place(s) · ${a.formateur ?? "Équipe SkillHub"}`;

  const bouton = document.createElement("button");
  bouton.type = "button";
  bouton.className = "btn-primaire";
  bouton.textContent = a.places > 0 ? "M'inscrire" : "Atelier complet";
  bouton.disabled = a.places === 0;
  bouton.setAttribute("aria-describedby", `titre-${a.id}`);

  li.append(h3, meta, bouton);
  return li;
}

export function etatUI(etat: EtatRequete, charge?: Atelier[] | Error, onReessayer?: () => void): void {
  const zone = document.querySelector<HTMLElement>("#liste");
  const msg = document.querySelector<HTMLElement>("#message");
  if (!zone || !msg) return;

  document.body.setAttribute("aria-busy", String(etat === "chargement"));
  msg.removeAttribute("role");

  switch (etat) {
    case "chargement":
      msg.textContent = "Chargement des ateliers...";
      zone.replaceChildren();
      return;
    case "erreur": {
      msg.setAttribute("role", "alert");
      msg.textContent = `Impossible de charger : ${(charge as Error).message}. `;
      if (onReessayer) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = "Réessayer";
        btn.addEventListener("click", onReessayer, { once: true });
        msg.append(btn);
      }
      zone.replaceChildren();
      return;
    }
    case "vide":
      msg.textContent = "Aucun atelier ne correspond à ces filtres. Élargissez la recherche.";
      zone.replaceChildren();
      return;
    case "succes": {
      const liste = charge as Atelier[];
      msg.textContent = `${liste.length} atelier${liste.length > 1 ? "s" : ""} trouvé${liste.length > 1 ? "s" : ""}`;
      zone.replaceChildren(...liste.map(carteAtelier));
      return;
    }
  }
}
