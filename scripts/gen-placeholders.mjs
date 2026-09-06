import { mkdirSync, writeFileSync } from "node:fs";

/**
 * Generates self-contained SVG placeholder images (no external deps) into
 * public/images. Run: node scripts/gen-placeholders.mjs
 */

const OUT = new URL("../public/images/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const base = "#0a0a0b";
const ink = "#f4f2ee";

function svg({ w, h, accent, second, label, kind }) {
  const id = Math.random().toString(36).slice(2, 8);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <radialGradient id="g1${id}" cx="30%" cy="28%" r="75%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.95"/>
      <stop offset="55%" stop-color="${accent}" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="${base}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2${id}" cx="78%" cy="82%" r="70%">
      <stop offset="0%" stop-color="${second}" stop-opacity="0.8"/>
      <stop offset="60%" stop-color="${second}" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="${base}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="g3${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#151517"/>
      <stop offset="100%" stop-color="${base}"/>
    </linearGradient>
    <filter id="b${id}"><feGaussianBlur stdDeviation="${Math.round(w / 26)}"/></filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g3${id})"/>
  <g filter="url(#b${id})">
    <rect width="${w}" height="${h}" fill="url(#g1${id})"/>
    <rect width="${w}" height="${h}" fill="url(#g2${id})"/>
    <circle cx="${w * 0.66}" cy="${h * 0.34}" r="${w * 0.16}" fill="${ink}" opacity="0.05"/>
  </g>
  ${
    kind === "grid"
      ? `<g stroke="${ink}" stroke-opacity="0.06" stroke-width="1">
          ${Array.from({ length: 7 }, (_, i) => `<line x1="0" y1="${(h / 7) * (i + 1)}" x2="${w}" y2="${(h / 7) * (i + 1)}"/>`).join("")}
          ${Array.from({ length: 10 }, (_, i) => `<line x1="${(w / 10) * (i + 1)}" y1="0" x2="${(w / 10) * (i + 1)}" y2="${h}"/>`).join("")}
        </g>`
      : ""
  }
  <circle cx="${w * 0.5}" cy="${h * 0.46}" r="${Math.min(w, h) * 0.18}" fill="none" stroke="${ink}" stroke-opacity="0.14" stroke-width="1.5"/>
  <text x="${w * 0.5}" y="${h * 0.47}" text-anchor="middle" dominant-baseline="central"
    font-family="Georgia, 'Times New Roman', serif" font-size="${Math.round(w * 0.075)}"
    font-weight="600" fill="${ink}" fill-opacity="0.92">${label}</text>
  <text x="${w * 0.5}" y="${h * 0.47 + w * 0.06}" text-anchor="middle" dominant-baseline="central"
    font-family="ui-monospace, monospace" font-size="${Math.round(w * 0.017)}"
    letter-spacing="${Math.round(w * 0.006)}" fill="${ink}" fill-opacity="0.4">CASE STUDY · PLACEHOLDER</text>
</svg>`;
}

const projects = {
  northwind: { accent: "#e8563f", second: "#5b8def", label: "Northwind" },
  atlas: { accent: "#5b8def", second: "#b57edc", label: "Atlas" },
  verdant: { accent: "#3fae7a", second: "#e8a13f", label: "Verdant" },
  helm: { accent: "#b57edc", second: "#5b8def", label: "Helm" },
  cadence: { accent: "#e8a13f", second: "#e8563f", label: "Cadence" },
};

let count = 0;
for (const [slug, p] of Object.entries(projects)) {
  writeFileSync(`${OUT}${slug}-thumb.svg`, svg({ w: 1600, h: 1200, kind: "grid", ...p }));
  count++;
  if (["northwind", "atlas", "verdant"].includes(slug)) {
    writeFileSync(`${OUT}${slug}-hero.svg`, svg({ w: 2000, h: 1125, kind: "grid", ...p }));
    writeFileSync(`${OUT}${slug}-1.svg`, svg({ w: 1400, h: 1050, kind: "plain", ...p, label: `${p.label} · 01` }));
    writeFileSync(`${OUT}${slug}-2.svg`, svg({ w: 1400, h: 1050, kind: "plain", ...p, label: `${p.label} · 02` }));
    count += 3;
  }
}
console.log(`generated ${count} placeholder images in public/images/`);
