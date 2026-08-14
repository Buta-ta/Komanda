import { chromium } from "/home/user/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs";
import { mkdir } from "node:fs/promises";

const OUT = "/home/user/Komanda/public/shots";
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--ignore-gpu-blocklist"],
});

const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

page.on("pageerror", (e) => console.log("PAGEERROR", e.message));
page.on("console", (m) => {
  if (m.type() === "error") console.log("CONSOLE", m.text());
});

await page.goto("http://127.0.0.1:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });

// wait for WebGL canvas (loader goes away once first frame exists)
await page.waitForSelector("canvas", { timeout: 45000 });
await page.waitForTimeout(3500);

const height = await page.evaluate(() => document.documentElement.scrollHeight);
const vh = 900;
console.log("scrollHeight", height);

const acts = [
  ["01-push", 0.02],
  ["02-komanda-on-tv", 0.1],
  ["03-exit", 0.2],
  ["04-key", 0.3],
  ["05-how", 0.4],
  ["06-offers", 0.5],
  ["07-showroom", 0.62],
  ["08-agent", 0.74],
  ["09-audit", 0.84],
  ["10-cta", 0.95],
];

for (const [name, p] of acts) {
  const y = Math.round((height - vh) * p);
  await page.evaluate((top) => window.scrollTo(0, top), y);
  await page.waitForTimeout(900);
  const file = `${OUT}/${name}.png`;
  await page.screenshot({ path: file, type: "png" });
  console.log("shot", name, "y", y);
}

await browser.close();
console.log("done");
