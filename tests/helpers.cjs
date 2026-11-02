// Shared helpers: load data.js the way a browser would, and serve the repo
// over HTTP so the gallery can be driven in a real (headless) browser.
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const vm = require("node:vm");

const ROOT = path.resolve(__dirname, "..");

function loadProto() {
  const head = { appendChild() {} };
  const window = {};
  const document = { head, createElement: () => ({}) };
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, "data.js"), "utf8"), { window, document });
  return window.PROTO;
}

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp" };

function serve() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://x");
    let p = decodeURIComponent(url.pathname);
    if (p === "/") p = "/index.html";
    const file = path.join(ROOT, path.normalize(p));
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404); res.end(); return;
    }
    res.writeHead(200, { "content-type": TYPES[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () =>
    resolve({ server, base: "http://127.0.0.1:" + server.address().port + "/" })));
}

module.exports = { ROOT, loadProto, serve };
