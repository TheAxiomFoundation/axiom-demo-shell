(function () {
  "use strict";

  var deployedDestinations = {
    // Infrastructure
    architecture: "https://axiom-architecture-one.vercel.app/",
    law: "https://app.axiom-foundation.org/",
    graph: "https://rulespec-graph-viewer.vercel.app/",
    // Validation
    oracles: "https://axiom-oracles.vercel.app/",
    guidance: "https://guidance-impact-visualizer.vercel.app/",
    bills: "https://axiom-bills.vercel.app/",
    // Application
    finbot: "https://finbot-snap-demo.vercel.app/",
    builder: "https://dashboard-builder-flax.vercel.app/",
    snap: "https://axiom-co-snap.vercel.app/",
    microsim: "https://axiom-microsim.vercel.app/"
  };

  var localDestinations = {
    // Infrastructure
    architecture: "http://127.0.0.1:5179/",
    law: "http://127.0.0.1:3000/",
    graph: "http://127.0.0.1:5175/",
    // Validation
    oracles: "http://127.0.0.1:5176/",
    guidance: "http://127.0.0.1:5177/",
    bills: "http://127.0.0.1:5178/",
    // Application
    finbot: "http://127.0.0.1:3001/",
    builder: "http://127.0.0.1:5173/",
    snap: "http://127.0.0.1:3002/",
    microsim: "http://127.0.0.1:3003/"
  };

  var localHosts = ["localhost", "127.0.0.1", "::1"];
  var destinations =
    localHosts.indexOf(window.location.hostname) === -1
      ? deployedDestinations
      : localDestinations;

  // Outbound buttons follow the local/deployed switch so you can click through
  // to local dev servers when developing alongside them.
  Array.prototype.slice.call(document.querySelectorAll("[data-demo-link]")).forEach(function (link) {
    link.href = destinations[link.dataset.demoLink];
  });

  // Previews always point at the deployed apps — local dev ports are usually
  // not all running, which would leave the preview frames blank.
  Array.prototype.slice.call(document.querySelectorAll("[data-demo-preview]")).forEach(function (frame) {
    frame.src = deployedDestinations[frame.dataset.demoPreview];
  });
})();
