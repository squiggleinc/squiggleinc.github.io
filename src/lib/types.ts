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
