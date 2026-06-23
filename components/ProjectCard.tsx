import Link from "next/link";
import type { Project } from "@/data/projects";
import { formatDate } from "@/lib/projects";

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
