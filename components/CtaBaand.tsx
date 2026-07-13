import { virksomhed } from "@/content/virksomhed";
import { MagnetiskKnap } from "@/components/MagnetiskKnap";

export function CtaBaand({
  overskrift = "Har du brug for en vagt?",
  tekst,
}: {
  overskrift?: string;
  tekst?: string;
}) {
  return (
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
            {overskrift}
          </h2>
          <p className="mt-3 text-lg text-staal-lys">
            {tekst ??
              `${virksomhed.garanti} Ring til os for en uforpligtende snak om din opgave.`}
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
  );
}
