// Unit and property tests for the preview-mode logic in data.js.
//
// Invariants:
//   1. previewMode returns "live" exactly when the device hovers, has a fine
//      pointer, and the visitor has not asked for reduced motion.
//   2. A poster thumb never contains an iframe; a live thumb contains exactly
//      one, pointing at the demo's destination.
//   3. Every demo shown in the gallery has a poster path.
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const fc = require("fast-check");
const { ROOT, loadProto } = require("./helpers.cjs");

const PROTO = loadProto();
const GALLERY_IDS = ["workflow", "guidance", "chatbot", "builder", "snap", "microsim"];
const env = fc.record({ hover: fc.boolean(), finePointer: fc.boolean(), reducedMotion: fc.boolean() });
const anyId = fc.constantFrom(...Object.keys(PROTO.DEST));
const iframes = (html) => (html.match(/<iframe\b/g) || []).length;

test("previewMode: live only for hover + fine pointer + motion allowed", () => {
  fc.assert(fc.property(env, (e) => {
    assert.equal(PROTO.previewMode(e) === "live", e.hover && e.finePointer && !e.reducedMotion);
  }));
});

test("previewMode examples", () => {
  assert.equal(PROTO.previewMode({ hover: true, finePointer: true, reducedMotion: false }), "live");
  // iPhone / Android phone
  assert.equal(PROTO.previewMode({ hover: false, finePointer: false, reducedMotion: false }), "poster");
  // hover without a fine pointer
  assert.equal(PROTO.previewMode({ hover: true, finePointer: false, reducedMotion: false }), "poster");
  assert.equal(PROTO.previewMode({ hover: true, finePointer: true, reducedMotion: true }), "poster");
});

test("preview: iframe present exactly in live mode", () => {
  fc.assert(fc.property(env, anyId, (e, id) => {
    const mode = PROTO.previewMode(e);
    const html = PROTO.preview(id, "tile-thumb", mode);
    if (mode === "live") {
      assert.equal(iframes(html), 1);
      assert.ok(html.includes('src="' + PROTO.DEST[id] + '"'));
    } else {
      assert.equal(iframes(html), 0);
      assert.ok(html.includes("is-poster"));
    }
  }));
});

test("preview: no mode argument keeps the old live behaviour", () => {
  for (const id of Object.keys(PROTO.DEST)) assert.equal(iframes(PROTO.preview(id, "mini-thumb")), 1);
});

test("detectPreviewMode reads the three media queries", () => {
  fc.assert(fc.property(env, (e) => {
    const win = { matchMedia: (q) => ({ matches:
      q === "(hover: hover)" ? e.hover :
      q === "(pointer: fine)" ? e.finePointer :
      q === "(prefers-reduced-motion: reduce)" ? e.reducedMotion : false }) };
    assert.equal(PROTO.detectPreviewMode(win), PROTO.previewMode(e));
  }));
  assert.equal(PROTO.detectPreviewMode({}), "poster", "no matchMedia falls back to posters");
});

test("every gallery demo has a poster path", () => {
  for (const id of GALLERY_IDS) {
    assert.match(PROTO.POSTERS[id] || "", /^posters\/[a-z]+\.(png|webp|jpg)$/, id);
    assert.ok(PROTO.preview(id, "tile-thumb", "poster").includes("background-image:url(" + PROTO.POSTERS[id] + ")"));
  }
});

// Every gallery card's poster file must be in the repository: a missing
// file fails the run and the message names it.
test("poster files exist", () => {
  const missing = GALLERY_IDS.map((id) => PROTO.POSTERS[id]).filter((p) => !fs.existsSync(path.join(ROOT, p)));
  assert.deepEqual(missing, [], "missing poster files: " + missing.join(", "));
});
