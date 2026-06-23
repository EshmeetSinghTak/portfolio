# Portfolio Website — Design Spec

**Date:** 2026-06-23
**Location:** `D:\my projects\portfolio`
**Status:** Approved design, ready for implementation planning

## Goals

1. **Job/internship hunting** — a clean, professional site recruiters can land on to quickly see who I am, my skills, my projects, my resume, and how to contact me.
2. **Learning exercise** — build it in the real, in-demand stack (React/Next.js + TypeScript + Tailwind) so the project itself levels up my web-dev skills.

Both goals must be served at once: the site must look polished *and* be built from scratch in a resume-worthy stack (no template/site-builder).

## Tech Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router) + React** | In-demand, file-based routing, great SEO |
| Language | **TypeScript** | Employer-expected; catches data-entry mistakes early |
| Styling | **Tailwind CSS** | Fast to build, common in job listings |
| Rendering | **Static Site Generation (SSG)** | Fast, free to host, ranks well on Google |
| Hosting | **Vercel** (free tier) | Connects to GitHub, auto-deploys on push |
| Source control | **Git + GitHub** | Required for Vercel; also a portfolio artifact itself |

Deploy flow: **push to GitHub → Vercel rebuilds → live site updates.**

## Core Requirement: Easy to Add Future Projects

Adding a future project must require editing **one place only** — no layout/component code touched.

### Data model

All projects live in a single typed data file, `data/projects.ts`, as an array of objects:

```ts
export type Project = {
  slug: string;          // URL segment: /projects/<slug>
  title: string;
  summary: string;       // one line, shown on the timeline card
  date: string;          // "YYYY-MM" — used to SORT the journey timeline
  tags: string[];        // tech keywords, shown as chips
  liveUrl?: string;      // hosted project link (optional)
  githubUrl?: string;    // repo link (optional)
  image?: string;        // /public path to a thumbnail (optional)

  // --- shown on the detail page when a card is clicked ---
  overview?: string;     // longer paragraph(s)
  features?: string[];   // bullet list of highlights
  screenshots?: string[];// /public paths to screenshots
};
```

**To add a project:** append one object to the array. A card appears on the homepage timeline **and** its detail page at `/projects/<slug>` is generated automatically. Projects sort by `date`, so new entries slot into the journey on their own.

We deliberately use a single typed data file rather than per-project MDX files (YAGNI — no case-study authoring system needed for "cards with links + a detail page"). TypeScript autocompletes and error-checks each entry.

## Pages & Routing

### Homepage (`/`) — single-scroll, anchor-linked

1. **Hero** — name, one-line "who I am / what I'm looking for," quick links (GitHub, LinkedIn, email), Resume download button.
2. **About** — short bio: background, what I'm studying, target role.
3. **Skills** — languages/tools as tag chips.
4. **Projects — the "Journey"** — a **horizontal timeline** (see below), cards sorted earliest → most recent. Each card links to its detail page.
5. **Contact** — email + social links.

### Project detail (`/projects/[slug]`)

Dynamic route, statically generated per project from `data/projects.ts`. Shows the full details: title, date, overview, features, tags, live/GitHub links, screenshots.

### Global

- **Navbar** — anchor links (About, Skills, Projects, Contact) + Resume button.
- **Footer** — social links.
- **Responsive** — must look right on phone and desktop.
- **Resume** — `public/resume.pdf`, served directly at `/resume.pdf`, linked from hero + navbar.

## The "Journey" Timeline (Projects section)

- **Layout: horizontal path** — projects laid out left → right along a timeline "road," scrolled horizontally on desktop with smooth scroll-snap.
- **Mobile:** collapses to a vertical stack (horizontal scroll is awkward on phones).
- Each step shows a date marker + project card (title, summary, tags); clicking opens the detail page.
- Sorted automatically by the `date` field; future projects appear in order with no manual placement.

## Visual Direction

**Dark & techy.**

- Deep navy background (~`#0c0e14`), light text.
- **Violet → purple gradient accent** (~`#6f7afd` → `#a855f7`) on the name, primary buttons, timeline dots/line, and date markers.
- Modern, bold sans-serif; generous spacing; subtle glow/shadow on accent elements.
- Signals "modern AI/dev" at a glance — fits the SARTHI / AI-product story.

(Exact palette tuned during the build.)

## Initial Content

- **Projects:** SARTHI (AI study-abroad agent platform, Apr 2026), Highlights Generator (Jun 2026), + future projects.
- **About / Skills / Resume / Contact:** real content supplied during the build.

## Quality & Testing (intentionally light — static portfolio)

- TypeScript catches project-data mistakes at edit time.
- Verify the site **builds cleanly** (`next build`) and **looks right in the browser** (desktop + mobile widths) before deploying.
- No automated test suite — that would be over-engineering for a static portfolio.

## Component Boundaries (for the implementation plan)

Each unit has one clear purpose and a well-defined interface:

- `data/projects.ts` — the single source of project truth (data only, no UI).
- `components/Navbar`, `components/Footer` — global chrome.
- `components/Hero`, `components/About`, `components/Skills`, `components/Contact` — homepage sections.
- `components/JourneyTimeline` — renders the sorted horizontal timeline from project data.
- `components/ProjectCard` — a single timeline card (used by the timeline).
- `app/page.tsx` — composes the homepage sections.
- `app/projects/[slug]/page.tsx` — the detail page template (reads one project by slug).
- `lib/projects.ts` (optional helper) — `getAllProjects()` (sorted), `getProjectBySlug()`.

## Out of Scope (YAGNI for v1)

- CMS / database — flat typed file is enough.
- Blog — can be added later.
- Contact form backend — start with mailto/social links; add a form later if wanted.
- Per-project MDX case studies — the data file's `overview`/`features` cover the detail page.
- Automated tests, analytics, i18n.
