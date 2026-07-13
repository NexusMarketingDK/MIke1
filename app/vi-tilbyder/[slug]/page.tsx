import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ydelser, ydelseBySlug } from "@/content/ydelser";
import { ydelseIndhold } from "@/content/ydelse-indhold";
import { alleIndlaeg } from "@/content/blog";
import { virksomhed } from "@/content/virksomhed";
import { Billede } from "@/components/Billede";
import { Broedkrumme } from "@/components/Broedkrumme";
import { Afsloer } from "@/components/Sektion";
import { SeoSektion } from "@/components/SeoSektion";
import { CtaBaand } from "@/components/CtaBaand";
import { MagnetiskKnap } from "@/components/MagnetiskKnap";
import { RisikoSlider } from "@/components/RisikoSlider";
import { JsonLd } from "@/components/JsonLd";
import { SITE, absolutUrl } from "@/lib/site";

export function generateStaticParams() {
  return ydelser.map((y) => ({ slug: y.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const y = ydelseBySlug(slug);
    if (!y) return {};
    return {
      title: y.seoTitel,
      description: y.seoBeskrivelse,
      alternates: { canonical: `/vi-tilbyder/${y.slug}` },
      openGraph: {
        title: y.seoTitel,
        description: y.seoBeskrivelse,
        url: absolutUrl(`/vi-tilbyder/${y.slug}`),
      },
    };
  });
}

export default async function YdelseSide({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const y = ydelseBySlug(slug);
  if (!y) notFound();
  const ind = ydelseIndhold[slug];

  const relaterede = y.relaterede
    .map((s) => ydelseBySlug(s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const blogAlle = alleIndlaeg();
  const relateretBlog = (ind?.relateretBlog ?? [])
    .map((s) => blogAlle.find((p) => p.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: y.titel,
    serviceType: y.titel,
    description: y.seoBeskrivelse,
    provider: { "@id": `${SITE.url}/#organisation` },
    areaServed: virksomhed.daekning.map((by) => ({ "@type": "City", name: by })),
    url: absolutUrl(`/vi-tilbyder/${y.slug}`),
  };

  return (
    <>
      <JsonLd data={serviceLd} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink pt-28 pb-16">
        <div aria-hidden className="gitter absolute inset-0 opacity-20" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
          <Afsloer>
            <Broedkrumme
              dele={[
                { navn: "Forside", sti: "/" },
                { navn: "Ydelser", sti: "/vi-tilbyder" },
                { navn: y.titel, sti: `/vi-tilbyder/${y.slug}` },
              ]}
            />
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-krom sm:text-5xl">
              {y.titel}
            </h1>
            <p className="mt-3 text-lg font-medium text-accent">{y.undertitel}</p>
            <p className="mt-5 text-lg leading-relaxed text-staal-lys">
              {y.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <MagnetiskKnap href="/kontakt">Få et tilbud</MagnetiskKnap>
              <a
                href={`tel:${virksomhed.telefon.kald}`}
                className="inline-flex items-center gap-2 rounded-full border border-linje px-6 py-3 text-sm font-semibold text-krom hover:border-staal-lys"
              >
                📞 {virksomhed.telefon.visning}
              </a>
            </div>
          </Afsloer>
          <Afsloer delay={0.1}>
            <Billede
              navn={ind?.heroBillede ?? "hero-byggeplads-nat"}
              variant={ind?.heroVariant ?? "nat"}
              alt={`${y.titel} — ${y.undertitel} i ${virksomhed.region}`}
              ratio="4:5"
              prioritet
              className="mx-auto max-w-md lg:max-w-none"
            />
          </Afsloer>
        </div>
      </section>

      {/* Punkter */}
      <section className="border-t border-linje bg-ink-2 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Afsloer>
            <h2 className="text-3xl font-extrabold tracking-tight text-krom">
              Det dækker {y.titel.toLowerCase()}
            </h2>
          </Afsloer>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {y.punkter.map((p, i) => (
              <Afsloer
                key={p}
                delay={(i % 2) * 0.05}
                className="flex items-start gap-4 rounded-2xl border border-linje bg-ink p-6"
              >
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                  ✓
                </span>
                <span className="text-staal-lys">{p}</span>
              </Afsloer>
            ))}
          </div>
        </div>
      </section>

      {/* Risiko-slider (kun byggepladsvagt) */}
      {ind?.visRisikoSlider && (
        <section className="border-t border-linje bg-ink py-20">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <Afsloer className="max-w-2xl">
              <h2 className="text-3xl font-extrabold tracking-tight text-krom">
                Fra risiko til tryghed
              </h2>
              <p className="mt-4 text-staal-lys">
                Træk i skyderen og se forskellen på en usikret byggeplads og en
                plads med synlig vagt. Tilstedeværelsen ændrer alt.
              </p>
            </Afsloer>
            <Afsloer delay={0.1} className="mt-10">
              <RisikoSlider />
            </Afsloer>
          </div>
        </section>
      )}

      {/* Relaterede ydelser + blog */}
      <section className="border-t border-linje bg-ink-2 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-krom">Relaterede ydelser</h2>
              <ul className="mt-6 space-y-3">
                {relaterede.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/vi-tilbyder/${r.slug}`}
                      className="group flex items-center justify-between rounded-2xl border border-linje bg-ink p-5 transition-colors hover:border-staal"
                    >
                      <span>
                        <span className="font-semibold text-krom">{r.titel}</span>
                        <span className="block text-sm text-staal-lys">
                          {r.undertitel}
                        </span>
                      </span>
                      <span className="text-accent transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {relateretBlog.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-krom">Læs mere i bloggen</h2>
                <ul className="mt-6 space-y-3">
                  {relateretBlog.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blog/${p.slug}`}
                        className="group flex items-center justify-between rounded-2xl border border-linje bg-ink p-5 transition-colors hover:border-staal"
                      >
                        <span>
                          <span className="font-semibold text-krom">
                            {p.titel}
                          </span>
                          <span className="block text-sm text-staal-lys">
                            {p.laesetidMin} min. læsning · {p.kategori}
                          </span>
                        </span>
                        <span className="text-accent transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {ind && (
        <SeoSektion
          overskrift={ind.seoOverskrift}
          afsnit={ind.seoAfsnit}
          faq={ind.faq}
        />
      )}

      <CtaBaand
        overskrift={`Skal vi løse din ${y.titel.toLowerCase()}-opgave?`}
      />
    </>
  );
}
