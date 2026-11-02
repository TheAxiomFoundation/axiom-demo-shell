// Drives the gallery in headless Chromium under four profiles: a touch phone,
// a desktop with a mouse, a desktop with reduced motion, and no JavaScript.
// Demo origins are stubbed, so every frame load is counted without network.
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { chromium, devices } = require("playwright");
const { loadProto, serve } = require("./helpers.cjs");

const PROTO = loadProto();
const GALLERY_IDS = ["workflow", "guidance", "chatbot", "builder", "snap", "microsim"];

let browser, srv;
test.before(async () => { browser = await chromium.launch(); srv = await serve(); });
test.after(async () => { await browser.close(); srv.server.close(); });

async function open(contextOptions) {
  const context = await browser.newContext(contextOptions);
  const demoLoads = [];
  await context.route(/^https:\/\/(axiom\.org|app\.axiom-foundation\.org)\//, (route) => {
    if (route.request().resourceType() === "document") demoLoads.push(route.request().url());
    route.fulfill({ status: 200, contentType: "text/html", body: "<title>stub</title>" });
  });
  // Third-party analytics and fonts are irrelevant here; keep the run offline.
  await context.route(/googletagmanager|posthog|fonts\.(googleapis|gstatic)/, (r) => r.abort());
  const page = await context.newPage();
  await page.goto(srv.base + "index.html", { waitUntil: "load" });
  return { context, page, demoLoads };
}

const iframesIn = (page, sel) => page.locator(sel + " iframe").count();

test("touch: no iframe loads until a card is tapped, and only one stays live", async () => {
  const { context, page, demoLoads } = await open({ ...devices["iPhone 13"] });
  try {
    // Scroll the whole page so any lazy frames would have been triggered.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    assert.equal(await page.locator("iframe").count(), 0, "no iframe before a tap");
    assert.deepEqual(demoLoads, [], "no demo document requested before a tap");
    assert.equal(await page.locator("#canvas .tile .tile-poster").count(), GALLERY_IDS.length);

    await page.locator('.tile[data-demo="snap"]').tap();
    await page.waitForSelector("#overlay.on");
    assert.equal(await page.locator("iframe").count(), 1, "the tapped demo loads");
    assert.deepEqual(demoLoads, [PROTO.DEST.snap]);

    await page.locator("#mnext").tap();
    await page.locator("#mnext").tap();
    assert.equal(await page.locator("iframe").count(), 1, "stepping keeps one live frame");

    await page.locator("#mclose").tap();
    assert.equal(await page.locator("iframe").count(), 0, "closing unloads the frame");
  } finally { await context.close(); }
});

test("desktop: every card keeps its live preview", async () => {
  const { context, page } = await open({ viewport: { width: 1440, height: 900 } });
  try {
    assert.equal(await iframesIn(page, "#canvas"), GALLERY_IDS.length);
    assert.equal(await page.locator("#canvas .tile-poster").count(), 0);
    for (const id of GALLERY_IDS) {
      assert.equal(await page.locator(`#canvas .tile[data-demo="${id}"] iframe`).getAttribute("src"), PROTO.DEST[id]);
    }
    // Panes persist across switches on desktop, as before.
    await page.locator('.tile[data-demo="snap"]').click();
    await page.locator("#mnext").click();
    assert.equal(await iframesIn(page, "#mview"), 2);
  } finally { await context.close(); }
});

test("reduced motion: posters instead of live previews, links intact", async () => {
  const { context, page, demoLoads } = await open({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  try {
    assert.equal(await page.locator("iframe").count(), 0);
    assert.deepEqual(demoLoads, []);
    for (const id of GALLERY_IDS) {
      const tile = page.locator(`#canvas .tile[data-demo="${id}"]`);
      assert.equal(await tile.getAttribute("href"), PROTO.DEST[id]);
      assert.equal(await tile.locator("img.tile-poster").count(), 1);
    }
  } finally { await context.close(); }
});

test("no JavaScript: every card shows a poster and links to its demo", async () => {
  const { context, page, demoLoads } = await open({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  try {
    assert.equal(await page.locator("iframe").count(), 0);
    assert.deepEqual(demoLoads, []);
    const tiles = page.locator(".tile");
    assert.equal(await tiles.count(), GALLERY_IDS.length);
    for (const id of GALLERY_IDS) {
      const tile = page.locator(`.tile[data-demo="${id}"]`);
      assert.ok(await tile.isVisible(), id + " tile visible");
      assert.equal(await tile.getAttribute("href"), PROTO.DEST[id]);
      assert.equal(await tile.locator("img.tile-poster").getAttribute("src"), PROTO.POSTERS[id]);
    }
  } finally { await context.close(); }
});
