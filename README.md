# MORROW — Become, provisionally.

A fictional cognitive-capability network and product-launch website, built with Astro. The visual demo includes a Faculty catalogue, a simulated PULSE ledger, Brain MCP connection examples, and a removable Lattice module state.

> **Fictional concept:** MORROW, the Lattice spinal port, neural edge-compute exchange, Faculties, Brain MCP endpoint, and PULSE tokens are invented for speculative product design. No medical device, neural computation, live MCP server, enterprise connector, token settlement, or data exchange is implemented.

## Requirements

- Node.js `>=22.23.4`
- npm 10+

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Astro.

## Build

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
  data/faculties.ts      Typed Faculty catalogue data
  pages/index.astro     Static Astro launch page
public/
  images/lattice-port.webp
  images/morrow-og.webp
  robots.txt
  sitemap.xml
  llms.txt
  styles.css
  morrow.js             Small progressive interaction layer
  favicon.svg
docs/
  product-model.md
  interaction-map.md
preview.html            Dependency-free static preview
```

## Interaction model

- Faculty invocations spend PULSE from the demo balance.
- A simulated 20-minute edge lease earns PULSE based on the capacity slider.
- Removing the Lattice module makes Faculties dormant and pauses Brain MCP.
- Enterprise and local Brain MCP connection buttons update local demo state only.
- Configuration snippets use reserved `.example` hostnames and fictional local commands.

## Astro notes

The page is static-first and uses `.astro` for the main route. The interactive layer is plain browser JavaScript with no UI framework or runtime dependency. CSS and the image are served from `public/`.

## Design and implementation references

The implementation follows the static-first Astro approach and uses the relevant skill guidance discovered on skills.sh:

- [astro-best-practices](https://www.skills.sh/incluud/astro-agent-skills/astro-best-practices): `.astro` first, small interactive surface, minimal client JavaScript.
- [frontend-design](https://github.com/JetBrains/skills/blob/main/frontend-design/SKILL.md): distinctive production-oriented art direction instead of generic landing-page patterns.
- [landing-page-copywriting](https://www.skills.sh/skillatlas/skills/landing-page-copywriting): one clear narrative and action, concrete product language, no invented proof.
- [landing-page-builder-skills](https://www.skills.sh/paldom/landing-page-builder-skills): visual design system, motion restraint, UX guardrails and accessibility concerns.

The MCP connection model is informed by the official [Model Context Protocol architecture](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/specification/2026-07-28/architecture/index.mdx): a host connects to MCP servers; local stdio and remote Streamable HTTP are distinct transport patterns. MORROW's endpoint and bridge remain fictional.


## SEO and discovery

The launch page has a self-referencing canonical URL for `https://morrow-cognitive-network.vercel.app/`, an intent-matched title and meta description, index/follow directives, Open Graph and Twitter large-image metadata, and JSON-LD for the fictional publisher, website and webpage. It deliberately does not add Product, Offer, Review or FAQ markup because MORROW is not a real purchasable or functioning product.

Crawler resources:

- `/robots.txt` permits public crawling and points to the sitemap.
- `/sitemap.xml` lists the canonical root page only; section anchors are not separate pages.
- `/llms.txt` summarises the fictional system and its limitations for AI discovery.
- `images/morrow-og.webp` is the 1200 × 630 social preview graphic.

The SEO skill applied was [addyosmani/web-quality-skills / seo](https://www.skills.sh/addyosmani/web-quality-skills/seo). This implementation covers source-level technical SEO. Search Console submission, indexing and ranking remain external follow-up tasks; no ranking outcome is claimed.
