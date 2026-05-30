import { chromium } from "playwright";

const PORT = process.argv[2] || "3000";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(`http://localhost:${PORT}/`, { waitUntil: "load" });
await p.waitForTimeout(3000);
await p.screenshot({ path: "cap-hero.png" });

async function shot(id, name) {
  await p.evaluate((sel) => {
    const el = document.getElementById(sel);
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  }, id);
  await p.waitForTimeout(1500);
  await p.screenshot({ path: name });
}
await shot("about", "cap-about.png");
await shot("projects", "cap-projects.png");
await shot("journey", "cap-journey.png");
await shot("contact", "cap-contact.png");
await b.close();
console.log("captured sections");
