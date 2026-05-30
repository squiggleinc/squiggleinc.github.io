import AnimateIn from "@/components/effects/AnimateIn";
import { profile } from "@/data/profile";

export default function Timeline() {
  return (
    <section id="journey" className="relative mx-auto max-w-3xl px-6 py-28">
      <AnimateIn>
        <p className="font-mono text-xs uppercase tracking-widest text-[#a78bfa]">The journey</p>
        <h2 className="gradient-text mt-2 text-4xl font-bold">Milestones</h2>
      </AnimateIn>
      <div className="mt-12 space-y-8 border-l border-[#6d28d9]/40 pl-8">
        {profile.timeline.map((e, i) => (
          <AnimateIn key={e.title} delay={i * 0.1} direction="left">
            <div className="relative">
              <span className="absolute -left-[39px] top-1.5 h-3 w-3 rounded-full bg-[#a78bfa] shadow-[0_0_12px_#a78bfa]" />
              <p className="font-mono text-sm text-[#888888]">{e.year}</p>
              <h3 className="mt-1 text-xl font-semibold text-white">{e.title}</h3>
              <p className="mt-1 text-[#c0c0c0]">{e.detail}</p>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}
