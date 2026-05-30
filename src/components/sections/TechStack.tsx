import { profile } from "@/data/profile";

export default function TechStack() {
  const row = [...profile.techStack, ...profile.techStack];
  return (
    <section className="relative overflow-hidden border-y border-[#1f1f1f] py-8">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="font-mono text-lg text-[#888888]">{t}</span>
        ))}
      </div>
    </section>
  );
}
