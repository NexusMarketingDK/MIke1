// Ydelses-datamodel. 8 sider under /vi-tilbyder/[slug].
// Kopi er skrevet ud fra de bekræftede kerne-beskrivelser i briefen — ingen opfundne facts.

export type Ydelse = {
  slug: string;
  gammelSlug?: string; // Joomla-sti til 301-redirect
  titel: string;
  undertitel: string;
  kerne: string; // kort kerneopgave
  ikon: string; // navn på ikon-glyph
  intro: string; // 1-2 sætninger til hero/oversigt
  punkter: string[]; // hvad løsningen dækker
  relaterede: string[]; // slugs til intern linking (2-3)
  seoTitel: string;
  seoBeskrivelse: string;
};

export const ydelser: Ydelse[] = [
  {
    slug: "byggepladsvagt",
    gammelSlug: "259-byggepladsvagt",
    titel: "Byggepladsvagt",
    undertitel: "Bevogtning af materiel, værktøj og maskiner",
    kerne:
      "Stigende tyveri fra byggepladser, der er svære at hegne og sikre mekanisk.",
    ikon: "crane",
    intro:
      "Byggepladser er svære at sikre mekanisk og et oplagt mål for tyveri og hærværk. En synlig vagt beskytter materiel, værktøj og maskiner — og forebygger brand uden for arbejdstid.",
    punkter: [
      "Materiel-, værktøjs- og maskintyveri",
      "Hærværk og uautoriseret adgang",
      "Brandforebyggelse uden for arbejdstid",
      "Rundering og fast tilstedeværelse efter behov",
    ],
    relaterede: ["runderingsvagt", "portvagt-stationaer-vagt", "akut-vagt"],
    seoTitel: "Byggepladsvagt Fyn & Trekantsområdet | MT Vagt",
    seoBeskrivelse:
      "Autoriseret byggepladsvagt i trekantsområdet. Beskyt materiel, værktøj og maskiner mod tyveri, hærværk og brand. Ring +45 3131 4428.",
  },
  {
    slug: "runderingsvagt",
    gammelSlug: "269-runderingsvagt",
    titel: "Runderingsvagt",
    undertitel: "Tilsyn uden for normal åbningstid",
    kerne:
      "Tilsyn i boliger, virksomheder og på byggepladser uden for normal åbningstid.",
    ikon: "route",
    intro:
      "Vores runderingsvagter fører tilsyn i boliger, virksomheder og på byggepladser uden for normal åbningstid — opmærksomme på brand, kriminalitet og uregelmæssigheder.",
    punkter: [
      "Planlagte tilsyn på skiftende tidspunkter",
      "Opmærksomhed på brand og tekniske fejl",
      "Afdækning af kriminalitet og uregelmæssigheder",
      "Dokumenteret rapportering efter hver runde",
    ],
    relaterede: ["byggepladsvagt", "fastvagt", "akut-vagt"],
    seoTitel: "Runderingsvagt i trekantsområdet | MT Vagt",
    seoBeskrivelse:
      "Runderingsvagt med tilsyn uden for åbningstid i boliger, virksomheder og på byggepladser. Autoriseret vagtselskab. Ring +45 3131 4428.",
  },
  {
    slug: "portvagt-stationaer-vagt",
    gammelSlug: "267-portvagt-stationaer-vagt",
    titel: "Portvagt / stationær vagt",
    undertitel: "Adgangskontrol med høj sikkerhed og service",
    kerne:
      "Adgangskontrol til byggepladser, kommuner og større virksomheder.",
    ikon: "gate",
    intro:
      "Portvagten styrer adgangen til byggepladser, kommuner og større virksomheder med behov for høj sikkerhed og god service — venligt, kontrolleret og dokumenteret.",
    punkter: [
      "Adgangskontrol af personer og køretøjer",
      "Registrering og legitimation ved indgang",
      "Servicemindet modtagelse af gæster og leverandører",
      "Kontrol af sikkerheds- og adgangsregler",
    ],
    relaterede: ["byggepladsvagt", "servicevagt-butiksvagt", "kommunevagt"],
    seoTitel: "Portvagt & stationær vagt | Adgangskontrol | MT Vagt",
    seoBeskrivelse:
      "Portvagt og stationær vagt til adgangskontrol på byggepladser, i kommuner og virksomheder. Høj sikkerhed og service. Ring +45 3131 4428.",
  },
  {
    slug: "akut-vagt",
    gammelSlug: "268-akut-vagt-opgaver",
    titel: "Akut vagt",
    undertitel: "Hurtig udrykning og bevogtning",
    kerne:
      "Bevogtning af udstyr med hurtig udrykning for private og offentlige.",
    ikon: "siren",
    intro:
      "Når noget sker akut, rykker vi hurtigt ud og bevogter udstyr for virksomheder, entreprenører, boligselskaber, foreninger, museer og hele den offentlige sektor.",
    punkter: [
      "Hurtig udrykning ved akutte hændelser",
      "Bevogtning af udstyr og bygninger",
      "Løsninger til både private og offentlige kunder",
      "Døgndækning i trekantsområdet",
    ],
    relaterede: ["runderingsvagt", "fastvagt", "byggepladsvagt"],
    seoTitel: "Akut vagt med hurtig udrykning | MT Vagt",
    seoBeskrivelse:
      "Akut vagt med hurtig udrykning og bevogtning i trekantsområdet — døgnet rundt. Autoriseret vagtselskab. Ring +45 3131 4428.",
  },
  {
    slug: "servicevagt-butiksvagt",
    gammelSlug: "266-servicevagt-butiksvagt",
    titel: "Servicevagt / butiksvagt",
    undertitel: "Servicemindet vagt med venlig fremtoning",
    kerne:
      "Vagt i virksomhed, varehus eller butik med venlig, servicemindet fremtoning.",
    ikon: "cart",
    intro:
      "En servicemindet vagt i virksomhed, varehus eller butik skaber tryghed for både kunder og medarbejdere — med en venlig fremtoning og et vågent øje.",
    punkter: [
      "Synlig, tryghedsskabende tilstedeværelse",
      "Forebyggelse af svind og butikstyveri",
      "Venlig og servicemindet kundekontakt",
      "Håndtering af uro og konflikter",
    ],
    relaterede: ["portvagt-stationaer-vagt", "tryghedsvagt-psykiatri", "fastvagt"],
    seoTitel: "Butiksvagt & servicevagt | Mindsk svind | MT Vagt",
    seoBeskrivelse:
      "Servicevagt og butiksvagt der mindsker svind og skaber tryghed i butik, varehus og virksomhed. Venlig fremtoning. Ring +45 3131 4428.",
  },
  {
    slug: "tryghedsvagt-psykiatri",
    gammelSlug: "263-tryghedsvagt-psykiatri",
    titel: "Tryghedsvagt / psykiatri",
    undertitel: "Tryghed i det offentlige rum og på bosteder",
    kerne:
      "Tryghedsvagter i det offentlige rum, på bosteder og i psykiatriske miljøer.",
    ikon: "heart-shield",
    intro:
      "Vores tryghedsvagter skaber ro og tryghed i det offentlige rum, på bosteder og i psykiatriske miljøer — med respekt, tålmodighed og professionel konflikthåndtering. Et tryggere Danmark.",
    punkter: [
      "Tryghedsskabende tilstedeværelse",
      "Rolig og respektfuld konflikthåndtering",
      "Erfaring med sårbare borgere",
      "Samarbejde med personale og myndigheder",
    ],
    relaterede: ["kommunevagt", "servicevagt-butiksvagt", "fastvagt"],
    seoTitel: "Tryghedsvagt & psykiatri | Et tryggere Danmark | MT Vagt",
    seoBeskrivelse:
      "Tryghedsvagt i det offentlige rum, på bosteder og i psykiatrien. Professionel konflikthåndtering og respekt. Ring +45 3131 4428.",
  },
  {
    slug: "fastvagt",
    gammelSlug: "262-fastvagt",
    titel: "Fastvagt",
    undertitel: "Fast tilstedeværelse dag og nat",
    kerne: "Medarbejder fast på en given adresse, dag og/eller nat.",
    ikon: "pin",
    intro:
      "Har du brug for en fast vagt på en bestemt adresse? Vi placerer en dedikeret medarbejder dag og/eller nat — kontinuerlig tryghed, ét fast ansigt.",
    punkter: [
      "Dedikeret vagt på fast adresse",
      "Dag-, nat- eller døgndækning",
      "Fast kontaktperson og genkendelighed",
      "Skræddersyet til opgavens behov",
    ],
    relaterede: ["runderingsvagt", "portvagt-stationaer-vagt", "akut-vagt"],
    seoTitel: "Fastvagt dag og nat | MT Vagt",
    seoBeskrivelse:
      "Fastvagt med dedikeret medarbejder på fast adresse — dag, nat eller døgnet rundt. Autoriseret vagtselskab. Ring +45 3131 4428.",
  },
  {
    slug: "kommunevagt",
    titel: "Kommunevagt / offentlig sektor",
    undertitel: "Tryghed i den offentlige sektor",
    kerne:
      "Vagtløsninger til kommuner: bosteder, genbrugspladser, skoler og rådhuse.",
    ikon: "building",
    intro:
      "Vi løser vagtopgaver for den offentlige sektor — bosteder, genbrugspladser, skoler og rådhuse — med diskret, servicemindet og myndighedsgodkendt personale. En løsning der passer til vores eksisterende arbejde i det offentlige.",
    punkter: [
      "Bosteder og sociale tilbud",
      "Genbrugspladser og kommunale anlæg",
      "Skoler, rådhuse og offentlige bygninger",
      "Kontrakter tilpasset kommunale behov",
    ],
    relaterede: ["tryghedsvagt-psykiatri", "portvagt-stationaer-vagt", "runderingsvagt"],
    seoTitel: "Kommunevagt til den offentlige sektor | MT Vagt",
    seoBeskrivelse:
      "Kommunevagt til bosteder, genbrugspladser, skoler og rådhuse. Myndighedsgodkendt og servicemindet vagtløsning. Ring +45 3131 4428.",
  },
];

export const ydelseBySlug = (slug: string) =>
  ydelser.find((y) => y.slug === slug);
