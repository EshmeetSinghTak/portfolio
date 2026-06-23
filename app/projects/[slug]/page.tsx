import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllProjects, getProjectBySlug, formatDate } from "@/lib/projects";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return { title: project ? `${project.title} — Portfolio` : "Project" };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  return (
    <article className="section">
      <Link href="/#projects" className="text-sm text-muted hover:text-white">← Back to journey</Link>
      <h1 className="mt-4 text-4xl font-extrabold text-gradient">{project.title}</h1>
      <p className="mt-1 text-sm font-bold text-accent">{formatDate(project.date)}</p>
      <p className="mt-2 text-muted">{project.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span key={t} className="chip">{t}</span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-gradient">Live site</a>
        ) : null}
        {project.githubUrl ? (
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold hover:bg-surface">GitHub</a>
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

      {project.screenshots && project.screenshots.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {project.screenshots.map((src) => (
            <img key={src} src={src} alt={`${project.title} screenshot`} className="rounded-lg border border-border" />
          ))}
        </div>
      ) : null}
    </article>
  );
}
