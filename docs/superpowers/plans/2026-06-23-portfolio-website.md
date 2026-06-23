# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark, modern Next.js portfolio website where projects render as a horizontal "journey" timeline and a new project can be added by appending one object to a single data file.

**Architecture:** Next.js (App Router) statically generates a single-scroll homepage (Hero · About · Skills · Journey · Contact) plus one dynamic project-detail route. All project content lives in a single typed data file (`data/projects.ts`); a small helper module (`lib/projects.ts`) sorts and looks them up. Styling is Tailwind CSS with a dark-navy / violet-gradient theme.

**Tech Stack:** Next.js (App Router) + React + TypeScript + Tailwind CSS, statically generated, deployed on Vercel.

## Global Constraints

- **Language:** TypeScript everywhere (`.ts` / `.tsx`). No plain `.js` source files.
- **Styling:** Tailwind CSS utility classes only — no separate CSS modules except the single global stylesheet.
- **Rendering:** Static Site Generation. No server-only data fetching, no database, no API routes.
- **Add-a-project rule:** Adding a project MUST require editing only `data/projects.ts`. No task may hardcode an individual project anywhere else.
- **Visual direction:** Dark & techy. Background deep navy `#0c0e14`; accent gradient violet→purple `#6f7afd → #a855f7`; light text. Applied to name, primary buttons, timeline line/dots, and date markers.
- **Project location:** `D:\my projects\portfolio` (already a git repo with `docs/` and `.gitignore` committed).
- **Verification model:** No automated test framework (per spec). Each task is verified by `npm run build` succeeding and/or visual inspection in the browser at a stated URL.
- **Commits:** Commit at the end of every task. End commit messages with the standard co-author trailer.

---

## File Structure

```
portfolio/
├─ app/
│  ├─ layout.tsx                 # root layout: fonts, <Navbar/>, <Footer/>, metadata
│  ├─ globals.css                # Tailwind directives + theme tokens
│  ├─ page.tsx                   # homepage: composes the 5 sections
│  └─ projects/
│     └─ [slug]/
│        └─ page.tsx             # project detail template + generateStaticParams
├─ components/
│  ├─ Navbar.tsx
│  ├─ Footer.tsx
│  ├─ Hero.tsx
│  ├─ About.tsx
│  ├─ Skills.tsx
│  ├─ Contact.tsx
│  ├─ ProjectCard.tsx            # one timeline card
│  └─ JourneyTimeline.tsx        # horizontal timeline of ProjectCards
├─ data/
│  ├─ projects.ts                # Project type + the array of projects (single source of truth)
│  └─ profile.ts                 # name, bio, skills, social links (single source for personal info)
├─ lib/
│  └─ projects.ts                # getAllProjects() (sorted), getProjectBySlug()
├─ public/
│  ├─ resume.pdf                 # placeholder, replaced with real resume
│  └─ projects/                  # project images/screenshots
├─ tailwind.config.ts
└─ (Next.js scaffold files: package.json, tsconfig.json, next.config.*, postcss.config.*)
```

---

## Task 1: Scaffold the Next.js project

The project folder already contains `docs/`, `.gitignore`, `.git/`, and `.superpowers/`, so `create-next-app` cannot target it directly (it refuses a non-empty dir). Scaffold into a temp subfolder and move the generated files up.

**Files:**
- Create: all Next.js scaffold files (`package.json`, `tsconfig.json`, `app/`, `tailwind.config.ts`, etc.)

**Interfaces:**
- Produces: a runnable Next.js + TypeScript + Tailwind app with `npm run dev` and `npm run build` scripts.

- [ ] **Step 1: Scaffold into a temp folder**

Run from `D:\my projects\portfolio`:
```bash
npx create-next-app@latest _scaffold --ts --tailwind --app --eslint --src-dir=false --import-alias "@/*" --no-turbopack --use-npm
```
Answer any remaining interactive prompts with the defaults shown. Expected: a new `_scaffold/` folder containing a complete Next.js app.

- [ ] **Step 2: Move scaffold contents up one level and remove the temp folder**

