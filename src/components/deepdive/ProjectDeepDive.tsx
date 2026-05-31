"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useDeepDive } from "./DeepDiveContext";

export default function ProjectDeepDive() {
  const { active, close } = useDeepDive();

  // While a project modal is open, pause Lenis smooth-scroll so the modal's own
  // overflow scrolls natively (otherwise Lenis eats the wheel and it cuts off).
  useEffect(() => {
    if (!active) return;
    window.dispatchEvent(new Event("lenis:pause"));
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.dispatchEvent(new Event("lenis:resume"));
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            className="glass-card-purple mx-auto my-10 max-w-3xl rounded-3xl p-8 md:p-12"
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.15 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="float-right text-[#888888] hover:text-white transition"
            >
              <X />
            </button>
            <p className="font-mono text-xs uppercase tracking-widest text-[#a78bfa]">
              {active.status}
            </p>
            <h2 className="font-display gradient-text mt-2 text-5xl font-light tracking-tight">{active.name}</h2>
            <p className="mt-2 text-lg text-[#c0c0c0]">{active.hook}</p>

            {active.embed ? (
              <div className="mt-6">
                <p className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#a78bfa]">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#a78bfa]" />
                  Live — scroll &amp; click to interact
                </p>
                <iframe
                  src={active.embed}
                  title={`${active.name} live`}
                  className="h-[600px] w-full rounded-xl border border-[#1f1f1f] bg-black"
                  loading="lazy"
                />
              </div>
            ) : active.scrollShot ? (
              <div className="mt-6">
                <p className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#a78bfa]">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#a78bfa]" />
                  Live capture — auto-scrolling the real dashboard
                </p>
                <div
                  role="img"
                  aria-label={`${active.name} dashboard`}
                  className="animate-autopan h-[460px] w-full rounded-xl border border-[#1f1f1f] bg-top bg-no-repeat"
                  style={{ backgroundImage: `url(${active.scrollShot})`, backgroundSize: "100% auto" }}
                />
              </div>
            ) : (
              <Image
                src={active.image}
                alt={`${active.name} screenshot`}
                width={1200}
                height={750}
                className="mt-6 rounded-xl border border-[#1f1f1f]"
              />
            )}

            <h3 className="mt-8 font-mono text-xs uppercase tracking-widest text-[#888888]">The idea</h3>
            <p className="mt-2 text-[#f0f0f0]/90">{active.problem}</p>

            <h3 className="mt-6 font-mono text-xs uppercase tracking-widest text-[#888888]">What it does</h3>
            <ul className="mt-2 space-y-2">
              {active.features.map((f) => (
                <li key={f} className="flex gap-2 text-[#f0f0f0]/90">
                  <span className="text-[#a78bfa]">▹</span> {f}
                </li>
              ))}
            </ul>

            {active.howItWorks && active.howItWorks.length > 0 && (
              <>
                <h3 className="mt-6 font-mono text-xs uppercase tracking-widest text-[#888888]">How it works</h3>
                <ol className="mt-3 space-y-3">
                  {active.howItWorks.map((step, i) => (
                    <li key={step} className="flex gap-3 text-[#f0f0f0]/90">
                      <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border border-[#6d28d9]/50 font-mono text-xs text-[#a78bfa]">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </>
            )}

            <h3 className="mt-6 font-mono text-xs uppercase tracking-widest text-[#888888]">Built with</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {active.tech.map((t) => (
                <span key={t} className="rounded-full border border-[#6d28d9]/40 px-3 py-1 text-sm text-[#c0c0c0]">
                  {t}
                </span>
              ))}
            </div>

            {active.link && (
              <a
                href={active.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-xl bg-[#4c1d95] px-6 py-3 font-semibold text-white transition hover:shadow-[0_0_30px_rgba(76,29,149,0.5)]"
              >
                {active.link.label} →
              </a>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
