import type { Metadata } from "next";
import { virksomhed } from "@/content/virksomhed";
import { Broedkrumme } from "@/components/Broedkrumme";
import { Afsloer } from "@/components/Sektion";
import { KontaktFormular } from "@/components/KontaktFormular";
import { EmailLink } from "@/components/EmailLink";
import { Certifikater } from "@/components/Certifikater";
import { Anmeldelser } from "@/components/Anmeldelser";
import { SeoSektion } from "@/components/SeoSektion";

export const metadata: Metadata = {
  title: "Kontakt — få en pris på din vagtopgave",
  description:
    "Få et uforpligtende tilbud på din vagtopgave i trekantsområdet. Hver opgave er individuel — vi tager små som store opgaver. Ring +45 3131 4428.",
  alternates: { canonical: "/kontakt" },
};

const kortUrl =
  "https://www.google.com/maps?q=" +
  encodeURIComponent(
    `${virksomhed.adresse.gade}, ${virksomhed.adresse.postnr} ${virksomhed.adresse.by}`
  ) +
  "&output=embed";

export default function KontaktSide() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-28 pb-14">
        <div aria-hidden className="gitter absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Broedkrumme
            dele={[
              { navn: "Forside", sti: "/" },
              { navn: "Kontakt", sti: "/kontakt" },
            ]}
          />
          <Afsloer className="mt-6 max-w-3xl">
            <h1 className="text-5xl font-extrabold tracking-tight text-krom sm:text-6xl">
              Få en pris på din opgave
            </h1>
            <p className="mt-6 text-lg text-staal-lys">
              Hver vagtopgave er individuel — derfor giver vi en pris ud fra netop
              dine behov, ikke en standardpakke. Fortæl os om opgaven, så vender vi
              hurtigt tilbage med et uforpligtende tilbud tilpasset dig.
            </p>
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-staal-lys">
              {[
                "Vi tager små som store opgaver",
                "Individuel pris pr. opgave",
                "Uforpligtende tilbud",
                "Autoriseret vagtselskab",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="text-accent" aria-hidden>
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Afsloer>
        </div>
      </section>

      {/* Akut-panel */}
      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-accent-dyb/60 bg-accent/10 p-8 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent-klar">
                Akut vagt?
              </p>
              <h2 className="mt-1 text-2xl font-bold text-krom">
                Ring nu — vi rykker hurtigt ud
              </h2>
              <p className="mt-1 text-staal-lys">
                Døgndækning i hele trekantsområdet.
              </p>
            </div>
            <a
              href={`tel:${virksomhed.telefon.kald}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-lg font-semibold text-white transition-colors hover:bg-accent-klar"
            >
              📞 {virksomhed.telefon.visning}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-ink py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1.4fr_1fr] lg:px-8">
          <Afsloer>
            <h2 className="text-2xl font-bold text-krom">
              Få et uforpligtende tilbud
            </h2>
            <p className="mt-2 text-staal-lys">
              Beskriv din opgave, så vender vi tilbage med en pris. Felter med * skal
              udfyldes. Vi behandler dine oplysninger fortroligt.
            </p>
            <div className="mt-8">
              <KontaktFormular />
            </div>
          </Afsloer>

          <Afsloer delay={0.1} className="space-y-8">
            <div className="rounded-2xl border border-linje bg-ink-2 p-7">
              <h2 className="text-xl font-bold text-krom">Kontaktoplysninger</h2>
              <address className="mt-4 space-y-3 not-italic text-staal-lys">
                <p>
                  <span className="block text-sm text-staal">Adresse</span>
                  {virksomhed.adresse.gade}
                  <br />
                  {virksomhed.adresse.postnr} {virksomhed.adresse.by}
                </p>
                <p>
                  <span className="block text-sm text-staal">Telefon</span>
                  <a
                    href={`tel:${virksomhed.telefon.kald}`}
                    className="text-krom hover:text-accent"
                  >
                    {virksomhed.telefon.visning}
                  </a>
                </p>
                <p>
                  <span className="block text-sm text-staal">E-mail</span>
                  <EmailLink className="text-krom hover:text-accent" />
                </p>
                <p>
                  <span className="block text-sm text-staal">CVR</span>
                  {virksomhed.cvr}
                </p>
              </address>
            </div>

            <div className="overflow-hidden rounded-2xl border border-linje">
              <iframe
                title={`Kort over ${virksomhed.adresse.by}`}
                src={kortUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[4/3] w-full"
              />
            </div>
          </Afsloer>
        </div>
      </section>

      <Certifikater />

      <Anmeldelser />

      <SeoSektion
        overskrift="Hvad koster en vagt? Sådan giver vi pris på din opgave"
        afsnit={[
          "Prisen på en vagtopgave afhænger altid af opgaven — der findes ikke to ens vagtopgaver. Timeantal, tidspunkt (dag, nat, weekend og helligdage), antal vagter, opgavens karakter og hvor i trekantsområdet den ligger, spiller alt sammen ind. Derfor giver vi ikke en fast listepris, men en individuel og gennemsigtig pris ud fra netop dit behov. Ring til os på " +
            virksomhed.telefon.visning +
            " eller udfyld formularen, så vender vi hurtigt tilbage med et uforpligtende tilbud.",
          "Vi tager små som store opgaver. Uanset om du skal bruge en enkelt runderingsvagt en enkelt nat, en fast portvagt til en byggeplads over flere måneder, eller en større løsning til den offentlige sektor, løser vi opgaven efter høj standard. Som autoriseret vagtselskab er alt personale vagtuddannet, sikkerhedsgodkendt af danske myndigheder og bærer legitimationskort udstedt af Rigspolitiet — din garanti for, at opgaven ikke løses af amatører.",
          "Vi dækker hele Danmark og Malmö med hovedfokus på trekantsområdet med base i Middelfart, herunder Fredericia, Kolding, Vejle og Odense — døgnet rundt. Har du et akut behov, rykker vi hurtigt ud. Kontakt os for en uforpligtende snak om din vagtopgave, så finder vi den rigtige løsning og pris sammen.",
        ]}
        faq={[
          {
            spoergsmaal: "Hvad koster en vagt hos MT Vagt?",
            svar:
              "Prisen er individuel, fordi hver opgave er forskellig. Den afhænger blandt andet af timeantal, tidspunkt, antal vagter og opgavens karakter. Kontakt os, så giver vi et uforpligtende tilbud tilpasset din opgave.",
          },
          {
            spoergsmaal: "Tager I også små opgaver?",
            svar:
              "Ja. Vi tager små som store opgaver — fra en enkelt vagt en enkelt nat til større, faste løsninger. Alle opgaver løses efter samme høje standard.",
          },
          {
            spoergsmaal: "Hvor hurtigt kan I give et tilbud?",
            svar:
              "Ring til os på " +
              virksomhed.telefon.visning +
              ", eller udfyld formularen, så vender vi hurtigt tilbage. Ved akutte behov kan vi rykke ud med det samme.",
          },
          {
            spoergsmaal: "Er MT Vagt et autoriseret og certificeret vagtselskab?",
            svar:
              "Ja. Vi er et autoriseret vagtselskab, ISO-certificeret og medlem af VSL. Alle vagter bærer legitimationskort udstedt af Rigspolitiet og kan yde førstehjælp og betjene hjertestarter.",
          },
          {
            spoergsmaal: "Hvilke områder dækker I?",
            svar:
              "Vi har base i Middelfart og dækker hele Danmark og Malmö med hovedfokus på trekantsområdet — herunder Fredericia, Kolding, Vejle og Odense — døgnet rundt.",
          },
        ]}
      />
    </>
  );
}