```bash
cd "/d/my projects/portfolio"
# move regular + hidden files except . and ..
shopt -s dotglob
mv _scaffold/* .
rmdir _scaffold
shopt -u dotglob
```
If `mv` reports `.gitignore` already exists, keep ours: open the Next-generated `.gitignore` content and ensure these lines are present in our existing `.gitignore`: `node_modules/`, `.next/`, `.env*.local`. (Our `.gitignore` already has them, so you can discard the scaffold's copy.)

- [ ] **Step 3: Install dependencies (if not already installed by create-next-app)**

```bash
npm install
```
Expected: `node_modules/` populated, no errors.

- [ ] **Step 4: Verify the dev server runs**

```bash
npm run dev
```
Open `http://localhost:3000`. Expected: the default Next.js welcome page renders. Stop the server (Ctrl+C).

- [ ] **Step 5: Verify a production build succeeds**

```bash
npm run build
```
Expected: build completes with "Compiled successfully" and a route list including `/`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js + TypeScript + Tailwind app"
```

---

## Task 2: Theme tokens and global styles

Establish the dark-navy / violet-gradient design system once, so every later component just uses these tokens/utility classes.

**Files:**
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`

**Interfaces:**
- Produces: Tailwind theme colors `bg` (`#0c0e14`), `surface` (`#141925`), `border` (`#232a3a`), `accent` (`#6f7afd`), `accent2` (`#a855f7`), `muted` (`#9aa3b2`); a reusable `.text-gradient` and `.btn-gradient` utility class; dark background applied to `<body>`.

- [ ] **Step 1: Define theme colors in `tailwind.config.ts`**

Replace the `theme.extend` block:
```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0c0e14",
        surface: "#141925",
        border: "#232a3a",
        accent: "#6f7afd",
        accent2: "#a855f7",
        muted: "#9aa3b2",
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 2: Replace `app/globals.css` with theme base + helper classes**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

body {
  @apply bg-bg text-gray-100 antialiased;
}

@layer components {
  .text-gradient {
    @apply bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent;
  }
  .btn-gradient {
    @apply inline-block rounded-lg bg-gradient-to-r from-accent to-accent2 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90;
  }
  .chip {
    @apply inline-block rounded-full bg-surface border border-border px-2.5 py-1 text-xs text-accent;
  }
  .section {
    @apply mx-auto max-w-5xl px-6 py-20;
  }
}
```

- [ ] **Step 3: Verify the theme applies**

Add a temporary line to `app/page.tsx` (replace its contents):
```tsx
export default function Home() {
  return <h1 className="section text-4xl font-bold text-gradient">Theme check</h1>;
}
```
Run `npm run dev`, open `http://localhost:3000`. Expected: dark navy background with a violet→purple gradient "Theme check" heading. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css tailwind.config.ts app/page.tsx
git commit -m "feat: add dark navy + violet gradient theme tokens"
```

---

## Task 3: Project & profile data model + helpers

The single source of truth. This is the file the user edits to add projects.

**Files:**
- Create: `data/projects.ts`
- Create: `data/profile.ts`
- Create: `lib/projects.ts`

**Interfaces:**
- Produces:
  - `type Project = { slug: string; title: string; summary: string; date: string; tags: string[]; liveUrl?: string; githubUrl?: string; image?: string; overview?: string; features?: string[]; screenshots?: string[]; }`
  - `projects: Project[]` (exported from `data/projects.ts`)
  - `type Profile = { name: string; tagline: string; about: string; skills: string[]; email: string; github: string; linkedin: string; }` and `profile: Profile` (from `data/profile.ts`)
  - `getAllProjects(): Project[]` — returns projects sorted **most recent first** by `date`
  - `getProjectBySlug(slug: string): Project | undefined`

- [ ] **Step 1: Create `data/projects.ts`**

```ts
export type Project = {
  slug: string;          // URL segment: /projects/<slug>
  title: string;
  summary: string;       // one line, shown on the timeline card
  date: string;          // "YYYY-MM" — used to sort the journey
  tags: string[];        // tech keywords -> chips
  liveUrl?: string;
  githubUrl?: string;
  image?: string;        // /public path to a thumbnail
  overview?: string;     // longer paragraph(s) for the detail page
  features?: string[];   // bullet highlights for the detail page
  screenshots?: string[];// /public paths
};

export const projects: Project[] = [
  {
    slug: "sarthi",
    title: "SARTHI",
    summary: "AI study-abroad agent platform.",
    date: "2026-04",
    tags: ["Next.js", "AI", "Python"],
    liveUrl: "",
    githubUrl: "",
    image: "/projects/sarthi.png",
    overview:
      "SARTHI is an AI agent platform that guides students through the study-abroad process — from university matching to document checklists.",
    features: [
      "Personalized university matching",
      "Document checklist and deadline tracking",
      "Conversational AI guidance",
    ],
    screenshots: [],
  },
  {
    slug: "highlights-generator",
    title: "Highlights Generator",
    summary: "Auto-clips highlight reels from long videos.",
    date: "2026-06",
    tags: ["Python", "FFmpeg"],
    liveUrl: "",
    githubUrl: "",
    image: "/projects/highlights.png",
    overview:
      "A tool that analyzes long-form video and automatically produces a short highlight reel.",
    features: ["Automatic scene detection", "One-command export"],
    screenshots: [],
  },
];
```

- [ ] **Step 2: Create `data/profile.ts`**

```ts
export type Profile = {
  name: string;
  tagline: string;
  about: string;
  skills: string[];
  email: string;
  github: string;
  linkedin: string;
};

export const profile: Profile = {
  name: "Your Name",
  tagline: "CS student building AI products. Looking for SWE internships.",
  about:
    "Short bio goes here — your background, what you're studying, and the kind of role you're looking for.",
  skills: ["TypeScript", "React", "Next.js", "Python", "Tailwind CSS", "Git"],
  email: "puneangelsnetwork31@gmail.com",
  github: "https://github.com/your-username",
  linkedin: "https://linkedin.com/in/your-handle",
};
```

- [ ] **Step 3: Create `lib/projects.ts`**

```ts
import { projects, type Project } from "@/data/projects";

export function getAllProjects(): Project[] {
  // most recent first (descending by "YYYY-MM" string, which sorts correctly)
  return [...projects].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
```

- [ ] **Step 4: Verify it type-checks / builds**

```bash
npm run build
```
Expected: build succeeds (no type errors). The temporary `page.tsx` from Task 2 still renders.

- [ ] **Step 5: Commit**

```bash
git add data/ lib/
git commit -m "feat: add project + profile data model and helpers"
```

---

## Task 4: Root layout with Navbar and Footer

**Files:**
- Modify: `app/layout.tsx`
- Create: `components/Navbar.tsx`
- Create: `components/Footer.tsx`

**Interfaces:**
- Consumes: `profile` from `@/data/profile`.
- Produces: `<Navbar/>` and `<Footer/>` rendered on every page via the root layout; site `<title>`/metadata set.

- [ ] **Step 1: Create `components/Navbar.tsx`**

```tsx
import { profile } from "@/data/profile";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-bold text-gradient">
          {profile.name}
        </a>
        <div className="flex items-center gap-5 text-sm text-muted">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hidden hover:text-white sm:inline">
              {l.label}
            </a>
          ))}
          <a href="/resume.pdf" target="_blank" className="btn-gradient !px-4 !py-2">
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Create `components/Footer.tsx`**

