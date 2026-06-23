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
            <span className="absolute -top-4 left-2 h-3 w-3 rounded-full bg-linear-to-r from-accent to-accent2
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
