"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { virksomhed } from "@/content/virksomhed";

// Fast "Ring nu"-bjælke der dukker op efter 40 % scroll — kun på mobil.
export function MobilRingBjaelke() {
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const paaRul = () => {
      const h = document.documentElement;
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      setVis(pct > 0.4);
    };
    paaRul();
    window.addEventListener("scroll", paaRul, { passive: true });
    return () => window.removeEventListener("scroll", paaRul);
  }, []);

  return (
    <AnimatePresence>
      {vis && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="respekter-reduceret fixed inset-x-3 bottom-3 z-50 lg:hidden"
        >
          <a
            href={`tel:${virksomhed.telefon.kald}`}
            className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-base font-semibold text-white shadow-[0_16px_40px_-12px_rgba(212,34,51,0.8)]"
          >
            <span aria-hidden>📞</span>
            Ring nu {virksomhed.telefon.visning}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
