import { virksomhed } from "@/content/virksomhed";

// Bygger e-mailadressen af dele, så spam-robotter ikke kan læse den i kilden.
export function byggEmail(): string {
  const [bruger, domaene] = virksomhed.emailDele;
  return `${bruger}@${domaene}`;
}

export function byggMailto(emne?: string): string {
  const adresse = byggEmail();
  const q = emne ? `?subject=${encodeURIComponent(emne)}` : "";
  return `mailto:${adresse}${q}`;
}
