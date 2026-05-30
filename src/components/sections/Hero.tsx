"use client";

import { motion } from "framer-motion";
import Scene3D from "@/components/three/Scene3D";
import WarpBackground from "@/components/effects/WarpBackground";
import ShimmerButton from "@/components/effects/ShimmerButton";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden bg-black">
      <WarpBackground className="absolute inset-0" />
      <Scene3D className="absolute inset-0 opacity-90" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-sm uppercase tracking-[0.3em] text-[#a78bfa]"
        >
          {profile.role}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, type: "spring", bounce: 0.2 }}
          className="font-display gradient-text mt-4 text-7xl font-light tracking-tight leading-[0.9] md:text-9xl"
        >
          {profile.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 max-w-xl text-xl text-[#c0c0c0]"
        >
          {profile.tagline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mt-10"
        >
          <a href="#projects"><ShimmerButton>See the builds</ShimmerButton></a>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-[#888888]">
        scroll ↓
      </div>
    </section>
  );
}
