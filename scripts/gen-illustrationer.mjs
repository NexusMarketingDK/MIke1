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
  // 1) Hero: nat-byggeplads med vagt og lygte
  "hero-byggeplads-nat": (W, H) => {
    const jord = H * 0.78;
    return svgRamme(W, H, `
      <defs>
        <linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#0a1420"/><stop offset="0.55" stop-color="#122c44"/><stop offset="1" stop-color="#0c1826"/>
        </linearGradient>
        <linearGradient id="jord" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#0d141c"/><stop offset="1" stop-color="#05080c"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#himmel)"/>
      ${[...Array(60)].map((_, i) => `<circle cx="${(i * 137) % W}" cy="${(i * 89) % (jord * 0.6)}" r="${(i % 3) * 0.5 + 0.5}" fill="#cfe0ee" opacity="${0.15 + (i % 5) * 0.08}"/>`).join("")}
      ${kran(W * 0.18, jord, H * 0.52, W * 0.2, 1)}
      ${kran(W * 0.86, jord, H * 0.4, W * 0.15, -1)}
      <g fill="#04070b">
        <rect x="${W * 0.55}" y="${jord - H * 0.3}" width="${W * 0.16}" height="${H * 0.3}"/>
        ${[...Array(5)].map((_, r) => [...Array(4)].map((_, c) => `<rect x="${W * 0.565 + c * W * 0.035}" y="${jord - H * 0.28 + r * H * 0.055}" width="${W * 0.02}" height="${H * 0.03}" fill="#0e1a28"/>`).join("")).join("")}
        <rect x="${W * 0.34}" y="${jord - H * 0.16}" width="${W * 0.13}" height="${H * 0.16}"/>
      </g>
      ${projektoer(W * 0.68, jord, H * 0.34, -1)}
      <rect y="${jord}" width="${W}" height="${H - jord}" fill="url(#jord)"/>
      <ellipse cx="${W * 0.5}" cy="${jord + 30}" rx="${W * 0.28}" ry="16" fill="#12202e" opacity="0.7"/>
      <ellipse cx="${W * 0.72}" cy="${jord + 60}" rx="${W * 0.14}" ry="10" fill="#1a2836" opacity="0.5"/>
      ${lygte({ x: W * 0.415, y: jord - 20, vinkel: 14, laengde: W * 0.34, bredde: H * 0.3, id: "b1" })}
      ${vagt({ x: W * 0.4, y: jord - 62, s: 1.35 })}
      <ellipse cx="${W * 0.4}" cy="${jord + 22}" rx="52" ry="9" fill="#000" opacity="0.55"/>
      ${vignet(0.6)}${korn(0.06)}
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
          <stop offset="0" stop-color="#0a1626"/><stop offset="1" stop-color="#0a0e13"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#nat3)"/>
      ${projektoer(W * 0.85, jord, H * 0.3, -1)}
      <g fill="#0b1017">
        ${[...Array(3)].map((_, i) => `
          <g transform="translate(${W * 0.12 + i * W * 0.28},${jord - 130 - (i % 2) * 40})">
            <rect width="${W * 0.22}" height="130" fill="#10161e"/>
            ${[...Array(4)].map((_, r) => `<line x1="0" y1="${r * 34 + 16}" x2="${W * 0.22}" y2="${r * 34 + 16}" stroke="#1c242e" stroke-width="5"/>`).join("")}
            <rect y="130" width="${W * 0.22}" height="14" fill="#171207"/>
            ${[...Array(5)].map((_, p) => `<rect x="${p * W * 0.05}" y="130" width="${W * 0.02}" height="14" fill="#241c0c"/>`).join("")}
          </g>`).join("")}
      </g>
      <rect y="${jord}" width="${W}" height="${H - jord}" fill="#05080c"/>
      ${lygte({ x: W * 0.2, y: jord - 190, vinkel: 8, laengde: W * 0.6, bredde: 170, id: "b3" })}
      ${hegn(0, jord - H * 0.3, W, H * 0.3, 0.75)}
      ${vignet(0.6)}${korn(0.06)}
    `);
  },

  // 4) Event-vagt (aften)
  "event-vagt": (W, H) => {
    const jord = H * 0.82;
    return svgRamme(W, H, `
      <defs>
        <linearGradient id="aften" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#0d1522"/><stop offset="1" stop-color="#121016"/>
        </linearGradient>
        <filter id="soft"><feGaussianBlur stdDeviation="6"/></filter>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#aften)"/>
      <path d="M0,${H * 0.3} Q${W * 0.5},${H * 0.42} ${W},${H * 0.28}" stroke="#3a3f4a" stroke-width="2" fill="none"/>
      ${[...Array(14)].map((_, i) => { const x = (i + 0.5) * (W / 14); const y = H * 0.3 + Math.sin(i * 1.1) * 14 + H * 0.06; return `<circle cx="${x}" cy="${y}" r="10" fill="#ffca7a" opacity="0.9" filter="url(#soft)"/><circle cx="${x}" cy="${y}" r="4" fill="#fff1d6"/>`; }).join("")}
      <g fill="#0a0d13">
        ${[...Array(24)].map((_, i) => { const x = (i * W) / 23 + ((i % 3) - 1) * 12; const s = 0.7 + (i % 4) * 0.12; return `<g transform="translate(${x},${jord - 40}) scale(${s})"><circle cx="0" cy="-38" r="11"/><path d="M-17,-28 Q0,-38 17,-28 L15,26 L-15,26 Z"/></g>`; }).join("")}
      </g>
      <rect y="${jord}" width="${W}" height="${H - jord}" fill="#0a0c10"/>
      <g stroke="#39424c" stroke-width="6">
        <line x1="0" y1="${jord - 14}" x2="${W}" y2="${jord - 14}"/>
        <line x1="0" y1="${jord - 46}" x2="${W}" y2="${jord - 46}"/>
        ${[...Array(9)].map((_, i) => `<line x1="${(i * W) / 8}" y1="${jord - 50}" x2="${(i * W) / 8}" y2="${jord}"/>`).join("")}
      </g>
      ${vagt({ x: W * 0.24, y: jord - 20, s: 1.5 })}
      <ellipse cx="${W * 0.24}" cy="${jord + 72}" rx="60" ry="10" fill="#000" opacity="0.5"/>
      ${vignet(0.55)}${korn(0.05)}
    `);
  },

  // 5) Kommunevagt (dag)
  "kommune-vagt-dag": (W, H) => {
    const jord = H * 0.82;
    return svgRamme(W, H, `
      <defs>
        <linearGradient id="dag5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#8b99a6"/><stop offset="1" stop-color="#aab4bd"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#dag5)"/>
      <g fill="#39434e">
        <rect x="${W * 0.18}" y="${jord - H * 0.5}" width="${W * 0.64}" height="${H * 0.5}"/>
        <rect x="${W * 0.14}" y="${jord - H * 0.53}" width="${W * 0.72}" height="${H * 0.045}"/>
        ${[...Array(3)].map((_, r) => [...Array(7)].map((_, c) => `<rect x="${W * 0.225 + c * W * 0.078}" y="${jord - H * 0.45 + r * H * 0.14}" width="${W * 0.045}" height="${H * 0.09}" fill="#212a33"/>`).join("")).join("")}
        <rect x="${W * 0.45}" y="${jord - H * 0.17}" width="${W * 0.1}" height="${H * 0.17}" fill="#1a2129"/>
      </g>
      <g fill="#2f3a44">
        <circle cx="${W * 0.08}" cy="${jord - H * 0.16}" r="${H * 0.09}"/>
        <rect x="${W * 0.075}" y="${jord - H * 0.12}" width="8" height="${H * 0.12}"/>
        <circle cx="${W * 0.93}" cy="${jord - H * 0.14}" r="${H * 0.075}"/>
        <rect x="${W * 0.925}" y="${jord - H * 0.1}" width="8" height="${H * 0.1}"/>
      </g>
      <rect y="${jord}" width="${W}" height="${H - jord}" fill="#5b636c"/>
      <rect y="${jord}" width="${W}" height="8" fill="#4a525b"/>
      ${vagt({ x: W * 0.38, y: jord - 56, s: 1.2, stribe: "#e8b25a" })}
      <ellipse cx="${W * 0.38}" cy="${jord + 18}" rx="44" ry="7" fill="#000" opacity="0.25"/>
      ${vignet(0.3)}${korn(0.04)}
    `);
  },

  // 6) Runderingsbil, nat
  "rundering-koeretoej-nat": (W, H) => {
    const jord = H * 0.72;
    return svgRamme(W, H, `
      <defs>
        <linearGradient id="nat6" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#0a1220"/><stop offset="1" stop-color="#0b0f14"/>
        </linearGradient>
        <linearGradient id="vaad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#141d29"/><stop offset="1" stop-color="#05070a"/>
        </linearGradient>
        <linearGradient id="lyskegle" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#ffe9c4" stop-opacity="0.9"/><stop offset="1" stop-color="#ffe9c4" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#nat6)"/>
      <g fill="#04070b">
        ${[...Array(8)].map((_, i) => `<rect x="${i * W * 0.13}" y="${jord - 60 - (i % 3) * 40}" width="${W * 0.1}" height="${60 + (i % 3) * 40}"/>`).join("")}
      </g>
      <rect y="${jord}" width="${W}" height="${H - jord}" fill="url(#vaad)"/>
      <polygon points="${W * 0.62},${jord - 40} ${W},${jord - 110} ${W},${jord + 10}" fill="url(#lyskegle)" opacity="0.55"/>
      <g>
        <path d="M${W * 0.3},${jord - 44} Q${W * 0.36},${jord - 92} ${W * 0.46},${jord - 94} L${W * 0.56},${jord - 94} Q${W * 0.64},${jord - 90} ${W * 0.66},${jord - 46} L${W * 0.66},${jord - 18} L${W * 0.3},${jord - 18} Z" fill="#0c1117"/>
        <path d="M${W * 0.375},${jord - 86} L${W * 0.45},${jord - 88} L${W * 0.45},${jord - 58} L${W * 0.35},${jord - 56} Z" fill="#1b2836"/>
        <rect x="${W * 0.3}" y="${jord - 44}" width="${W * 0.36}" height="9" fill="#d42233" opacity="0.9"/>
        <circle cx="${W * 0.38}" cy="${jord - 12}" r="26" fill="#05070a" stroke="#222a33" stroke-width="6"/>
        <circle cx="${W * 0.58}" cy="${jord - 12}" r="26" fill="#05070a" stroke="#222a33" stroke-width="6"/>
        <circle cx="${W * 0.655}" cy="${jord - 40}" r="9" fill="#ffe9c4"/>
      </g>
      <g opacity="0.35" transform="translate(0,${jord * 2 - 12}) scale(1,-1)">
        <rect x="${W * 0.3}" y="${jord - 44}" width="${W * 0.36}" height="30" fill="#1b2836"/>
        <polygon points="${W * 0.62},${jord - 40} ${W},${jord - 80} ${W},${jord}" fill="url(#lyskegle)" opacity="0.5"/>
      </g>
      ${[...Array(12)].map((_, i) => `<rect x="${(i * W) / 12 + 10}" y="${jord + 20 + (i % 4) * 14}" width="${30 + (i % 3) * 26}" height="2.5" fill="#283334" opacity="0.5"/>`).join("")}
      ${vignet(0.55)}${korn(0.06)}
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
