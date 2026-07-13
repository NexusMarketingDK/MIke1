"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Blød scroll via Lenis. Deaktiveres helt ved prefers-reduced-motion.
export function GlatRul() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const tik = (tid: number) => {
      lenis.raf(tid);
      raf = requestAnimationFrame(tik);
    };
    raf = requestAnimationFrame(tik);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
