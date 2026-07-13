// Kundeanmeldelser — KUN ægte anmeldelser må stå her.
// Indsæt rigtige citater fra fx Google, Trustpilot eller direkte kundeudtalelser
// (med kundens tilladelse). Lad listen være tom, indtil I har ægte anmeldelser —
// så viser sitet en pæn "bliv vores næste kunde"-sektion i stedet for opdigtede anmeldelser.

export type Anmeldelse = {
  navn: string; // kundens navn eller virksomhed
  rolle?: string; // fx "Byggeleder, Fredericia"
  tekst: string; // selve anmeldelsen (ægte citat)
  stjerner?: 1 | 2 | 3 | 4 | 5;
  kilde?: string; // fx "Google" / "Trustpilot"
};

export const anmeldelser: Anmeldelse[] = [
  // Eksempel på format (fjern kommentaren og indsæt ægte anmeldelser):
  // {
  //   navn: "Byggefirma A/S",
  //   rolle: "Byggeleder, Kolding",
  //   tekst: "MT Vagt løste opgaven professionelt og hurtigt ...",
  //   stjerner: 5,
  //   kilde: "Google",
  // },
];

// Link til jeres offentlige anmeldelser (fx Google Business-profil).
// Sæt til null hvis I ikke har et link endnu.
export const anmeldelserUrl: string | null = null;
