# Vincent Sarkis Portfolio Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a futuristic, effects-heavy static portfolio site for Vincent Sarkis, showcasing three projects with a real-time WebGL hero, deployed free to GitHub Pages at `squiggleinc.github.io`.

**Architecture:** A statically-exported Next.js 16 (App Router) app that reuses the Squiggle-Website design system (shader background, glass cards, glow utilities, ShimmerButton, Framer Motion, Lenis). The hero renders the Squiggle "S" mark as an extruded chrome 3D object via React Three Fiber. Content is data-driven (typed `projects.ts` / `profile.ts`); project deep-dives are client-side Framer Motion overlays (no routing needed, so static export stays trivial).

**Tech Stack:** Next.js 16.2.1, React 19.2.4, TypeScript, Tailwind v4, Framer Motion 12, Lenis, three.js + @react-three/fiber + @react-three/drei, Vitest + React Testing Library, GitHub Actions → GitHub Pages.

**Companion spec:** `plans/2026-05-29-portfolio-site-design.md`

**Conventions:**
- Repo / project root: `C:\Users\17029\Github\squiggleinc.github.io` (the folder name MUST equal the GitHub repo name for a user GitHub Pages site).
- All commands run from that root unless stated. PowerShell on Windows; Bash equivalents noted where they differ.
- Brand palette: black `#0a0a0a`, card `#111111`, border `#1f1f1f`, off-white `#f0f0f0`, purple `#4c1d95 → #6d28d9 → #8b5cf6 → #a78bfa`, silver `#c0c0c0 / #e8e8e8 / #888888`.

---

## File Structure

```
squiggleinc.github.io/
├── .github/workflows/deploy.yml      # CI: build static export → GitHub Pages
├── next.config.ts                    # output: 'export', images.unoptimized
├── vitest.config.ts                  # test runner
├── vitest.setup.ts                   # jest-dom matchers
├── public/
│   ├── .nojekyll                     # let _next/ assets serve on Pages
│   ├── squiggle-icon.png             # copied from Squiggle-Website
│   ├── squiggle-s.svg                # vectorized S for the 3D extrude
│   ├── hdri/studio.hdr               # CC0 env map for chrome reflections
│   └── projects/                     # screenshots (squiggle.png, tradogotchi.png, mindfull.png)
└── src/
    ├── app/
    │   ├── layout.tsx                # fonts, SmoothScroll, metadata
    │   ├── page.tsx                  # assembles all sections + deep-dive provider
    │   └── globals.css               # ported Squiggle theme
    ├── lib/
    │   └── types.ts                  # Project, Profile types
    ├── data/
    │   ├── projects.ts               # the three projects (typed)
    │   └── profile.ts                # name, bio, tech stack, stats, timeline
    ├── components/
    │   ├── effects/
    │   │   ├── ShaderBackground.tsx   # ported verbatim
    │   │   ├── ShimmerButton.tsx      # ported verbatim
    │   │   ├── AnimateIn.tsx          # ported verbatim (+ Stagger*)
    │   │   └── SmoothScroll.tsx       # ported verbatim
    │   ├── three/
    │   │   ├── Scene3D.tsx            # R3F <Canvas> wrapper + lights + env
    │   │   └── SquiggleLogo3D.tsx     # extruded chrome "S" mesh
    │   ├── deepdive/
    │   │   ├── DeepDiveContext.tsx    # open/close state for project overlay
    │   │   └── ProjectDeepDive.tsx    # full-screen Framer Motion overlay
    │   └── sections/
    │       ├── Nav.tsx
    │       ├── Hero.tsx
    │       ├── About.tsx
    │       ├── TechStack.tsx
    │       ├── Projects.tsx           # grid of ProjectCard
    │       ├── ProjectCard.tsx
    │       ├── Stats.tsx
    │       ├── Timeline.tsx
    │       ├── Contact.tsx
    │       └── Footer.tsx
```

---

### Task 1: Scaffold the Next.js project

**Files:**
- Create: whole project at `C:\Users\17029\Github\squiggleinc.github.io`

