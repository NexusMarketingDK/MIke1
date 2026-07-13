"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { virksomhed } from "@/content/virksomhed";
import { ydelser } from "@/content/ydelser";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";

const nav = [
  { href: "/om-mtvagt", label: "Om os" },
  { href: "/vi-tilbyder", label: "Ydelser", undermenu: true },
  { href: "/blog", label: "Blog" },
  { href: "/ledige-stillinger", label: "Job" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Sidehoved() {
  const [rullet, setRullet] = useState(false);
  const [aabenMobil, setAabenMobil] = useState(false);

  useEffect(() => {
    const paaRul = () => setRullet(window.scrollY > 24);
    paaRul();
    window.addEventListener("scroll", paaRul, { passive: true });
    return () => window.removeEventListener("scroll", paaRul);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        rullet
          ? "border-b border-linje/70 bg-ink/70 backdrop-blur-xl supports-[backdrop-filter]:bg-ink/55"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 lg:px-8">
        <Link href="/" aria-label="MT Vagt forside" className="flex items-center">
          <Logo className="h-9 w-auto md:h-10" />
        </Link>

        {/* Desktop-navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((punkt) => (
            <div key={punkt.href} className="group relative">
              <Link
                href={punkt.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-staal-lys transition-colors hover:text-krom"
              >
                {punkt.label}
              </Link>
              {punkt.undermenu && (
                <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <ul className="overflow-hidden rounded-2xl border border-linje bg-ink-2/95 p-2 shadow-2xl backdrop-blur-xl">
                    {ydelser.map((y) => (
                      <li key={y.slug}>
                        <Link
                          href={`/vi-tilbyder/${y.slug}`}
                          className="block rounded-xl px-3 py-2 text-sm text-staal-lys transition-colors hover:bg-grafit hover:text-krom"
                        >
                          {y.titel}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${virksomhed.telefon.kald}`}
            className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-klar sm:inline-flex"
          >
            <span aria-hidden>📞</span>
            {virksomhed.telefon.visning}
          </a>
          <button
            type="button"
            onClick={() => setAabenMobil((v) => !v)}
            aria-label="Åbn menu"
            aria-expanded={aabenMobil}
            className="grid h-10 w-10 place-items-center rounded-full border border-linje text-krom lg:hidden"
          >
            <span className="text-lg">{aabenMobil ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Mobil-menu */}
      {aabenMobil && (
        <div className="border-t border-linje bg-ink/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto max-w-7xl px-5 py-4">
            <ul className="flex flex-col gap-1">
              {nav.map((punkt) => (
                <li key={punkt.href}>
                  <Link
                    href={punkt.href}
                    onClick={() => setAabenMobil(false)}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-krom hover:bg-grafit"
                  >
                    {punkt.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={`tel:${virksomhed.telefon.kald}`}
                  className="block rounded-xl bg-accent px-3 py-3 text-center text-base font-semibold text-white"
                >
                  Ring {virksomhed.telefon.visning}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
