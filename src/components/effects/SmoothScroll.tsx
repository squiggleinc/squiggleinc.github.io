"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Scroll to top on every page navigation
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    // Disable Lenis on iOS — native scroll is smoother and more reliable
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    if (isIOS) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Allow other components (e.g. ScrollExpandMedia) to pause/resume Lenis
    const handlePause  = () => lenis.stop();
    const handleResume = () => lenis.start();
    window.addEventListener("lenis:pause",  handlePause);
    window.addEventListener("lenis:resume", handleResume);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      window.removeEventListener("lenis:pause",  handlePause);
      window.removeEventListener("lenis:resume", handleResume);
    };
  }, []);

  return <>{children}</>;
}
