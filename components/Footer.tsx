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
