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
        <a href={profile.github} target="_blank" rel="noreferrer" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold hover:bg-surface">GitHub</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold hover:bg-surface">LinkedIn</a>
      </div>
    </section>
  );
}
