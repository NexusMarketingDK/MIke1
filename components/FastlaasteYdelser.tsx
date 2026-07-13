"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ydelser } from "@/content/ydelser";
import { ydelseIndhold } from "@/content/ydelse-indhold";
import { Billede } from "@/components/Billede";

// Sticky pinned service scroller: listen "pinnes" til venstre, mens
// kort/billeder skifter til højre, efterhånden som man scroller.
// Aktiv tilstand styres af IntersectionObserver (reduceret-bevægelse-sikkert).
export function FastlaasteYdelser() {
  const [aktiv, setAktiv] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (poster) => {
        poster.forEach((p) => {
          if (p.isIntersecting) {
            const idx = Number((p.target as HTMLElement).dataset.idx);
            setAktiv(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="border-t border-linje bg-ink-2 py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Sådan skaber vi tryghed
        </p>
        <h2 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight text-krom sm:text-5xl">
          Én partner — otte vagtløsninger
        </h2>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {/* Venstre: pinned liste */}
          <div className="hidden lg:block">
            <div className="sticky top-28 space-y-1">
              {ydelser.map((y, i) => (
                <Link
                  key={y.slug}
                  href={`/vi-tilbyder/${y.slug}`}
                  className={`block border-l-2 py-3 pl-5 transition-all ${
                    aktiv === i
                      ? "border-accent text-krom"
                      : "border-linje text-staal hover:text-staal-lys"
                  }`}
                >
                  <span className="text-xs font-semibold">0{i + 1}</span>
                  <span className="ml-3 text-lg font-bold">{y.titel}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Højre: kort der scrolles igennem */}
          <div className="space-y-8">
            {ydelser.map((y, i) => {
              const ind = ydelseIndhold[y.slug];
              return (
                <div
                  key={y.slug}
                  data-idx={i}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  className="overflow-hidden rounded-2xl border border-linje bg-ink"
                >
                  <Billede
                    navn={ind?.heroBillede ?? "hero-byggeplads-nat"}
                    variant={ind?.heroVariant ?? "nat"}
                    alt={`${y.titel} — ${y.undertitel}`}
                    ratio="16:9"
                    className="rounded-none border-0"
                  />
                  <div className="p-7">
                    <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                      0{i + 1} · {y.undertitel}
                    </span>
                    <h3 className="mt-2 text-2xl font-bold text-krom">{y.titel}</h3>
                    <p className="mt-3 text-staal-lys">{y.intro}</p>
                    <Link
                      href={`/vi-tilbyder/${y.slug}`}
                      className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-krom hover:text-accent"
                    >
                      Læs mere
                      <span className="text-accent">→</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
