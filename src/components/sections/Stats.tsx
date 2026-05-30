"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { profile } from "@/data/profile";

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1200);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <span ref={ref} className="font-display gradient-text text-7xl font-light">
      {n}{suffix ?? ""}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative mx-auto max-w-5xl px-6 py-20">
      <div className="grid gap-10 text-center md:grid-cols-3">
        {profile.stats.map((s) => (
          <div key={s.label}>
            <Counter value={s.value} suffix={s.suffix} />
            <p className="mt-3 font-mono text-sm uppercase tracking-widest text-[#888888]">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
