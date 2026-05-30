"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/types";
import { useDeepDive } from "@/components/deepdive/DeepDiveContext";

export default function ProjectCard({ project }: { project: Project }) {
  const { open } = useDeepDive();
  return (
    <motion.button
      onClick={() => open(project)}
      whileHover={{ y: -6 }}
      className="glass-card group relative w-full rounded-2xl p-6 text-left transition-shadow"
      style={{ boxShadow: `0 0 0 1px ${project.accent}22` }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
        style={{ boxShadow: `0 0 40px ${project.accent}55` }}
      />
      <p className="font-mono text-xs uppercase tracking-widest" style={{ color: project.accent }}>
        {project.status}
      </p>
      <h3 className="mt-2 text-2xl font-bold text-white">{project.name}</h3>
      <p className="mt-2 text-[#c0c0c0]">{project.hook}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.slice(0, 4).map((t) => (
          <span key={t} className="rounded-full border border-[#1f1f1f] px-2.5 py-0.5 text-xs text-[#888888]">
            {t}
          </span>
        ))}
      </div>
      <span className="mt-5 inline-block font-mono text-sm text-[#a78bfa]">Explore →</span>
    </motion.button>
  );
}
