"use client";

import { cn } from "@/lib/utils";

// Åbner et link i et centreret popup-vindue ("halvstort"), så hovedsiden
// ikke forstyrres. Bruges til eksterne links (fx VSL) og til ISO-PDF'en,
// der vises i browserens PDF-viewer med download-mulighed.
export function PopupLink({
  href,
  children,
  className,
  bredde = 900,
  hoejde = 800,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  bredde?: number;
  hoejde?: number;
  ariaLabel?: string;
}) {
  function aabn(e: React.MouseEvent) {
    // Lad modificeret klik (ny fane) og midterklik virke normalt.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    const w = Math.min(bredde, window.screen.availWidth * 0.9);
    const h = Math.min(hoejde, window.screen.availHeight * 0.9);
    const left = window.screenX + (window.outerWidth - w) / 2;
    const top = window.screenY + (window.outerHeight - h) / 2;
    const vindue = window.open(
      href,
      "mtvagt-popup",
      `popup=yes,width=${Math.round(w)},height=${Math.round(h)},left=${Math.round(
        left
      )},top=${Math.round(top)},scrollbars=yes,resizable=yes`
    );
    // Popup blokeret → fald tilbage til ny fane.
    if (!vindue) window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={aabn}
      aria-label={ariaLabel}
      className={cn(className)}
    >
      {children}
    </a>
  );
}