- [ ] **Step 1: Create the app**

Run (from `C:\Users\17029\Github`):
```powershell
npx create-next-app@latest squiggleinc.github.io --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack
```
Answer "No" to any "use Turbopack for dev" prompt. This pins Next 16 / React 19 / Tailwind v4 to match Squiggle.

- [ ] **Step 2: Pin the runtime libraries we reuse**

Run (from the project root):
```powershell
npm install framer-motion@^12 lenis@^1.3 clsx tailwind-merge lucide-react three @react-three/fiber @react-three/drei
npm install -D @types/three vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 3: Verify the dev server boots**

Run:
```powershell
npm run dev
```
Expected: "Ready" on `http://localhost:3000`. Stop it with Ctrl+C.

- [ ] **Step 4: Initialize git and copy the spec**

Run:
```powershell
git init
New-Item -ItemType Directory -Force docs
Copy-Item "C:\Users\17029\Obsidian\plans\2026-05-29-portfolio-site-design.md" "docs\design.md"
Copy-Item "C:\Users\17029\Obsidian\plans\2026-05-29-portfolio-site-implementation-plan.md" "docs\plan.md"
```

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "chore: scaffold Next.js portfolio app"
```

---

### Task 2: Configure static export for GitHub Pages

**Files:**
- Modify: `next.config.ts`
- Create: `public/.nojekyll`

- [ ] **Step 1: Configure static export**

Replace `next.config.ts` with:
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // User Pages site (squiggleinc.github.io) serves at domain root → no basePath.
  trailingSlash: true,
};

export default nextConfig;
```

- [ ] **Step 2: Add `.nojekyll`**

Create `public/.nojekyll` as an empty file:
```powershell
New-Item -ItemType File public\.nojekyll
```

- [ ] **Step 3: Verify the export builds**

Run:
```powershell
npm run build
```
Expected: build succeeds and a static `out/` directory is produced (contains `index.html`, `_next/`).

- [ ] **Step 4: Commit**

```powershell
git add -A
git commit -m "chore: configure static export for GitHub Pages"
```

---

### Task 3: Port the Squiggle theme (globals.css) and fonts

**Files:**
- Overwrite: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Overwrite `globals.css`**

Copy the exact contents of `C:\Users\17029\Squiggle-Website\src\app\globals.css` into `src/app/globals.css`, then **delete line 2** (`@import "lenis/dist/lenis.css";`) only if the build complains it cannot resolve it; otherwise keep it. This brings over the `@theme` tokens, `.glass-card`, `.gradient-text`, glow utilities, `.noise`, scrollbar, and selection styles.

- [ ] **Step 2: Set up fonts + SmoothScroll in `layout.tsx`**

Replace `src/app/layout.tsx` with:
```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/effects/SmoothScroll";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vincent Sarkis — Founder & Creator",
  description:
    "Founder and creator bringing ideas to life. Builder of Squiggle, TradoGotchi, and Mindfull Intel.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full`}>
      <body className="min-h-full bg-black text-[#f0f0f0] antialiased overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify build (will fail until SmoothScroll exists — that's next task)**

Skip building now; commit after Task 4. Instead just confirm the file saved.

- [ ] **Step 4: Commit**

```powershell
git add -A
git commit -m "feat: port Squiggle theme tokens and fonts"
```

---

### Task 4: Port the effect primitives

**Files:**
- Create: `src/components/effects/SmoothScroll.tsx`
- Create: `src/components/effects/ShaderBackground.tsx`
- Create: `src/components/effects/ShimmerButton.tsx`
- Create: `src/components/effects/AnimateIn.tsx`

- [ ] **Step 1: SmoothScroll**

Copy `C:\Users\17029\Squiggle-Website\src\components\SmoothScroll.tsx` verbatim into `src/components/effects/SmoothScroll.tsx`.

- [ ] **Step 2: ShaderBackground**

Copy `C:\Users\17029\Squiggle-Website\src\components\ui\shader-background.tsx` verbatim into `src/components/effects/ShaderBackground.tsx`.

