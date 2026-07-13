import type { Metadata } from "next";
import { alleIndlaeg, alleKategorier } from "@/content/blog";
import { Broedkrumme } from "@/components/Broedkrumme";
import { Afsloer } from "@/components/Sektion";
import { BlogFilter } from "@/components/BlogFilter";
import { CtaBaand } from "@/components/CtaBaand";

export const metadata: Metadata = {
  title: "Blog om vagt, sikkerhed og tryghed",
  description:
    "Viden om byggepladssikkerhed, vagtløsninger, adgangskontrol og tryghed i trekantsområdet. Læs MT Vagts blog om sikkerhed og vagtservice.",
  alternates: { canonical: "/blog" },
};

export default function BlogOversigt() {
  const indlaeg = alleIndlaeg();
  const kategorier = alleKategorier();

  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-28 pb-14">
        <div aria-hidden className="gitter absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Broedkrumme
            dele={[
              { navn: "Forside", sti: "/" },
              { navn: "Blog", sti: "/blog" },
            ]}
          />
          <Afsloer className="mt-6 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Blog
            </p>
            <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-krom sm:text-6xl">
              Viden om sikkerhed og tryghed
            </h1>
            <p className="mt-6 text-lg text-staal-lys">
              Praktisk viden om byggepladssikkerhed, vagtløsninger, adgangskontrol
              og tryghed — skrevet af et autoriseret vagtselskab.
            </p>
          </Afsloer>
        </div>
      </section>

      <section className="bg-ink pb-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <BlogFilter indlaeg={indlaeg} kategorier={kategorier} />
        </div>
      </section>

      <CtaBaand />
    </>
  );
}
