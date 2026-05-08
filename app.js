(function () {
  "use strict";

  var destinations = {
    law: "https://app.axiom-foundation.org/",
    finbot: "https://finbot-snap-demo.vercel.app/",
    builder: "https://dashboard-builder-flax.vercel.app/"
  };

  Array.prototype.slice.call(document.querySelectorAll("[data-demo-link]")).forEach(function (link) {
    link.href = destinations[link.dataset.demoLink];
  });
})();
