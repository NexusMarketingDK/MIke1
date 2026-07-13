import { anmeldelser, anmeldelserUrl } from "@/content/anmeldelser";
import { virksomhed } from "@/content/virksomhed";
import { Afsloer } from "@/components/Sektion";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

function Stjerner({ antal = 5 }: { antal?: number }) {
  return (
    <div className="flex gap-0.5 text-accent" aria-label={`${antal} ud af 5 stjerner`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden className={i < antal ? "" : "opacity-25"}>
          ★
        </span>
      ))}
    </div>
  );
}

export function Anmeldelser() {
  const harAnmeldelser = anmeldelser.length > 0;

  // Review-JSON-LD udsendes KUN for ægte anmeldelser (aldrig opdigtet markup).
  const reviewLd = harAnmeldelser
    ? {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SITE.url}/#organisation`,
        name: virksomhed.navn,
        review: anmeldelser.map((a) => ({
          "@type": "Review",
          reviewBody: a.tekst,
          author: { "@type": "Person", name: a.navn },
          ...(a.stjerner
            ? {
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: a.stjerner,
                  bestRating: 5,
                },
              }
            : {}),
        })),
      }
    : null;

  return (
    <section className="bg-ink py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {reviewLd && <JsonLd data={reviewLd} />}

        <Afsloer className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Kundeudtalelser
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-krom sm:text-4xl">
            Hvad vores kunder siger
          </h2>
        </Afsloer>

        {harAnmeldelser ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {anmeldelser.map((a, i) => (
              <Afsloer
                as="article"
                key={`${a.navn}-${i}`}
                delay={i * 0.05}
                className="flex h-full flex-col rounded-2xl border border-linje bg-ink-2 p-7"
              >
                {a.stjerner && <Stjerner antal={a.stjerner} />}
                <p className="mt-4 flex-1 text-krom">&ldquo;{a.tekst}&rdquo;</p>
                <footer className="mt-6">
                  <p className="font-semibold text-krom">{a.navn}</p>
                  {a.rolle && <p className="text-sm text-staal-lys">{a.rolle}</p>}
                  {a.kilde && (
                    <p className="mt-1 text-xs text-staal">via {a.kilde}</p>
                  )}
                </footer>
              </Afsloer>
            ))}
          </div>
        ) : (
          // Ærlig fallback — ingen opdigtede anmeldelser.
          <Afsloer className="mt-8 rounded-2xl border border-linje bg-ink-2 p-8 text-center">
            <p className="mx-auto max-w-2xl text-lg text-staal-lys">
              Vi sætter en ære i tilfredse kunder — små som store opgaver. Har du
              haft en vagt fra os, vil vi meget gerne høre din oplevelse.
            </p>
            {anmeldelserUrl && (
              <a
                href={anmeldelserUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-linje px-6 py-3 text-sm font-semibold text-krom hover:border-staal-lys"
              >
                Se og skriv anmeldelser →
              </a>
            )}
          </Afsloer>
        )}
      </div>
    </section>
  );
}
