export type Niveau = "debutant" | "intermediaire" | "avance";

export interface Atelier {
  id: string;
  titre: string;
  niveau: Niveau;
  prix: number;
  places: number;
  formateur?: string;
}

export interface Inscription {
  id: string;
  atelierId: string;
  courriel: string;
  dateInscription: string;
}
