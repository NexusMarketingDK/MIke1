/**
 * gen-illustrationer.mjs — genererer cinematiske SVG-illustrationer og
 * renderer dem til JPEG i /public/img via headless Chromium.
 *
 * Kør:  npm run illustrationer   (kræver Chromium; sæt evt. CHROMIUM_STI)
 * Derefter: npm run billeder     (opdaterer billed-manifestet)
 *
 * Illustrationerne er håndbyggede scener i brandets stil (mat sort, stål,
 * kold blå nat, amber lys, rød accent). De kan til enhver tid overskrives
 * 1:1 med rigtige fotos — behold blot filnavnene.
 */

import { chromium } from "playwright-core";
import { mkdirSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";

const UD = path.join(process.cwd(), "public", "img");
mkdirSync(UD, { recursive: true });

function findChromium() {
  if (process.env.CHROMIUM_STI) return process.env.CHROMIUM_STI;
  const rod = process.env.PLAYWRIGHT_BROWSERS_PATH || "/opt/pw-browsers";
  if (existsSync(rod)) {
    for (const d of readdirSync(rod)) {
      const kandidat = path.join(rod, d, "chrome-linux", "chrome");
      if (d.startsWith("chromium-") && existsSync(kandidat)) return kandidat;
    }
    const direkte = path.join(rod, "chromium");
    if (existsSync(direkte)) return direkte;
  }
  return undefined; // playwright-core prøver sin egen sti
}

/* ---------- genbrugelige SVG-dele ---------- */

const korn = (op = 0.05) => `
  <filter id="korn"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
  <rect width="100%" height="100%" filter="url(#korn)" opacity="${op}"/>`;

const vignet = (op = 0.55) => `
  <radialGradient id="vig" cx="50%" cy="45%" r="75%">
    <stop offset="55%" stop-color="#000" stop-opacity="0"/>
    <stop offset="100%" stop-color="#000" stop-opacity="${op}"/>
  </radialGradient>
  <rect width="100%" height="100%" fill="url(#vig)"/>`;

// Vagt-silhuet set bagfra. Fødder i (0,60), hoved-top ca. (0,-58).
function vagt({ x, y, s = 1, flip = 1, stribe = "#ffb95c" }) {
  return `
  <g transform="translate(${x},${y}) scale(${s * flip},${s})">
    <circle cx="0" cy="-46" r="10" fill="#0a0d12"/>
    <path d="M-18,-34 Q0,-43 18,-34 L14,14 Q0,20 -14,14 Z" fill="#0d1117"/>
    <path d="M-17,-24 L17,-24 L16,-15 L-16,-15 Z" fill="${stribe}" opacity="0.95"/>
    <path d="M-15,-2 L15,-2 L14,6 L-14,6 Z" fill="${stribe}" opacity="0.8"/>
    <path d="M-9,-38 L-5,-38 L-6,-16 L-10,-16 Z" fill="${stribe}" opacity="0.5"/>
    <path d="M9,-38 L5,-38 L6,-16 L10,-16 Z" fill="${stribe}" opacity="0.5"/>
    <rect x="-12.5" y="14" width="10" height="46" rx="4" fill="#0a0d12"/>
    <rect x="2.5" y="14" width="10" height="46" rx="4" fill="#0a0d12"/>
  </g>`;
}

// Lygtekegle fra et punkt.
function lygte({ x, y, vinkel = 0, laengde = 420, bredde = 150, id = "beam" }) {
  return `
  <defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffd9a0" stop-opacity="0.85"/>
      <stop offset="1" stop-color="#ffd9a0" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <g transform="translate(${x},${y}) rotate(${vinkel})">
    <polygon points="0,0 ${laengde},${-bredde / 2} ${laengde},${bredde / 2}" fill="url(#${id})" opacity="0.5"/>
    <circle cx="0" cy="0" r="7" fill="#ffe9c4"/>
    <circle cx="0" cy="0" r="16" fill="#ffd9a0" opacity="0.35"/>
  </g>`;
}

// Byggekran-silhuet.
function kran(x, baseY, h, jib, flip = 1) {
  const t = baseY - h;
  return `
  <g stroke="#04070b" fill="#04070b">
    <rect x="${x - 5}" y="${t}" width="10" height="${h}"/>
    <rect x="${x - 14}" y="${baseY - 26}" width="28" height="26"/>
    <rect x="${x - flip * jib * 0.32 - (flip > 0 ? 0 : jib)}" y="${t - 4}" width="${jib * 0.32 + jib}" height="7" transform="translate(0,0)"/>
    <line x1="${x}" y1="${t - 26}" x2="${x + flip * jib}" y2="${t}" stroke-width="2.5"/>
    <line x1="${x}" y1="${t - 26}" x2="${x - flip * jib * 0.32}" y2="${t}" stroke-width="2.5"/>
    <rect x="${x - 3}" y="${t - 30}" width="6" height="30"/>
    <line x1="${x + flip * jib * 0.7}" y1="${t + 4}" x2="${x + flip * jib * 0.7}" y2="${t + 46}" stroke-width="2"/>
    <rect x="${x + flip * jib * 0.7 - 8}" y="${t + 46}" width="16" height="12"/>
  </g>`;
}

// Trådhegn (net + stolper).
function hegn(x, y, b, h, op = 0.5) {
  let net = "";
  for (let i = -h; i < b; i += 26) {
    net += `<line x1="${x + i}" y1="${y + h}" x2="${x + i + h}" y2="${y}" stroke="#7d8894" stroke-width="1.4"/>`;
    net += `<line x1="${x + i}" y1="${y}" x2="${x + i + h}" y2="${y + h}" stroke="#7d8894" stroke-width="1.4"/>`;
  }
  let stolper = "";
  for (let i = 0; i <= b; i += Math.round(b / 4)) {
    stolper += `<rect x="${x + i - 3}" y="${y - 8}" width="6" height="${h + 16}" fill="#39424c"/>`;
  }
  return `<g opacity="${op}"><clipPath id="hegnclip"><rect x="${x}" y="${y}" width="${b}" height="${h}"/></clipPath><g clip-path="url(#hegnclip)">${net}</g><line x1="${x}" y1="${y}" x2="${x + b}" y2="${y}" stroke="#39424c" stroke-width="4"/>${stolper}</g>`;
}

// Projektørmast med glød.
function projektoer(x, baseY, h, flip = 1) {
  return `
  <g>
    <rect x="${x - 4}" y="${baseY - h}" width="8" height="${h}" fill="#04070b"/>
    <rect x="${x - 26}" y="${baseY - h - 14}" width="52" height="16" rx="4" fill="#04070b"/>
    <circle cx="${x + flip * 10}" cy="${baseY - h - 6}" r="26" fill="#ffca7a" opacity="0.25"/>
    <circle cx="${x + flip * 10}" cy="${baseY - h - 6}" r="10" fill="#ffe4b0" opacity="0.9"/>
  </g>`;
}

const svgRamme = (W, H, indhold) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${indhold}</svg>`;

/* ---------- scener ---------- */

const scener = {
  // 1) Hero: cinematisk nat-byggeplads med vagt, volumetrisk lys og våd refleksion
  "hero-byggeplads-nat": (W, H) => {
    const jord = H * 0.8;
    // Refleksion af et lyspunkt ned i den våde jord.
    const refleks = (x, y, farve, br, op) =>
      `<rect x="${x - br / 2}" y="${jord}" width="${br}" height="${(y ? jord - y : 40) + 60}" fill="${farve}" opacity="${op}"/>`;
    // Oplyst bygningsvindue.
    const vindue = (x, y, w, h, tændt) =>
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${tændt ? "#ffcf87" : "#0e1a26"}" opacity="${tændt ? 0.92 : 1}"/>`;
    return svgRamme(W, H, `
      <defs>
        <linearGradient id="himmelH" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#070d18"/>
          <stop offset="0.4" stop-color="#122a44"/>
          <stop offset="0.75" stop-color="#1d4a63"/>
          <stop offset="1" stop-color="#2a4a52"/>
        </linearGradient>
        <radialGradient id="maaneglodH" cx="72%" cy="30%" r="42%">
          <stop offset="0" stop-color="#bfe0f0" stop-opacity="0.55"/>
          <stop offset="0.4" stop-color="#5f8fb0" stop-opacity="0.22"/>
          <stop offset="1" stop-color="#5f8fb0" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="ambglodH" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="#ffd08a" stop-opacity="0.9"/>
          <stop offset="1" stop-color="#ffb85c" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="jordH" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#0f1a24"/>
          <stop offset="0.5" stop-color="#0a121a"/>
          <stop offset="1" stop-color="#04070b"/>
        </linearGradient>
        <linearGradient id="taageH" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#38617a" stop-opacity="0"/>
          <stop offset="1" stop-color="#38617a" stop-opacity="0.5"/>
        </linearGradient>
        <linearGradient id="beamH" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fff0d2" stop-opacity="0.85"/>
          <stop offset="1" stop-color="#ffd9a0" stop-opacity="0"/>
        </linearGradient>
        <filter id="slørH"><feGaussianBlur stdDeviation="7"/></filter>
      </defs>

      <rect width="${W}" height="${H}" fill="url(#himmelH)"/>
      <rect width="${W}" height="${jord}" fill="url(#maaneglodH)"/>
      <!-- Måne -->
      <circle cx="${W * 0.72}" cy="${H * 0.26}" r="${H * 0.05}" fill="#e8f2f8"/>
      <circle cx="${W * 0.72}" cy="${H * 0.26}" r="${H * 0.05}" fill="#0e2436" opacity="0.12"/>
      <!-- Stjerner (varieret) -->
      ${[...Array(90)].map((_, i) => {
        const x = (i * 149) % W;
        const y = (i * 71) % (jord * 0.7);
        const r = i % 11 === 0 ? 1.8 : (i % 3) * 0.5 + 0.4;
        return `<circle cx="${x}" cy="${y}" r="${r}" fill="#dbe9f4" opacity="${0.12 + (i % 6) * 0.09}"/>`;
      }).join("")}

      <!-- Fjern skyline -->
      <g fill="#0a1622" opacity="0.85">
        ${[...Array(16)].map((_, i) => {
          const bw = W * 0.06;
          const bh = H * (0.05 + ((i * 7) % 5) * 0.03);
          return `<rect x="${i * bw}" y="${jord * 0.62 - bh}" width="${bw + 1}" height="${bh + jord * 0.4}"/>`;
        }).join("")}
      </g>

      <!-- Kraner med advarselslys -->
      ${kran(W * 0.16, jord, H * 0.56, W * 0.22, 1)}
      ${kran(W * 0.88, jord, H * 0.44, W * 0.16, -1)}
      <circle cx="${W * 0.16}" cy="${jord - H * 0.56 - 30}" r="4" fill="#ff3b46"/>
      <circle cx="${W * 0.16}" cy="${jord - H * 0.56 - 30}" r="10" fill="#ff3b46" opacity="0.35"/>
      <circle cx="${W * 0.88}" cy="${jord - H * 0.44 - 30}" r="4" fill="#ff3b46"/>
      <circle cx="${W * 0.88}" cy="${jord - H * 0.44 - 30}" r="10" fill="#ff3b46" opacity="0.35"/>

      <!-- Bygning under opførelse med oplyste vinduer -->
      <g>
        <rect x="${W * 0.53}" y="${jord - H * 0.34}" width="${W * 0.18}" height="${H * 0.34}" fill="#0a121b"/>
        ${[...Array(6)].map((_, r) => [...Array(4)].map((_, c) => {
          const tændt = (r * 4 + c) % 3 === 0;
          return vindue(W * 0.545 + c * W * 0.041, jord - H * 0.32 + r * H * 0.052, W * 0.026, H * 0.032, tændt);
        }).join("")).join("")}
        <!-- stillads -->
        <g stroke="#26313d" stroke-width="2" opacity="0.7">
          ${[...Array(7)].map((_, r) => `<line x1="${W * 0.53}" y1="${jord - H * 0.30 + r * H * 0.05}" x2="${W * 0.71}" y2="${jord - H * 0.30 + r * H * 0.05}"/>`).join("")}
          ${[...Array(5)].map((_, c) => `<line x1="${W * 0.53 + c * W * 0.045}" y1="${jord - H * 0.34}" x2="${W * 0.53 + c * W * 0.045}" y2="${jord}"/>`).join("")}
        </g>
      </g>
      <!-- Lavere bygning -->
      <rect x="${W * 0.32}" y="${jord - H * 0.17}" width="${W * 0.14}" height="${H * 0.17}" fill="#080f16"/>

      <!-- Projektørmaster med kraftig glød -->
      ${projektoer(W * 0.66, jord, H * 0.38, -1)}
      ${projektoer(W * 0.24, jord, H * 0.28, 1)}
      <circle cx="${W * 0.665}" cy="${jord - H * 0.38 - 4}" r="${H * 0.14}" fill="url(#ambglodH)" opacity="0.5"/>
      <circle cx="${W * 0.235}" cy="${jord - H * 0.28 - 4}" r="${H * 0.1}" fill="url(#ambglodH)" opacity="0.4"/>

      <!-- Tågelag over jorden -->
      <rect x="0" y="${jord - H * 0.16}" width="${W}" height="${H * 0.16}" fill="url(#taageH)" filter="url(#slørH)" opacity="0.6"/>

      <!-- Våd jord -->
      <rect y="${jord}" width="${W}" height="${H - jord}" fill="url(#jordH)"/>
      <!-- Refleksioner af lys ned i jorden -->
      ${refleks(W * 0.665, jord - H * 0.38, "#ffb85c", 26, 0.22)}
      ${refleks(W * 0.235, jord - H * 0.28, "#ffb85c", 18, 0.16)}
      ${refleks(W * 0.6, jord - H * 0.2, "#ffcf87", 10, 0.14)}
      ${refleks(W * 0.66, jord - H * 0.2, "#ffcf87", 10, 0.12)}
      <rect y="${jord}" width="${W}" height="${H - jord}" fill="url(#jordH)" opacity="0.35"/>
      <!-- Pytter -->
      <ellipse cx="${W * 0.62}" cy="${jord + 46}" rx="${W * 0.16}" ry="12" fill="#ffb85c" opacity="0.06"/>
      <ellipse cx="${W * 0.3}" cy="${jord + 70}" rx="${W * 0.12}" ry="9" fill="#3a6a86" opacity="0.14"/>

      <!-- Vagtens lygtekegle (volumetrisk) -->
      <g transform="translate(${W * 0.4},${jord - 26}) rotate(15)">
        <polygon points="0,0 ${W * 0.42},${-H * 0.16} ${W * 0.42},${H * 0.16}" fill="url(#beamH)" opacity="0.5"/>
        <polygon points="0,0 ${W * 0.42},${-H * 0.05} ${W * 0.42},${H * 0.05}" fill="url(#beamH)" opacity="0.5"/>
      </g>
      <!-- Lys-pool hvor keglen rammer jorden -->
      <ellipse cx="${W * 0.6}" cy="${jord + 30}" rx="${W * 0.13}" ry="20" fill="#ffe6bd" opacity="0.18" filter="url(#slørH)"/>

      <!-- Vagt med rim-lys -->
      ${vagt({ x: W * 0.4, y: jord - 64, s: 1.4 })}
      <path d="M${W * 0.4 - 26},${jord - 112} Q${W * 0.4},${jord - 124} ${W * 0.4 + 26},${jord - 112}" stroke="#ffd9a0" stroke-width="2.5" fill="none" opacity="0.55"/>
      <circle cx="${W * 0.4 + 24}" cy="${jord - 44}" r="5" fill="#fff0d2"/>
      <circle cx="${W * 0.4 + 24}" cy="${jord - 44}" r="12" fill="#ffe6bd" opacity="0.4"/>
      <ellipse cx="${W * 0.4}" cy="${jord + 24}" rx="56" ry="10" fill="#000" opacity="0.55"/>

      <!-- Gnister / støv i luften -->
      ${[...Array(22)].map((_, i) => {
        const x = W * (0.3 + ((i * 13) % 45) / 100);
        const y = jord - H * (0.05 + ((i * 7) % 30) / 100);
        return `<circle cx="${x}" cy="${y}" r="${(i % 3) * 0.6 + 0.6}" fill="#ffcf87" opacity="${0.15 + (i % 4) * 0.12}"/>`;
      }).join("")}

      ${vignet(0.62)}${korn(0.05)}
    `);
  },

  // 2) Portvagt ved daggry
  "portvagt-daggry": (W, H) => {
    const jord = H * 0.8;
    return svgRamme(W, H, `
      <defs>
        <linearGradient id="dag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#26313e"/><stop offset="0.6" stop-color="#57575a"/><stop offset="0.85" stop-color="#a87350"/><stop offset="1" stop-color="#6e4c3a"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#dag)"/>
      <circle cx="${W * 0.78}" cy="${jord - 30}" r="${H * 0.12}" fill="#ffc98e" opacity="0.55"/>
      <rect y="${jord}" width="${W}" height="${H - jord}" fill="#141210"/>
      ${kran(W * 0.9, jord, H * 0.42, W * 0.13, -1)}
      <g>
        <rect x="${W * 0.08}" y="${jord - H * 0.22}" width="${W * 0.2}" height="${H * 0.22}" fill="#1c2129" stroke="#2c333d" stroke-width="3"/>
        <rect x="${W * 0.115}" y="${jord - H * 0.16}" width="${W * 0.055}" height="${H * 0.07}" fill="#ffca7a" opacity="0.85"/>
        <rect x="${W * 0.19}" y="${jord - H * 0.16}" width="${W * 0.05}" height="${H * 0.07}" fill="#39424c"/>
        <rect x="${W * 0.08}" y="${jord - H * 0.245}" width="${W * 0.2}" height="${H * 0.028}" fill="#2c333d"/>
      </g>
      <g>
        <rect x="${W * 0.3}" y="${jord - 66}" width="10" height="66" fill="#2c333d"/>
        <g transform="rotate(-32 ${W * 0.305} ${jord - 60})">
          <rect x="${W * 0.305}" y="${jord - 66}" width="${W * 0.3}" height="11" rx="5" fill="#c9d0d6"/>
          ${[...Array(6)].map((_, i) => `<rect x="${W * 0.315 + i * W * 0.048}" y="${jord - 66}" width="${W * 0.022}" height="11" fill="#d42233"/>`).join("")}
        </g>
      </g>
      ${hegn(W * 0.62, jord - H * 0.14, W * 0.38, H * 0.14, 0.6)}
      ${vagt({ x: W * 0.45, y: jord - 58, s: 1.25 })}
      <ellipse cx="${W * 0.45}" cy="${jord + 18}" rx="46" ry="8" fill="#000" opacity="0.4"/>
      ${vignet(0.45)}${korn(0.05)}
    `);
  },

  // 3) Materiel-lager (4:5)
  "materiel-lager": (W, H) => {
    const jord = H * 0.82;
    return svgRamme(W, H, `
      <defs>
        <linearGradient id="nat3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#081422"/>
          <stop offset="0.6" stop-color="#0c1a2a"/>
          <stop offset="1" stop-color="#0a0e13"/>
        </linearGradient>
        <radialGradient id="flood3" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="#ffd08a" stop-opacity="0.9"/>
          <stop offset="1" stop-color="#ffb85c" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="kegle3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ffe4b0" stop-opacity="0.5"/>
          <stop offset="1" stop-color="#ffe4b0" stop-opacity="0"/>
        </linearGradient>
        <filter id="slør3"><feGaussianBlur stdDeviation="6"/></filter>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#nat3)"/>
      <!-- måne -->
      <circle cx="${W * 0.8}" cy="${H * 0.12}" r="${W * 0.16}" fill="#3a6a86" opacity="0.16" filter="url(#slør3)"/>
      <circle cx="${W * 0.8}" cy="${H * 0.12}" r="${W * 0.05}" fill="#dbeaf3" opacity="0.85"/>
      ${[...Array(40)].map((_, i) => `<circle cx="${(i * 191) % W}" cy="${(i * 97) % (H * 0.4)}" r="${i % 8 === 0 ? 1.8 : 0.7}" fill="#cfe0ee" opacity="${0.1 + (i % 5) * 0.08}"/>`).join("")}

      <!-- projektørmaster med lyskegler -->
      ${projektoer(W * 0.85, jord, H * 0.34, -1)}
      ${projektoer(W * 0.12, jord, H * 0.26, 1)}
      <polygon points="${W * 0.85},${jord - H * 0.34} ${W * 0.55},${jord} ${W * 1.05},${jord}" fill="url(#kegle3)" opacity="0.4"/>
      <circle cx="${W * 0.85}" cy="${jord - H * 0.34 - 6}" r="${W * 0.14}" fill="url(#flood3)" opacity="0.5"/>
      <circle cx="${W * 0.12}" cy="${jord - H * 0.26 - 6}" r="${W * 0.1}" fill="url(#flood3)" opacity="0.4"/>

      <!-- oplagret materiel: reoler + paller med varmt toplys -->
      <g>
        ${[...Array(3)].map((_, i) => {
          const gy = jord - 150 - (i % 2) * 46;
          return `
          <g transform="translate(${W * 0.1 + i * W * 0.29},${gy})">
            <rect width="${W * 0.23}" height="150" fill="#0f1720"/>
            <rect width="${W * 0.23}" height="10" fill="#3a2f1a"/>
            <rect width="${W * 0.23}" height="4" fill="#7a6033" opacity="0.7"/>
            ${[...Array(4)].map((_, r) => `<line x1="0" y1="${r * 38 + 20}" x2="${W * 0.23}" y2="${r * 38 + 20}" stroke="#20303f" stroke-width="6"/>`).join("")}
            <!-- rør/materialer -->
            ${[...Array(6)].map((_, p) => `<rect x="${p * W * 0.037 + 4}" y="150" width="${W * 0.03}" height="18" fill="${p % 2 ? "#2a2110" : "#1c2530"}"/>`).join("")}
          </g>`;
        }).join("")}
      </g>

      <!-- våd jord med refleksion -->
      <rect y="${jord}" width="${W}" height="${H - jord}" fill="#05080c"/>
      <rect x="${W * 0.7}" y="${jord}" width="${W * 0.14}" height="${H - jord}" fill="#ffb85c" opacity="0.08"/>

      <!-- hegn i forgrunden -->
      ${hegn(0, jord - H * 0.28, W, H * 0.28, 0.8)}
      <!-- vagt med lygte -->
      ${lygte({ x: W * 0.3, y: jord - 30, vinkel: 10, laengde: W * 0.5, bredde: 150, id: "b3" })}
      ${vagt({ x: W * 0.3, y: jord - 40, s: 1.0 })}
      <ellipse cx="${W * 0.3}" cy="${jord + 14}" rx="38" ry="7" fill="#000" opacity="0.5"/>
      ${vignet(0.6)}${korn(0.06)}
    `);
  },

  // 4) Event-vagt — aften ved et arrangement med scenelys og publikum
  "event-vagt": (W, H) => {
    const jord = H * 0.82;
    return svgRamme(W, H, `
      <defs>
        <linearGradient id="aften4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#0b1020"/>
          <stop offset="0.6" stop-color="#1a1630"/>
          <stop offset="1" stop-color="#140f1c"/>
        </linearGradient>
        <linearGradient id="straale4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ffd9a0" stop-opacity="0.5"/>
          <stop offset="1" stop-color="#ffd9a0" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="straaleR" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ff5a6a" stop-opacity="0.4"/>
          <stop offset="1" stop-color="#ff5a6a" stop-opacity="0"/>
        </linearGradient>
        <filter id="soft4"><feGaussianBlur stdDeviation="7"/></filter>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#aften4)"/>

      <!-- scenelys-stråler fra toppen -->
      <polygon points="${W * 0.3},0 ${W * 0.12},${jord} ${W * 0.42},${jord}" fill="url(#straaleR)" opacity="0.5"/>
      <polygon points="${W * 0.5},0 ${W * 0.36},${jord} ${W * 0.66},${jord}" fill="url(#straale4)" opacity="0.6"/>
      <polygon points="${W * 0.72},0 ${W * 0.6},${jord} ${W * 0.9},${jord}" fill="url(#straaleR)" opacity="0.4"/>

      <!-- scene i baggrunden med glød -->
      <rect x="${W * 0.3}" y="${jord - H * 0.34}" width="${W * 0.4}" height="${H * 0.34}" fill="#0a0a14"/>
      <circle cx="${W * 0.5}" cy="${jord - H * 0.28}" r="${H * 0.16}" fill="#ffca7a" opacity="0.28" filter="url(#soft4)"/>
      <circle cx="${W * 0.5}" cy="${jord - H * 0.28}" r="${H * 0.06}" fill="#fff1d6" opacity="0.7"/>

      <!-- lyskæde -->
      <path d="M0,${H * 0.22} Q${W * 0.5},${H * 0.34} ${W},${H * 0.2}" stroke="#3a3f4a" stroke-width="2" fill="none"/>
      ${[...Array(16)].map((_, i) => { const x = (i + 0.5) * (W / 16); const y = H * 0.22 + Math.sin(i * 0.9) * 16 + H * 0.05; const c = i % 3 === 0 ? "#ff8a94" : "#ffd9a0"; return `<circle cx="${x}" cy="${y}" r="9" fill="${c}" opacity="0.9" filter="url(#soft4)"/><circle cx="${x}" cy="${y}" r="3.5" fill="#fff1d6"/>`; }).join("")}

      <!-- publikum (flere lag for dybde) -->
      <g fill="#141020" opacity="0.7">
        ${[...Array(28)].map((_, i) => { const x = (i * W) / 27 + ((i % 3) - 1) * 10; return `<g transform="translate(${x},${jord - 70}) scale(${0.6 + (i % 3) * 0.08})"><circle cx="0" cy="-34" r="10"/><path d="M-15,-26 Q0,-34 15,-26 L13,20 L-13,20 Z"/></g>`; }).join("")}
      </g>
      <g fill="#08060e">
        ${[...Array(22)].map((_, i) => { const x = (i * W) / 21 + ((i % 2) ? 14 : -8); return `<g transform="translate(${x},${jord - 34}) scale(${0.85 + (i % 4) * 0.1})"><circle cx="0" cy="-36" r="11"/><path d="M-17,-27 Q0,-36 17,-27 L15,24 L-15,24 Z"/></g>`; }).join("")}
      </g>

      <!-- afspærring foran -->
      <rect y="${jord}" width="${W}" height="${H - jord}" fill="#0a0c10"/>
      <g stroke="#4a525b" stroke-width="6">
        <line x1="0" y1="${jord - 12}" x2="${W}" y2="${jord - 12}"/>
        <line x1="0" y1="${jord - 44}" x2="${W}" y2="${jord - 44}"/>
        ${[...Array(9)].map((_, i) => `<line x1="${(i * W) / 8}" y1="${jord - 48}" x2="${(i * W) / 8}" y2="${jord}"/>`).join("")}
      </g>

      <!-- vagt i forgrunden med rim-lys -->
      ${vagt({ x: W * 0.2, y: jord - 18, s: 1.7 })}
      <path d="M${W * 0.2 - 30},${jord - 128} Q${W * 0.2},${jord - 142} ${W * 0.2 + 30},${jord - 128}" stroke="#ffb3bb" stroke-width="3" fill="none" opacity="0.4"/>
      <ellipse cx="${W * 0.2}" cy="${jord + 78}" rx="66" ry="11" fill="#000" opacity="0.5"/>
      ${vignet(0.5)}${korn(0.05)}
    `);
  },

  // 5) Kommunevagt — roligt, serviceorienteret dagslys ved en offentlig bygning
  "kommune-vagt-dag": (W, H) => {
    const jord = H * 0.84;
    return svgRamme(W, H, `
      <defs>
        <linearGradient id="himmel5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#7fa6c4"/>
          <stop offset="0.6" stop-color="#a9c2d4"/>
          <stop offset="1" stop-color="#d7dfe4"/>
        </linearGradient>
        <radialGradient id="sol5" cx="80%" cy="18%" r="40%">
          <stop offset="0" stop-color="#fff4dc" stop-opacity="0.9"/>
          <stop offset="1" stop-color="#fff4dc" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="mur5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#c9cdd0"/>
          <stop offset="1" stop-color="#9aa0a6"/>
        </linearGradient>
        <filter id="slør5"><feGaussianBlur stdDeviation="5"/></filter>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#himmel5)"/>
      <rect width="${W}" height="${jord}" fill="url(#sol5)"/>
      <!-- skyer -->
      ${[[0.2, 0.16, 1], [0.55, 0.1, 0.8], [0.82, 0.2, 1.1]].map(([cx, cy, s]) => `
        <g fill="#ffffff" opacity="0.7" filter="url(#slør5)" transform="translate(${W * cx},${H * cy}) scale(${s})">
          <ellipse cx="0" cy="0" rx="${W * 0.05}" ry="14"/>
          <ellipse cx="${W * 0.035}" cy="6" rx="${W * 0.045}" ry="12"/>
          <ellipse cx="${-W * 0.035}" cy="6" rx="${W * 0.04}" ry="11"/>
        </g>`).join("")}

      <!-- rådhus/offentlig bygning med søjler -->
      <g>
        <rect x="${W * 0.2}" y="${jord - H * 0.46}" width="${W * 0.6}" height="${H * 0.46}" fill="url(#mur5)"/>
        <!-- tympanon -->
        <polygon points="${W * 0.17},${jord - H * 0.46} ${W * 0.5},${jord - H * 0.6} ${W * 0.83},${jord - H * 0.46}" fill="#b7bcc0"/>
        <polygon points="${W * 0.2},${jord - H * 0.47} ${W * 0.5},${jord - H * 0.575} ${W * 0.8},${jord - H * 0.47}" fill="#cbd0d3"/>
        <!-- søjler -->
        ${[...Array(6)].map((_, i) => `<rect x="${W * 0.24 + i * W * 0.093}" y="${jord - H * 0.42}" width="${W * 0.045}" height="${H * 0.42}" fill="#dfe3e6"/><rect x="${W * 0.24 + i * W * 0.093}" y="${jord - H * 0.42}" width="${W * 0.012}" height="${H * 0.42}" fill="#eef1f3"/>`).join("")}
        <rect x="${W * 0.2}" y="${jord - H * 0.44}" width="${W * 0.6}" height="${H * 0.03}" fill="#eef1f3"/>
        <rect x="${W * 0.18}" y="${jord - H * 0.02}" width="${W * 0.64}" height="${H * 0.02}" fill="#8a9096"/>
        <!-- indgang -->
        <rect x="${W * 0.45}" y="${jord - H * 0.2}" width="${W * 0.1}" height="${H * 0.2}" fill="#5b636c"/>
        <rect x="${W * 0.455}" y="${jord - H * 0.19}" width="${W * 0.045}" height="${H * 0.19}" fill="#3a4148"/>
        <rect x="${W * 0.5}" y="${jord - H * 0.19}" width="${W * 0.045}" height="${H * 0.19}" fill="#3a4148"/>
        <!-- flag -->
        <rect x="${W * 0.5 - 2}" y="${jord - H * 0.72}" width="4" height="${H * 0.12}" fill="#5b636c"/>
        <path d="M${W * 0.5 + 2},${jord - H * 0.72} L${W * 0.56},${jord - H * 0.695} L${W * 0.5 + 2},${jord - H * 0.67} Z" fill="#d42233"/>
      </g>

      <!-- træer -->
      ${[W * 0.1, W * 0.9].map((tx) => `
        <rect x="${tx - 4}" y="${jord - H * 0.18}" width="8" height="${H * 0.18}" fill="#5a4a38"/>
        <circle cx="${tx}" cy="${jord - H * 0.22}" r="${H * 0.09}" fill="#5c7a52"/>
        <circle cx="${tx - 18}" cy="${jord - H * 0.17}" r="${H * 0.06}" fill="#6a8a5e"/>
        <circle cx="${tx + 18}" cy="${jord - H * 0.18}" r="${H * 0.065}" fill="#547049"/>
      `).join("")}

      <!-- fortov -->
      <rect y="${jord}" width="${W}" height="${H - jord}" fill="#b9bec2"/>
      <rect y="${jord}" width="${W}" height="6" fill="#9aa0a6"/>
      ${[...Array(10)].map((_, i) => `<rect x="${(i * W) / 10}" y="${jord + 4}" width="2" height="${H - jord}" fill="#a7adb2"/>`).join("")}

      <!-- vagt (rolig, serviceorienteret) med blød skygge -->
      <ellipse cx="${W * 0.36}" cy="${jord + 12}" rx="46" ry="7" fill="#000" opacity="0.18"/>
      ${vagt({ x: W * 0.36, y: jord - 58, s: 1.3, stribe: "#e8b25a" })}
      ${vignet(0.22)}${korn(0.035)}
    `);
  },

  // 6) Runderingsbil på våd vej, nat
  "rundering-koeretoej-nat": (W, H) => {
    const jord = H * 0.7;
    const bilX = W * 0.36;
    const bilY = jord - 6;
    // Oplyst vindue i baggrundsbygning.
    const vind = (x, y, tændt) =>
      `<rect x="${x}" y="${y}" width="${W * 0.014}" height="${H * 0.022}" fill="${tændt ? "#ffcf87" : "#0d1722"}" opacity="${tændt ? 0.85 : 1}"/>`;
    return svgRamme(W, H, `
      <defs>
        <linearGradient id="nat6" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#070e1a"/>
          <stop offset="0.55" stop-color="#122438"/>
          <stop offset="1" stop-color="#0b1420"/>
        </linearGradient>
        <linearGradient id="vaad6" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#16273a"/>
          <stop offset="1" stop-color="#04070b"/>
        </linearGradient>
        <linearGradient id="kegle6" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#fff2d6" stop-opacity="0.95"/>
          <stop offset="1" stop-color="#ffe9c4" stop-opacity="0"/>
        </linearGradient>
        <radialGradient id="lygteglod6" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="#ffd08a" stop-opacity="0.85"/>
          <stop offset="1" stop-color="#ffb85c" stop-opacity="0"/>
        </radialGradient>
        <filter id="slør6"><feGaussianBlur stdDeviation="6"/></filter>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#nat6)"/>
      <!-- måne-glød -->
      <circle cx="${W * 0.3}" cy="${H * 0.22}" r="${H * 0.2}" fill="#3a6a86" opacity="0.14" filter="url(#slør6)"/>
      <circle cx="${W * 0.3}" cy="${H * 0.22}" r="${H * 0.04}" fill="#dbeaf3" opacity="0.8"/>
      ${[...Array(50)].map((_, i) => `<circle cx="${(i * 151) % W}" cy="${(i * 63) % (jord * 0.55)}" r="${i % 9 === 0 ? 1.6 : 0.6}" fill="#cfe0ee" opacity="${0.1 + (i % 5) * 0.08}"/>`).join("")}

      <!-- bybygninger med lys -->
      <g>
        ${[...Array(7)].map((_, i) => {
          const bx = i * W * 0.15 - W * 0.02;
          const bh = H * (0.16 + ((i * 5) % 4) * 0.06);
          let vinduer = "";
          for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) {
            vinduer += vind(bx + W * 0.02 + c * W * 0.028, jord - bh + H * 0.02 + r * H * 0.028, (i * 13 + r * 4 + c) % 4 === 0);
          }
          return `<g><rect x="${bx}" y="${jord - bh}" width="${W * 0.13}" height="${bh}" fill="#0a1320"/>${vinduer}</g>`;
        }).join("")}
      </g>

      <!-- gadelamper med amber-pøl -->
      ${[W * 0.12, W * 0.82].map((lx) => `
        <rect x="${lx - 3}" y="${jord - H * 0.34}" width="6" height="${H * 0.34}" fill="#04070b"/>
        <rect x="${lx - 20}" y="${jord - H * 0.35}" width="24" height="8" fill="#04070b"/>
        <circle cx="${lx - 8}" cy="${jord - H * 0.33}" r="${H * 0.09}" fill="url(#lygteglod6)"/>
        <circle cx="${lx - 8}" cy="${jord - H * 0.33}" r="7" fill="#ffe9c4"/>
        <ellipse cx="${lx - 8}" cy="${jord + 40}" rx="${W * 0.05}" ry="14" fill="#ffb85c" opacity="0.1"/>
      `).join("")}

      <!-- våd vej -->
      <rect y="${jord}" width="${W}" height="${H - jord}" fill="url(#vaad6)"/>
      <!-- refleksioner af bygningslys og lamper -->
      ${[W * 0.12, W * 0.82].map((lx) => `<rect x="${lx - 11}" y="${jord}" width="16" height="${H - jord}" fill="#ffb85c" opacity="0.12"/>`).join("")}
      ${[...Array(16)].map((_, i) => `<rect x="${(i * W) / 16 + 6}" y="${jord}" width="7" height="${H - jord}" fill="#2a4a63" opacity="${(i % 3) * 0.05 + 0.04}"/>`).join("")}

      <!-- forlygte-kegler -->
      <polygon points="${bilX + W * 0.16},${bilY - 30} ${W * 1.02},${jord - H * 0.16} ${W * 1.02},${jord + H * 0.22}" fill="url(#kegle6)" opacity="0.45"/>
      <polygon points="${bilX + W * 0.16},${bilY - 22} ${W * 1.02},${jord + 6} ${W * 1.02},${jord + H * 0.12}" fill="url(#kegle6)" opacity="0.5"/>

      <!-- patruljebil (set skråt bagfra) -->
      <g>
        <ellipse cx="${bilX + W * 0.08}" cy="${bilY + 6}" rx="${W * 0.13}" ry="14" fill="#000" opacity="0.5"/>
        <path d="M${bilX - W * 0.02},${bilY} L${bilX - W * 0.02},${bilY - 34} Q${bilX + W * 0.01},${bilY - 40} ${bilX + W * 0.05},${bilY - 42} L${bilX + W * 0.06},${bilY - 66} Q${bilX + W * 0.08},${bilY - 74} ${bilX + W * 0.12},${bilY - 74} L${bilX + W * 0.15},${bilY - 72} Q${bilX + W * 0.18},${bilY - 66} ${bilX + W * 0.185},${bilY - 40} L${bilX + W * 0.2},${bilY - 34} L${bilX + W * 0.2},${bilY} Z" fill="#0c141e"/>
        <!-- bagrude + rødt lys -->
        <path d="M${bilX + W * 0.065},${bilY - 64} L${bilX + W * 0.14},${bilY - 64} L${bilX + W * 0.17},${bilY - 44} L${bilX + W * 0.05},${bilY - 44} Z" fill="#16283a"/>
        <rect x="${bilX - W * 0.02}" y="${bilY - 34}" width="${W * 0.22}" height="8" fill="#d42233"/>
        <rect x="${bilX - W * 0.01}" y="${bilY - 30}" width="${W * 0.05}" height="10" rx="2" fill="#ff5964"/>
        <rect x="${bilX + W * 0.14}" y="${bilY - 30}" width="${W * 0.05}" height="10" rx="2" fill="#ff5964"/>
        <!-- lysbjælke på taget (blå/rød) -->
        <rect x="${bilX + W * 0.07}" y="${bilY - 80}" width="${W * 0.07}" height="7" rx="3" fill="#0c141e"/>
        <rect x="${bilX + W * 0.07}" y="${bilY - 80}" width="${W * 0.035}" height="7" rx="3" fill="#ff3b46"/>
        <rect x="${bilX + W * 0.105}" y="${bilY - 80}" width="${W * 0.035}" height="7" rx="3" fill="#3b7bff"/>
        <circle cx="${bilX + W * 0.09}" cy="${bilY - 77}" r="16" fill="#ff3b46" opacity="0.2"/>
        <circle cx="${bilX + W * 0.12}" cy="${bilY - 77}" r="16" fill="#3b7bff" opacity="0.2"/>
        <!-- hjul -->
        <circle cx="${bilX + W * 0.02}" cy="${bilY}" r="17" fill="#05070a" stroke="#232c37" stroke-width="5"/>
        <circle cx="${bilX + W * 0.16}" cy="${bilY}" r="17" fill="#05070a" stroke="#232c37" stroke-width="5"/>
      </g>
      <!-- refleksion af bilens røde lys -->
      <rect x="${bilX - W * 0.02}" y="${jord}" width="${W * 0.22}" height="${H - jord}" fill="#d42233" opacity="0.08"/>

      <!-- regnstriber -->
      ${[...Array(60)].map((_, i) => `<line x1="${(i * 97) % W}" y1="${(i * 53) % jord}" x2="${(i * 97) % W - 6}" y2="${(i * 53) % jord + 22}" stroke="#9fc0d8" stroke-width="1" opacity="0.12"/>`).join("")}

      ${vignet(0.58)}${korn(0.06)}
    `);
  },

  // 7) Butiksvagt, interiør (4:5)
  "butiksvagt-interior": (W, H) => {
    const gulv = H * 0.84;
    return svgRamme(W, H, `
      <defs>
        <linearGradient id="rum" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#241c12"/><stop offset="1" stop-color="#120d08"/>
        </linearGradient>
        <filter id="blur7"><feGaussianBlur stdDeviation="10"/></filter>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#rum)"/>
      ${[...Array(3)].map((_, r) => `
        <g transform="translate(0,${H * 0.18 + r * H * 0.18})" filter="url(#blur7)" opacity="${0.8 - r * 0.15}">
          <rect x="${W * 0.06}" y="0" width="${W * 0.88}" height="10" fill="#4a392c"/>
          ${[...Array(9)].map((_, i) => `<rect x="${W * 0.09 + i * W * 0.095}" y="-34" width="${W * 0.055}" height="34" rx="4" fill="${["#6b4a2e", "#3e4a56", "#7a5a38", "#59432b"][i % 4]}"/>`).join("")}
        </g>`).join("")}
      ${[...Array(4)].map((_, i) => `<circle cx="${W * (0.2 + i * 0.2)}" cy="${H * 0.08}" r="16" fill="#ffca7a" opacity="0.8" filter="url(#blur7)"/>`).join("")}
      <rect y="${gulv}" width="${W}" height="${H - gulv}" fill="#0d0a06"/>
      ${vagt({ x: W * 0.5, y: gulv - 90, s: 2.1, stribe: "#d9b06a" })}
      <ellipse cx="${W * 0.5}" cy="${gulv + 40}" rx="90" ry="14" fill="#000" opacity="0.5"/>
      ${vignet(0.5)}${korn(0.05)}
    `);
  },

  // 8) Team-briefing
  "team-briefing": (W, H) => {
    const gulv = H * 0.85;
    return svgRamme(W, H, `
      <defs>
        <radialGradient id="lampe" cx="50%" cy="30%" r="60%">
          <stop offset="0" stop-color="#3a2c18"/><stop offset="1" stop-color="#0e0b08"/>
        </radialGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#lampe)"/>
      <circle cx="${W * 0.5}" cy="${H * 0.16}" r="${H * 0.05}" fill="#ffdca0" opacity="0.9"/>
      <circle cx="${W * 0.5}" cy="${H * 0.16}" r="${H * 0.14}" fill="#ffca7a" opacity="0.2"/>
      <line x1="${W * 0.5}" y1="0" x2="${W * 0.5}" y2="${H * 0.11}" stroke="#05070a" stroke-width="6"/>
      <rect x="${W * 0.3}" y="${gulv - H * 0.22}" width="${W * 0.4}" height="${H * 0.035}" rx="8" fill="#1a140d"/>
      <rect x="${W * 0.33}" y="${gulv - H * 0.185}" width="${W * 0.03}" height="${H * 0.185}" fill="#120e09"/>
      <rect x="${W * 0.64}" y="${gulv - H * 0.185}" width="${W * 0.03}" height="${H * 0.185}" fill="#120e09"/>
      <rect x="${W * 0.42}" y="${gulv - H * 0.235}" width="${W * 0.16}" height="${H * 0.012}" fill="#c9d0d6" opacity="0.6"/>
      ${vagt({ x: W * 0.33, y: gulv - 92, s: 1.9, flip: 1, stribe: "#d9b06a" })}
      ${vagt({ x: W * 0.67, y: gulv - 92, s: 1.9, flip: -1, stribe: "#d9b06a" })}
      <rect y="${gulv}" width="${W}" height="${H - gulv}" fill="#0a0805"/>
      <ellipse cx="${W * 0.33}" cy="${gulv + 26}" rx="76" ry="12" fill="#000" opacity="0.5"/>
      <ellipse cx="${W * 0.67}" cy="${gulv + 26}" rx="76" ry="12" fill="#000" opacity="0.5"/>
      ${vignet(0.55)}${korn(0.05)}
    `);
  },

  // 9) Tryghedsvagt, bosted (4:5)
  "tryghedsvagt-bosted": (W, H) => {
    const gulv = H * 0.86;
    return svgRamme(W, H, `
      <defs>
        <linearGradient id="rum9" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#232a31"/><stop offset="1" stop-color="#14181d"/>
        </linearGradient>
        <linearGradient id="lys9" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#dfe8ef" stop-opacity="0.5"/><stop offset="1" stop-color="#dfe8ef" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#rum9)"/>
      <rect x="${W * 0.14}" y="${H * 0.12}" width="${W * 0.34}" height="${H * 0.42}" fill="#9fb4c4" opacity="0.35" rx="6"/>
      <line x1="${W * 0.31}" y1="${H * 0.12}" x2="${W * 0.31}" y2="${H * 0.54}" stroke="#14181d" stroke-width="8"/>
      <line x1="${W * 0.14}" y1="${H * 0.33}" x2="${W * 0.48}" y2="${H * 0.33}" stroke="#14181d" stroke-width="8"/>
      <polygon points="${W * 0.14},${H * 0.12} ${W * 0.48},${H * 0.12} ${W * 0.85},${gulv} ${W * 0.3},${gulv}" fill="url(#lys9)"/>
      <g fill="#1b2127">
        <ellipse cx="${W * 0.82}" cy="${H * 0.5}" rx="${W * 0.1}" ry="${H * 0.08}"/>
        <rect x="${W * 0.8}" y="${H * 0.55}" width="${W * 0.045}" height="${H * 0.1}"/>
        <rect x="${W * 0.74}" y="${H * 0.65}" width="${W * 0.16}" height="${H * 0.05}" rx="10"/>
      </g>
      <rect y="${gulv}" width="${W}" height="${H - gulv}" fill="#101317"/>
      ${vagt({ x: W * 0.44, y: gulv - 84, s: 1.95, stribe: "#c9d0d6" })}
      <ellipse cx="${W * 0.44}" cy="${gulv + 36}" rx="84" ry="13" fill="#000" opacity="0.4"/>
      ${vignet(0.45)}${korn(0.045)}
    `);
  },

  // 10) Fastvagt ved adresse, nat (4:5)
  "fastvagt-adresse-nat": (W, H) => {
    const jord = H * 0.86;
    return svgRamme(W, H, `
      <defs>
        <linearGradient id="nat10" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#0b1522"/><stop offset="1" stop-color="#0a0e13"/>
        </linearGradient>
        <linearGradient id="doer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ffdda6"/><stop offset="1" stop-color="#c77f3f"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#nat10)"/>
      <g fill="#10161e">
        <rect x="${W * 0.1}" y="${H * 0.08}" width="${W * 0.8}" height="${jord - H * 0.08}"/>
        ${[...Array(3)].map((_, r) => [...Array(3)].map((_, c) => `<rect x="${W * 0.17 + c * W * 0.24}" y="${H * 0.14 + r * H * 0.17}" width="${W * 0.12}" height="${H * 0.1}" fill="${r === 1 && c === 2 ? "#3d3120" : "#0a0f15"}"/>`).join("")).join("")}
      </g>
      <rect x="${W * 0.38}" y="${jord - H * 0.24}" width="${W * 0.24}" height="${H * 0.24}" fill="url(#doer)" opacity="0.9"/>
      <rect x="${W * 0.355}" y="${jord - H * 0.26}" width="${W * 0.29}" height="${H * 0.02}" fill="#1c242e"/>
      <line x1="${W * 0.5}" y1="${jord - H * 0.24}" x2="${W * 0.5}" y2="${jord}" stroke="#8a5a2c" stroke-width="5"/>
      <rect y="${jord}" width="${W}" height="${H - jord}" fill="#07090d"/>
      <rect x="${W * 0.3}" y="${jord}" width="${W * 0.4}" height="10" fill="#151a21"/>
      ${vagt({ x: W * 0.3, y: jord - 74, s: 1.8 })}
      <ellipse cx="${W * 0.3}" cy="${jord + 34}" rx="76" ry="12" fill="#000" opacity="0.55"/>
      ${vignet(0.55)}${korn(0.055)}
    `);
  },

  /* Teksturer (21:9) til sektions-dividers */
  "tekstur-hegn": (W, H) => svgRamme(W, H, `
      <rect width="${W}" height="${H}" fill="#0a0f16"/>
      <circle cx="${W * 0.78}" cy="${H * 0.3}" r="${H * 0.5}" fill="#ffca7a" opacity="0.12"/>
      ${hegn(0, -20, W, H + 40, 0.8)}
      ${vignet(0.5)}${korn(0.07)}
    `),
  "tekstur-floodlight": (W, H) => svgRamme(W, H, `
      <rect width="${W}" height="${H}" fill="#080d14"/>
      <circle cx="${W * 0.32}" cy="${H * 0.45}" r="${H * 0.65}" fill="#ffca7a" opacity="0.18"/>
      <circle cx="${W * 0.32}" cy="${H * 0.45}" r="${H * 0.3}" fill="#ffe4b0" opacity="0.3"/>
      <circle cx="${W * 0.32}" cy="${H * 0.45}" r="${H * 0.1}" fill="#fff3da" opacity="0.9"/>
      ${[...Array(6)].map((_, i) => `<circle cx="${W * (0.45 + i * 0.09)}" cy="${H * (0.45 + (i % 2) * 0.12)}" r="${10 + i * 4}" fill="#ffca7a" opacity="${0.25 - i * 0.03}"/>`).join("")}
      ${vignet(0.5)}${korn(0.08)}
    `),
  "tekstur-hivis": (W, H) => svgRamme(W, H, `
      <rect width="${W}" height="${H}" fill="#0d1117"/>
      <rect y="${H * 0.34}" width="${W}" height="${H * 0.14}" fill="#ffb95c" opacity="0.9"/>
      <rect y="${H * 0.36}" width="${W}" height="${H * 0.02}" fill="#ffe9c4" opacity="0.7"/>
      <rect y="${H * 0.58}" width="${W}" height="${H * 0.1}" fill="#c9d0d6" opacity="0.35"/>
      ${[...Array(40)].map((_, i) => `<line x1="${(i * W) / 40}" y1="0" x2="${(i * W) / 40 - 40}" y2="${H}" stroke="#000" stroke-width="1.5" opacity="0.25"/>`).join("")}
      ${vignet(0.45)}${korn(0.1)}
    `),
};

/* størrelser pr. billede */
const stoerrelser = {
  "hero-byggeplads-nat": [1920, 1080],
  "portvagt-daggry": [1600, 900],
  "materiel-lager": [1200, 1500],
  "event-vagt": [1600, 900],
  "kommune-vagt-dag": [1600, 900],
  "rundering-koeretoej-nat": [1600, 900],
  "butiksvagt-interior": [1200, 1500],
  "team-briefing": [1600, 900],
  "tryghedsvagt-bosted": [1200, 1500],
  "fastvagt-adresse-nat": [1200, 1500],
  "tekstur-hegn": [1680, 720],
  "tekstur-floodlight": [1680, 720],
  "tekstur-hivis": [1680, 720],
};

const browser = await chromium.launch({ executablePath: findChromium() });
const side = await browser.newPage();

for (const [navn, scene] of Object.entries(scener)) {
  const [W, H] = stoerrelser[navn];
  await side.setViewportSize({ width: W, height: H });
  await side.setContent(
    `<!doctype html><html><body style="margin:0">${scene(W, H)}</body></html>`
  );
  await side.screenshot({
    path: path.join(UD, `${navn}.jpg`),
    type: "jpeg",
    quality: 86,
  });
  console.log(`✓ ${navn}.jpg (${W}x${H})`);
}

await browser.close();
console.log("\nFærdig — kør 'npm run billeder' for at opdatere manifestet.");
