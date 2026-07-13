import Link from "next/link";
import { CinematiskHero } from "@/components/CinematiskHero";
import { TillidsBjaelke } from "@/components/TillidsBjaelke";
import { Afsloer } from "@/components/Sektion";
import { MagnetiskKnap } from "@/components/MagnetiskKnap";
import { ydelser } from "@/content/ydelser";
import { virksomhed } from "@/content/virksomhed";

export default function Forside() {
  return (
    <>
      <CinematiskHero />
      <TillidsBjaelke />

      {/* Ydelses-teaser */}
      <section className="relative bg-ink py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Afsloer className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Vores ydelser
            </p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-krom sm:text-5xl">
              Vagtløsninger til enhver opgave
            </h2>
            <p className="mt-4 text-lg text-staal-lys">
              Fra byggepladsvagt til kommunevagt — vi løser opgaven efter høj
              standard, døgnet rundt i {virksomhed.region}.
            </p>
          </Afsloer>

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-linje bg-linje sm:grid-cols-2 lg:grid-cols-4">
            {ydelser.map((y, i) => (
              <Afsloer as="article" key={y.slug} delay={i * 0.05}>
                <Link
                  href={`/vi-tilbyder/${y.slug}`}
                  className="group flex h-full flex-col bg-ink p-7 transition-colors hover:bg-ink-2"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-staal">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-krom">{y.titel}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-staal-lys">
                    {y.kerne}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Læs mere
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </Afsloer>
            ))}
          </div>
        </div>
      </section>

      {/* CTA-bånd */}
      <section className="relative overflow-hidden border-y border-linje bg-ink-2 py-20">
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(50% 60% at 80% 20%, rgba(212,34,51,0.18), transparent 60%)",
          }}
        />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 lg:flex-row lg:items-center lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-krom sm:text-4xl">
              Har du brug for en vagt?
            </h2>
            <p className="mt-3 text-lg text-staal-lys">
              {virksomhed.garanti} Ring til os for en uforpligtende snak om din
              opgave.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <MagnetiskKnap href="/kontakt">Få et tilbud</MagnetiskKnap>
            <a
              href={`tel:${virksomhed.telefon.kald}`}
              className="inline-flex items-center gap-2 rounded-full border border-linje px-6 py-3 text-sm font-semibold text-krom hover:border-staal-lys"
            >
              📞 {virksomhed.telefon.visning}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
