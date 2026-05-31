import sharp from "sharp";
import { trace } from "potrace";
import { writeFileSync } from "node:fs";

const SRC = "public/squiggle-signature.png";
const MASK = "scripts/_sigmask.png";
const OUT = "public/squiggle-signature.svg";
const CHECK = "scripts/_sigcheck.png";

// The signature is gold strokes on a transparent background. The alpha channel
// is the cleanest source of the stroke silhouette: strokes -> black, bg -> white.
await sharp(SRC)
  .ensureAlpha()
  .extractChannel("alpha")
  .threshold(50)
  .negate()
  .toFile(MASK);

await new Promise((res, rej) =>
  trace(
    MASK,
    { turdSize: 2, optTolerance: 0.3, alphaMax: 1, color: "#e8c46a", background: "transparent" },
    (err, svg) => (err ? rej(err) : (writeFileSync(OUT, svg), res()))
  )
);

// render the traced SVG back to PNG so we can eyeball fidelity
await sharp(OUT).resize({ width: 760 }).flatten({ background: "#101018" }).png().toFile(CHECK);

const svg = (await import("node:fs")).readFileSync(OUT, "utf8");
const paths = (svg.match(/<path/g) || []).length;
const vb = (svg.match(/viewBox="([^"]+)"/) || [])[1];
console.log(`paths=${paths} viewBox=${vb}`);
