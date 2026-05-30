# Vincent Sarkis — Portfolio Site — Design Spec

**Date:** 2026-05-29
**Author:** Vincent Sarkis (with Claude)
**Status:** Approved design — ready for implementation plan
**Live URL (target):** `https://squiggleinc.github.io`

---

## 1. Purpose

A hosted portfolio website to showcase the projects Vincent has built — "ideas brought to
life." Primary audience is **general** (network, peers, the curious); the goal is the
**cool factor and the builds themselves**, not job-hunting or sales. The site is the star.

## 2. Goals & Non-Goals

**Goals**
- Futuristic, effects-heavy, "techy" aesthetic inspired by `sr006.tonik.com`.
- Showcase three builds: **Squiggle**, **TradoGotchi**, **Mindfull-Intel**.
- Brand-consistent with the existing Squiggle-Website design system.
- Free hosting on GitHub Pages at `squiggleinc.github.io`.
- Easy to add a 4th project later (data-driven).

**Non-Goals (YAGNI)**
- No backend, database, or server-side rendering.
- No CMS, blog, or analytics.
- No contact-form server — contact is `mailto:` + social links.
- No custom domain at launch (can be connected later with zero rebuild).

## 3. Audience & Tone

- Audience: general visitors; "look what I've made" energy.
- Identity framing: **Founder / Creator** who brings ideas to life.
- Display name: **Vincent Sarkis**.

## 4. Brand & Visual Language

Inherited from `Squiggle-Website` (`src/app/globals.css`).

**Palette**
```
Black base    #0a0a0a    Card #111111    Border #1f1f1f
Off-white     #f0f0f0
Purple deep   #4c1d95  →  mid #6d28d9  →  light #8b5cf6  →  glow #a78bfa
Silver        #c0c0c0    light #e8e8e8    dim #888888
```

**Reused design-system primitives (port from Squiggle-Website):**
- `ShaderBackground` WebGL component (fixed, full-screen, low opacity).
- `.glass-card` / `.glass-card-purple`, `.gradient-text` / `.gradient-text-purple`.
- Glow utilities (`.glow-purple`, `.glow-purple-sm`, `.text-glow`), `.noise` overlay.
- `ShimmerButton` for primary CTAs.
- **Framer Motion** for reveal/stagger animations; **Lenis** for smooth scroll.
- Fonts: Geist Sans (body), Geist Mono (mono accents), display font for wordmark.

**Aesthetic target (Tonik / sr006-style):** real-time WebGL, animated chrome/glass 3D
object in the hero, kinetic typography, scroll-reveal, parallax, soft glows, mono accents
for a "terminal" feel.

## 5. Structure (Hybrid)

One cinematic **single-page scrolling overview**; each project opens a **full-screen
immersive deep-dive** (animated overlay/route) with a back gesture returning to scroll
position.

**Overview scroll order:**
1. **Hero** — "Vincent Sarkis", Founder/Creator tagline, real-time WebGL background +
   animated 3D object, scroll cue.
2. **About** — short bio / how Vincent brings ideas to life.
3. **Tech stack** — animated band of tools/technologies.
4. **Projects** — three large interactive cards; each opens a deep-dive.
5. **Stats / Timeline** — animated counters + journey timeline (milestones, projects shipped).
6. **Contact** — `saleemsarkis916@proton.me` + GitHub (`squiggleinc`) / social links, glowing CTA.

## 6. Project Deep-Dive (per build)

Full-screen immersive view containing:
- Project name + one-line hook.
- The idea / problem it solves.
- What it does (key features).
- The tech behind it.
- Screenshot / stylized mockup.
- Link (live URL and/or repo) where available.

**Content sourcing:** mine each repo for accurate copy and existing images:
- Squiggle → `C:\Users\17029\Squiggle-Website`
- TradoGotchi → `C:\Users\17029\tradogotchi-server`
- Mindfull-Intel → `C:\Users\17029\Ecommerce\mindfull-intel`

## 7. 3D Approach

**Real-time WebGL** via **React Three Fiber** (+ drei, custom shaders) as the backbone —
interactive, lightweight, no render pipeline. Built using the **Magic (21st.dev)** MCP for
component scaffolding and **Context7** for R3F/Three.js/GSAP docs. No external 3D API keys
required at launch. fal.ai / Blender remain optional future add-ons for baked hero assets.

**Hero 3D object (decided):** the **Squiggle "S" mark**, extruded into a 3D solid.
- Vectorize `Squiggle-Website/public/squiggle-icon.png` → clean SVG outline (or use the
  original SVG if obtainable).
- `SVGLoader` → `ExtrudeGeometry` with a soft bevel.
- Chrome/glass material + **HDRI environment map** for liquid highlights; tinted with the
  brand gradient (`#8b5cf6 → #4c1d95 → navy`) so it reads as Squiggle.
- Slow auto-rotate + subtle mouse-parallax tilt (Tonik-style).
- The "cube look" is achieved via **material + HDRI reflections + lighting**, not geometry.

## 8. Architecture

- **Next.js (App Router) + TypeScript + Tailwind v4** (match Squiggle's setup).
- **Static export:** `next.config.ts` with `output: 'export'`, `images: { unoptimized: true }`.
- **User/org GitHub Pages site** (`squiggleinc.github.io`) serves at root → **no `basePath`**.
- Project content in **typed data files** (one object per project) as the single source of
  truth driving both cards and deep-dives — adding a project = adding a data entry + assets.
- Small, focused components: `Hero`, `About`, `TechStack`, `ProjectCard`, `ProjectDeepDive`,
  `Stats`, `Timeline`, `Contact`, plus shared effect primitives ported from Squiggle
  (`ShaderBackground`, `ShimmerButton`, animation wrappers) and a `Scene3D` (R3F) primitive.
- Images/screenshots in `public/`.
- Respect `prefers-reduced-motion`; effects gracefully reduce on mobile.

## 9. Hosting & Deploy

- New repo named **`squiggleinc.github.io`**.
- **GitHub Actions** workflow: on push to `main`, build the static export and publish to
  **GitHub Pages**.
- Add a `.nojekyll` file so `_next/` assets are served correctly.
- Custom domain (e.g. `vincentsarkis.com`) optional later — add a `CNAME` file, no rebuild.

## 10. Open Items for the Implementation Plan

- Exact project copy + which screenshots/links exist (resolved by mining each repo).
- Vectorize the Squiggle "S" PNG → SVG for the hero extrude (or source the original SVG).
- Which Squiggle components port cleanly vs. need adaptation.

---

## Decisions Log (from brainstorming)

| Decision | Choice |
|---|---|
| Form | Hosted portfolio website |
| Audience | General — show off the builds |
| Identity | Founder / Creator; name "Vincent Sarkis" |
| Projects | Squiggle, TradoGotchi, Mindfull-Intel (just these for now) |
| Sections | Hero, About, Tech stack, Projects, Stats/Timeline, Contact |
| Structure | Hybrid (single-page overview + project deep-dives) |
| Assets | Pull copy/images from the repos |
| Style | Futuristic/techy, Tonik sr006-inspired, Squiggle brand |
| Brand colors | Squiggle palette (black + 4 purples + silver + off-white) |
| 3D | Real-time WebGL (React Three Fiber), built via Magic + Context7 |
| Hosting | GitHub Pages, `squiggleinc.github.io`, static export |
