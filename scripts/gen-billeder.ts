/**
 * gen-billeder.ts — scanner /public/img og genererer lib/billed-manifest.ts.
 * Kør efter du har lagt rigtige billeder i /public/img:  npm run billeder
 * Kører også automatisk før build (prebuild).
 */
import { readdirSync, existsSync, writeFileSync } from "node:fs";
import path from "node:path";

const IMG_DIR = path.join(process.cwd(), "public", "img");
const OUT = path.join(process.cwd(), "lib", "billed-manifest.ts");
const EXTS = new Set([".webp", ".avif", ".jpg", ".jpeg", ".png"]);

const kort: Record<string, string> = {};

if (existsSync(IMG_DIR)) {
  for (const fil of readdirSync(IMG_DIR)) {
    const ext = path.extname(fil).toLowerCase();
    if (!EXTS.has(ext)) continue;
    const navn = path.basename(fil, ext);
    // Foretræk webp/avif hvis flere formater findes for samme navn.
    if (!kort[navn] || ext === ".webp" || ext === ".avif") {
      kort[navn] = `/img/${fil}`;
    }
  }
}

const indhold = `// AUTO-GENERERET af scripts/gen-billeder.ts — rediger ikke i hånden.
// Kortlægger billed-navn → sti i /public/img.
export const BILLEDER: Record<string, string> = ${JSON.stringify(kort, null, 2)};
`;

writeFileSync(OUT, indhold, "utf8");
console.log(`billed-manifest.ts opdateret — ${Object.keys(kort).length} billede(r).`);
