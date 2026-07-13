import type { Metadata } from "next";
import { virksomhed } from "@/content/virksomhed";
import { Broedkrumme } from "@/components/Broedkrumme";
import { Afsloer } from "@/components/Sektion";
import { KontaktFormular } from "@/components/KontaktFormular";
import { EmailLink } from "@/components/EmailLink";

export const metadata: Metadata = {
  title: "Kontakt — få et tilbud på en vagt",
  description:
    "Kontakt MT Vagt i Middelfart. Ring +45 3131 4428 eller udfyld formularen og få et tilbud på vagtservice i trekantsområdet. Akut vagt døgnet rundt.",
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
              Kontakt os
            </h1>
            <p className="mt-6 text-lg text-staal-lys">
              Skal du bruge en vagt i {virksomhed.region}? Ring til os eller send en
              henvendelse, så vender vi tilbage med en løsning tilpasset din opgave.
            </p>
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
            <h2 className="text-2xl font-bold text-krom">Send en henvendelse</h2>
            <p className="mt-2 text-staal-lys">
              Felter med * skal udfyldes. Vi behandler dine oplysninger fortroligt.
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
    </>
  );
}
