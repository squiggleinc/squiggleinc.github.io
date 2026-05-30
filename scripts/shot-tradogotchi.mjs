import { chromium } from "playwright";

const url =
  "file:///C:/Users/17029/Github/squiggleinc.github.io/public/tradogotchi-app.html";

const b = await chromium.launch();
const p = await b.newPage({
  viewport: { width: 1200, height: 750 },
  deviceScaleFactor: 2,
});
await p.goto(url, { waitUntil: "load" });
// let webfonts load, the matrix canvas + pixel creature animate, WS fail to idle
await p.waitForTimeout(4000);
await p.screenshot({ path: "public/projects/tradogotchi.png" });
await b.close();
console.log("saved public/projects/tradogotchi.png");
