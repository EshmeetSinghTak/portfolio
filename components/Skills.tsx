import { profile } from "@/data/profile";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <h2 className="text-3xl font-bold">Skills</h2>
      <div className="mt-5 flex flex-wrap gap-2.5">
        {profile.skills.map((s) => (
          <span key={s} className="chip">{s}</span>
        ))}
      </div>
    </section>
  );
}