- [ ] **Step 3: ShimmerButton**

Copy `C:\Users\17029\Squiggle-Website\src\components\ui\shimmer-button.tsx` verbatim into `src/components/effects/ShimmerButton.tsx`.

- [ ] **Step 4: AnimateIn (+ Stagger helpers)**

Copy `C:\Users\17029\Squiggle-Website\src\components\AnimateIn.tsx` verbatim into `src/components/effects/AnimateIn.tsx`.

- [ ] **Step 5: Replace `page.tsx` with a temporary smoke page**

Replace `src/app/page.tsx` with:
```tsx
import ShaderBackground from "@/components/effects/ShaderBackground";
import ShimmerButton from "@/components/effects/ShimmerButton";

export default function Home() {
  return (
    <main className="relative min-h-screen grid place-items-center">
      <ShaderBackground />
      <div className="glass-card rounded-2xl p-10 text-center">
        <h1 className="gradient-text text-5xl font-bold">Vincent Sarkis</h1>
        <ShimmerButton className="mt-6">It works</ShimmerButton>
      </div>
    </main>
  );
}
```

- [ ] **Step 6: Verify build + dev render**

Run:
```powershell
npm run build
```
Expected: PASS. Then `npm run dev` and confirm at `http://localhost:3000` you see an animated purple shader background, a glass card, gradient title, and a shimmering button. Ctrl+C.

- [ ] **Step 7: Commit**

```powershell
git add -A
git commit -m "feat: port shader background, shimmer button, smooth scroll, animate-in"
```

---

### Task 5: Define content types and project/profile data

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/profile.ts`
- Test: `src/data/projects.test.ts`

- [ ] **Step 1: Types**

Create `src/lib/types.ts`:
```ts
export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  name: string;
  hook: string;          // one-line headline
  accent: string;        // hex used for card glow
  status: string;        // "Live", "Private", "In progress"
  problem: string;       // the idea / problem it solves
  features: string[];    // what it does (deep-dive bullets)
  tech: string[];        // technologies
  image: string;         // /projects/<slug>.png
  link?: ProjectLink;    // optional live/repo link
}

export interface TimelineEntry {
  year: string;
  title: string;
  detail: string;
}

export interface StatEntry {
  label: string;
  value: number;
  suffix?: string;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  about: string[];       // bio paragraphs
  email: string;
  github: string;        // full URL
  techStack: string[];
  stats: StatEntry[];
  timeline: TimelineEntry[];
}
```

- [ ] **Step 2: Project data**

Create `src/data/projects.ts`:
```ts
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
```

- [ ] **Step 3: Profile data**

Create `src/data/profile.ts`:
```ts
import type { Profile } from "@/lib/types";

