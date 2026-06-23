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
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-gradient !px-4 !py-2">
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
