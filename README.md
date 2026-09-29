# Axiom Demo Shell

This repository is a planning and eventual implementation home for a unified
Axiom demo experience.

## Current Implementation

One surface: the gallery (`index.html`). The Journey page was removed in
`cddc469`.

The gallery shows every Axiom demo on one screen as a scaled live preview,
grouped into four rows by use case (`USECASES` in `index.html`):

- **Build government systems on the law** — Workflow checker, Guidance impact
- **Ground AI models in citable law** — Chatbot
- **Power products on rules you don't rebuild** — Form Builder
- **Simulate policy on real rules** — Benefits cliff explorer (Colorado SNAP), Microsim

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
| chatbot      | Chatbot               | https://axiom.org/chatbot           |
| regdemo      | Small company checker | https://axiom.org/reg-demo          |
| builder      | Form Builder          | https://axiom.org/builder           |
| workflow     | Workflow checker      | https://axiom.org/workflow          |
| snap         | CO SNAP cliffs        | https://axiom.org/snap              |
| microsim     | Microsim              | https://axiom.org/microsim          |
| guidance     | Guidance impact       | https://axiom.org/guidance          |
| architecture | Architecture          | https://axiom.org/architecture      |
| law          | Axiom App             | https://app.axiom-foundation.org/   |
| graph        | Graph viewer          | https://axiom.org/graph-viewer      |
| oracles      | Oracles               | https://axiom.org/oracles           |
| bills        | Bills                 | https://axiom.org/bills             |

The chatbot's old id, `finbot`, still resolves: `index.html` maps `?d=finbot`
to `chatbot` (`LEGACY_IDS`).

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

The chatbot demo shows one way to ground a model in encoded rules. An OpenAI
model answers household benefit and tax questions with tool access to the Axiom
rules engine. Its system prompt tells it to take every amount from the engine
rather than from memory, and a reply links the legal source for outputs that
carry one. Its answers are estimates. It covers US programs from one pinned
rulespec-us release (see `artifacts.lock.json` in finbot-snap-demo), and the
rule authors flag many of those programs' headline outputs as incomplete.

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
  - Chatbot demo (US benefits and taxes)
  - Dashboard Builder
- Shared framing copy around source, reasoning, and application layers.

Implementation should stay thin until the shared API and product boundaries are
clear.