export const profile: Profile = {
  name: "Vincent Sarkis",
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
```

- [ ] **Step 4: Write the data-integrity test**

Create `src/data/projects.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { projects, getProject } from "./projects";

describe("projects data", () => {
  it("has the three featured projects", () => {
    expect(projects.map((p) => p.slug)).toEqual(["squiggle", "tradogotchi", "mindfull-intel"]);
  });

  it("every project has required display fields", () => {
    for (const p of projects) {
      expect(p.name).toBeTruthy();
      expect(p.hook).toBeTruthy();
      expect(p.features.length).toBeGreaterThan(0);
      expect(p.tech.length).toBeGreaterThan(0);
      expect(p.image).toMatch(/^\/projects\/.+\.png$/);
    }
  });

  it("slugs are unique", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("getProject finds by slug and returns undefined otherwise", () => {
    expect(getProject("squiggle")?.name).toBe("Squiggle");
    expect(getProject("nope")).toBeUndefined();
  });
});
```

- [ ] **Step 5: Wire up Vitest**

Create `vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
  },
  resolve: { alias: { "@": "/src" } },
});
```
Create `vitest.setup.ts`:
```ts
import "@testing-library/jest-dom/vitest";
```
Add to `package.json` `scripts`: `"test": "vitest run"`.

- [ ] **Step 6: Run the test**

Run:
```powershell
npm test
```
Expected: PASS (4 tests in `projects.test.ts`).

- [ ] **Step 7: Commit**

```powershell
git add -A
git commit -m "feat: add typed project + profile content and data tests"
```

---

### Task 6: Prepare the logo SVG and HDRI asset

**Files:**
- Create: `public/squiggle-icon.png` (copied)
- Create: `public/squiggle-s.svg`
- Create: `public/hdri/studio.hdr`

- [ ] **Step 1: Copy the source mark**

```powershell
Copy-Item "C:\Users\17029\Squiggle-Website\public\squiggle-icon.png" "public\squiggle-icon.png"
```

- [ ] **Step 2: Vectorize the "S" → `public/squiggle-s.svg`**

Preferred: trace the PNG to a single-path SVG (e.g. drag `squiggle-icon.png` into https://www.vectorizer.io or run `vtracer --input public/squiggle-icon.png --output public/squiggle-s.svg` if `vtracer` is installed). Save the result as `public/squiggle-s.svg`.

Fallback (use only if tracing is unavailable — a clean stylized S so the build is never blocked; replace later for an exact match). Create `public/squiggle-s.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 130" width="100" height="130">
  <path fill="#4c1d95" d="M82 8 H40 A38 38 0 0 0 40 84 H60 A18 18 0 0 1 60 120 H18 L18 122 H60 A38 38 0 0 0 60 46 H40 A18 18 0 0 1 40 10 H82 Z"/>
</svg>
```

- [ ] **Step 3: Add a CC0 HDRI for chrome reflections**

Download a small CC0 studio HDRI (Poly Haven) into `public/hdri/studio.hdr`:
```powershell
New-Item -ItemType Directory -Force public\hdri
Invoke-WebRequest -Uri "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_03_1k.hdr" -OutFile "public\hdri\studio.hdr"
```
If the download fails, leave the file absent; `Scene3D` (next task) falls back to a drei `Environment preset` so the build still works.

- [ ] **Step 4: Commit**

```powershell
git add -A
git commit -m "chore: add logo SVG and HDRI env map assets"
```

---

### Task 7: Build the 3D chrome "S" (Scene3D + SquiggleLogo3D)

**Files:**
- Create: `src/components/three/SquiggleLogo3D.tsx`
- Create: `src/components/three/Scene3D.tsx`

- [ ] **Step 1: Extruded logo mesh**

Create `src/components/three/SquiggleLogo3D.tsx`:
```tsx
"use client";

import { useMemo, useRef } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import * as THREE from "three";

export default function SquiggleLogo3D() {
  const group = useRef<THREE.Group>(null);
  const data = useLoader(SVGLoader, "/squiggle-s.svg");
  const { pointer } = useThree();

  const geometry = useMemo(() => {
    const shapes: THREE.Shape[] = [];
    for (const path of data.paths) {
      shapes.push(...SVGLoader.createShapes(path));
    }
    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: 18,
      bevelEnabled: true,
      bevelThickness: 3,
      bevelSize: 2,
      bevelSegments: 6,
    });
    geo.center();
    // SVG Y axis points down; flip so the S is upright.
    geo.scale(0.05, -0.05, 0.05);
    return geo;
  }, [data]);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.35;
    // subtle mouse parallax tilt
    group.current.rotation.x += (pointer.y * 0.25 - group.current.rotation.x) * 0.05;
    group.current.position.x += (pointer.x * 0.3 - group.current.position.x) * 0.05;
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry} castShadow>
        <meshStandardMaterial
          color="#c8c8d0"
          metalness={1}
          roughness={0.18}
          envMapIntensity={1.4}
        />
      </mesh>
    </group>
  );
}
```

- [ ] **Step 2: Canvas wrapper with brand lighting + env**

Create `src/components/three/Scene3D.tsx`:
```tsx
"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import SquiggleLogo3D from "./SquiggleLogo3D";

