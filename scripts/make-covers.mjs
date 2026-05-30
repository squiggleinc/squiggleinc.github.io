// Generates on-brand 1200x750 cover images for each project deep-dive.
// Run: node scripts/make-covers.mjs  (regenerates public/projects/*.png)
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const W = 1200;
const H = 750;

const projects = [
  {
    file: "squiggle",
    name: "Squiggle",
    hook: "A mobile-notary business, reimagined as an AI-run operation.",
    status: "Live",
    accent: "#8b5cf6",
    tech: ["Next.js", "React", "TypeScript", "Supabase", "Claude AI"],
  },
  {
    file: "tradogotchi",
    name: "TradoGotchi",
    hook: "Your futures trades, with a heartbeat.",
    status: "Private",
    accent: "#a78bfa",
    tech: ["Node.js", "Express", "WebSockets", "TradingView"],
  },
  {
    file: "mindfull",
    name: "Mindfull Intel",
    hook: "Find winning products before they trend.",
    status: "Private",
    accent: "#6d28d9",
    tech: ["Python", "FastAPI", "Playwright", "SQLite"],
  },
];

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Greedy word-wrap into at most `maxLines` lines of ~`max` chars.
function wrap(text, max = 30, maxLines = 2) {
  const words = text.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > max && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = (cur + " " + w).trim();
    }
  }
  if (cur) lines.push(cur);
  return lines.slice(0, maxLines);
}

function chips(tech, x, y, accent) {
  let cx = x;
  const out = [];
  for (const t of tech) {
    const w = 26 + t.length * 13;
    out.push(`
      <rect x="${cx}" y="${y}" rx="20" ry="20" width="${w}" height="40"
            fill="none" stroke="${accent}55" />
      <text x="${cx + w / 2}" y="${y + 26}" text-anchor="middle"
            font-family="Consolas, monospace" font-size="18" fill="#c0c0c0">${esc(t)}</text>`);
    cx += w + 14;
  }
  return out.join("");
}

function svgFor(p) {
  const hookLines = wrap(p.hook, 32, 3);
  const hookTspans = hookLines
    .map(
      (l, i) =>
        `<tspan x="80" dy="${i === 0 ? 0 : 52}">${esc(l)}</tspan>`
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="78%" cy="22%" r="60%">
      <stop offset="0%" stop-color="${p.accent}" stop-opacity="0.55"/>
      <stop offset="45%" stop-color="${p.accent}" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="${p.accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="name" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="60%" stop-color="#e8e8e8"/>
      <stop offset="100%" stop-color="${p.accent}"/>
    </linearGradient>
    <linearGradient id="hair" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${p.accent}" stop-opacity="0"/>
      <stop offset="50%" stop-color="${p.accent}" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="${p.accent}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#0a0a0a"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" fill="none" stroke="#1f1f1f"/>

  <!-- status pill -->
  <rect x="80" y="92" rx="18" ry="18" width="${70 + p.status.length * 11}" height="36"
        fill="${p.accent}1f" stroke="${p.accent}66"/>
  <circle cx="104" cy="110" r="5" fill="${p.accent}"/>
  <text x="120" y="116" font-family="Consolas, monospace" font-size="17"
        letter-spacing="2" fill="#e8e8e8">${esc(p.status.toUpperCase())}</text>

  <!-- name -->
  <text x="80" y="300" font-family="Segoe UI, Arial, sans-serif" font-weight="700"
        font-size="104" fill="url(#name)">${esc(p.name)}</text>

  <!-- hook -->
  <text x="80" y="392" font-family="Segoe UI, Arial, sans-serif" font-size="40"
        fill="#c0c0c0">${hookTspans}</text>

  <!-- hairline -->
  <rect x="80" y="560" width="1040" height="2" fill="url(#hair)"/>

  <!-- tech chips -->
  ${chips(p.tech, 80, 612, p.accent)}
</svg>`;
}

mkdirSync("public/projects", { recursive: true });

for (const p of projects) {
  const svg = svgFor(p);
  await sharp(Buffer.from(svg)).png().toFile(`public/projects/${p.file}.png`);
  console.log(`wrote public/projects/${p.file}.png`);
}
console.log("done");
