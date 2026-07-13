"use client";

import { useState } from "react";
import { Afsloer } from "@/components/Sektion";

// Stiliseret dækningskort over trekantsområdet + Fyn med pulserende radius
// fra Middelfart. Positioner er tilnærmede og til illustration.
type By = { navn: string; x: number; y: number; base?: boolean; ramme: string };

const byer: By[] = [
  { navn: "Middelfart", x: 340, y: 210, base: true, ramme: "Vores base — centralt i trekantsområdet." },
  { navn: "Fredericia", x: 250, y: 190, ramme: "Kort afstand — hurtig respons." },
  { navn: "Kolding", x: 205, y: 245, ramme: "En del af vores kerneområde." },
  { navn: "Vejle", x: 210, y: 140, ramme: "Nord i trekantsområdet." },
  { navn: "Odense", x: 470, y: 235, ramme: "Fyn — vi dækker hele øen." },
];

export function DaekningsKort() {
  const [aktiv, setAktiv] = useState<By>(byer[0]);

  return (
    <section className="border-t border-linje bg-ink py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
        <Afsloer>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Dækningsområde
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-krom sm:text-5xl">
            Ekspertise i hele Danmark og Malmö
          </h2>
          <p className="mt-4 text-lg text-staal-lys">
            Fra vores base i Middelfart løser vi vagtopgaver i hele Danmark og Malmö —
            med hovedfokus på trekantsområdet, hvor vi rykker hurtigst ud, døgnet
            rundt. Vælg en by for at se, hvordan vi dækker.
          </p>
          <p className="mt-3 text-sm text-staal">
            Også opgaver i bl.a. København, Aarhus, Aalborg, Esbjerg og Malmö.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {byer.map((b) => (
              <li key={b.navn}>
                <button
                  type="button"
                  onMouseEnter={() => setAktiv(b)}
                  onFocus={() => setAktiv(b)}
                  onClick={() => setAktiv(b)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    aktiv.navn === b.navn
                      ? "border-accent bg-accent text-white"
                      : "border-linje text-staal-lys hover:border-staal hover:text-krom"
                  }`}
                >
                  {b.navn}
                </button>
              </li>
            ))}
          </ul>
          <div
            aria-live="polite"
            className="mt-6 rounded-2xl border border-linje bg-ink-2 p-5"
          >
            <p className="font-semibold text-krom">{aktiv.navn}</p>
            <p className="mt-1 text-sm text-staal-lys">{aktiv.ramme}</p>
          </div>
        </Afsloer>

        <Afsloer delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-linje bg-ink-2 p-4">
            <svg
              viewBox="0 0 600 380"
              className="w-full"
              role="img"
              aria-label="Kort over MT Vagts kerneområde i trekantsområdet — vi dækker desuden hele Danmark og Malmö"
            >
              <defs>
                <radialGradient id="hav" cx="50%" cy="40%">
                  <stop offset="0%" stopColor="#132030" />
                  <stop offset="100%" stopColor="#0b0f14" />
                </radialGradient>
              </defs>
              <rect width="600" height="380" fill="url(#hav)" />
              {/* Abstrakt landmasse */}
              <path
                d="M120 120 Q180 80 260 110 Q320 90 360 140 Q420 120 520 170 Q560 210 500 270 Q430 320 340 300 Q250 320 180 280 Q120 250 110 190 Z"
                fill="#141b24"
                stroke="#232c37"
                strokeWidth="1.5"
              />
              {/* Radius-puls fra Middelfart */}
              {[0, 1, 2].map((i) => (
                <circle
                  key={i}
                  cx={byer[0].x}
                  cy={byer[0].y}
                  r="26"
                  fill="none"
                  stroke="#d42233"
                  strokeWidth="1.5"
                  className="respekter-reduceret origin-center"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center",
                    animation: `puls-radius 3s ease-out ${i}s infinite`,
                  }}
                />
              ))}
              {/* Byer */}
              {byer.map((b) => {
                const erAktiv = aktiv.navn === b.navn;
                return (
                  <g key={b.navn}>
                    <circle
                      cx={b.x}
                      cy={b.y}
                      r={b.base ? 7 : 5}
                      fill={b.base ? "#d42233" : erAktiv ? "#e5283a" : "#9aa2ab"}
                      stroke="#0b0f14"
                      strokeWidth="2"
                    />
                    <text
                      x={b.x}
                      y={b.y - 12}
                      textAnchor="middle"
                      fontSize="13"
                      fontFamily="var(--font-inter)"
                      fill={erAktiv || b.base ? "#eef1f4" : "#9aa2ab"}
                      fontWeight={b.base ? 700 : 500}
                    >
                      {b.navn}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </Afsloer>
      </div>
    </section>
  );
}
