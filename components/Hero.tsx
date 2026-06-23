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
        <a href="/resume.pdf" target="_blank" rel="noreferrer" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold hover:bg-surface">
          Download Resume
        </a>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-muted sm:justify-start">
        <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
        <a href={`mailto:${profile.email}`} className="hover:text-white">Email</a>
      </div>
    </section>
  );
}
