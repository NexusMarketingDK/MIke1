import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { alleSlugs, hentIndlaeg, alleIndlaeg } from "@/content/blog";
import { ydelseBySlug } from "@/content/ydelser";
import { virksomhed } from "@/content/virksomhed";
import { Billede } from "@/components/Billede";
import { Broedkrumme } from "@/components/Broedkrumme";
import { MdxIndhold } from "@/components/MdxIndhold";
import { FaqAccordion } from "@/components/FaqAccordion";
import { MagnetiskKnap } from "@/components/MagnetiskKnap";
import { JsonLd, faqLd } from "@/components/JsonLd";
import { SITE, absolutUrl } from "@/lib/site";

export function generateStaticParams() {
  return alleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!alleSlugs().includes(slug)) return {};
  const { meta } = hentIndlaeg(slug);
  return {
    title: meta.seoTitel,
    description: meta.seoBeskrivelse,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: meta.seoTitel,
      description: meta.seoBeskrivelse,
      url: absolutUrl(`/blog/${slug}`),
      publishedTime: meta.dato,
    },
  };
}

export default async function IndlaegSide({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!alleSlugs().includes(slug)) notFound();
  const { meta, indhold } = hentIndlaeg(slug);
  const ydelse = meta.ydelse ? ydelseBySlug(meta.ydelse) : undefined;

  const andre = alleIndlaeg()
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const datoDa = new Date(meta.dato).toLocaleDateString("da-DK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const articleLd = {
    "@context": "https://schema.org",
    "@type": ["Article", "BlogPosting"],
    headline: meta.titel,
    description: meta.seoBeskrivelse,
    datePublished: meta.dato,
    dateModified: meta.dato,
    author: { "@type": "Organization", name: virksomhed.navn },
    publisher: { "@id": `${SITE.url}/#organisation` },
    mainEntityOfPage: absolutUrl(`/blog/${slug}`),
    keywords: meta.tags.join(", "),
  };

  return (
    <>
      <JsonLd data={articleLd} />

      <article className="bg-ink pt-28">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <Broedkrumme
            dele={[
              { navn: "Forside", sti: "/" },
              { navn: "Blog", sti: "/blog" },
              { navn: meta.titel, sti: `/blog/${slug}` },
            ]}
          />
          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-staal">
            <span className="rounded-full bg-grafit px-3 py-1 text-accent">
              {meta.kategori}
            </span>
            <span>{datoDa}</span>
            <span>·</span>
            <span>{meta.laesetidMin} min. læsning</span>
          </div>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-krom sm:text-5xl">
            {meta.titel}
          </h1>
          <p className="mt-4 text-lg text-staal-lys">{meta.beskrivelse}</p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl px-5 lg:px-8">
          <Billede
            navn={meta.hero}
            alt={meta.titel}
            ratio="21:9"
            prioritet
          />
        </div>

        <div className="mx-auto mt-12 max-w-3xl px-5 lg:px-8">
          {/* Nøgle-pointe */}
          <div className="rounded-2xl border border-accent-dyb/60 bg-accent/10 p-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent-klar">
              Nøgle-pointe
            </p>
            <p className="mt-2 text-lg font-medium text-krom">{meta.takeaway}</p>
          </div>

          <MdxIndhold kilde={indhold} />

          {/* Tags */}
          {meta.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {meta.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-linje px-3 py-1 text-xs text-staal-lys"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* FAQ */}
          {meta.faq.length > 0 && (
            <div className="mt-14">
              <h2 className="text-2xl font-bold text-krom">
                Ofte stillede spørgsmål
              </h2>
              <div className="mt-6">
                <FaqAccordion faq={meta.faq} />
              </div>
              <JsonLd data={faqLd(meta.faq)} />
            </div>
          )}

          {/* CTA til relateret ydelse */}
          {ydelse && (
            <div className="mt-14 rounded-2xl border border-linje bg-ink-2 p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                Relateret ydelse
              </p>
              <h2 className="mt-2 text-2xl font-bold text-krom">{ydelse.titel}</h2>
              <p className="mt-2 text-staal-lys">{ydelse.intro}</p>
              <div className="mt-6 flex flex-wrap gap-4">
                <MagnetiskKnap href={`/vi-tilbyder/${ydelse.slug}`}>
                  Se {ydelse.titel.toLowerCase()}
                </MagnetiskKnap>
                <a
                  href={`tel:${virksomhed.telefon.kald}`}
                  className="inline-flex items-center gap-2 rounded-full border border-linje px-6 py-3 text-sm font-semibold text-krom hover:border-staal-lys"
                >
                  📞 {virksomhed.telefon.visning}
                </a>
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Andre indlæg */}
      <section className="mt-20 border-t border-linje bg-ink-2 py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="text-2xl font-bold text-krom">Flere indlæg</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {andre.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group rounded-2xl border border-linje bg-ink p-6 transition-colors hover:border-staal"
              >
                <span className="text-xs text-accent">{p.kategori}</span>
                <h3 className="mt-2 font-bold leading-snug text-krom">
                  {p.titel}
                </h3>
                <span className="mt-3 inline-block text-sm text-staal-lys">
                  {p.laesetidMin} min. læsning →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
