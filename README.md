# Axiom Demo Shell

This repository is a planning and eventual implementation home for a unified
Axiom demo experience.

## Current Implementation

Two surfaces, linked by fixed tabs in the top-right corner:

- **Gallery** (`index.html`, the default) — every demo live on one screen.
- **Journey** (`journey.html`) — the guided story page: hero, chapters 01/02
  (Infrastructure, Validation), and the demo carousel.

The gallery: a live demo gallery on one screen. Every Axiom demo renders as a
scaled live preview, grouped into four rows by the job it proves:

- **Build government systems on the law** — Workflow checker, Form Builder, Bills
- **Ground AI models in citable law** — FinBot, Guidance impact
- **Power products on rules you don't rebuild** — Small company checker, Oracles
- **Simulate policy on real rules** — CO SNAP cliffs, Microsim

Clicking a tile expands the demo into a large in-page pop-up with the live,
fully interactive app (deep-linkable via `?d=<id>`, browser-back closes,
arrow keys navigate). ⌘-click opens the standalone app in a new tab.

Run it locally with:

```bash
npm start
```

Then open `http://localhost:4173`.

If an external product refuses to render in an iframe because of its frame
policy, the standalone link still works.

Destinations live in `data.js`; analytics (GA4 → Axiom CRM, `tool_name`
attribution) in `analytics.js`.

## Demo URL registry (canonical)

All Axiom demos are served under `https://axiom.org/<slug>` via reverse-proxy
rewrites on the main site. This table is the canonical registry; `data.js`
mirrors it. The old `*.vercel.app` URLs remain live and redirect to the
`axiom.org` paths.

| id           | Demo                  | Canonical URL                       |
| ------------ | --------------------- | ----------------------------------- |
| (shell)      | Demo gallery          | https://axiom.org/demos             |
| finbot       | Chatbot               | https://axiom.org/gallery/chatbot           |
| regdemo      | Small company checker | https://axiom.org/gallery/reg-demo          |
| builder      | Form Builder          | https://axiom.org/gallery/builder           |
| workflow     | Workflow checker      | https://axiom.org/gallery/workflow          |
| snap         | CO SNAP cliffs        | https://axiom.org/gallery/snap              |
| microsim     | Microsim              | https://axiom.org/gallery/microsim          |
| guidance     | Guidance impact       | https://axiom.org/gallery/guidance          |
| architecture | Architecture          | https://axiom.org/architecture      |
| law          | Axiom App             | https://app.axiom-foundation.org/   |
| graph        | Graph viewer          | https://axiom.org/graph-viewer      |
| oracles      | Oracles               | https://axiom.org/oracles           |
| bills        | Bills                 | https://axiom.org/bills             |

## Story

Axiom turns law into trusted computational infrastructure.

The demo should show the path from source law to applied products:

```text
Source text
  -> structured corpus
  -> RuleSpec encodings
  -> determinations and explanations
  -> partner applications
```

Each existing surface proves a different part of that chain.

### Explore The Law

The Axiom App proves trust.

It lets a user inspect statutes, regulations, guidance, source paths, citations,
RuleSpec encodings, references, and provenance. This is the canonical legal
source layer.

### Ask A Household Question

The FinBot demo proves grounded reasoning.

It shows how a conversational assistant can answer household-level questions
without drifting away from auditable rules, source citations, and explicit
uncertainty.

### Build A Tool

The Dashboard Builder proves distribution.

It shows how partners can compose useful dashboards or workflows from Axiom
programs, inputs, outputs, and explanations without rebuilding legal logic from
scratch.

## Architectural Principle

Keep the apps distinct, unify the substrate.

Near term, the demo shell should orchestrate existing surfaces rather than
merge their codebases. Axiom should become one platform through shared APIs,
schemas, provenance conventions, and design language.

```text
axiom-corpus + rulespec-* + axiom-rules-engine + axiom-encode
                  |
              Axiom API / SDK
                  |
    --------------------------------
    |              |               |
Axiom App      FinBot Demo   Dashboard Builder
    \              |               /
        Unified demo shell
```

## Architectural Questions

Use this repository to make decisions about:

- What belongs in the canonical Axiom app versus a demo-specific shell.
- Whether the shell embeds existing demos, links between them, or imports shared
  components directly.
- What shared API endpoints FinBot and Dashboard Builder should consume.
- What input/output schema should be common across RuleSpec, assistant flows,
  and dashboard generation.
- How provenance, citation links, confidence, and uncertainty should appear
  consistently across all surfaces.
- What should live in a shared design system versus each product repo.
- When this repository should graduate from story shell to real product.

## Non-Goals

- Do not duplicate source law or RuleSpec logic here.
- Do not create a second legal interpretation layer for FinBot or dashboards.
- Do not merge repos purely for demo polish.
- Do not hide provenance to make demos simpler.

## Initial Product Shape

The first useful version can be lightweight:

- A landing page with the unified story.
- A guided three-step demo flow.
- Deep links or embedded views for:
  - Axiom App
  - FinBot SNAP demo
  - Dashboard Builder
- Shared framing copy around source, reasoning, and application layers.

Implementation should stay thin until the shared API and product boundaries are
clear.
