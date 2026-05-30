import AnimateIn from "@/components/effects/AnimateIn";
import ShimmerButton from "@/components/effects/ShimmerButton";
import { profile } from "@/data/profile";

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-3xl px-6 py-32 text-center">
      <AnimateIn>
        <h2 className="gradient-text text-5xl font-bold md:text-6xl">Let&apos;s build something.</h2>
        <p className="mt-5 text-lg text-[#c0c0c0]">
          Got an idea, a project, or just want to connect? My inbox is open.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a href={`mailto:${profile.email}`}><ShimmerButton>Email me</ShimmerButton></a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-[#6d28d9]/50 px-6 py-3 font-semibold text-[#c0c0c0] transition hover:text-white"
          >
            GitHub
          </a>
        </div>
      </AnimateIn>
    </section>
  );
}