```tsx
import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-8 text-sm text-muted">
        <span>© {profile.name}</span>
        <div className="flex gap-4">
          <a href={profile.github} target="_blank" className="hover:text-white">GitHub</a>
          <a href={profile.linkedin} target="_blank" className="hover:text-white">LinkedIn</a>
          <a href={`mailto:${profile.email}`} className="hover:text-white">Email</a>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `${profile.name} — Portfolio`,
  description: profile.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body id="top">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify**

`npm run dev`, open `http://localhost:3000`. Expected: sticky navbar with your name (gradient) + nav links + Resume button at top; footer with social links at bottom; the temporary "Theme check" heading between them. Stop the server.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx components/Navbar.tsx components/Footer.tsx
git commit -m "feat: add root layout with navbar and footer"
```

---

## Task 5: Hero section

**Files:**
- Create: `components/Hero.tsx`

**Interfaces:**
- Consumes: `profile` from `@/data/profile`.
- Produces: `<Hero/>` — default export, no props.

- [ ] **Step 1: Create `components/Hero.tsx`**

```tsx
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section className="section pt-28 text-center sm:text-left">
      <p className="mb-3 text-sm uppercase tracking-widest text-muted">Portfolio</p>
      <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">
        Hi, I&apos;m <span className="text-gradient">{profile.name}</span>
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted">{profile.tagline}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
        <a href="#projects" className="btn-gradient">View my journey</a>
        <a href="/resume.pdf" target="_blank" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold hover:bg-surface">
          Download Resume
        </a>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-muted sm:justify-start">
        <a href={profile.github} target="_blank" className="hover:text-white">GitHub</a>
        <a href={profile.linkedin} target="_blank" className="hover:text-white">LinkedIn</a>
        <a href={`mailto:${profile.email}`} className="hover:text-white">Email</a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Temporarily render it** — replace `app/page.tsx`:
