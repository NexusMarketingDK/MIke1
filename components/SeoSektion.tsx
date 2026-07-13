import { FaqAccordion, type Faq } from "@/components/FaqAccordion";
import { JsonLd, faqLd } from "@/components/JsonLd";
import { Afsloer } from "@/components/Sektion";

// Dedikeret SEO-sektion nederst på hver side: nyttig dansk brødtekst (250-400 ord)
// + FAQ-blok med FAQPage JSON-LD.
export function SeoSektion({
  overskrift,
  afsnit,
  faq,
}: {
  overskrift: string;
  afsnit: string[];
  faq: Faq[];
}) {
  return (
    <section className="border-t border-linje bg-ink-2 py-20">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <Afsloer>
          <h2 className="text-3xl font-extrabold tracking-tight text-krom">
            {overskrift}
          </h2>
          <div className="mt-6 space-y-4 text-staal-lys">
            {afsnit.map((p, i) => (
              <p key={i} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </Afsloer>

        <Afsloer delay={0.1}>
          <h3 className="text-xl font-bold text-krom">Ofte stillede spørgsmål</h3>
          <div className="mt-6">
            <FaqAccordion faq={faq} />
          </div>
        </Afsloer>
      </div>
      <JsonLd data={faqLd(faq)} />
    </section>
  );
}
