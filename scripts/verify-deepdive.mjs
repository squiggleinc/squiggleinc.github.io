import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3001/", { waitUntil: "load" });
await p.waitForTimeout(2500);
await p.evaluate(() => {
  const x = [...document.querySelectorAll("button")].find(
    (b) => /TradoGotchi/.test(b.textContent) && /Explore/.test(b.textContent)
  );
  if (x) x.click();
});
await p.waitForTimeout(5000); // iframe app: fonts + canvas + render
await p.screenshot({ path: "tg-deepdive.png" });
await b.close();
console.log("saved tg-deepdive.png");
