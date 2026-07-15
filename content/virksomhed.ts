// Verificerede virksomhedsoplysninger for MT Vagt & Vikarservice ApS.
// Alle facts her er bekræftede — der må ikke opfindes tal, årstal eller kundenavne.

export const virksomhed = {
  navn: "MT Vagt & Vikarservice ApS",
  kortNavn: "MT Vagt",
  slogan: "Døgnvagt · Tillid · Tryghed",
  positionering:
    "Vi stræber ikke efter at blive de største i branchen, men vi sætter en ære i at løse alle opgaver efter høj standard.",
  garanti:
    "Et autoriseret vagtselskab er din garanti for, at opgaven ikke løses af amatører.",
  adresse: {
    gade: "Østergade 12",
    postnr: "5500",
    by: "Middelfart",
    land: "Danmark",
  },
  cvr: "44747340",
  telefon: {
    visning: "+45 3131 4428",
    // Til tel:-links (kun cifre, med landekode)
    kald: "+4531314428",
  },
  // E-mailen bygges i klienten af dele for at beskytte mod spam-robotter.
  emailDele: ["info", "mtvagt.dk"],
  // Primært fokusområde (bruges i sætninger om nærområdet).
  region: "trekantsområdet",
  // Bredt dækningsområde: hele landet + Malmö, men med hovedfokus på trekantsområdet.
  daekningBred: "hele Danmark og Malmö",
  daekningSaetning:
    "Vi har base i Middelfart og ekspertise i hele Danmark og Malmö — med hovedfokus på trekantsområdet.",
  base: "Middelfart",
  daekning: [
    "Middelfart",
    "Fredericia",
    "Kolding",
    "Vejle",
    "Odense",
    "Malmö",
    "Hele Danmark",
  ],
  autorisation: {
    autoriseret: true,
    tekst:
      "Autoriseret vagtselskab. Alt personale er vagtuddannet, sikkerhedsgodkendt af danske myndigheder og godkendt til at arbejde under vagtloven.",
    isoCertifikat: "/docs/ISO_Certificat_MT_Vagt.pdf",
    vslMedlem: true,
    vslUrl: "https://vsl.dk",
    rigspoliti:
      "Alle vagter bærer vagt-legitimationskort udstedt af Rigspolitiet.",
    foerstehjaelp:
      "Alle vagter kan yde førstehjælp og betjene hjertestarter.",
  },
} as const;

export type Virksomhed = typeof virksomhed;
