import type { Profile } from "@/lib/types";

export const profile: Profile = {
  name: "Vince Sarkis",
  role: "Founder & Creator",
  tagline: "I bring ideas to life.",
  about: [
    "I'm a founder and creator who turns ideas into working products — fast.",
    "From an AI-run notary business to a real-time trading companion to a product-research engine, I build the whole thing: the idea, the design, the code, and the automation that makes it run.",
  ],
  email: "saleemsarkis916@proton.me",
  github: "https://github.com/squiggleinc",
  techStack: [
    "TypeScript", "React", "Next.js", "Node.js", "Python", "FastAPI",
    "Supabase", "Tailwind", "Three.js", "Framer Motion", "WebSockets", "Claude AI",
  ],
  stats: [
    { label: "Projects shipped", value: 3 },
    { label: "Ideas in motion", value: 6, suffix: "+" },
    { label: "Stacks wrangled", value: 12, suffix: "+" },
  ],
  timeline: [
    { year: "2025", title: "Mindfull Intel", detail: "Built a product-research engine that scores e-commerce opportunities from live market signals." },
    { year: "2026", title: "TradoGotchi", detail: "Shipped a real-time trading companion driven by TradingView webhooks." },
    { year: "2026", title: "Squiggle", detail: "Launched an AI-run mobile-notary business — site, booking, and autonomous agents." },
  ],
};
