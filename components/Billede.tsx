import Image from "next/image";
import { cn } from "@/lib/utils";
import { BILLEDER } from "@/lib/billed-manifest";

// Cinematisk billed-komponent. Findes navnet i billed-manifestet (dvs. filen
// ligger i /public/img/<navn>.webp), vises den med next/image. Ellers vises en
// on-brand gradient-poster med kornstruktur, så layoutet altid er komplet.
// Rigtige fotos (se content/image-prompts.md) er drop-in-erstatninger:
// læg filen i /public/img og kør `npm run billeder`.

const RATIOS: Record<string, string> = {
  "16:9": "aspect-video",
  "4:5": "aspect-[4/5]",
  "1:1": "aspect-square",
  "21:9": "aspect-[21/9]",
};

export function Billede({
  navn,
  alt,
  ratio = "16:9",
  className,
  prioritet = false,
  variant = "nat",
}: {
  navn: string;
  alt: string;
  ratio?: keyof typeof RATIOS;
  className?: string;
  prioritet?: boolean;
  variant?: "nat" | "daggry" | "interior" | "tekstur";
}) {
  const src = BILLEDER[navn];

  const gradienter: Record<string, string> = {
    nat: "radial-gradient(120% 90% at 75% 15%, #16324a 0%, #0d1926 40%, #0a0e13 75%), radial-gradient(60% 60% at 20% 90%, rgba(255,176,92,0.18), transparent 60%)",
    daggry:
      "radial-gradient(120% 100% at 60% 0%, #3a4a5c 0%, #222d3a 45%, #12181f 80%), radial-gradient(50% 50% at 85% 90%, rgba(255,196,120,0.16), transparent 60%)",
    interior:
      "radial-gradient(100% 100% at 30% 20%, #2a2620 0%, #1a1712 55%, #100e0b 85%), radial-gradient(50% 50% at 80% 80%, rgba(255,186,110,0.2), transparent 60%)",
    tekstur:
      "repeating-linear-gradient(135deg, #11161d 0 14px, #0d1218 14px 28px), radial-gradient(80% 80% at 50% 0%, rgba(212,34,51,0.1), transparent 70%)",
  };

  return (
    <div
      className={cn(
        "dybde-3d glans-3d relative overflow-hidden rounded-2xl border border-linje bg-ink-2",
        RATIOS[ratio],
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={prioritet}
          className="object-cover"
        />
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: gradienter[variant] }}
          />
          <div
            aria-hidden
            className="kornstruktur absolute inset-0 opacity-[0.08] mix-blend-overlay"
          />
          <div aria-hidden className="gitter absolute inset-0 opacity-[0.25]" />
          <span className="sr-only">{alt}</span>
        </>
      )}
    </div>
  );
}
