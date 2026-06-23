import { projects, type Project } from "@/data/projects";

export function getAllProjects(): Project[] {
  // most recent first (descending by "YYYY-MM" string, which sorts correctly)
  return [...projects].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
