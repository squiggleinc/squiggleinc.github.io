import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "squiggle",
    name: "Squiggle",
    hook: "A mobile-notary business, reimagined as an AI-run operation.",
    accent: "#8b5cf6",
    status: "Live",
    problem:
      "Running a Las Vegas mobile-notary service solo means juggling bookings, lead generation, follow-ups, and back-office ops — all at once. Squiggle turns that whole operation into software, with AI agents handling the busywork.",
    features: [
      "A polished marketing site with online booking, scheduling, and Square payments.",
      "A private AI-agent dashboard that quietly runs the business in the background.",
      "Scheduler agent: automated confirmations, reminders, and Google-review requests.",
      "Intel agent: scrapes and scores local leads, then emails a daily brief.",
      "Outreach toolkit: drafts and sends personalized, on-brand emails in-app.",
      "Document upload + e-signature workflow for loan signings and apostilles.",
    ],
    howItWorks: [
      "The site and dashboard are a single Next.js 16 / React 19 app on Vercel.",
      "Bookings, leads, and clients live in Supabase (Postgres) with row-level access.",
      "Inngest runs the scheduled agent jobs; Resend delivers the transactional email.",
      "The Intel agent scrapes and scores leads, then Claude drafts the outreach copy.",
      "PostHog tracks the funnel so the agents can act on real behavior.",
    ],
    tech: [
      "Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Supabase",
      "Inngest", "Resend", "Anthropic Claude", "PostHog", "Framer Motion", "Vercel",
    ],
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
      "Trading signals get buried in charts and noisy alerts you have to babysit all session. TradoGotchi turns each confirmed setup into a glanceable pixel-pet 'device' — so a trade plan reaches you like a notification, not a chart.",
    features: [
      "A pixel-art 'egg' device that surfaces each live trade setup at a glance.",
      "Shows market, direction, grade, entry zone, stop, two targets, and R:R.",
      "Spells out the 'why' — the confirmed signal stack behind every call.",
      "A virtual creature reacts to the session: P&L, win-rate, and streaks.",
      "Real-time — alerts appear the instant TradingView fires them.",
    ],
    howItWorks: [
      "TradingView fires a webhook the moment a setup is confirmed.",
      "A Node/Express server validates and normalizes the alert payload.",
      "It broadcasts the trade over WebSockets to every open TradoGotchi window.",
      "The HTML5-canvas 'egg' renders the setup and animates the creature.",
      "A Cloudflare Tunnel exposes the local server to TradingView securely.",
    ],
    tech: [
      "Node.js", "Express", "WebSockets (ws)", "TradingView Webhooks",
      "Cloudflare Tunnel", "HTML5 Canvas", "Vanilla JS",
    ],
    image: "/projects/tradogotchi.png",
    embed: "/tradogotchi-app.html",
  },
  {
    slug: "mindfull-intel",
    name: "Mindfull Intel",
    hook: "Find winning products before they trend.",
    accent: "#6d28d9",
    status: "Private",
    problem:
      "Picking e-commerce products is guesswork spread across a dozen scattered data sources. Mindfull pulls those signals into one place, scores each opportunity, and surfaces the best bets on a single dashboard.",
    features: [
      "Aggregates signals from Amazon, Google Trends, TikTok, and Meta Ads.",
      "Dedupes and scores every product opportunity with a data-driven model.",
      "A dashboard ranks the best bets with trend, demand, and competition stats.",
      "A scheduler re-runs scans automatically so the data never goes stale.",
      "A watchlist tracks products you're considering over time.",
    ],
    howItWorks: [
      "Async scrapers pull each source in parallel (httpx, BeautifulSoup, pytrends, Playwright).",
      "Results are deduped and written to SQLite via aiosqlite.",
      "A scoring model weighs demand, trend slope, and competition into one score.",
      "APScheduler re-runs the pipeline on a schedule to refresh the data.",
      "A FastAPI backend serves the dashboard of top-scoring products.",
    ],
    tech: [
      "Python 3.14", "FastAPI", "Uvicorn", "httpx", "BeautifulSoup4",
      "pytrends", "Playwright", "SQLite (aiosqlite)", "APScheduler",
    ],
    image: "/projects/mindfull.png",
    scrollShot: "/projects/mindfull-tall.png",
  },
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
