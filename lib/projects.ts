import { projects, type Project } from "@/data/projects";

export function formatDate(date: string): string {
  const [y, m] = date.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[Number(m) - 1]} ${y}`;
}

export function getAllProjects(): Project[] {
  // most recent first (descending by "YYYY-MM" string, which sorts correctly)
  return [...projects].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
