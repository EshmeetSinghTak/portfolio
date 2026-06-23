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
