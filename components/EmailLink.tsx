"use client";

import { useEffect, useState } from "react";
import { byggEmail, byggMailto } from "@/lib/mailto";

// Viser først e-mailen når komponenten er hydreret i klienten,
// så adressen ikke ligger læsbar i HTML-kilden (spam-beskyttelse).
export function EmailLink({
  className,
  emne,
}: {
  className?: string;
  emne?: string;
}) {
  const [adresse, setAdresse] = useState<string>("");

  useEffect(() => {
    // Klient-kun: adressen må ikke ligge i serverens HTML (spam-beskyttelse).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAdresse(byggEmail());
  }, []);

  if (!adresse) {
    return <span className={className}>Skriv til os</span>;
  }

  return (
    <a href={byggMailto(emne)} className={className}>
      {adresse}
    </a>
  );
}
