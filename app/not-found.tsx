import Link from "next/link";
import { MagnetiskKnap } from "@/components/MagnetiskKnap";

export default function IkkeFundet() {
  return (
    <section className="relative flex min-h-[70svh] items-center overflow-hidden bg-ink">
      <div aria-hidden className="gitter absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-2xl px-5 py-24 text-center lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
          Fejl 404
        </p>
        <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-krom sm:text-6xl">
          Siden blev ikke fundet
        </h1>
        <p className="mt-5 text-lg text-staal-lys">
          Siden findes ikke længere eller er flyttet. Gå tilbage til forsiden, eller
          se vores ydelser.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <MagnetiskKnap href="/">Til forsiden</MagnetiskKnap>
          <Link
            href="/vi-tilbyder"
            className="inline-flex items-center gap-2 rounded-full border border-linje px-6 py-3 text-sm font-semibold text-krom hover:border-staal-lys"
          >
            Se ydelser
          </Link>
        </div>
      </div>
    </section>
  );
}
