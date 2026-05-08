# Axiom Demo Shell

This repository is a planning and eventual implementation home for a unified
Axiom demo experience.

## Current Implementation

The repository now contains a dependency-free static page for sharing one demo
link instead of three separate links.

It provides:

- A simple Axiom-styled landing page.
- Three destination cards:
  - Axiom App
  - FinBot
  - Dashboards
- Embedded previews of each destination.
- Fixed outbound links for the deployed public page.

Run it locally with:

```bash
npm start
```

Then open `http://localhost:4173`.

If an external product refuses to render in an iframe because of its frame
policy, the outbound link still works.

Default destinations:

- Axiom App: `https://app.axiom-foundation.org/`
- FinBot: `https://finbot-snap-demo.vercel.app/`
- Dashboards: `https://dashboard-builder-flax.vercel.app/`

The goal is not to collapse every Axiom demo into one product too early. The
goal is to tell one coherent story across three related surfaces:

1. **Axiom App**: the canonical source and RuleSpec inspection layer.
2. **FinBot Demo**: a grounded assistant experience powered by cited,
   encoded rules.
3. **Dashboard Builder**: a composable application layer for partners who want
   to build tools from Axiom inputs and outputs.

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
axiom-corpus + rules-* + axiom-rules + axiom-encode
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
