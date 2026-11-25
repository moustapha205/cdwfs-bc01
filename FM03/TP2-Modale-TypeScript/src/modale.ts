import type { Atelier } from "./types.js";

export function placesRestantes(atelier: Atelier, inscrits: number): number {
  return Math.max(0, atelier.places - inscrits);
}

export function initialiserModale(ateliers: Atelier[]): void {
  const modale = document.querySelector<HTMLDialogElement>("#modale-inscription");
  const form = document.querySelector<HTMLFormElement>("#form-inscription");
  const champCourriel = document.querySelector<HTMLInputElement>("#courriel");
  const aideCourriel = document.querySelector<HTMLElement>("#aide-courriel");
  const liste = document.querySelector<HTMLElement>("#liste-ateliers");

  if (!modale || !form || !champCourriel || !aideCourriel || !liste) {
    throw new Error("Éléments DOM indispensables de la modale introuvables.");
  }

  let declencheur: HTMLElement | null = null;

  liste.addEventListener("click", (e: MouseEvent) => {
    const cible = e.target as HTMLElement | null;
    const bouton = cible?.closest<HTMLButtonElement>("[data-inscrire]");
    if (!bouton) return;

    const id = bouton.dataset.inscrire;
    const atelier = ateliers.find((a) => a.id === id);
    if (!atelier || atelier.places === 0) return;

    declencheur = bouton;
    modale.showModal();
  });

  modale.addEventListener("close", () => {
    declencheur?.focus();
  });

  champCourriel.addEventListener("input", () => {
    const ok = champCourriel.checkValidity();
    champCourriel.setAttribute("aria-invalid", String(!ok));
    aideCourriel.textContent = ok ? "Adresse valide." : "Format attendu : nom@domaine.fr";
  });
}
