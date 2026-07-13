import { virksomhed } from "@/content/virksomhed";

// Central site-konfiguration.
export const SITE = {
  url: "https://mtvagt.dk",
  navn: virksomhed.navn,
  kortNavn: virksomhed.kortNavn,
  sprog: "da-DK",
  locale: "da_DK",
};

export function absolutUrl(sti = "/"): string {
  return new URL(sti, SITE.url).toString();
}