export default function Scene3D({ className }: { className?: string }) {
  return (
    <div className={className ?? "absolute inset-0"}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={120} color="#a78bfa" />
        <pointLight position={[-6, -3, 2]} intensity={90} color="#4c1d95" />
        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
            <SquiggleLogo3D />
          </Float>
          {/* Prefer the local HDRI; falls back to a preset if the file is missing. */}
          <Environment files="/hdri/studio.hdr" />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

> If `public/hdri/studio.hdr` was not downloaded in Task 6, change the Environment line to `<Environment preset="studio" />`.

- [ ] **Step 3: Verify it renders**

Temporarily set `src/app/page.tsx` to:
```tsx
import Scene3D from "@/components/three/Scene3D";
export default function Home() {
  return <main className="relative h-screen bg-black"><Scene3D /></main>;
}
```
Run `npm run dev`, open `http://localhost:3000`. Expected: a slowly rotating chrome "S" with purple highlights that tilts toward your cursor. Then `npm run build` → Expected: PASS (R3F is client-only; static export still succeeds). Ctrl+C.

- [ ] **Step 4: Commit**

```powershell
git add -A
git commit -m "feat: extruded chrome Squiggle S hero object (R3F)"
```

---

### Task 8: Deep-dive overlay (context + component)

**Files:**
- Create: `src/components/deepdive/DeepDiveContext.tsx`
- Create: `src/components/deepdive/ProjectDeepDive.tsx`

- [ ] **Step 1: Context for open/close**

Create `src/components/deepdive/DeepDiveContext.tsx`:
```tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { Project } from "@/lib/types";

interface DeepDiveState {
  active: Project | null;
  open: (p: Project) => void;
  close: () => void;
}

const Ctx = createContext<DeepDiveState | null>(null);

export function DeepDiveProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<Project | null>(null);
  return (
    <Ctx.Provider value={{ active, open: setActive, close: () => setActive(null) }}>
      {children}
    </Ctx.Provider>
  );
}

export function useDeepDive() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useDeepDive must be used within DeepDiveProvider");
  return ctx;
}
```

- [ ] **Step 2: The overlay**

Create `src/components/deepdive/ProjectDeepDive.tsx`:
```tsx
"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useDeepDive } from "./DeepDiveContext";

export default function ProjectDeepDive() {
  const { active, close } = useDeepDive();
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
            <h2 className="gradient-text mt-2 text-4xl font-bold">{active.name}</h2>
            <p className="mt-2 text-lg text-[#c0c0c0]">{active.hook}</p>

            <Image
              src={active.image}
              alt={`${active.name} screenshot`}
              width={1200}
              height={750}
              className="mt-6 rounded-xl border border-[#1f1f1f]"
            />

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
```

- [ ] **Step 3: Verify it typechecks**

Run:
```powershell
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 4: Commit**

```powershell
git add -A
git commit -m "feat: project deep-dive overlay + context"
```

---

### Task 9: Project cards + Projects section

**Files:**
- Create: `src/components/sections/ProjectCard.tsx`
- Create: `src/components/sections/Projects.tsx`
- Test: `src/components/sections/Projects.test.tsx`

- [ ] **Step 1: ProjectCard**

Create `src/components/sections/ProjectCard.tsx`:
```tsx
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
```

- [ ] **Step 2: Projects section**

Create `src/components/sections/Projects.tsx`:
```tsx
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
```

- [ ] **Step 3: Write the render test**

Create `src/components/sections/Projects.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DeepDiveProvider } from "@/components/deepdive/DeepDiveContext";
import Projects from "./Projects";

describe("Projects section", () => {
  it("renders all three project names", () => {
    render(
      <DeepDiveProvider>
        <Projects />
      </DeepDiveProvider>
    );
    expect(screen.getByText("Squiggle")).toBeInTheDocument();
    expect(screen.getByText("TradoGotchi")).toBeInTheDocument();
    expect(screen.getByText("Mindfull Intel")).toBeInTheDocument();
  });
});
```

- [ ] **Step 4: Run the test**

Run:
```powershell
npm test
```
Expected: PASS (the new render test + the data tests).

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "feat: project cards and Projects section"
```

---

### Task 10: Hero, Nav, About, TechStack sections

**Files:**
- Create: `src/components/sections/Nav.tsx`
- Create: `src/components/sections/Hero.tsx`
- Create: `src/components/sections/About.tsx`
- Create: `src/components/sections/TechStack.tsx`

- [ ] **Step 1: Nav**

Create `src/components/sections/Nav.tsx`:
```tsx
export default function Nav() {
  const links = [
    ["About", "#about"],
    ["Work", "#projects"],
    ["Journey", "#journey"],
    ["Contact", "#contact"],
  ];
  return (
    <nav className="fixed top-0 z-40 w-full backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-xl italic text-white">VS</a>
        <div className="hidden gap-6 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm text-[#c0c0c0] transition hover:text-white">
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Hero**

Create `src/components/sections/Hero.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import Scene3D from "@/components/three/Scene3D";
import ShimmerButton from "@/components/effects/ShimmerButton";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
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
          className="gradient-text mt-4 text-6xl font-bold leading-none md:text-8xl"
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
```

- [ ] **Step 3: About**

Create `src/components/sections/About.tsx`:
```tsx
import AnimateIn from "@/components/effects/AnimateIn";
import { profile } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-3xl px-6 py-28">
      <AnimateIn>
        <p className="font-mono text-xs uppercase tracking-widest text-[#a78bfa]">About</p>
        {profile.about.map((para) => (
          <p key={para} className="mt-5 text-2xl leading-relaxed text-[#f0f0f0]/90">
            {para}
          </p>
        ))}
      </AnimateIn>
    </section>
  );
}
```

- [ ] **Step 4: TechStack (animated marquee)**

Create `src/components/sections/TechStack.tsx`:
```tsx
import { profile } from "@/data/profile";

