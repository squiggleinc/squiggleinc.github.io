import sharp from "sharp";
import { trace } from "potrace";
import { writeFileSync } from "node:fs";

const SRC = "public/squiggle-icon.png";
const MASK = "scripts/_mask.png";
const OUT = "public/squiggle-s.svg";
const CHECK = "scripts/_check.png";

const THRESHOLD = Number(process.env.THRESHOLD ?? 250);

// 1) alpha-aware silhouette: flatten onto white, then threshold high so the
//    whole gradient S becomes black and only the (formerly transparent) bg is white.
await sharp(SRC)
  .flatten({ background: "#ffffff" })
  .grayscale()
  .threshold(THRESHOLD) // >=THRESHOLD -> white, else black
  .toFile(MASK);

// 2) trace the black silhouette
await new Promise((res, rej) =>
  trace(
    MASK,
    {
      turdSize: 100,
      optTolerance: 0.4,
      color: "#8b5cf6",
      background: "transparent",
      threshold: 128,
    },
    (err, svg) => (err ? rej(err) : (writeFileSync(OUT, svg), res()))
  )
);

// 3) verify: rasterize the SVG back to PNG so a human/agent can eyeball it
await sharp(OUT).resize({ width: 343 }).png().toFile(CHECK);
console.log(`done (threshold=${THRESHOLD})`);
