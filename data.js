/* Shared prototype data — one source of truth for all layout options.
   This is also the "data-driven base" we'd keep regardless of which layout wins:
   every card (and its counter, order, badges) is generated from DEMOS below. */
(function (global) {
  "use strict";

  var DEST = {
    finbot: "https://axiom.org/chatbot",
    regdemo: "https://axiom.org/reg-demo",
    builder: "https://axiom.org/builder",
    workflow: "https://axiom.org/workflow",
    snap: "https://axiom.org/snap",
    microsim: "https://axiom.org/microsim",
    guidance: "https://axiom.org/guidance",
    architecture: "https://axiom.org/architecture",
    law: "https://app.axiom-foundation.org/",
    graph: "https://axiom.org/graph-viewer",
    oracles: "https://axiom.org/oracles",
    bills: "https://axiom.org/bills"
  };

  // Chapters 01 / 02 — unchanged from production, included so each option
  // can be judged in the context of the full page.
  var CHAPTERS = [
    {
      num: "01", id: "ch-1",
      title: "It starts with the source",
      story: "Law, ingested and encoded — every value tied to its text.",
      status: "live",
      minis: [
        { id: "law", kicker: "Axiom App", title: "Explore the law" },
        { id: "graph", kicker: "Graph viewer", title: "Trace the logic" }
      ]
    },
    {
      num: "02", id: "ch-2",
      title: "Nothing ships on trust",
      story: "Independent engines, household by household — divergences in the open.",
      status: "live",
      minis: [
        { id: "oracles", kicker: "Oracles", title: "Validate across the ecosystem" },
        { id: "bills", kicker: "Bills", title: "Track active legislation" }
      ]
    }
  ];

  // Audience categories — who each demo is FOR. Colours are on-brand and
  // distinct: amber is the Axiom mark colour, teal + green complete the set.
  var AUDIENCES = [
    { key: "builders", label: "Builders", color: "#b45309",
      note: "Developers & partners embedding computable law." },
    { key: "ai", label: "AI labs", color: "#2f6b6f",
      note: "Grounding models in encoded, cited rules." },
    { key: "gov", label: "Government", color: "#2f6b3a",
      note: "Agencies & analysts running programs and policy." }
  ];

  // Section 03 — the demo gallery, grouped by audience so the flywheel can
  // segment cleanly. `mode`, `geo`, `badge`, `inBrowser` are the real proof
  // attributes; `audience` maps to AUDIENCES; `featured` marks the hero tile.
  var DEMOS = [
    // — Builders —
    { id: "regdemo", kicker: "Small company checker", title: "Run law in the browser",
      desc: "Companies Act 2006 s.382, computed on-device via WASM — nothing leaves the page.",
      mode: "WASM", geo: "UK", badge: "in-browser", inBrowser: true, audience: "builders" },
    { id: "builder", kicker: "Form Builder", title: "Build a form",
      desc: "Partner intake forms powered by Axiom inputs, outputs, and explanations.",
      mode: "App", geo: "—", badge: "compose", audience: "builders" },
    { id: "architecture", kicker: "Architecture", title: "Understand the stack",
      desc: "The concept registry, adapters, and engines behind every encoding.",
      mode: "Map", geo: "—", badge: "ecosystem", audience: "builders" },
    // — AI labs —
    { id: "finbot", kicker: "Chatbot", title: "Get accurate answers",
      desc: "A grounded assistant backed by encoded rules and citations.",
      mode: "App", geo: "US·UK", badge: "grounded", featured: true, audience: "ai" },
    { id: "guidance", kicker: "Guidance impact", title: "Reconcile primary sources",
      desc: "An agentic legal diff — coverage outcomes as guidance changes.",
      mode: "App", geo: "US", badge: "agentic", audience: "gov" },
    // — Government —
    { id: "workflow", kicker: "Workflow checker", title: "Check the caseworker path",
      desc: "Colorado SNAP processing rules (10 CCR 2506-1) mapped to RuleSpec.",
      mode: "App", geo: "US·CO", badge: "caseworker", audience: "gov" },
    { id: "snap", kicker: "CO SNAP cliffs", title: "Explore the cliffs",
      desc: "Reform Colorado SNAP parameters and watch cliffs and marginal rates shift live.",
      mode: "App", geo: "US·CO", badge: "validated · 0×", audience: "gov" },
    { id: "microsim", kicker: "Microsim", title: "Score at scale",
      desc: "Federal and state reforms against the Enhanced CPS — population impacts.",
      mode: "Population", geo: "US", badge: "validated · 0×", audience: "gov" }
  ];

  // Shared iframe-scaling rule. styles.css scopes the transform to
  // .mini-thumb/.gcard-thumb only, so every prototype thumb also carries
  // `pvthumb`, and we inject the transform for it once here. Per-variant
  // `--preview-scale` overrides (set on each layout's own thumb selector)
  // still win because custom props cascade to the same <iframe> element.
  (function injectPreviewCss() {
    var css = ".pvthumb iframe{--preview-scale:0.22;position:absolute;inset:0;" +
      "width:calc(100%/var(--preview-scale));height:calc(100%/var(--preview-scale));" +
      "border:0;pointer-events:none;transform:scale(var(--preview-scale));transform-origin:0 0}";
    var s = document.createElement("style");
    s.textContent = css;
    document.head.appendChild(s);
  })();

  // Build the scaled live-preview thumb used across every layout.
  function preview(id, cls) {
    return '<span class="pvthumb ' + cls + ' preview-' + id + '" aria-hidden="true">' +
      '<iframe title="' + id + ' preview" tabindex="-1" loading="lazy" src="' + DEST[id] + '"></iframe>' +
      '</span>';
  }

  function renderChapters(mount) {
    mount.innerHTML = CHAPTERS.map(function (c) {
      var minis = c.minis.map(function (m) {
        return '<a class="mini" href="' + DEST[m.id] + '" target="_blank" rel="noreferrer">' +
          preview(m.id, "mini-thumb") +
          '<span class="mini-body"><span class="mini-top"><span class="mini-kicker">' +
          m.kicker + '</span></span><span class="mini-title">' + m.title + '</span></span></a>';
      }).join("");
      return '<section class="chapter" aria-labelledby="' + c.id + '">' +
        '<div class="ch-rail"><div class="ch-marker" aria-hidden="true"><span>' + c.num + '</span></div>' +
        '<div><h2 class="ch-title" id="' + c.id + '">' + c.title + '</h2>' +
        '<p class="ch-story">' + c.story + '</p>' +
        '<p class="ch-status"><span class="dot live"></span>' + c.status + '</p></div></div>' +
        '<div class="ch-cards">' + minis + '</div></section>';
    }).join("");
  }

  global.PROTO = {
    DEST: DEST, CHAPTERS: CHAPTERS, DEMOS: DEMOS, AUDIENCES: AUDIENCES,
    preview: preview, renderChapters: renderChapters
  };
})(window);