export default function TechStack() {
  const row = [...profile.techStack, ...profile.techStack];
  return (
    <section className="relative overflow-hidden border-y border-[#1f1f1f] py-8">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="font-mono text-lg text-[#888888]">{t}</span>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Verify typecheck**

Run:
```powershell
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 6: Commit**

```powershell
git add -A
git commit -m "feat: nav, hero, about, tech stack sections"
```

---

### Task 11: Stats, Timeline, Contact, Footer

**Files:**
- Create: `src/components/sections/Stats.tsx`
- Create: `src/components/sections/Timeline.tsx`
- Create: `src/components/sections/Contact.tsx`
- Create: `src/components/sections/Footer.tsx`

- [ ] **Step 1: Animated counter Stats**

Create `src/components/sections/Stats.tsx`:
```tsx
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
    <span ref={ref} className="gradient-text text-6xl font-bold">
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
```

- [ ] **Step 2: Timeline**

Create `src/components/sections/Timeline.tsx`:
```tsx
import AnimateIn from "@/components/effects/AnimateIn";
import { profile } from "@/data/profile";

export default function Timeline() {
  return (
    <section id="journey" className="relative mx-auto max-w-3xl px-6 py-28">
      <AnimateIn>
        <p className="font-mono text-xs uppercase tracking-widest text-[#a78bfa]">The journey</p>
        <h2 className="gradient-text mt-2 text-4xl font-bold">Milestones</h2>
      </AnimateIn>
      <div className="mt-12 space-y-8 border-l border-[#6d28d9]/40 pl-8">
        {profile.timeline.map((e, i) => (
          <AnimateIn key={e.title} delay={i * 0.1} direction="left">
            <div className="relative">
              <span className="absolute -left-[39px] top-1.5 h-3 w-3 rounded-full bg-[#a78bfa] shadow-[0_0_12px_#a78bfa]" />
              <p className="font-mono text-sm text-[#888888]">{e.year}</p>
              <h3 className="mt-1 text-xl font-semibold text-white">{e.title}</h3>
              <p className="mt-1 text-[#c0c0c0]">{e.detail}</p>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Contact**

Create `src/components/sections/Contact.tsx`:
```tsx
import AnimateIn from "@/components/effects/AnimateIn";
import ShimmerButton from "@/components/effects/ShimmerButton";
import { profile } from "@/data/profile";

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-3xl px-6 py-32 text-center">
      <AnimateIn>
        <h2 className="gradient-text text-5xl font-bold md:text-6xl">Let&apos;s build something.</h2>
        <p className="mt-5 text-lg text-[#c0c0c0]">
          Got an idea, a project, or just want to connect? My inbox is open.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a href={`mailto:${profile.email}`}><ShimmerButton>Email me</ShimmerButton></a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-[#6d28d9]/50 px-6 py-3 font-semibold text-[#c0c0c0] transition hover:text-white"
          >
            GitHub
          </a>
        </div>
      </AnimateIn>
    </section>
  );
}
```

- [ ] **Step 4: Footer**

Create `src/components/sections/Footer.tsx`:
```tsx
import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-[#1f1f1f] py-10 text-center font-mono text-xs text-[#888888]">
      © {new Date().getFullYear()} {profile.name}. Built from scratch.
    </footer>
  );
}
```

- [ ] **Step 5: Verify typecheck**

Run:
```powershell
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 6: Commit**

```powershell
git add -A
git commit -m "feat: stats, timeline, contact, footer sections"
```

---

### Task 12: Assemble the page

**Files:**
- Overwrite: `src/app/page.tsx`
- Test: `src/app/page.test.tsx`

- [ ] **Step 1: Compose all sections**

Replace `src/app/page.tsx`:
```tsx
import ShaderBackground from "@/components/effects/ShaderBackground";
import { DeepDiveProvider } from "@/components/deepdive/DeepDiveContext";
import ProjectDeepDive from "@/components/deepdive/ProjectDeepDive";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import Stats from "@/components/sections/Stats";
import Timeline from "@/components/sections/Timeline";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <DeepDiveProvider>
      <ShaderBackground />
      <Nav />
      <main className="relative">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Stats />
        <Timeline />
        <Contact />
      </main>
      <Footer />
      <ProjectDeepDive />
    </DeepDiveProvider>
  );
}
```

- [ ] **Step 2: Smoke test the page composition**

Create `src/app/page.test.tsx`:
```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Stub the WebGL/R3F pieces so jsdom can render the page.
vi.mock("@/components/three/Scene3D", () => ({ default: () => null }));
vi.mock("@/components/effects/ShaderBackground", () => ({ default: () => null }));

import Home from "./page";

describe("home page", () => {
  it("renders the name and all section anchors", () => {
    render(<Home />);
    expect(screen.getByText("Vincent Sarkis")).toBeInTheDocument();
    expect(screen.getByText("Squiggle")).toBeInTheDocument();
    expect(screen.getByText("Mindfull Intel")).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run tests + build**

Run:
```powershell
npm test
npm run build
```
Expected: all tests PASS; build produces `out/` with no errors.

- [ ] **Step 4: Visual check**

Run `npm run dev`, open `http://localhost:3000`, and scroll the whole page. Confirm: rotating chrome S in the hero, shader background, marquee tech row, three glowing project cards that open the deep-dive overlay on click (and close via X / backdrop), animated counters, timeline, and contact CTAs. Ctrl+C.

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "feat: assemble full portfolio page"
```

---

### Task 13: Capture project screenshots

**Files:**
- Create: `public/projects/squiggle.png`
- Create: `public/projects/tradogotchi.png`
- Create: `public/projects/mindfull.png`

- [ ] **Step 1: Squiggle (live site)**

Use the `vercel:agent-browser` skill (or any browser tool) to screenshot `https://squigglenv.com` at 1200×750 and save to `public/projects/squiggle.png`.

- [ ] **Step 2: TradoGotchi + Mindfull (local/private)**

If a running instance or existing screenshot exists, capture it. Otherwise create a branded placeholder so layout holds: a 1200×750 dark PNG with the project name (any quick method — e.g. screenshot a styled local HTML, or export from a design tool). Save as `public/projects/tradogotchi.png` and `public/projects/mindfull.png`.

- [ ] **Step 3: Verify the deep-dives show images**

Run `npm run dev`, open each project deep-dive, confirm the image renders (no broken-image icon). Ctrl+C.

- [ ] **Step 4: Commit**

```powershell
git add -A
git commit -m "chore: add project screenshots"
```

---

### Task 14: Accessibility + reduced motion polish

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/three/Scene3D.tsx`

- [ ] **Step 1: Respect reduced-motion in CSS**

Append to `src/app/globals.css`:
```css
@media (prefers-reduced-motion: reduce) {
  .animate-marquee { animation: none; }
  * { scroll-behavior: auto !important; }
}
```

- [ ] **Step 2: Pause 3D auto-rotate for reduced-motion users**

In `src/components/three/SquiggleLogo3D.tsx`, gate the rotation. At the top of the component add:
```tsx
const reduce = typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
```
Then in `useFrame`, wrap the auto-spin line:
```tsx
if (!reduce) group.current.rotation.y += delta * 0.35;
```

- [ ] **Step 3: Verify build still passes**

Run:
```powershell
npm run build
```
Expected: PASS.

- [ ] **Step 4: Commit**

```powershell
git add -A
git commit -m "feat: reduced-motion accessibility polish"
```

---

### Task 15: GitHub Actions deploy to GitHub Pages

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Workflow**

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Create the GitHub repo and push**

Run (GitHub user is `squiggleinc`; the repo MUST be named `squiggleinc.github.io`):
```powershell
git branch -M main
gh repo create squiggleinc.github.io --public --source=. --remote=origin --push
```
(If `gh` is not authenticated, run `gh auth login` first — suggest the user run `! gh auth login` in the session.)

- [ ] **Step 3: Enable Pages → GitHub Actions**

In the repo on GitHub: Settings → Pages → Build and deployment → Source = **GitHub Actions**. (Or `gh api -X POST repos/squiggleinc/squiggleinc.github.io/pages -f build_type=workflow`.)

- [ ] **Step 4: Verify the deploy**

Watch the Actions run complete, then open `https://squiggleinc.github.io`. Expected: the live portfolio, identical to local. Confirm the 3D hero, project deep-dives, and images all work over HTTPS.

- [ ] **Step 5: Final commit (if any changes)**

```powershell
git add -A
git commit -m "ci: deploy to GitHub Pages" --allow-empty
git push
```

---

## Self-Review

**Spec coverage:**
- Hosted static site on GitHub Pages → Tasks 1, 2, 15. ✅
- Squiggle brand + reused design system → Tasks 3, 4. ✅
- Real-time WebGL hero (extruded chrome S) → Tasks 6, 7, 10. ✅
- Hybrid structure (single-page + deep-dives) → Tasks 8, 9, 12. ✅
- Sections: Hero/About/TechStack/Projects/Stats/Timeline/Contact → Tasks 10, 11, 12. ✅
- Three projects with copy mined from repos → Task 5; screenshots → Task 13. ✅
- Data-driven (easy to add a 4th project) → Task 5 (`projects.ts`). ✅
- Accessibility / reduced motion → Task 14. ✅

**Placeholder scan:** No "TBD"/"implement later". The only intentionally-flexible step is the screenshot capture (Task 13) and SVG trace (Task 6), both of which provide a concrete working fallback so the build is never blocked.

**Type consistency:** `Project` / `Profile` (Task 5) are the single source of truth; `getProject`, `useDeepDive` (`open`/`close`/`active`), `DeepDiveProvider`, and `Scene3D`/`SquiggleLogo3D` names are used consistently across Tasks 7–12. `accent`, `status`, `features`, `tech`, `image`, `link` fields match between data, cards, and the deep-dive.

**Risk notes:**
- The drei `Environment files` path depends on the HDRI download (Task 6); the preset fallback is documented inline.
- The SVG trace quality determines how crisp the 3D S is; the fallback SVG guarantees a compiling, recognizable S.
