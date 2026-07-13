// Referencer og eksempler på opgaver.
//
// VIGTIGT: Navngivne referencer (fx G4S, Middelfart Kommune) må KUN stå her,
// hvis MT Vagt reelt har løst opgaver for dem. Teksterne herunder er holdt
// generelle og uden opdigtede tal, datoer eller citater — ret dem, så de
// præcist afspejler de faktiske opgaver, før siden bruges offentligt.

export type Reference = {
  navn: string;
  type: string; // fx "Samarbejdspartner" / "Offentlig kunde"
  resume: string; // kort
  beskrivelse: string[]; // opgavebeskrivelse
  ydelser: string[]; // hvilke vagtformer
};

export const referencer: Reference[] = [
  {
    navn: "G4S",
    type: "Samarbejdspartner · vikarservice",
    resume:
      "Levering af vagt-vikarer til en af branchens største aktører.",
    beskrivelse: [
      "MT Vagt & Vikarservice leverer kvalificerede vagt-vikarer til G4S. Vores personale er vagtuddannet, sikkerhedsgodkendt og bærer legitimationskort udstedt af Rigspolitiet, så de kan træde ind i opgaver med kort varsel og løse dem efter høj standard.",
      "Samarbejdet handler om pålidelig bemanding: at stille dygtige, mødestabile vagter til rådighed, når der er brug for ekstra kapacitet. Det stiller store krav til kvalitet og professionalisme — krav vi som autoriseret vagtselskab lever op til.",
    ],
    ydelser: ["Vikarservice", "Bemanding", "Fastvagt", "Portvagt"],
  },
  {
    navn: "Middelfart Kommune",
    type: "Offentlig kunde",
    resume:
      "Vagt- og tryghedsopgaver i den offentlige sektor lokalt.",
    beskrivelse: [
      "Som lokalt forankret vagtselskab med base i Middelfart løser MT Vagt vagtopgaver for den offentlige sektor. Opgaverne kan omfatte tilsyn, tryghed og bevogtning på kommunale anlæg og lokationer — altid med diskret, servicemindet og myndighedsgodkendt personale.",
      "Arbejde i det offentlige stiller høje krav til ordentlighed, dokumentation og respekt i mødet med borgerne. Alt vores personale er vagtuddannet og sikkerhedsgodkendt, og kommunevagt er en naturlig del af vores arbejde.",
    ],
    ydelser: ["Kommunevagt", "Runderingsvagt", "Tryghedsvagt", "Portvagt"],
  },

  // ─────────────────────────────────────────────────────────────
  // TILFØJ FLERE REFERENCER HER:
  // Kopiér blokken herunder, fjern de to // foran hver linje, og udfyld.
  // ─────────────────────────────────────────────────────────────
  // {
  //   navn: "Kundens navn",
  //   type: "Kunde", // fx "Kunde" / "Samarbejdspartner" / "Offentlig kunde"
  //   resume: "Kort sætning om opgaven.",
  //   beskrivelse: [
  //     "Første afsnit: hvad gik opgaven ud på?",
  //     "Andet afsnit: hvordan løste vi den?",
  //   ],
  //   ydelser: ["Byggepladsvagt", "Runderingsvagt"], // vagtformer brugt
  // },
];

// Eksempler på typiske opgaver (uden navngivne kunder — repræsentative).
export type OpgaveEksempel = {
  titel: string;
  ydelse: string;
  beskrivelse: string;
};

export const opgaveEksempler: OpgaveEksempel[] = [
  {
    titel: "Natbevogtning af byggeplads",
    ydelse: "Byggepladsvagt",
    beskrivelse:
      "Fast natvagt og runderinger på en større byggeplads i trekantsområdet for at forebygge tyveri af materiel og værktøj samt brand uden for arbejdstid.",
  },
  {
    titel: "Rundering for boligselskab",
    ydelse: "Runderingsvagt",
    beskrivelse:
      "Planlagte natrunder på skiftende tidspunkter i et boligområde — tilsyn med fællesarealer, kældre og p-anlæg for at skabe tryghed for beboerne.",
  },
  {
    titel: "Adgangskontrol ved arrangement",
    ydelse: "Portvagt / event",
    beskrivelse:
      "Bemanding af indgange og adgangskontrol ved et arrangement, hvor gæster og leverandører blev mødt venligt og kontrolleret, og uvedkommende blev holdt ude.",
  },
  {
    titel: "Butiksvagt i detailhandlen",
    ydelse: "Butiksvagt",
    beskrivelse:
      "Synlig, servicemindet butiksvagt i et varehus for at mindske svind og skabe tryghed for både kunder og medarbejdere.",
  },
  {
    titel: "Akut bevogtning efter skade",
    ydelse: "Akut vagt",
    beskrivelse:
      "Hurtig udrykning og bevogtning af en bygning, der stod åben efter en vand-/indbrudsskade, indtil den kunne sikres og udbedres.",
  },
  {
    titel: "Tryghedsvagt på bosted",
    ydelse: "Tryghedsvagt",
    beskrivelse:
      "Tryghedsskabende tilstedeværelse og rolig konflikthåndtering på et bosted i tæt samarbejde med stedets personale.",
  },

  // ─────────────────────────────────────────────────────────────
  // TILFØJ FLERE EKSEMPLER HER:
  // Kopiér blokken herunder, fjern de to // foran hver linje, og udfyld.
  // ─────────────────────────────────────────────────────────────
  // {
  //   titel: "Kort titel på opgaven",
  //   ydelse: "Byggepladsvagt", // hvilken vagtform
  //   beskrivelse: "1-2 sætninger om opgaven (uden opdigtede tal eller kundenavne).",
  // },
];
