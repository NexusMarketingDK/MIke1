"use client";

import { useCallback, useRef, useState } from "react";

// "Før/efter"-slider: usikret byggeplads vs. plads med vagt.
// Trækkes med mus, touch eller tastatur (a11y).
export function RisikoSlider() {
  const boks = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(50);

  const opdater = useCallback((klientX: number) => {
    const r = boks.current?.getBoundingClientRect();
    if (!r) return;
    const p = ((klientX - r.left) / r.width) * 100;
    setPct(Math.min(100, Math.max(0, p)));
  }, []);

  return (
    <div
      ref={boks}
      className="relative aspect-video w-full select-none overflow-hidden rounded-2xl border border-linje"
      onMouseMove={(e) => e.buttons === 1 && opdater(e.clientX)}
      onTouchMove={(e) => opdater(e.touches[0].clientX)}
      onClick={(e) => opdater(e.clientX)}
    >
      {/* Efter: sikret plads (baggrund) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 70% 20%, #16324a 0%, #0d1926 45%, #0a0e13 80%), radial-gradient(50% 50% at 25% 85%, rgba(255,186,110,0.22), transparent 60%)",
        }}
      >
        <span className="absolute bottom-4 right-4 rounded-full border border-linje bg-ink/70 px-3 py-1 text-xs font-semibold text-krom backdrop-blur">
          Med vagt · tryghed
        </span>
      </div>

      {/* Før: usikret plads (klippet) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(135deg,#14100e 0 18px,#0e0b0a 18px 36px), radial-gradient(60% 60% at 60% 30%, rgba(212,34,51,0.18), transparent 60%)",
          }}
        />
        <div className="kornstruktur absolute inset-0 opacity-[0.12]" />
        <span className="absolute bottom-4 left-4 rounded-full border border-accent-dyb bg-ink/70 px-3 py-1 text-xs font-semibold text-accent-klar backdrop-blur">
          Uden vagt · risiko
        </span>
      </div>

      {/* Håndtag */}
      <div
        className="absolute inset-y-0 z-10 w-0.5 bg-accent"
        style={{ left: `${pct}%` }}
      >
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(pct)}
          onChange={(e) => setPct(Number(e.target.value))}
          aria-label="Træk for at sammenligne plads med og uden vagt"
          className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize appearance-none rounded-full border-2 border-accent bg-ink opacity-100"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-accent bg-ink text-krom"
        >
          ↔
        </span>
      </div>
    </div>
  );
}
