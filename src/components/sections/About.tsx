import AnimateIn from "@/components/effects/AnimateIn";
import { profile } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-3xl px-6 py-28">
      <AnimateIn>
        <p className="font-mono text-xs uppercase tracking-widest text-[#a78bfa]">About</p>
        {profile.about.map((para) => (
          <p key={para} className="mt-5 text-2xl leading-relaxed text-[#f0f0f0]/90">
            {para}
          </p>
        ))}
      </AnimateIn>
    </section>
  );
}
