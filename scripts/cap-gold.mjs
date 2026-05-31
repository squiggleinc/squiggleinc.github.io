import { chromium } from "playwright";

const PORT = process.argv[2] || "3000";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(`http://localhost:${PORT}/`, { waitUntil: "load" });
await p.waitForTimeout(4000);
await p.screenshot({ path: "gold-hero.png" });

// open the Mindfull deep-dive (light — no heavy iframe) to show richer details
await p.evaluate(() => {
  const x = [...document.querySelectorAll("button")].find(
    (b) => /Mindfull/.test(b.textContent) && /Explore/.test(b.textContent)
  );
  if (x) x.click();
});
await p.waitForTimeout(2500);
await p.evaluate(() => {
  const m = document.querySelector(".fixed.inset-0.z-50.overflow-y-auto");
  if (m) m.scrollTo(0, 760);
});
await p.waitForTimeout(900);
await p.screenshot({ path: "gold-deepdive.png" });
await b.close();
console.log("done");
