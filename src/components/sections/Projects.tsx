import AnimateIn from "@/components/effects/AnimateIn";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28">
      <AnimateIn>
        <p className="font-mono text-xs uppercase tracking-widest text-[#a78bfa]">Selected work</p>
        <h2 className="gradient-text mt-2 text-4xl font-bold md:text-5xl">Ideas, brought to life</h2>
      </AnimateIn>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {projects.map((p, i) => (
          <AnimateIn key={p.slug} delay={i * 0.1}>
            <ProjectCard project={p} />
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}
