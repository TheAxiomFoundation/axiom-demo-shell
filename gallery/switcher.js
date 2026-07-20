/* Shared option switcher — injected on every gallery study page so no page is
   a dead end. Hides itself when the page is embedded in the compare view. */
(function () {
  "use strict";
  if (window.top !== window.self) return; // inside gallery-lab's iframe — it has its own tabs

  var PAGES = [
    { href: "gallery-hybrid.html", label: "Wheel + deck" },
    { href: "gallery-flywheel.html", label: "Flywheel" },
    { href: "gallery-ribbon.html", label: "Ribbon" },
    { href: "demo-frame.html", label: "Demo frame" },
    { href: "gallery-grid.html", label: "Grid" },
    { href: "gallery-onescreen.html", label: "One screen" },
    { href: "corpus.html", label: "Corpus" }
  ];
  var here = window.location.pathname.split("/").pop();

  var css =
    ".gswitch{position:fixed;top:12px;right:14px;z-index:60;display:flex;align-items:center;gap:6px;" +
    "padding:5px 6px;border:1px solid var(--rule,#e3dfd3);border-radius:999px;background:var(--paper,#faf9f5);" +
    "box-shadow:0 2px 10px rgba(26,25,21,.07);font-family:var(--sans,Inter,sans-serif)}" +
    ".gswitch .gsl{font-family:var(--mono,monospace);font-size:.54rem;letter-spacing:.14em;text-transform:uppercase;" +
    "color:var(--ink-faint,#9b9890);padding:0 4px 0 8px}" +
    ".gswitch a{padding:5px 12px;border-radius:999px;text-decoration:none;font-size:.8rem;" +
    "color:var(--ink-soft,#6f6d64);transition:color .14s ease,background .14s ease}" +
    ".gswitch a:hover{color:var(--ink,#1a1915)}" +
    ".gswitch a.on{background:var(--ink,#1a1915);color:var(--cloud,#f0eee6)}" +
    ".gswitch a.cmp{font-family:var(--mono,monospace);font-size:.56rem;letter-spacing:.1em;text-transform:uppercase;" +
    "color:var(--clay-strong,#b1573b)}" +
    ".gswitch.bottom{top:auto;bottom:12px;right:50%;transform:translateX(50%)}" +
    "@media (max-width:700px){.gswitch{top:auto;bottom:12px;right:50%;transform:translateX(50%)}}";
  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var nav = document.createElement("nav");
  nav.className = "gswitch";
  // pages with their own sticky top bar opt out of the top-right slot
  if (document.body.getAttribute("data-switcher") === "bottom") nav.className += " bottom";
  nav.setAttribute("aria-label", "Gallery options");
  nav.innerHTML = PAGES.map(function (p) {
      return '<a href="' + p.href + '"' + (p.href === here ? ' class="on" aria-current="page"' : "") + ">" +
        p.label + "</a>";
    }).join("") +
    '<a class="cmp" href="index.html" title="Side-by-side compare view">Compare</a>';
  document.body.appendChild(nav);
})();
