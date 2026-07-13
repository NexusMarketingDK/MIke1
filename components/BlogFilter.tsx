"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { IndlaegMeta } from "@/content/blog";
import { Billede } from "@/components/Billede";

export function BlogFilter({
  indlaeg,
  kategorier,
}: {
  indlaeg: IndlaegMeta[];
  kategorier: string[];
}) {
  const [valgt, setValgt] = useState<string>("Alle");

  const filtreret = useMemo(
    () =>
      valgt === "Alle"
        ? indlaeg
        : indlaeg.filter((p) => p.kategori === valgt),
    [valgt, indlaeg]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {["Alle", ...kategorier].map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setValgt(k)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              valgt === k
                ? "border-accent bg-accent text-white"
                : "border-linje text-staal-lys hover:border-staal hover:text-krom"
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtreret.map((p) => (
          <article key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-linje bg-ink-2 transition-colors hover:border-staal"
            >
              <Billede
                navn={p.hero}
                alt={p.titel}
                ratio="16:9"
                className="rounded-none border-0"
              />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 text-xs text-staal">
                  <span className="rounded-full bg-grafit px-2 py-0.5 text-accent">
                    {p.kategori}
                  </span>
                  <span>{p.laesetidMin} min.</span>
                </div>
                <h2 className="mt-3 text-lg font-bold leading-snug text-krom">
                  {p.titel}
                </h2>
                <p className="mt-2 flex-1 text-sm text-staal-lys">
                  {p.beskrivelse}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-krom">
                  Læs indlæg
                  <span className="text-accent transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
