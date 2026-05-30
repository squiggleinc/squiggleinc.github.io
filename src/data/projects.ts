import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "squiggle",
    name: "Squiggle",
    hook: "A mobile-notary business, reimagined as an AI-run operation.",
    accent: "#8b5cf6",
    status: "Live",
    problem:
      "Running a Las Vegas mobile-notary service solo means juggling bookings, lead generation, follow-ups, and back-office ops — all at once.",
    features: [
      "A polished Next.js marketing site with online booking and payment.",
      "A private AI-agent dashboard that runs the business behind the scenes.",
      "Scheduler agent: automated confirmations, reminders, and review requests.",
      "Intel agent: scrapes and scores local leads, then sends a daily brief.",
      "Outreach toolkit: drafts and sends real, personalized emails in-app.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind", "Supabase", "Inngest", "Resend", "Claude AI"],
    image: "/projects/squiggle.png",
    embed: "https://www.squigglenv.com/",
    link: { label: "Visit squigglenv.com", url: "https://squigglenv.com" },
  },
  {
    slug: "tradogotchi",
    name: "TradoGotchi",
    hook: "Your futures trades, with a heartbeat.",
    accent: "#a78bfa",
    status: "Private",
    problem:
      "Trading signals get buried in charts and noisy alerts you have to babysit all session.",
    features: [
      "TradingView alerts POST into a lightweight webhook server.",
      "The server broadcasts each setup over WebSockets in real time.",
      "A desktop 'tamagotchi' companion surfaces the live trade at a glance.",
      "Shows market, direction, grade, entry zone, stop, two targets, and R:R.",
      "Explains the 'why' — the confirmed signal stack behind each call.",
    ],
    tech: ["Node.js", "Express", "WebSockets", "TradingView", "Cloudflare Tunnel"],
    image: "/projects/tradogotchi.png",
  },
  {
    slug: "mindfull-intel",
    name: "Mindfull Intel",
    hook: "Find winning products before they trend.",
    accent: "#6d28d9",
    status: "Private",
    problem:
      "Picking e-commerce products is guesswork spread across a dozen scattered data sources.",
    features: [
      "Pulls signals from Amazon, Google Trends, TikTok, and Meta Ads.",
      "Dedupes and scores each product opportunity with a data-driven model.",
      "Serves a scoring dashboard so the best bets rise to the top.",
      "A scheduler runs recurring scans so the data stays fresh.",
    ],
    tech: ["Python", "FastAPI", "Playwright", "BeautifulSoup", "pytrends", "SQLite", "APScheduler"],
    image: "/projects/mindfull.png",
  },
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
