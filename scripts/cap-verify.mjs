import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });

let url = null;
for (const port of [3000, 3001, 3002, 3003]) {
  try {
    await p.goto(`http://localhost:${port}/`, { waitUntil: "load", timeout: 4000 });
    if (/Vincent Sarkis/.test(await p.title())) { url = `http://localhost:${port}/`; break; }
  } catch {}
}
if (!url) { console.log("portfolio not found"); process.exit(1); }

await p.goto(url, { waitUntil: "load" });
await p.waitForTimeout(4000);
await p.screenshot({ path: "v-hero.png" });

await p.evaluate(() => {
  const x = [...document.querySelectorAll("button")].find(
    (b) => /Mindfull/.test(b.textContent) && /Explore/.test(b.textContent)
  );
  if (x) x.click();
});
await p.waitForTimeout(2500);
const info = await p.evaluate(() => {
  const m = document.querySelector(".fixed.inset-0.z-50.overflow-y-auto");
  if (!m) return "no modal";
  m.scrollTo(0, m.scrollHeight);
  return `scrollH=${m.scrollHeight} clientH=${m.clientHeight} scrollTop=${m.scrollTop}`;
});
await p.waitForTimeout(1000);
await p.screenshot({ path: "v-modal-bottom.png" });
await b.close();
console.log("ok " + url + " | " + info);
