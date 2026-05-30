"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface AnimateInProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  bounce?: number;
  once?: boolean;
}

export default function AnimateIn({
  children,
  className,
  id,
  delay = 0,
  direction = "up",
  duration = 1.1,
  bounce = 0.2,
  once = true,
}: AnimateInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-8% 0px" });

  const offsets = {
    up:    { y: 60,  x: 0  },
    down:  { y: -60, x: 0  },
    left:  { x: 60,  y: 0  },
    right: { x: -60, y: 0  },
    none:  { x: 0,   y: 0  },
  };

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        type: "spring",
        duration,
        bounce,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

/* Staggered children wrapper */
export function StaggerContainer({
  children,
  className,
  stagger = 0.12,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}) {
  const offsets = {
    up:    { y: 50,  x: 0  },
    left:  { x: 50,  y: 0  },
    right: { x: -50, y: 0  },
    none:  { x: 0,   y: 0  },
  };

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...offsets[direction] },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            type: "spring",
            duration: 1.1,
            bounce: 0.2,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
