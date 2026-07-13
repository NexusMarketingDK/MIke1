import { virksomhed } from "@/content/virksomhed";
import { Afsloer } from "@/components/Sektion";
import { PopupLink } from "@/components/PopupLink";

// Certifikater og godkendelser — alle er verificerede facts.
const punkter: {
  titel: string;
  tekst: string;
  href?: string;
  eksternt?: boolean;
}[] = [
  {
    titel: "Autoriseret vagtselskab",
    tekst:
      "Godkendt af danske myndigheder til at arbejde under vagtloven. Alt personale er vagtuddannet og sikkerhedsgodkendt.",
  },
  {
    titel: "ISO-certificeret",
    tekst: "Vi arbejder efter dokumenterede kvalitetsstandarder. Se vores certifikat.",
    href: virksomhed.autorisation.isoCertifikat,
  },
  {
    titel: "Medlem af VSL",
    tekst: "Medlem af Vagt- og Sikkerhedsindustriens Landssammenslutning.",
    href: virksomhed.autorisation.vslUrl,
    eksternt: true,
  },
  {
    titel: "Rigspolitiets legitimationskort",
    tekst: "Alle vagter bærer gyldigt vagt-legitimationskort udstedt af Rigspolitiet.",
  },
  {
    titel: "Førstehjælp & hjertestarter",
    tekst: "Alle vagter kan yde førstehjælp og betjene hjertestarter.",
  },
];

export function Certifikater() {
  return (
    <section className="border-y border-linje bg-ink-2 py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Afsloer className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Din garanti
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-krom sm:text-4xl">
            Certifikater og godkendelser
          </h2>
          <p className="mt-3 text-staal-lys">
            Et autoriseret vagtselskab er din garanti for, at opgaven ikke løses af
            amatører — uanset om det er en lille eller stor opgave.
          </p>
        </Afsloer>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-linje bg-linje sm:grid-cols-2 lg:grid-cols-3">
          {punkter.map((p, i) => {
            const indhold = (
              <>
                <span className="text-accent" aria-hidden>
                  ✓
                </span>
                <h3 className="mt-3 text-lg font-bold text-krom">{p.titel}</h3>
                <p className="mt-2 text-sm leading-relaxed text-staal-lys">
                  {p.tekst}
                </p>
                {p.href && (
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    {p.eksternt ? "Besøg vsl.dk" : "Se certifikat"}
                    <span aria-hidden>→</span>
                  </span>
                )}
              </>
            );
            const klasse =
              "flex h-full flex-col bg-ink p-6 transition-colors hover:bg-ink-2";
            return (
              <Afsloer as="div" key={p.titel} delay={i * 0.05}>
                {p.href ? (
                  <PopupLink
                    href={p.href}
                    className={klasse}
                    ariaLabel={p.eksternt ? "Åbn vsl.dk i nyt vindue" : "Åbn ISO-certifikat i nyt vindue"}
                  >
                    {indhold}
                  </PopupLink>
                ) : (
                  <div className={klasse}>{indhold}</div>
                )}
              </Afsloer>
            );
          })}
        </div>
      </div>
    </section>
  );
}
