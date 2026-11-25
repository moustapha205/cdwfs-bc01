// TP 1 (FM03) — Réécriture en délégation d'événements et état sorti du DOM

// 1. État centralisé hors du DOM (une seule source de vérité)
let etat = {
  menuOuvert: window.innerWidth >= 768,
  atelierEnCours: null,
  envoiEnCours: false,
};

const nav = document.querySelector("#nav-principale");
const btnMenu = document.querySelector("#btn-menu");
const menuPrincipal = document.querySelector("#menu-principal");
const listeAteliers = document.querySelector("#liste-ateliers");
const modale = document.querySelector("#modale-inscription");
const atelierSelectionne = document.querySelector("#atelier-selectionne");
const form = document.querySelector("#form-inscription");
const champCourriel = document.querySelector("#courriel");
const aideCourriel = document.querySelector("#aide-courriel");
const btnSoumettre = document.querySelector("#btn-soumettre");
const messageStatut = document.querySelector("#message-statut");

let dernierDeclencheur = null;

// 2. Une seule fonction de rendu : l'écran est toujours le reflet de l'état
function rendre() {
  btnMenu.setAttribute("aria-expanded", String(etat.menuOuvert));
  menuPrincipal.hidden = !etat.menuOuvert;

  btnSoumettre.disabled = etat.envoiEnCours;
  btnSoumettre.textContent = etat.envoiEnCours ? "Inscription en cours..." : "Confirmer";
}

function majEtat(partiel) {
  etat = { ...etat, ...partiel };
  rendre();
}

// 3. Délégation d'événements sur la navigation
nav.addEventListener("click", (e) => {
  const bouton = e.target.closest("#btn-menu");
  if (bouton) {
    majEtat({ menuOuvert: !etat.menuOuvert });
    return;
  }
  if (e.target.closest("a") && window.innerWidth < 768) {
    majEtat({ menuOuvert: false });
  }
});

// Délégation sur la liste des ateliers (un seul écouteur pour toutes les cartes)
listeAteliers.addEventListener("click", (e) => {
  const bouton = e.target.closest("[data-inscrire]");
  if (!bouton) return;

  dernierDeclencheur = bouton;
  const id = bouton.dataset.inscrire;
  const titre = document.querySelector(`#titre-${id}`)?.textContent ?? id;
  atelierSelectionne.textContent = `Atelier : ${titre}`;
  majEtat({ atelierEnCours: id });
  modale.showModal();
});

// Fermeture clavier Échap + clic extérieur pour le menu
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && etat.menuOuvert && window.innerWidth < 768) {
    majEtat({ menuOuvert: false });
    btnMenu.focus();
  }
});

document.addEventListener("click", (e) => {
  if (etat.menuOuvert && !e.target.closest("#nav-principale") && window.innerWidth < 768) {
    majEtat({ menuOuvert: false });
  }
});

// Retour du focus à la fermeture de la modale
modale.addEventListener("close", () => {
  majEtat({ atelierEnCours: null, envoiEnCours: false });
  if (dernierDeclencheur) dernierDeclencheur.focus();
});

// Validation au fil de la saisie
champCourriel.addEventListener("input", () => {
  const valide = champCourriel.checkValidity();
  champCourriel.setAttribute("aria-invalid", String(!valide));
  aideCourriel.classList.toggle("erreur", !valide);
  aideCourriel.textContent = valide
    ? "Adresse valide."
    : "Format attendu : nom@domaine.fr";
});

// Soumission avec prévention du rechargement et protection double envoi
form.addEventListener("submit", (e) => {
  if (e.submitter && e.submitter.value === "annuler") return;

  if (!form.checkValidity()) {
    e.preventDefault();
    champCourriel.setAttribute("aria-invalid", "true");
    aideCourriel.classList.add("erreur");
    champCourriel.focus();
    return;
  }

  e.preventDefault();
  majEtat({ envoiEnCours: true });

  setTimeout(() => {
    messageStatut.textContent = `Inscription confirmée pour ${champCourriel.value}.`;
    form.reset();
    modale.close("creer");
  }, 400);
});

rendre();
