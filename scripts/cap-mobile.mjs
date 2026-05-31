import { chromium } from "playwright";

const b = await chromium.launch();
let url = null;
const probe = await b.newPage();
for (const port of [3000, 3001, 3002, 3003]) {
  try {
    await probe.goto(`http://localhost:${port}/`, { waitUntil: "load", timeout: 4000 });
    if (/Vince/.test(await probe.title())) { url = `http://localhost:${port}/`; break; }
  } catch {}
}
await probe.close();
if (!url) { console.log("not found"); process.exit(1); }

// desktop — font sanity
const d = await b.newPage({ viewport: { width: 1440, height: 900 } });
await d.goto(url, { waitUntil: "load" });
await d.waitForTimeout(3500);
await d.evaluate(() => document.getElementById("about")?.scrollIntoView({ block: "center" }));
await d.waitForTimeout(1000);
await d.screenshot({ path: "m-about-desktop.png" });
await d.close();

// mobile — iPhone-ish
const m = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
await m.goto(url, { waitUntil: "load" });
await m.waitForTimeout(3500);
await m.screenshot({ path: "m-hero.png" });
await m.evaluate(() => document.getElementById("about")?.scrollIntoView({ block: "start" }));
await m.waitForTimeout(1200);
await m.screenshot({ path: "m-about.png" });
await m.evaluate(() => document.getElementById("projects")?.scrollIntoView({ block: "start" }));
await m.waitForTimeout(1200);
await m.screenshot({ path: "m-projects.png" });
await b.close();
console.log("captured " + url);
