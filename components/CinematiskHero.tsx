"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { virksomhed } from "@/content/virksomhed";
import { MagnetiskKnap } from "@/components/MagnetiskKnap";
import { BILLEDER } from "@/lib/billed-manifest";

// Cinematisk hero: dag→nat-gradient, kornstruktur, hairline-gitter og en
// projektør-/lygtekegle der følger musen. Rammesekvens-canvas kan hydreres
// oven på posteren efter LCP (se KILDE-note i briefen).
export function CinematiskHero() {
  const ref = useRef<HTMLDivElement>(null);
  const reducer = useReducedMotion();
  const [mus, setMus] = useState({ x: 50, y: 40 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Baggrunden graduerer fra skumring til nat idet man scroller.
  const natOpacitet = useTransform(scrollYProgress, [0, 1], [0, 0.85]);
  const parY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  useEffect(() => {
    if (reducer) return;
    const paaBevaeg = (e: MouseEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      setMus({
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      });
    };
    window.addEventListener("mousemove", paaBevaeg);
    return () => window.removeEventListener("mousemove", paaBevaeg);
  }, [reducer]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink"
    >
      {/* Poster-lag: kold blå nat + amber pladslys (fotografisk grade) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 80% 10%, #16324a 0%, #0d1926 35%, #0b0f14 70%), radial-gradient(60% 50% at 15% 85%, rgba(212,34,51,0.10), transparent 60%)",
        }}
      />
      {/* Hero-illustration: nat-byggeplads med vagt (LCP-poster) */}
      {BILLEDER["hero-byggeplads-nat"] && (
        <Image
          src={BILLEDER["hero-byggeplads-nat"]}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="kenburns object-cover object-[65%_center] opacity-70"
        />
      )}
      {/* Amber floodlight-glød nederst til højre */}
      <div
        aria-hidden
        className="absolute -right-24 bottom-0 h-[60vh] w-[60vh] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,176,92,0.35), transparent 65%)",
        }}
      />
      {/* Dag→nat-graduering via scroll */}
      <motion.div
        aria-hidden
        style={{ opacity: reducer ? 0.4 : natOpacitet }}
        className="absolute inset-0 bg-[#05080c]"
      />
      {/* Lygtekegle der følger musen */}
      {!reducer && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-[background] duration-200"
          style={{
            background: `radial-gradient(280px 280px at ${mus.x}% ${mus.y}%, rgba(255,208,140,0.12), transparent 70%)`,
          }}
        />
      )}
      {/* Hairline-gitter + kornstruktur */}
      <div aria-hidden className="gitter absolute inset-0 opacity-[0.35]" />
      <div
        aria-hidden
        className="kornstruktur absolute inset-0 opacity-[0.06] mix-blend-overlay"
      />

      {/* Indhold */}
      <motion.div
        style={{ y: reducer ? 0 : parY }}
        className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-28 lg:px-8"
      >
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-linje bg-ink-2/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-staal-lys backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Autoriseret vagtselskab · Middelfart
          </span>

          <h1 className="mt-6 text-balance text-[2rem] font-extrabold leading-[1.05] tracking-tight text-krom [overflow-wrap:anywhere] sm:text-5xl sm:leading-[0.98] md:text-6xl lg:text-7xl">
            Tryghed hele døgnet
            <span className="block text-staal-lys">
              i <span className="text-accent">trekantsområdet</span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-staal-lys">
            {virksomhed.positionering} Alt personale er vagtuddannet,
            sikkerhedsgodkendt og godkendt til at arbejde under vagtloven.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <MagnetiskKnap href="/kontakt">Få et tilbud</MagnetiskKnap>
            <MagnetiskKnap href="/vi-tilbyder" variant="outline">
              Se vores ydelser
            </MagnetiskKnap>
            <a
              href={`tel:${virksomhed.telefon.kald}`}
              className="text-sm font-semibold text-krom underline-offset-4 hover:underline"
            >
              Akut vagt? Ring {virksomhed.telefon.visning}
            </a>
          </div>

          {/* Tillids-chips */}
          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-sm text-staal-lys">
            {[
              "Autoriseret af myndighederne",
              "Hele Danmark & Malmö",
              "ISO-certificeret",
              "Medlem af VSL",
              "Rigspolitiets legitimationskort",
              "Døgnvagt · 24/7",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="text-accent" aria-hidden>
                  ✓
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Blød overgang til næste sektion */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink"
      />

      {/* Scroll-cue */}
      <div
        aria-hidden
        className="respekter-reduceret absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce text-staal-lys md:block"
      >
        <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
      </div>
    </section>
  );
}
