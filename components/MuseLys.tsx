"use client";

import { useEffect, useRef, useState } from "react";

// Gennemgående lyseffekt der følger musen på hele siden.
// Kontrasten tilpasses automatisk efter fladen under markøren: på mørke
// flader lyser den op (varm lygte), på lyse flader giver den en blød varm
// spotlight, så effekten altid er synlig. Respekterer reduceret bevægelse
// og deaktiveres på touch-enheder.
export function MuseLys() {
  const ref = useRef<HTMLDivElement>(null);
  const [lys, setLys] = useState(false); // true = lys baggrund under markøren
  const [aktiv, setAktiv] = useState(false);

  useEffect(() => {
    const reduceret = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (reduceret || touch) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let sidsteSample = 0;

    // Finder den effektive baggrundsfarve under et punkt (går op i DOM'en,
    // til en ikke-gennemsigtig baggrund findes) og afgør om den er lys.
    function erLysBaggrund(cx: number, cy: number): boolean {
      let el = document.elementFromPoint(cx, cy) as HTMLElement | null;
      let sikkerhed = 0;
      while (el && sikkerhed++ < 12) {
        const bg = getComputedStyle(el).backgroundColor;
        const m = bg.match(/rgba?\(([^)]+)\)/);
        if (m) {
          const dele = m[1].split(",").map((v) => parseFloat(v));
          const [r, g, b] = dele;
          const a = dele[3] ?? 1;
          if (a > 0.3) {
            const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
            return lum > 0.55;
          }
        }
        el = el.parentElement;
      }
      return false; // standard: mørk (siden er mørk)
    }

    function opdater() {
      const node = ref.current;
      if (node) {
        node.style.setProperty("--mx", `${x}px`);
        node.style.setProperty("--my", `${y}px`);
      }
      raf = 0;
    }

    function paaBevaeg(e: PointerEvent) {
      x = e.clientX;
      y = e.clientY;
      if (!aktiv) setAktiv(true);
      if (!raf) raf = requestAnimationFrame(opdater);
      // Sample baggrunden sjældnere (ydelse).
      const nu = performance.now();
      if (nu - sidsteSample > 140) {
        sidsteSample = nu;
        setLys(erLysBaggrund(x, y));
      }
    }

    function forlad() {
      setAktiv(false);
    }

    window.addEventListener("pointermove", paaBevaeg, { passive: true });
    window.addEventListener("pointerleave", forlad);
    return () => {
      window.removeEventListener("pointermove", paaBevaeg);
      window.removeEventListener("pointerleave", forlad);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [aktiv]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[45] transition-opacity duration-500"
      style={{
        opacity: aktiv ? 1 : 0,
        mixBlendMode: lys ? "multiply" : "screen",
        background: lys
          ? "radial-gradient(340px at var(--mx, 50%) var(--my, 50%), rgba(150,95,30,0.16), transparent 72%)"
          : "radial-gradient(380px at var(--mx, 50%) var(--my, 50%), rgba(255,209,150,0.13), rgba(255,180,92,0.05) 45%, transparent 72%)",
      }}
    />
  );
}