```tsx
import Hero from "@/components/Hero";
export default function Home() {
  return <Hero />;
}
```

- [ ] **Step 3: Verify** — `npm run dev`, open `http://localhost:3000`. Expected: large hero with gradient name, tagline, two buttons, social links. Stop the server.

- [ ] **Step 4: Commit**
```bash
git add components/Hero.tsx app/page.tsx
git commit -m "feat: add hero section"
```

---

## Task 6: About and Skills sections

**Files:**
- Create: `components/About.tsx`
- Create: `components/Skills.tsx`

**Interfaces:**
- Consumes: `profile` from `@/data/profile`.
- Produces: `<About/>` and `<Skills/>` — default exports, no props. Each wraps content in a `<section id="about">` / `<section id="skills">` so navbar anchors work.

- [ ] **Step 1: Create `components/About.tsx`**

```tsx
import { profile } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="section">
      <h2 className="text-3xl font-bold">About</h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{profile.about}</p>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/Skills.tsx`**

```tsx
import { profile } from "@/data/profile";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <h2 className="text-3xl font-bold">Skills</h2>
      <div className="mt-5 flex flex-wrap gap-2.5">
        {profile.skills.map((s) => (
          <span key={s} className="chip">{s}</span>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify via build** — `npm run build`. Expected: build succeeds. (Full visual check happens in Task 10 when the homepage is composed.)

- [ ] **Step 4: Commit**
```bash
git add components/About.tsx components/Skills.tsx
git commit -m "feat: add about and skills sections"
```

---

## Task 7: ProjectCard component

A single card used inside the timeline. Links to the detail page.

**Files:**
- Create: `components/ProjectCard.tsx`

**Interfaces:**
- Consumes: `type Project` from `@/data/projects`.
- Produces: `<ProjectCard project={p} />` — props: `{ project: Project }`. Renders an anchor to `/projects/${project.slug}`.

- [ ] **Step 1: Create `components/ProjectCard.tsx`**

```tsx
import Link from "next/link";
import type { Project } from "@/data/projects";

