/**
 * scrape.ts — henter den gamle mtvagt.dk (Joomla) til reference.
 *
 * Kør lokalt med netadgang til mtvagt.dk:
 *   npm run scrape
 *
 * Scriptet:
 *  1. Crawler de kendte URL'er og gemmer rå HTML + udtrukket tekst i /scraped/
 *  2. Henter billed-assets til /public/scraped/ og ISO-certifikatet til /public/docs/
 *  3. Skriver en kort opsummering i konsollen
 *
 * BEMÆRK: I det aktuelle byggemiljø er mtvagt.dk blokeret af egress-politik (403),
 * så scriptet kan ikke køre her. Det er inkluderet som deliverable til lokal brug.
 */

import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import * as cheerio from "cheerio";

const BASE = "https://mtvagt.dk";

const SIDER = [
  "/",
  "/om-mtvagt",
  "/vi-tilbyder",
  "/vi-tilbyder/269-runderingsvagt",
  "/vi-tilbyder/268-akut-vagt-opgaver",
  "/vi-tilbyder/267-portvagt-stationaer-vagt",
  "/vi-tilbyder/266-servicevagt-butiksvagt",
  "/vi-tilbyder/263-tryghedsvagt-psykiatri",
  "/vi-tilbyder/262-fastvagt",
  "/vi-tilbyder/259-byggepladsvagt",
  "/kontakt",
  "/ledige-stillinger",
  "/privatlivs-politik",
];

const DOKUMENTER = ["/images/ISO_Certificat_MT_Vagt.pdf"];

const ROD = process.cwd();
const SCRAPED = path.join(ROD, "scraped");
const PUB_SCRAPED = path.join(ROD, "public", "scraped");
const PUB_DOCS = path.join(ROD, "public", "docs");

function slugFra(sti: string): string {
  const s = sti.replace(/^\/+|\/+$/g, "").replace(/\//g, "_");
  return s === "" ? "forside" : s;
}

async function hentTekst(url: string): Promise<string> {
  const svar = await fetch(url, { headers: { "user-agent": "mtvagt-scrape/1.0" } });
  if (!svar.ok) throw new Error(`HTTP ${svar.status} for ${url}`);
  return svar.text();
}

async function hentBinaer(url: string): Promise<Buffer> {
  const svar = await fetch(url);
  if (!svar.ok) throw new Error(`HTTP ${svar.status} for ${url}`);
  return Buffer.from(await svar.arrayBuffer());
}

async function main() {
  await mkdir(SCRAPED, { recursive: true });
  await mkdir(PUB_SCRAPED, { recursive: true });
  await mkdir(PUB_DOCS, { recursive: true });

  const billeder = new Set<string>();
  let sider = 0;

  for (const sti of SIDER) {
    const url = BASE + sti;
    try {
      const html = await hentTekst(url);
      const slug = slugFra(sti);
      await writeFile(path.join(SCRAPED, `${slug}.html`), html, "utf8");

      const $ = cheerio.load(html);
      $("script, style, noscript").remove();
      const tekst = $("body").text().replace(/\s+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
      await writeFile(path.join(SCRAPED, `${slug}.txt`), tekst, "utf8");

      $("img[src]").each((_, el) => {
        const src = $(el).attr("src");
        if (src) billeder.add(new URL(src, url).toString());
      });

      sider++;
      console.log(`✓ ${sti}`);
    } catch (e) {
      console.warn(`✗ ${sti}: ${(e as Error).message}`);
    }
  }

  let hentedeBilleder = 0;
  for (const bil of billeder) {
    try {
      const data = await hentBinaer(bil);
      const filnavn = path.basename(new URL(bil).pathname) || "billede";
      await writeFile(path.join(PUB_SCRAPED, filnavn), data);
      hentedeBilleder++;
    } catch (e) {
      console.warn(`✗ billede ${bil}: ${(e as Error).message}`);
    }
  }

  for (const dok of DOKUMENTER) {
    try {
      const data = await hentBinaer(BASE + dok);
      await writeFile(path.join(PUB_DOCS, path.basename(dok)), data);
      console.log(`✓ dokument ${dok}`);
    } catch (e) {
      console.warn(`✗ dokument ${dok}: ${(e as Error).message}`);
    }
  }

  console.log("\n— Opsummering —");
  console.log(`Sider gemt:     ${sider}/${SIDER.length}`);
  console.log(`Billeder hentet: ${hentedeBilleder}/${billeder.size}`);
  console.log(`Output:          scraped/, public/scraped/, public/docs/`);
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
