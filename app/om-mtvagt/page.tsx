import type { Metadata } from "next";
import { virksomhed } from "@/content/virksomhed";
import { Billede } from "@/components/Billede";
import { Broedkrumme } from "@/components/Broedkrumme";
import { Afsloer } from "@/components/Sektion";
import { SeoSektion } from "@/components/SeoSektion";
import { CtaBaand } from "@/components/CtaBaand";

export const metadata: Metadata = {
  title: "Om MT Vagt — autoriseret vagtselskab i Middelfart",
  description:
    "Lær MT Vagt at kende: et autoriseret vagtselskab i Middelfart, der løser vagtopgaver efter høj standard i hele trekantsområdet. Døgnvagt · Tillid · Tryghed.",
  alternates: { canonical: "/om-mtvagt" },
};

const vaerdier = [
  {
    titel: "Høj standard",
    tekst:
      "Vi stræber ikke efter at blive de største, men vi sætter en ære i at løse alle opgaver efter høj standard.",
  },
  {
    titel: "Autorisation",
    tekst:
      "Alt personale er vagtuddannet, sikkerhedsgodkendt af danske myndigheder og godkendt til at arbejde under vagtloven.",
  },
  {
    titel: "Tryghed",
    tekst:
      "Alle vagter bærer legitimationskort fra Rigspolitiet, kan yde førstehjælp og betjene hjertestarter.",
  },
];

export default function OmSide() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-28 pb-16">
        <div aria-hidden className="gitter absolute inset-0 opacity-20" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
          <Afsloer>
            <Broedkrumme
              dele={[
                { navn: "Forside", sti: "/" },
                { navn: "Om os", sti: "/om-mtvagt" },
              ]}
            />
            <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-krom sm:text-6xl">
              Om MT Vagt
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-staal-lys">
              {virksomhed.navn} er et autoriseret vagtselskab med base i{" "}
              {virksomhed.base}. Vi skaber tryghed for virksomheder,
              entreprenører, boligselskaber og den offentlige sektor i{" "}
              {virksomhed.daekningBred} — med hovedfokus på {virksomhed.region}.
            </p>
            <blockquote className="mt-8 border-l-2 border-accent pl-5 text-xl italic text-krom">
              {virksomhed.positionering}
            </blockquote>
          </Afsloer>
          <Afsloer delay={0.1}>
            <figure className="mx-auto max-w-md lg:max-w-none">
              <Billede
                navn="mike"
                variant="interior"
                alt="Mike fra MT Vagt — autoriseret vagt"
                ratio="4:5"
                prioritet
              />
              <figcaption className="mt-3 text-center text-sm text-staal-lys">
                Mike — MT Vagt
              </figcaption>
            </figure>
          </Afsloer>
        </div>
      </section>

      {/* Værdier */}
      <section className="border-t border-linje bg-ink-2 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Afsloer>
            <h2 className="text-3xl font-extrabold tracking-tight text-krom">
              Det står vi for
            </h2>
          </Afsloer>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {vaerdier.map((v, i) => (
              <Afsloer
                key={v.titel}
                delay={i * 0.05}
                className="rounded-2xl border border-linje bg-ink p-7"
              >
                <h3 className="text-xl font-bold text-krom">{v.titel}</h3>
                <p className="mt-3 text-staal-lys">{v.tekst}</p>
              </Afsloer>
            ))}
          </div>

          <Afsloer className="mt-10 rounded-2xl border border-accent-dyb/60 bg-accent/10 p-8">
            <p className="text-lg font-medium text-krom">
              {virksomhed.garanti}
            </p>
          </Afsloer>
        </div>
      </section>

      {/* Fakta */}
      <section className="bg-ink py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { k: "Base", v: virksomhed.base },
              { k: "Dækning", v: "Hele Danmark og Malmö" },
              { k: "CVR", v: virksomhed.cvr },
              { k: "Medlemskab", v: "VSL · ISO-certificeret" },
            ].map((f) => (
              <div
                key={f.k}
                className="rounded-2xl border border-linje bg-ink-2 p-6"
              >
                <div className="text-sm text-staal">{f.k}</div>
                <div className="mt-1 font-semibold text-krom">{f.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SeoSektion
        overskrift="Et autoriseret vagtselskab med rod i trekantsområdet"
        afsnit={[
          "MT Vagt & Vikarservice ApS er et autoriseret vagtselskab med base i Middelfart. Vores mål er enkelt: at skabe tryghed for vores kunder ved at løse hver opgave efter høj standard. Vi har ekspertise i hele Danmark og Malmö — med hovedfokus på trekantsområdet (Fredericia, Kolding, Vejle og Odense) — og hjælper både private virksomheder, entreprenører, boligselskaber, foreninger og den offentlige sektor.",
          "For os er autorisationen ikke en formalitet, men fundamentet under alt, hvad vi gør. Alt vores personale er vagtuddannet, sikkerhedsgodkendt af danske myndigheder og godkendt til at arbejde under vagtloven. Alle vagter bærer legitimationskort udstedt af Rigspolitiet, kan yde førstehjælp og betjene hjertestarter. Vi er ISO-certificeret og medlem af VSL. Et autoriseret vagtselskab er din garanti for, at opgaven ikke løses af amatører.",
          "Vi stræber ikke efter at blive de største i branchen. Til gengæld sætter vi en ære i at være tæt på vores kunder, kende vores område og løse opgaven ordentligt – hver gang. Døgnvagt, tillid og tryghed er ikke bare ord for os, men den måde vi arbejder på.",
        ]}
        faq={[
          {
            spoergsmaal: "Hvor har MT Vagt base?",
            svar: "Vi har base på Østergade 12, 5500 Middelfart, midt i trekantsområdet på Fyn.",
          },
          {
            spoergsmaal: "Hvilke kunder arbejder I for?",
            svar: "Vi løser opgaver for private virksomheder, entreprenører, boligselskaber, foreninger, museer og hele den offentlige sektor.",
          },
          {
            spoergsmaal: "Er I certificeret?",
            svar: "Ja. Vi er et autoriseret vagtselskab, ISO-certificeret og medlem af VSL.",
          },
          {
            spoergsmaal: "Tilbyder I døgnvagt?",
            svar: "Ja. Vi tilbyder vagtløsninger døgnet rundt, herunder akut vagt med hurtig udrykning i hele trekantsområdet.",
          },
        ]}
      />

      <CtaBaand />
    </>
  );
}
