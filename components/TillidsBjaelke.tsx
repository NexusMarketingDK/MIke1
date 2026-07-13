"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

// Tæller kun for facts vi kan forsvare — ingen opfundne statistikker.
const fakta = [
  { tal: 24, suffix: "/7", tekst: "Døgndækning" },
  { tal: 100, suffix: "%", tekst: "Autoriserede vagter" },
  { tal: 8, suffix: "", tekst: "Vagtløsninger" },
  { tal: 5, suffix: "", tekst: "Byer i trekantsområdet" },
];

function Taeller({ til, suffix }: { til: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const iView = useInView(ref, { once: true, margin: "-40px" });
  const reducer = useReducedMotion();
  const [vaerdi, setVaerdi] = useState(reducer ? til : 0);

  useEffect(() => {
    if (!iView || reducer) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVaerdi(til);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const varighed = 1200;
    const tik = (nu: number) => {
      const p = Math.min((nu - start) / varighed, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVaerdi(Math.round(eased * til));
      if (p < 1) raf = requestAnimationFrame(tik);
    };
    raf = requestAnimationFrame(tik);
    return () => cancelAnimationFrame(raf);
  }, [iView, reducer, til]);

  return (
    <span ref={ref}>
      {vaerdi}
      {suffix}
    </span>
  );
}

export function TillidsBjaelke() {
  return (
    <section className="border-y border-linje bg-ink-2">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-5 py-10 lg:grid-cols-4 lg:px-8">
        {fakta.map((f) => (
          <div key={f.tekst} className="px-4 text-center">
            <div className="font-[family-name:var(--font-archivo)] text-4xl font-extrabold tracking-tight text-krom lg:text-5xl">
              <Taeller til={f.tal} suffix={f.suffix} />
            </div>
            <div className="mt-2 text-sm text-staal-lys">{f.tekst}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
