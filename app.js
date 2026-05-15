(function () {
  "use strict";

  var deployedDestinations = {
    law: "https://app.axiom-foundation.org/",
    finbot: "https://finbot-snap-demo.vercel.app/",
    builder: "https://dashboard-builder-flax.vercel.app/",
    snap: "https://axiom-co-snap.vercel.app/",
    graph: "https://rulespec-graph-viewer.vercel.app/",
    microsim: "https://axiom-microsim.vercel.app/"
  };

  var localDestinations = {
    law: "http://127.0.0.1:3000/",
    finbot: "http://127.0.0.1:3001/",
    builder: "http://127.0.0.1:5173/",
    snap: "http://127.0.0.1:3002/",
    graph: "http://127.0.0.1:5175/",
    microsim: "http://127.0.0.1:3003/"
  };

  var localHosts = ["localhost", "127.0.0.1", "::1"];
  var destinations =
    localHosts.indexOf(window.location.hostname) === -1
      ? deployedDestinations
      : localDestinations;

  Array.prototype.slice.call(document.querySelectorAll("[data-demo-link]")).forEach(function (link) {
    link.href = destinations[link.dataset.demoLink];
  });

  Array.prototype.slice.call(document.querySelectorAll("[data-demo-preview]")).forEach(function (frame) {
    frame.src = destinations[frame.dataset.demoPreview];
  });
})();
