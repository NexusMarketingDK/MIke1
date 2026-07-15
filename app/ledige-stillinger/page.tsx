import type { Metadata } from "next";
import { virksomhed } from "@/content/virksomhed";
import { Broedkrumme } from "@/components/Broedkrumme";
import { Afsloer } from "@/components/Sektion";
import { MagnetiskKnap } from "@/components/MagnetiskKnap";
import { EmailLink } from "@/components/EmailLink";
import { SeoSektion } from "@/components/SeoSektion";

export const metadata: Metadata = {
  title: "Ledige stillinger — bliv vagt hos MT Vagt",
  description:
    "Vil du være vagt i trekantsområdet? Se hvordan du søger job hos MT Vagt — et autoriseret vagtselskab i Fredericia. Send en uopfordret ansøgning.",
  alternates: { canonical: "/ledige-stillinger" },
};

const forventninger = [
  "Du er ansvarsbevidst, mødestabil og har en professionel fremtoning",
  "Du kan bevare roen og håndtere konflikter respektfuldt",
  "Du har rent straffeattest og kan sikkerhedsgodkendes",
  "Du er fleksibel og indstillet på arbejde uden for normal arbejdstid",
  "Vagtuddannelse og kørekort er en fordel",
];

export default function JobSide() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-28 pb-16">
        <div aria-hidden className="gitter absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Broedkrumme
            dele={[
              { navn: "Forside", sti: "/" },
              { navn: "Ledige stillinger", sti: "/ledige-stillinger" },
            ]}
          />
          <Afsloer className="mt-6 max-w-3xl">
            <h1 className="text-5xl font-extrabold tracking-tight text-krom sm:text-6xl">
              Bliv en del af holdet
            </h1>
            <p className="mt-6 text-lg text-staal-lys">
              Vi er altid interesserede i at høre fra dygtige, ansvarsbevidste
              mennesker, der vil være med til at skabe tryghed i {virksomhed.region}.
            </p>
          </Afsloer>
        </div>
      </section>

      <section className="bg-ink pb-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <Afsloer className="rounded-2xl border border-linje bg-ink-2 p-8">
            <h2 className="text-2xl font-bold text-krom">Hvad vi forventer</h2>
            <ul className="mt-6 space-y-3">
              {forventninger.map((f) => (
                <li key={f} className="flex items-start gap-3 text-staal-lys">
                  <span className="mt-0.5 text-accent" aria-hidden>
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </Afsloer>

          <Afsloer delay={0.1} className="rounded-2xl border border-linje bg-ink-2 p-8">
            <h2 className="text-2xl font-bold text-krom">Sådan søger du</h2>
            <p className="mt-4 text-staal-lys">
              Vi modtager gerne uopfordrede ansøgninger. Send os din ansøgning og
              dit CV, så kontakter vi dig, hvis der er et match. Fortæl gerne, hvor i{" "}
              {virksomhed.region} du bor, og hvad du kan tilbyde.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <MagnetiskKnap href="/kontakt">Send ansøgning</MagnetiskKnap>
              <p className="text-sm text-staal-lys">
                Eller skriv direkte til{" "}
                <EmailLink
                  className="text-krom underline hover:text-accent"
                  emne="Ansøgning — ledig stilling"
                />
              </p>
              <p className="text-sm text-staal-lys">
                Spørgsmål? Ring til os på{" "}
                <a
                  href={`tel:${virksomhed.telefon.kald}`}
                  className="text-krom hover:text-accent"
                >
                  {virksomhed.telefon.visning}
                </a>
              </p>
            </div>
          </Afsloer>
        </div>
      </section>

      <SeoSektion
        overskrift="Job som vagt i trekantsområdet"
        afsnit={[
          "Drømmer du om et job, hvor du gør en reel forskel for andres tryghed? Som vagt hos MT Vagt bliver du en del af et autoriseret vagtselskab, der løser opgaver efter høj standard i hele trekantsområdet – fra byggepladsvagt og rundering til port-, service- og tryghedsvagt. Vi har base i Taulov ved Fredericia og arbejder i og omkring Fredericia, Kolding, Vejle og Odense.",
          "Vi lægger vægt på professionalisme, ansvarlighed og en ordentlig tilgang til mennesker. Alt personale skal kunne sikkerhedsgodkendes af myndighederne og arbejde inden for vagtloven. Vagtuddannelse og førstehjælp er en naturlig del af arbejdet, og har du det ikke på plads endnu, ser vi gerne, at du er indstillet på at få det.",
          "Vi ansætter løbende, når de rigtige folk melder sig. Send os derfor gerne en uopfordret ansøgning – også selv om du ikke ser en konkret stilling opslået lige nu. Fortæl os, hvem du er, og hvad du kan, så tager vi fat i dig, hvis der er et match.",
        ]}
        faq={[
          {
            spoergsmaal: "Skal jeg have en vagtuddannelse for at søge?",
            svar: "Vagtuddannelse er en fordel, men fortæl os om din baggrund uanset hvad. Du skal kunne sikkerhedsgodkendes og arbejde inden for vagtloven.",
          },
          {
            spoergsmaal: "Kan jeg sende en uopfordret ansøgning?",
            svar: "Ja. Vi modtager gerne uopfordrede ansøgninger og kontakter dig, hvis der er et match.",
          },
          {
            spoergsmaal: "Hvor arbejder jeg som vagt hos jer?",
            svar: "Vi løser opgaver i hele trekantsområdet og på Fyn med base i Taulov ved Fredericia.",
          },
        ]}
      />
    </>
  );
}
