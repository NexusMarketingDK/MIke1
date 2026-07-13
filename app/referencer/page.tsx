import type { Metadata } from "next";
import { referencer, opgaveEksempler, brancher } from "@/content/referencer";
import { virksomhed } from "@/content/virksomhed";
import { Broedkrumme } from "@/components/Broedkrumme";
import { Afsloer } from "@/components/Sektion";
import { SeoSektion } from "@/components/SeoSektion";
import { CtaBaand } from "@/components/CtaBaand";

export const metadata: Metadata = {
  title: "Referencer — opgaver for kunder og samarbejdspartnere",
  description:
    "Se eksempler på MT Vagts opgaver — fra byggepladsvagt og rundering til kommunevagt. Autoriseret dansk vagtfirma med ekspertise i hele Danmark og Malmö.",
  alternates: { canonical: "/referencer" },
};

export default function ReferencerSide() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-28 pb-14">
        <div aria-hidden className="gitter absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Broedkrumme
            dele={[
              { navn: "Forside", sti: "/" },
              { navn: "Referencer", sti: "/referencer" },
            ]}
          />
          <Afsloer className="mt-6 max-w-3xl">
            <h1 className="text-5xl font-extrabold tracking-tight text-krom sm:text-6xl">
              Referencer
            </h1>
            <p className="mt-6 text-lg text-staal-lys">
              Vi løser opgaver for private virksomheder, entreprenører,
              boligselskaber, samarbejdspartnere i branchen og den offentlige
              sektor. Her er et udsnit af vores referencer og typiske opgaver.
            </p>
          </Afsloer>
        </div>
      </section>

      {/* Navngivne referencer */}
      <section className="border-y border-linje bg-ink-2 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {referencer.map((r, i) => (
              <Afsloer
                as="article"
                key={r.navn}
                delay={i * 0.08}
                className="dybde-3d flex h-full flex-col rounded-3xl border border-linje bg-ink p-8"
              >
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                  {r.type}
                </span>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-krom">
                  {r.navn}
                </h2>
                <p className="mt-2 font-medium text-staal-lys">{r.resume}</p>
                <div className="mt-5 space-y-4 leading-relaxed text-staal-lys">
                  {r.beskrivelse.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {r.ydelser.map((y) => (
                    <li
                      key={y}
                      className="rounded-full border border-linje px-3 py-1 text-xs font-medium text-staal-lys"
                    >
                      {y}
                    </li>
                  ))}
                </ul>
              </Afsloer>
            ))}
          </div>
        </div>
      </section>

      {/* Eksempler på opgaver */}
      <section className="bg-ink py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Afsloer className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Eksempler på opgaver
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-krom sm:text-4xl">
              Sådan hjælper vi i praksis
            </h2>
            <p className="mt-3 text-staal-lys">
              Repræsentative eksempler på de opgaver, vi løser i {virksomhed.daekningBred} —
              med hovedfokus på trekantsområdet.
            </p>
          </Afsloer>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {opgaveEksempler.map((o, i) => (
              <Afsloer
                as="article"
                key={o.titel}
                delay={(i % 3) * 0.05}
                className="dybde-3d flex h-full flex-col rounded-2xl border border-linje bg-ink-2 p-6"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                  {o.ydelse}
                </span>
                <h3 className="mt-3 text-xl font-bold text-krom">{o.titel}</h3>
                <p className="mt-3 text-sm leading-relaxed text-staal-lys">
                  {o.beskrivelse}
                </p>
              </Afsloer>
            ))}
          </div>
        </div>
      </section>

      {/* Brancher vi arbejder for */}
      <section className="border-y border-linje bg-ink-2 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Afsloer className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Brancher
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-krom sm:text-4xl">
              Vi arbejder på tværs af brancher
            </h2>
            <p className="mt-3 text-staal-lys">
              Fra byggeri og detail til den offentlige sektor — vi tilpasser
              løsningen til den enkelte branche og opgave.
            </p>
          </Afsloer>
          <ul className="mt-10 flex flex-wrap gap-3">
            {brancher.map((b) => (
              <li
                key={b}
                className="dybde-3d rounded-full border border-linje bg-ink px-5 py-2.5 text-sm font-medium text-staal-lys"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SeoSektion
        overskrift="Autoriseret dansk vagtfirma med dokumenteret erfaring"
        afsnit={[
          "MT Vagt & Vikarservice ApS løser vagtopgaver for både private virksomheder, entreprenører, boligselskaber, samarbejdspartnere i sikkerhedsbranchen og den offentlige sektor. Uanset opgavens størrelse løser vi den efter høj standard — det er kernen i vores arbejde og grunden til, at kunder vender tilbage.",
          "Som autoriseret dansk vagtselskab er alt vores personale vagtuddannet, sikkerhedsgodkendt af danske myndigheder og godkendt til at arbejde under vagtloven. Alle vagter bærer legitimationskort udstedt af Rigspolitiet, kan yde førstehjælp og betjene hjertestarter. Vi er ISO-certificeret og medlem af VSL — din garanti for, at opgaven ikke løses af amatører.",
          "Vi har base i Middelfart og ekspertise i hele Danmark og Malmö, med hovedfokus på trekantsområdet. Vil du høre mere om, hvordan vi kan løse netop din opgave, så ring til os på " +
            virksomhed.telefon.visning +
            " for en uforpligtende snak.",
        ]}
        faq={[
          {
            spoergsmaal: "Kan jeg få referencer på en konkret opgavetype?",
            svar:
              "Ja. Kontakt os, så fortæller vi gerne om relevante opgaver, vi har løst, der ligner dit behov.",
          },
          {
            spoergsmaal: "Løser I både opgaver for private og det offentlige?",
            svar:
              "Ja. Vi løser opgaver for private virksomheder, entreprenører, boligselskaber, foreninger og den offentlige sektor — små som store opgaver.",
          },
          {
            spoergsmaal: "Leverer I også vagt-vikarer til andre firmaer?",
            svar:
              "Ja. Som MT Vagt & Vikarservice leverer vi vagtuddannet og sikkerhedsgodkendt personale som vikarer, når der er brug for ekstra kapacitet.",
          },
        ]}
      />

      <CtaBaand overskrift="Skal vi også løse din opgave?" />
    </>
  );
}
