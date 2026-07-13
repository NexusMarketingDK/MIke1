// To ekstra SEO-optimerede sektioner pr. ydelse, målrettet de "hotteste" emner
// inden for hver vagtform (fx byggepladsvagt om natten) og vinklen "dansk,
// autoriseret vagtfirma". Original dansk kopi — ingen opfundne tal eller kunder.

export type SeoBlok = { overskrift: string; afsnit: string[] };

export const ydelseEkstraSeo: Record<string, SeoBlok[]> = {
  byggepladsvagt: [
    {
      overskrift: "Byggepladsvagt om natten — når risikoen er størst",
      afsnit: [
        "De fleste tyverier og hærværk på danske byggepladser sker om natten, i weekender og hen over ferier, hvor pladsen står tom. Kabler og kobber, dieseltanke, el-værktøj, generatorer og GPS-sporet materiel er blandt de mest udsatte. En natvagt fra et dansk vagtfirma er til stede netop i de timer, hvor mekanisk sikring ikke rækker — og den fysiske tilstedeværelse virker afskrækkende i sig selv.",
        "Som byggepladsvagt om natten kombinerer vi fast tilstedeværelse og runderinger på skiftende tidspunkter, så et fast mønster ikke kan udnyttes. Vagten er trænet i at opdage brand, tyveri og uregelmæssigheder tidligt og reagere efter en klar procedure. Skal du bruge en natvagt til din byggeplads i trekantsområdet eller resten af Danmark, tilrettelægger vi bevogtningen efter pladsens fase og risiko.",
      ],
    },
    {
      overskrift: "Dansk, autoriseret vagtfirma frem for kun hegn og kameraer",
      afsnit: [
        "Hegn, alarmer og kameraer er gode værktøjer, men de stopper sjældent et tyveri, mens det sker — de dokumenterer det bagefter. En autoriseret byggepladsvagt griber ind i realtid, tilkalder de rette og forhindrer, at små hændelser bliver til dyre forsinkelser og forsikringsselvrisiko. Kombinationen af teknik og en synlig vagt giver den bedste sikkerhed for pengene.",
        "MT Vagt er et autoriseret dansk vagtselskab. Alt personale er vagtuddannet, sikkerhedsgodkendt af danske myndigheder og bærer legitimationskort udstedt af Rigspolitiet. Autorisationen er din garanti for, at bevogtningen af din byggeplads løses professionelt og lovligt — ikke af amatører.",
      ],
    },
  ],

  runderingsvagt: [
    {
      overskrift: "Runderingsvagt om natten og i ferieperioder",
      afsnit: [
        "Tomme ejendomme, lukkede virksomheder og ubemandede byggepladser er mest udsatte om natten og i ferier. En runderingsvagt kører planlagte natrunder på skiftende tidspunkter, så indbrudstyve ikke kan aflæse et fast mønster. Det er en omkostningseffektiv måde at holde øje med én eller flere adresser, uden at der skal stå en vagt fast hele natten.",
        "Under hver natrunde er vagten opmærksom på indbrud, brand, vandskader og tekniske fejl — ting der bliver dyre, hvis de opdages for sent. Har du behov for runderingsvagt om natten i trekantsområdet eller andre steder i Danmark, lægger vi en runderingsplan, der passer til din risiko og dit budget.",
      ],
    },
    {
      overskrift: "Mobil patrulje eller fast vagt — hvad kan bedst betale sig?",
      afsnit: [
        "Skal du bruge konstant tilstedeværelse, eller er planlagte tilsyn nok? En mobil runderingsvagt dækker flere adresser på én vagt og er ofte billigere end en fast vagt, mens en fastvagt giver uafbrudt tilstedeværelse, hvor risikoen er højest. Ofte er den rigtige løsning en kombination — fast vagt i de mest kritiske timer og rundering resten af tiden.",
        "Som autoriseret dansk vagtfirma rådgiver vi ærligt om, hvad der giver bedst sikkerhed for pengene. Alle runder dokumenteres, så du altid har overblik over, hvad der er sket, og om der er handlet på noget.",
      ],
    },
  ],

  "portvagt-stationaer-vagt": [
    {
      overskrift: "Adgangskontrol på store byggepladser og anlæg",
      afsnit: [
        "På store byggepladser, kommunale anlæg og virksomheder med mange leverandører er kontrol med, hvem der kommer ind og ud, afgørende for både sikkerhed og arbejdsmiljø. En portvagt styrer adgangen, registrerer køretøjer og personer, tjekker legitimation og sikrer, at kun godkendte har adgang — venligt, kontrolleret og dokumenteret.",
        "En stationær vagt ved porten er også første led i sikkerheden: uvedkommende opdages med det samme, og leverandører og gæster mødes professionelt. Vi tilpasser bemanding og procedurer til netop din lokation og dit sikkerhedsniveau.",
      ],
    },
    {
      overskrift: "Registrering og dokumenteret adgang med et dansk vagtfirma",
      afsnit: [
        "Dokumenteret adgangskontrol er værdifuld, hvis der senere sker en hændelse — så ved du præcis, hvem der har været på pladsen og hvornår. Vores portvagter fører en klar log over adgang og håndterer oplysninger ansvarligt og fortroligt.",
        "Som autoriseret dansk vagtselskab er alt personale vagtuddannet og sikkerhedsgodkendt. Skal du bruge portvagt eller stationær vagt i trekantsområdet eller resten af Danmark, sætter vi et hold, der matcher opgavens krav til sikkerhed og service.",
      ],
    },
  ],

  "akut-vagt": [
    {
      overskrift: "Akut vagt om natten — hurtig udrykning når skaden sker",
      afsnit: [
        "Når uheldet er ude — indbrud, hærværk, brand eller vandskade — er tid altafgørende. En akut vagt rykker hurtigt ud og bevogter stedet, så yderligere skade og tyveri forhindres, indtil situationen er under kontrol. Det gælder både om natten, i weekender og på helligdage, hvor egne folk sjældent kan være på pladsen med det samme.",
        "Vi tilbyder akut bevogtning for virksomheder, entreprenører, boligselskaber, foreninger, museer og hele den offentlige sektor. Har du et akut behov i trekantsområdet eller andre steder i Danmark, så ring til os — vi rykker hurtigt ud, døgnet rundt.",
      ],
    },
    {
      overskrift: "Bevogtning efter brand, vandskade eller opbrud",
      afsnit: [
        "Efter en brand, vandskade eller et indbrud står bygninger ofte åbne og ubeboelige. Uden bevogtning er de udsatte for følgetyveri og hærværk, mens skaden udbedres. En akut fastvagt sikrer stedet, holder uvedkommende ude og skaber ro til, at håndværkere og forsikring kan arbejde.",
        "Som autoriseret dansk vagtfirma sætter vi hurtigt en løsning op — fra en enkelt nat til bevogtning over flere uger. Alt personale er vagtuddannet, sikkerhedsgodkendt og kan yde førstehjælp og betjene hjertestarter.",
      ],
    },
  ],

  "servicevagt-butiksvagt": [
    {
      overskrift: "Butiksvagt og svind i detailhandlen",
      afsnit: [
        "Svind koster den danske detailhandel dyrt hvert år — både fra butikstyveri og internt svind. En synlig butiksvagt ændrer adfærd: de fleste tyverier er lejlighedsbestemte, og en vagt ved indgangen eller på gulvet fjerner lejligheden. Samtidig skaber vagten tryghed for både kunder og medarbejdere.",
        "Vores servicevagter kombinerer et vågent øje med en venlig, servicemindet fremtoning, så butikkens stemning bevares. Skal du mindske svind i din butik, dit varehus eller din virksomhed i trekantsområdet eller resten af Danmark, finder vi en løsning, der matcher din profil.",
      ],
    },
    {
      overskrift: "Synlig eller diskret vagt — dansk, autoriseret personale",
      afsnit: [
        "Nogle butikker har mest gavn af en tydeligt uniformeret vagt, der virker afskrækkende; andre foretrækker en mere diskret tilstedeværelse. Vi rådgiver om, hvad der passer til netop din butik, og kan kombinere begge dele efter behov og tidspunkt.",
        "MT Vagt er et autoriseret dansk vagtselskab. Alt personale er vagtuddannet, sikkerhedsgodkendt og bærer legitimationskort udstedt af Rigspolitiet — så du får professionel butiksbevogtning, der overholder loven.",
      ],
    },
  ],

  "tryghedsvagt-psykiatri": [
    {
      overskrift: "Tryghedsvagt i det offentlige rum og aftentimerne",
      afsnit: [
        "Tryghed i det offentlige rum handler om nærvær. En tryghedsvagt skaber ro på pladser, ved arrangementer og i boligområder — særligt om aftenen og natten, hvor utryghed ofte opstår. Vagten er synlig, rolig og handler forebyggende, så situationer ikke eskalerer.",
        "Vores tryghedsvagter har erfaring med at møde mennesker med respekt og tålmodighed. Skal I skabe et tryggere miljø i det offentlige rum i trekantsområdet eller andre steder i Danmark, tilrettelægger vi en løsning i tæt dialog med jer.",
      ],
    },
    {
      overskrift: "Konflikthåndtering på bosteder og i psykiatrien",
      afsnit: [
        "På bosteder og i psykiatriske miljøer stilles der høje krav til professionel og respektfuld konflikthåndtering. En tryghedsvagt aflaster personalet, skaber ro og håndterer situationer med sårbare borgere roligt og værdigt — altid i samarbejde med de fagfolk, der er til stede.",
        "Som autoriseret dansk vagtfirma er alt personale vagtuddannet, sikkerhedsgodkendt og kan yde førstehjælp og betjene hjertestarter. Vi lægger vægt på tålmodighed og forståelse — et tryggere Danmark starter med ordentlighed.",
      ],
    },
  ],

  fastvagt: [
    {
      overskrift: "Fastvagt om natten på en fast adresse",
      afsnit: [
        "Nogle opgaver kræver, at der står en vagt fast på adressen — hele natten eller døgnet rundt. En fastvagt giver uafbrudt tilstedeværelse, ét fast ansigt og hurtig reaktion, hvis noget sker. Det er den rigtige løsning, hvor risikoen er høj, eller hvor tryghed og genkendelighed er vigtig.",
        "Vi tilpasser fastvagten til dit behov — dag, nat eller døgn, i kortere eller længere perioder. Skal du bruge en fastvagt i trekantsområdet eller andre steder i Danmark, skræddersyr vi bemanding og tidsrum, så det passer præcist.",
      ],
    },
    {
      overskrift: "Fastvagt til tomme ejendomme og byggerier i standby",
      afsnit: [
        "Tomme ejendomme, byggerier i standby og bygninger under renovering er særligt udsatte for indbrud, hærværk og ulovlig beboelse. En fastvagt holder stedet bevogtet døgnet rundt eller om natten og forhindrer, at problemer opstår, mens ejendommen står ubenyttet.",
        "Som autoriseret dansk vagtselskab sætter vi hurtigt en fast vagt op og dokumenterer forløbet. Alt personale er vagtuddannet, sikkerhedsgodkendt og bærer legitimationskort udstedt af Rigspolitiet.",
      ],
    },
  ],

  kommunevagt: [
    {
      overskrift: "Kommunevagt: tryghed på genbrugspladser og kommunale anlæg",
      afsnit: [
        "Genbrugspladser, materielgårde og kommunale anlæg oplever både tyveri, uautoriseret aflæsning og konflikter. En kommunevagt skaber tryghed, styrer adgangen og hjælper med at holde orden — venligt over for borgerne og bestemt over for uvedkommende.",
        "Vi løser vagtopgaver for den offentlige sektor med diskret, servicemindet og myndighedsgodkendt personale. Skal jeres kommune eller institution i trekantsområdet eller andre steder i Danmark bruge en pålidelig vagtpartner, så tag fat i os.",
      ],
    },
    {
      overskrift: "Vagt til skoler, rådhuse og bosteder — et dansk vagtfirma",
      afsnit: [
        "Skoler, rådhuse, biblioteker og bosteder har brug for tryghed, der passer til stedet: synlig nok til at virke forebyggende, men rolig og servicemindet i mødet med borgere, elever og medarbejdere. Vi tilpasser løsningen til den enkelte institution og opgave.",
        "MT Vagt er et autoriseret dansk vagtselskab, og kommunevagt er en naturlig del af vores arbejde. Alt personale er vagtuddannet, sikkerhedsgodkendt af danske myndigheder og bærer legitimationskort udstedt af Rigspolitiet.",
      ],
    },
  ],
};
