import { profile } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="section">
      <h2 className="text-3xl font-bold">About</h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{profile.about}</p>
    </section>
  );
}
