import type { Metadata } from "next";
import Link from "next/link";
import { ydelser } from "@/content/ydelser";
import { ydelseIndhold } from "@/content/ydelse-indhold";
import { virksomhed } from "@/content/virksomhed";
import { Billede } from "@/components/Billede";
import { Broedkrumme } from "@/components/Broedkrumme";
import { Afsloer } from "@/components/Sektion";
import { CtaBaand } from "@/components/CtaBaand";
import { SeoSektion } from "@/components/SeoSektion";

export const metadata: Metadata = {
  title: "Ydelser — vagtløsninger i trekantsområdet",
  description:
    "Se MT Vagts vagtløsninger: byggepladsvagt, runderingsvagt, portvagt, akut vagt, butiksvagt, tryghedsvagt, fastvagt og kommunevagt i trekantsområdet.",
  alternates: { canonical: "/vi-tilbyder" },
};

export default function YdelserOversigt() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-28 pb-16">
        <div aria-hidden className="gitter absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Broedkrumme
            dele={[
              { navn: "Forside", sti: "/" },
              { navn: "Ydelser", sti: "/vi-tilbyder" },
            ]}
          />
          <Afsloer className="mt-6 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Vores ydelser
            </p>
            <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-krom sm:text-6xl">
              Vagtløsninger til enhver opgave
            </h1>
            <p className="mt-6 text-lg text-staal-lys">
              MT Vagt er et autoriseret vagtselskab i {virksomhed.base}. Vi løser
              opgaver efter høj standard, døgnet rundt i {virksomhed.region}. Vælg
              den løsning, der passer til dit behov.
            </p>
          </Afsloer>
        </div>
      </section>

      <section className="bg-ink pb-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {ydelser.map((y, i) => {
            const ind = ydelseIndhold[y.slug];
            return (
              <Afsloer as="article" key={y.slug} delay={(i % 3) * 0.05}>
                <Link
                  href={`/vi-tilbyder/${y.slug}`}
                  className="dybde-3d tilt-3d group flex h-full flex-col overflow-hidden rounded-2xl border border-linje bg-ink-2 hover:border-staal"
                >
                  <Billede
                    navn={ind?.heroBillede ?? "hero-byggeplads-nat"}
                    variant={ind?.heroVariant ?? "nat"}
                    alt={`${y.titel} — ${y.undertitel}`}
                    ratio="16:9"
                    className="rounded-none border-0"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-xl font-bold text-krom">{y.titel}</h2>
                    <p className="mt-1 text-sm text-accent">{y.undertitel}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-staal-lys">
                      {y.intro}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-krom">
                      Læs mere
                      <span className="text-accent transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </Afsloer>
            );
          })}
        </div>
      </section>

      <SeoSektion
        overskrift="Autoriseret vagtselskab i trekantsområdet"
        afsnit={[
          "MT Vagt & Vikarservice ApS er et autoriseret vagtselskab med base i Taulov ved Fredericia. Vi dækker hele trekantsområdet – Fredericia, Kolding, Vejle og Odense – med vagtløsninger til både private virksomheder, entreprenører, boligselskaber og den offentlige sektor. Uanset om du har brug for en byggepladsvagt, en runderingsvagt, en portvagt eller en tryghedsvagt, løser vi opgaven efter høj standard.",
          "Autorisationen er din garanti for kvalitet. Alt vores personale er vagtuddannet, sikkerhedsgodkendt af danske myndigheder og godkendt til at arbejde under vagtloven. Alle vagter bærer legitimationskort udstedt af Rigspolitiet, kan yde førstehjælp og betjene hjertestarter. Vi er ISO-certificeret og medlem af VSL. Et autoriseret vagtselskab er din garanti for, at opgaven ikke løses af amatører.",
          "Vi stræber ikke efter at blive de største i branchen, men vi sætter en ære i at løse alle opgaver efter høj standard. Ring til os for en uforpligtende snak om, hvordan vi bedst skaber tryghed for dig – hele døgnet.",
        ]}
        faq={[
          {
            spoergsmaal: "Hvilke områder dækker MT Vagt?",
            svar: "Vi har base i Taulov ved Fredericia og dækker hele Danmark med hovedfokus på trekantsområdet, herunder Fredericia, Kolding, Vejle og Odense.",
          },
          {
            spoergsmaal: "Er MT Vagt et autoriseret vagtselskab?",
            svar: "Ja. Vi er et autoriseret vagtselskab, og alt personale er vagtuddannet, sikkerhedsgodkendt og bærer legitimationskort fra Rigspolitiet.",
          },
          {
            spoergsmaal: "Tilbyder I døgnvagt?",
            svar: "Ja. Vi tilbyder vagtløsninger døgnet rundt, herunder akut vagt med hurtig udrykning.",
          },
          {
            spoergsmaal: "Hvordan får jeg et tilbud?",
            svar: "Ring til os på +45 3131 4428 eller udfyld kontaktformularen, så vender vi tilbage med en løsning tilpasset din opgave.",
          },
        ]}
      />

      <CtaBaand />
    </>
  );
}
