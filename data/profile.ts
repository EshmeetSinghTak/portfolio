export type Profile = {
  name: string;
  tagline: string;
  about: string;
  skills: string[];
  email: string;
  github: string;
  linkedin: string;
};

export const profile: Profile = {
  name: "Your Name",
  tagline: "CS student building AI products. Looking for SWE internships.",
  about:
    "Short bio goes here — your background, what you're studying, and the kind of role you're looking for.",
  skills: ["TypeScript", "React", "Next.js", "Python", "Tailwind CSS", "Git"],
  email: "puneangelsnetwork31@gmail.com",
  github: "https://github.com/your-username",
  linkedin: "https://linkedin.com/in/your-handle",
};
