"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type Faq = { spoergsmaal: string; svar: string };

export function FaqAccordion({ faq }: { faq: Faq[] }) {
  const [aaben, setAaben] = useState<number | null>(0);
  const reducer = useReducedMotion();

  return (
    <div className="divide-y divide-linje overflow-hidden rounded-2xl border border-linje">
      {faq.map((f, i) => {
        const erAaben = aaben === i;
        return (
          <div key={f.spoergsmaal}>
            <button
              type="button"
              onClick={() => setAaben(erAaben ? null : i)}
              aria-expanded={erAaben}
              className="flex w-full items-center justify-between gap-4 bg-ink px-5 py-4 text-left transition-colors hover:bg-ink-2"
            >
              <span className="font-semibold text-krom">{f.spoergsmaal}</span>
              <span
                className={`shrink-0 text-accent transition-transform ${
                  erAaben ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {erAaben && (
                <motion.div
                  initial={reducer ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reducer ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden bg-ink"
                >
                  <p className="px-5 pb-5 text-staal-lys">{f.svar}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