function formatDate(date: string) {
  // "2026-04" -> "Apr 2026"
  const [y, m] = date.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[Number(m) - 1]} ${y}`;
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block w-72 shrink-0 rounded-xl border border-border bg-surface p-5 transition hover:-translate-y-1 hover:border-accent"
    >
      <span className="text-xs font-bold text-accent">{formatDate(project.date)}</span>
      <h3 className="mt-1 text-lg font-semibold text-white">{project.title}</h3>
      <p className="mt-1 text-sm text-muted">{project.summary}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <span key={t} className="chip">{t}</span>
        ))}
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Verify via build** — `npm run build`. Expected: succeeds.

- [ ] **Step 3: Commit**
```bash
git add components/ProjectCard.tsx
git commit -m "feat: add project card component"
```

---

## Task 8: JourneyTimeline (horizontal, responsive)

The signature feature: a horizontal scrolling timeline of project cards, earliest → most recent. Collapses to a vertical stack on mobile.

**Files:**
- Create: `components/JourneyTimeline.tsx`

**Interfaces:**
- Consumes: `getAllProjects` from `@/lib/projects`, `<ProjectCard/>`.
- Produces: `<JourneyTimeline/>` — default export, no props. Wrapped in `<section id="projects">`.

Note: `getAllProjects()` returns most-recent-first; the journey reads earliest → most recent, so reverse it for display.

- [ ] **Step 1: Create `components/JourneyTimeline.tsx`**

```tsx
import { getAllProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

export default function JourneyTimeline() {
  const projects = [...getAllProjects()].reverse(); // earliest -> most recent

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-3xl font-bold">My Journey</h2>
      <p className="mt-2 text-muted">From my first build to my most recent.</p>

      {/* horizontal on desktop, vertical stack on mobile */}
      <div className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4
                      max-sm:flex-col max-sm:overflow-visible">
        {projects.map((p, i) => (
          <div key={p.slug} className="relative snap-start max-sm:pl-6">
            {/* connector dot */}
            <span className="absolute -top-4 left-2 h-3 w-3 rounded-full bg-gradient-to-r from-accent to-accent2
                             max-sm:left-0 max-sm:top-2" />
            {/* connector line (desktop) */}
            {i < projects.length - 1 && (
              <span className="absolute -top-[10px] left-5 hidden h-0.5 w-[calc(100%+1.5rem)] bg-border sm:block" />
            )}
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify via build** — `npm run build`. Expected: succeeds. (Visual + scroll check in Task 10.)

- [ ] **Step 3: Commit**
```bash
git add components/JourneyTimeline.tsx
git commit -m "feat: add horizontal journey timeline"
```

---

## Task 9: Contact section

**Files:**
- Create: `components/Contact.tsx`

**Interfaces:**
- Consumes: `profile` from `@/data/profile`.
- Produces: `<Contact/>` — default export, no props. Wrapped in `<section id="contact">`.

- [ ] **Step 1: Create `components/Contact.tsx`**

```tsx
import { profile } from "@/data/profile";

export default function Contact() {
  return (
    <section id="contact" className="section text-center">
      <h2 className="text-3xl font-bold">Get in touch</h2>
      <p className="mx-auto mt-3 max-w-md text-muted">
        Open to internships and collaboration. The fastest way to reach me is email.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a href={`mailto:${profile.email}`} className="btn-gradient">Email me</a>
        <a href={profile.github} target="_blank" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold hover:bg-surface">GitHub</a>
        <a href={profile.linkedin} target="_blank" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold hover:bg-surface">LinkedIn</a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify via build** — `npm run build`. Expected: succeeds.

- [ ] **Step 3: Commit**
```bash
git add components/Contact.tsx
git commit -m "feat: add contact section"
```

---

## Task 10: Compose the homepage

Assemble all five sections in order. This is the first full visual check of the homepage.

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `<Hero/>`, `<About/>`, `<Skills/>`, `<JourneyTimeline/>`, `<Contact/>`.

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import JourneyTimeline from "@/components/JourneyTimeline";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <JourneyTimeline />
      <Contact />
    </>
  );
}
```

- [ ] **Step 2: Verify the full homepage** — `npm run dev`, open `http://localhost:3000`.
Expected:
  - Hero → About → Skills → Journey → Contact in order.
  - Navbar links (About/Skills/Projects/Contact) scroll to the right sections.
  - Journey shows two cards (SARTHI on the left/earliest, Highlights Generator to its right) with a connector line and gradient dots; it scrolls horizontally if the window is narrow.
  - Resize the window narrow (or device toolbar mobile): the timeline stacks vertically.
Stop the server.

- [ ] **Step 3: Commit**
```bash
git add app/page.tsx
git commit -m "feat: compose homepage from all sections"
```

---

## Task 11: Project detail page

Dynamic, statically generated route. Clicking any timeline card lands here.

**Files:**
- Create: `app/projects/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getAllProjects`, `getProjectBySlug` from `@/lib/projects`.
- Produces: a static page per project slug via `generateStaticParams`; calls `notFound()` for unknown slugs.

- [ ] **Step 1: Create `app/projects/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="section">
      <Link href="/#projects" className="text-sm text-muted hover:text-white">← Back to journey</Link>
      <h1 className="mt-4 text-4xl font-extrabold text-gradient">{project.title}</h1>
      <p className="mt-2 text-muted">{project.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span key={t} className="chip">{t}</span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" className="btn-gradient">Live site</a>
        ) : null}
        {project.githubUrl ? (
          <a href={project.githubUrl} target="_blank" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold hover:bg-surface">GitHub</a>
        ) : null}
      </div>

      {project.overview ? (
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{project.overview}</p>
      ) : null}

      {project.features && project.features.length > 0 ? (
        <>
          <h2 className="mt-8 text-2xl font-bold">Highlights</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
            {project.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </>
      ) : null}
    </article>
  );
}
```

- [ ] **Step 2: Verify** — `npm run dev`, open `http://localhost:3000`. Click the SARTHI card.
Expected: lands on `/projects/sarthi` showing the title (gradient), summary, tags, overview, and Highlights list. "← Back to journey" returns to the homepage projects section. Visiting a bad URL like `/projects/nope` shows the 404 page. Stop the server.

- [ ] **Step 3: Verify static generation** — `npm run build`.
Expected: build output lists the detail routes as statically prerendered, e.g. `/projects/sarthi` and `/projects/highlights-generator` (shown with the SSG marker).

- [ ] **Step 4: Commit**
```bash
git add "app/projects/[slug]/page.tsx"
git commit -m "feat: add statically generated project detail pages"
```

---

## Task 12: Assets, final polish, and production verification

**Files:**
- Create: `public/resume.pdf` (placeholder)
- Create: `public/projects/.gitkeep`
- Modify (if needed): any component with a spacing/responsive glitch found during review

**Interfaces:**
- Consumes: nothing new.
- Produces: a clean production build with no console errors.

- [ ] **Step 1: Add placeholder assets**

```bash
cd "/d/my projects/portfolio"
mkdir -p public/projects
printf '%%PDF-1.4 placeholder resume\n' > public/resume.pdf
touch public/projects/.gitkeep
```
(The user replaces `public/resume.pdf` with their real PDF and drops project images into `public/projects/` later.)

- [ ] **Step 2: Full responsive review** — `npm run dev`, open `http://localhost:3000`. In the browser device toolbar, check **mobile (375px)** and **desktop (1280px)**:
  - Navbar, hero, about, skills, journey, contact all readable, no horizontal overflow on mobile (except the intentional timeline scroll on desktop).
  - Timeline is horizontal on desktop, vertical stack on mobile.
  - Resume button opens `/resume.pdf`.
Fix any spacing/overflow issue found (adjust the relevant component's Tailwind classes), then re-check. Stop the server.

- [ ] **Step 3: Production build + lint** — confirm a clean release:
```bash
npm run build
npm run lint
```
Expected: build "Compiled successfully" with the route list; lint reports no errors.

- [ ] **Step 4: Commit**
```bash
git add -A
git commit -m "chore: add placeholder assets and final responsive polish"
```

---

## Task 13: Deploy to Vercel (optional, user-driven)

This task is performed by the user (it requires their GitHub and Vercel accounts) — included so the plan is complete.

- [ ] **Step 1: Push to GitHub** — create a new GitHub repo (e.g. `portfolio`) and push:
```bash
cd "/d/my projects/portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/portfolio.git
git push -u origin main
```

- [ ] **Step 2: Import into Vercel** — at vercel.com → "Add New Project" → import the `portfolio` repo. Framework preset auto-detects **Next.js**. Click Deploy.

- [ ] **Step 3: Verify the live site** — open the `*.vercel.app` URL Vercel gives you. Confirm the homepage and a project detail page load. From now on, every `git push` to `main` auto-deploys.

---

## Self-Review

**Spec coverage:**
- Goals (job hunting + learning real stack) → Tasks 1–13 build the full site in Next.js/TS/Tailwind. ✓
- Stack (Next.js App Router, TS, Tailwind, SSG, Vercel) → Task 1 (scaffold), Task 11 (SSG), Task 13 (Vercel). ✓
- Add-a-project = one edit → Task 3 data file; Tasks 8 & 11 read it dynamically; no project hardcoded elsewhere. ✓
- Horizontal journey timeline, sorted, responsive → Task 8. ✓
- Pages: Hero/About/Skills/Journey/Contact + detail → Tasks 5, 6, 8, 9, 10, 11. ✓
- Navbar + Footer + Resume + responsive → Tasks 4, 5, 12. ✓
- Visual direction (dark navy + violet gradient) → Task 2 tokens, used throughout. ✓
- Initial content (SARTHI, Highlights Generator) → Task 3. ✓
- Light quality bar (build + browser, no test suite) → verification steps in every task, Task 12. ✓

**Placeholder scan:** No "TBD"/"TODO"/"handle edge cases" left; every code step shows complete code; intentional content placeholders (name, resume.pdf, social URLs) are user-supplied data, not plan gaps.

**Type consistency:** `Project` and `Profile` defined in Task 3 and used with matching field names in Tasks 4–11. `getAllProjects()` / `getProjectBySlug()` signatures match between definition (Task 3) and use (Tasks 8, 11). Timeline reverses the most-recent-first helper output to read earliest→most-recent (Task 8) — consistent with the card date formatting (Task 7).
