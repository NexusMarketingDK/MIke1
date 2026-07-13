import type { Faq } from "@/components/FaqAccordion";

// Detaljeret indhold pr. ydelse: hero-billede, FAQ og SEO-sektion.
// Al kopi er original dansk marketing — ingen opfundne facts, tal eller kunder.

export type YdelseIndhold = {
  heroBillede: string;
  heroVariant: "nat" | "daggry" | "interior" | "tekstur";
  seoOverskrift: string;
  seoAfsnit: string[];
  faq: Faq[];
  relateretBlog: string[];
  visRisikoSlider?: boolean; // kun byggepladsvagt
};

export const ydelseIndhold: Record<string, YdelseIndhold> = {
  byggepladsvagt: {
    heroBillede: "hero-byggeplads-nat",
    heroVariant: "nat",
    visRisikoSlider: true,
    seoOverskrift: "Byggepladsvagt i trekantsområdet og på Fyn",
    seoAfsnit: [
      "Byggepladser er blandt de sværeste steder at sikre mekanisk. Åbne arealer, skiftende hegn, midlertidige adgangsveje og store mængder værdifuldt materiel gør pladsen til et oplagt mål for tyveri og hærværk – især uden for arbejdstid, i weekender og hen over ferieperioder. En synlig byggepladsvagt fra MT Vagt reducerer risikoen markant og signalerer med det samme, at pladsen er bevogtet.",
      "Vi tilpasser løsningen til byggeriets fase og risiko. Det kan være fast vagt om natten, planlagte runderinger på skiftende tidspunkter eller adgangskontrol ved porten i myldretid. Vores vagter er trænede i at opdage brand, tekniske fejl og uregelmæssigheder tidligt, så små hændelser ikke udvikler sig til dyre forsinkelser. Efter hver vagt får du en klar rapportering, så du altid ved, hvad der er sket på pladsen.",
      "MT Vagt er et autoriseret vagtselskab med base i Middelfart og dækker hele trekantsområdet – Fredericia, Kolding, Vejle og Odense. Alt personale er vagtuddannet, sikkerhedsgodkendt og bærer vagt-legitimationskort udstedt af Rigspolitiet. Skal du bruge en byggepladsvagt på Fyn eller i trekantsområdet, så ring til os for en uforpligtende vurdering af opgaven.",
    ],
    faq: [
      {
        spoergsmaal: "Hvornår bør jeg have en byggepladsvagt?",
        svar: "Så snart der er værdifuldt materiel, værktøj eller maskiner på pladsen, som ikke kan fjernes efter arbejdstid. Behovet er størst om natten, i weekender og i ferieperioder, hvor pladsen står ubemandet.",
      },
      {
        spoergsmaal: "Kan I både lave fast vagt og rundering?",
        svar: "Ja. Vi tilpasser løsningen til din plads – fast tilstedeværelse hele natten, planlagte runderinger på skiftende tidspunkter eller en kombination. Vi rådgiver om, hvad der giver bedst sikkerhed for pengene.",
      },
      {
        spoergsmaal: "Dækker I hele trekantsområdet?",
        svar: "Ja. Vi har base i Middelfart og dækker hele Danmark og Malmö med hovedfokus på trekantsområdet, herunder Fredericia, Kolding, Vejle og Odense.",
      },
      {
        spoergsmaal: "Er jeres vagter autoriserede?",
        svar: "Ja. MT Vagt er et autoriseret vagtselskab, og alt personale er vagtuddannet, sikkerhedsgodkendt og bærer legitimationskort udstedt af Rigspolitiet.",
      },
      {
        spoergsmaal: "Hvad sker der, hvis vagten opdager noget?",
        svar: "Vagten reagerer efter en fast procedure, dokumenterer hændelsen og kontakter de rette – kunde, alarmcentral eller myndigheder – afhængigt af situationen. Du får altid en rapportering bagefter.",
      },
    ],
    relateretBlog: [
      "hvorfor-sikkerhed-paa-byggepladsen-betaler-sig",
      "byggepladstyveri-i-danmark",
    ],
  },

  runderingsvagt: {
    heroBillede: "rundering-koeretoej-nat",
    heroVariant: "nat",
    seoOverskrift: "Runderingsvagt med tilsyn uden for åbningstid",
    seoAfsnit: [
      "En runderingsvagt fører tilsyn med din ejendom, virksomhed eller byggeplads uden for normal åbningstid. I stedet for fast tilstedeværelse kører vagten planlagte runder på skiftende tidspunkter, så et fast mønster ikke kan udnyttes. Det er en omkostningseffektiv måde at holde øje med flere adresser og skabe tryghed, uden at der skal stå en vagt fast hele natten.",
      "Under hver runde er vagten opmærksom på brand, indbrud, hærværk og tekniske uregelmæssigheder – for eksempel åbne døre, vandskader, utætheder eller fejl på installationer. Tidlig opdagelse betyder, at problemer kan stoppes, før de bliver dyre. Vores vagter kan yde førstehjælp og betjene hjertestarter, og de dokumenterer hver runde, så du har fuldt overblik.",
      "MT Vagt er et autoriseret vagtselskab i Middelfart, der dækker hele Danmark og Malmö med hovedfokus på trekantsområdet. Vil du have tilsyn med din bolig, virksomhed eller byggeplads i Fredericia, Kolding, Vejle eller Odense, så tilrettelægger vi en runderingsplan, der passer til din risiko og dit budget.",
    ],
    faq: [
      {
        spoergsmaal: "Hvad er forskellen på runderingsvagt og fastvagt?",
        svar: "En runderingsvagt kører planlagte runder på skiftende tidspunkter, mens en fastvagt er til stede på adressen hele vagten. Rundering er ofte den mest omkostningseffektive løsning, når der ikke kræves konstant tilstedeværelse.",
      },
      {
        spoergsmaal: "På hvilke tidspunkter kører I runder?",
        svar: "Vi kører uden for normal åbningstid – typisk aften, nat og weekend – og varierer bevidst tidspunkterne, så mønsteret ikke kan forudsiges.",
      },
      {
        spoergsmaal: "Får jeg dokumentation for tilsynet?",
        svar: "Ja. Hver runde dokumenteres, og du får rapportering om, hvad der er observeret, og om der er handlet på noget.",
      },
      {
        spoergsmaal: "Kan I holde tilsyn med flere adresser?",
        svar: "Ja. Runderingsvagt egner sig netop godt til tilsyn med flere adresser, boligforeninger eller virksomheder på samme rute.",
      },
    ],
    relateretBlog: [
      "runderingsvagt-fastvagt-portvagt",
      "brandforebyggelse-paa-byggepladsen",
    ],
  },

  "portvagt-stationaer-vagt": {
    heroBillede: "portvagt-daggry",
    heroVariant: "daggry",
    seoOverskrift: "Portvagt og stationær vagt med adgangskontrol",
    seoAfsnit: [
      "Portvagten er dit kontrolpunkt ved indgangen. På byggepladser, i kommuner og hos større virksomheder styrer den stationære vagt, hvem der kommer ind og ud – både personer og køretøjer. Det skaber sikkerhed, overblik og et professionelt førstehåndsindtryk for gæster, håndværkere og leverandører.",
      "Vores portvagter kombinerer kontrol med god service. De registrerer og legitimerer besøgende, håndhæver adgangs- og sikkerhedsregler, anviser parkering og tager imod leverancer. Med en fast vagt ved porten undgår du uautoriseret adgang, og du har altid et menneske, der kan reagere hurtigt og korrekt, hvis noget kræver handling.",
      "MT Vagt er et autoriseret vagtselskab med base i Middelfart, der dækker hele Danmark og Malmö med hovedfokus på trekantsområdet. Har du behov for adgangskontrol i Fredericia, Kolding, Vejle eller Odense, tilpasser vi bemanding og procedurer til netop din lokation og dit sikkerhedsniveau.",
    ],
    faq: [
      {
        spoergsmaal: "Hvad laver en portvagt konkret?",
        svar: "Portvagten kontrollerer adgang for personer og køretøjer, registrerer og legitimerer besøgende, håndhæver sikkerhedsregler og modtager leverancer – altid med en servicemindet tilgang.",
      },
      {
        spoergsmaal: "Er portvagt kun til byggepladser?",
        svar: "Nej. Vi leverer portvagt og stationær vagt til byggepladser, kommuner, virksomheder og andre steder med behov for høj sikkerhed og kontrolleret adgang.",
      },
      {
        spoergsmaal: "Kan portvagten også tage sig af service?",
        svar: "Ja. En stor del af opgaven er at give besøgende en god og professionel modtagelse, samtidig med at sikkerheden holdes i top.",
      },
      {
        spoergsmaal: "Kan I bemande porten i bestemte tidsrum?",
        svar: "Ja. Vi bemander i de tidsrum, du har brug for – eksempelvis i myldretid, hele arbejdsdagen eller døgnet rundt.",
      },
    ],
    relateretBlog: [
      "adgangskontrol-paa-byggepladsen-portvagt",
      "runderingsvagt-fastvagt-portvagt",
    ],
  },

  "akut-vagt": {
    heroBillede: "rundering-koeretoej-nat",
    heroVariant: "nat",
    seoOverskrift: "Akut vagt med hurtig udrykning",
    seoAfsnit: [
      "Når uheldet er ude, tæller minutterne. En akut vagt fra MT Vagt rykker hurtigt ud og bevogter dit udstyr, dine bygninger og dine værdier, indtil situationen er under kontrol. Vi hjælper virksomheder, entreprenører, boligselskaber, foreninger, museer og hele den offentlige sektor med akut bevogtning døgnet rundt.",
      "Akutte behov opstår ved indbrud, hærværk, brand- eller vandskader, brudte ruder, defekte alarmer eller andre situationer, hvor et sted pludselig står åbent og uovervåget. Vores vagter sikrer stedet, forhindrer yderligere skade og tab, og kan yde førstehjælp og betjene hjertestarter, hvis der er brug for det.",
      "MT Vagt er et autoriseret vagtselskab i Middelfart med døgndækning i hele trekantsområdet og på Fyn. Har du et akut vagtbehov i Fredericia, Kolding, Vejle eller Odense, så ring – vi handler hurtigt.",
    ],
    faq: [
      {
        spoergsmaal: "Hvor hurtigt kan I være fremme?",
        svar: "Vi tilstræber hurtig udrykning i hele trekantsområdet og på Fyn. Ring til os, så vurderer vi med det samme, hvordan vi bedst hjælper dig.",
      },
      {
        spoergsmaal: "Hvornår kan jeg ringe om akut vagt?",
        svar: "Døgnet rundt. Akutte behov følger ikke kontortid, og det gør vores beredskab heller ikke.",
      },
      {
        spoergsmaal: "Hvem bruger akut vagt?",
        svar: "Virksomheder, entreprenører, boligselskaber, foreninger, museer og den offentlige sektor – kort sagt alle, der pludselig står med et sted, der skal bevogtes.",
      },
      {
        spoergsmaal: "Hvad gør vagten, når den er fremme?",
        svar: "Vagten sikrer stedet, forhindrer yderligere skade eller tyveri, dokumenterer hændelsen og kontakter de rette myndigheder eller håndværkere efter behov.",
      },
    ],
    relateretBlog: [
      "vagtdaekning-i-trekantsomraadet",
      "byggepladstyveri-i-danmark",
    ],
  },

  "servicevagt-butiksvagt": {
    heroBillede: "butiksvagt-interior",
    heroVariant: "interior",
    seoOverskrift: "Servicevagt og butiksvagt der skaber tryghed",
    seoAfsnit: [
      "En servicevagt eller butiksvagt kombinerer sikkerhed med god service. I butik, varehus eller virksomhed skaber en synlig, venlig vagt tryghed for både kunder og medarbejdere – og forebygger svind, butikstyveri og uro, før det opstår. Effekten kommer i høj grad af selve tilstedeværelsen: en professionel vagt ændrer adfærd.",
      "Vores servicevagter er trænet i at aflæse situationer, håndtere konflikter roligt og gribe ind korrekt, når det er nødvendigt. De hjælper også gerne kunder til rette og understøtter personalet i hverdagen. Målet er en tryg og imødekommende oplevelse, hvor sikkerheden er til stede uden at være påtrængende.",
      "MT Vagt er et autoriseret vagtselskab med base i Middelfart, der dækker hele Danmark og Malmö med hovedfokus på trekantsområdet. Skal du bruge en butiksvagt eller servicevagt i Fredericia, Kolding, Vejle eller Odense, finder vi en løsning, der matcher din butiks profil og behov.",
    ],
    faq: [
      {
        spoergsmaal: "Hvordan mindsker en butiksvagt svind?",
        svar: "En synlig vagt ændrer adfærd og afskrækker tyveri, samtidig med at vagten kan gribe ind ved mistanke. Kombinationen af forebyggelse og reaktion reducerer svind mærkbart.",
      },
      {
        spoergsmaal: "Er butiksvagten synlig eller diskret?",
        svar: "Begge dele er muligt. Vi tilpasser tilgangen til din butik – fra tydeligt uniformeret tilstedeværelse til en mere diskret profil.",
      },
      {
        spoergsmaal: "Kan vagten også yde kundeservice?",
        svar: "Ja. Vores servicevagter har en venlig fremtoning og hjælper gerne kunder, samtidig med at de holder øje med sikkerheden.",
      },
      {
        spoergsmaal: "Håndterer vagten konflikter?",
        svar: "Ja. Vagterne er trænet i rolig og professionel konflikthåndtering og griber ind korrekt, hvis en situation kræver det.",
      },
    ],
    relateretBlog: ["butiksvagt-og-svind", "saadan-vaelger-du-et-autoriseret-vagtselskab"],
  },

  "tryghedsvagt-psykiatri": {
    heroBillede: "tryghedsvagt-bosted",
    heroVariant: "interior",
    seoOverskrift: "Tryghedsvagt i det offentlige rum og psykiatrien",
    seoAfsnit: [
      "Tryghed handler om mennesker. Vores tryghedsvagter skaber ro og sikkerhed i det offentlige rum, på bosteder og i psykiatriske miljøer – med respekt, tålmodighed og professionel konflikthåndtering. Målet er ikke at dominere, men at forebygge uro og skabe et trygt miljø for borgere, beboere og personale. Et tryggere Danmark starter med nærvær.",
      "Arbejdet med sårbare borgere kræver særlig erfaring og en rolig tilgang. Vores vagter samarbejder tæt med personale og myndigheder, aflæser situationer tidligt og deeskalerer, før konflikter optrappes. De kan yde førstehjælp og betjene hjertestarter og handler altid inden for rammerne af vagtloven.",
      "MT Vagt er et autoriseret vagtselskab i Middelfart, der dækker hele Danmark og Malmö med hovedfokus på trekantsområdet. Har I brug for tryghedsvagter til et bosted, en institution eller det offentlige rum i Fredericia, Kolding, Vejle eller Odense, så tilrettelægger vi en løsning i tæt dialog med jer.",
    ],
    faq: [
      {
        spoergsmaal: "Hvad kendetegner en god tryghedsvagt?",
        svar: "Ro, respekt og evnen til at deeskalere. En god tryghedsvagt forebygger uro gennem nærvær og professionel konflikthåndtering frem for konfrontation.",
      },
      {
        spoergsmaal: "Har vagterne erfaring med sårbare borgere?",
        svar: "Ja. Vores tryghedsvagter er vant til at arbejde respektfuldt med sårbare borgere på bosteder og i psykiatriske miljøer og samarbejder tæt med personalet.",
      },
      {
        spoergsmaal: "Samarbejder I med personale og myndigheder?",
        svar: "Ja. Vi arbejder altid i tæt dialog med personale og relevante myndigheder for at skabe den bedste og tryggeste løsning.",
      },
      {
        spoergsmaal: "Arbejder vagterne inden for vagtloven?",
        svar: "Ja. Alt personale er autoriseret og godkendt til at arbejde under vagtloven og handler altid inden for lovens rammer.",
      },
    ],
    relateretBlog: ["kommunevagt-tryghed-i-det-offentlige-rum", "saadan-vaelger-du-et-autoriseret-vagtselskab"],
  },

  fastvagt: {
    heroBillede: "fastvagt-adresse-nat",
    heroVariant: "nat",
    seoOverskrift: "Fastvagt med fast tilstedeværelse dag og nat",
    seoAfsnit: [
      "En fastvagt er en dedikeret medarbejder, der er fast til stede på en bestemt adresse – dag, nat eller døgnet rundt. Det giver den højeste grad af tryghed og kontinuitet, fordi der altid er et menneske på stedet, som kender rutinerne, kan reagere øjeblikkeligt og skabe genkendelighed for medarbejdere, beboere og besøgende.",
      "Fastvagt er den rette løsning, når risikoen eller behovet for tilstedeværelse er konstant – for eksempel ved følsomme lokationer, i perioder med forhøjet risiko, ved store værdier eller hvor der er brug for løbende adgangskontrol og overblik. Vores vagter kan yde førstehjælp og betjene hjertestarter og dokumenterer deres vagt.",
      "MT Vagt er et autoriseret vagtselskab med base i Middelfart, der dækker hele Danmark og Malmö med hovedfokus på trekantsområdet. Har du brug for en fastvagt i Fredericia, Kolding, Vejle eller Odense, skræddersyr vi opgaven, så bemanding og tidsrum passer præcist til dit behov.",
    ],
    faq: [
      {
        spoergsmaal: "Hvornår giver en fastvagt mest mening?",
        svar: "Når der er behov for konstant tilstedeværelse – ved forhøjet risiko, store værdier eller løbende adgangskontrol, hvor rundering ikke er tilstrækkeligt.",
      },
      {
        spoergsmaal: "Kan jeg få den samme vagt hver gang?",
        svar: "Vi tilstræber genkendelighed og kontinuitet, så du så vidt muligt får faste ansigter, der kender din adresse og dine rutiner.",
      },
      {
        spoergsmaal: "Kan I dække både dag og nat?",
        svar: "Ja. Vi leverer fastvagt dag, nat eller døgnet rundt – præcis som opgaven kræver.",
      },
      {
        spoergsmaal: "Hvad er forskellen på fastvagt og rundering?",
        svar: "En fastvagt er til stede hele vagten på én adresse, mens en runderingsvagt kører planlagte runder mellem flere punkter. Fastvagt giver højere tilstedeværelse.",
      },
    ],
    relateretBlog: ["runderingsvagt-fastvagt-portvagt", "vagtdaekning-i-trekantsomraadet"],
  },

  kommunevagt: {
    heroBillede: "kommune-vagt-dag",
    heroVariant: "daggry",
    seoOverskrift: "Kommunevagt til den offentlige sektor",
    seoAfsnit: [
      "Den offentlige sektor har brug for vagtløsninger, der forener sikkerhed, tryghed og god borgerkontakt. MT Vagt løser vagtopgaver for kommuner og offentlige institutioner – bosteder, genbrugspladser, skoler og rådhuse – med diskret, servicemindet og myndighedsgodkendt personale. Det er en naturlig forlængelse af vores arbejde i det offentlige.",
      "Opgaverne spænder bredt: tryghed og konflikthåndtering på bosteder, adgangskontrol og orden på genbrugspladser, tilsyn og bevogtning af skoler og kommunale bygninger uden for åbningstid samt sikkerhed på rådhuse og ved offentlige arrangementer. Vi tilrettelægger løsningen i tæt dialog med jer og tilpasser bemanding, tidsrum og procedurer til jeres behov og rammer.",
      "MT Vagt er et autoriseret vagtselskab i Middelfart, der dækker hele Danmark og Malmö med hovedfokus på trekantsområdet. Alt personale er vagtuddannet, sikkerhedsgodkendt og bærer legitimationskort fra Rigspolitiet. Skal jeres kommune eller institution i Fredericia, Kolding, Vejle eller Odense bruge en pålidelig vagtpartner, så tag fat i os.",
    ],
    faq: [
      {
        spoergsmaal: "Hvilke opgaver løser en kommunevagt?",
        svar: "Alt fra tryghed på bosteder og orden på genbrugspladser til tilsyn med skoler og rådhuse samt sikkerhed ved offentlige arrangementer.",
      },
      {
        spoergsmaal: "Er personalet godkendt til offentlige opgaver?",
        svar: "Ja. Alt personale er vagtuddannet, sikkerhedsgodkendt af danske myndigheder og bærer legitimationskort udstedt af Rigspolitiet.",
      },
      {
        spoergsmaal: "Kan I tilpasse løsningen til vores kommune?",
        svar: "Ja. Vi tilrettelægger bemanding, tidsrum og procedurer i tæt dialog med jer, så løsningen passer til jeres rammer og behov.",
      },
      {
        spoergsmaal: "Har I erfaring med den offentlige sektor?",
        svar: "Ja. Vores arbejde omfatter opgaver i den offentlige sektor, og kommunevagt er en naturlig del af det, vi tilbyder.",
      },
    ],
    relateretBlog: ["kommunevagt-tryghed-i-det-offentlige-rum", "vagt-til-arrangementer-og-events"],
  },
};
