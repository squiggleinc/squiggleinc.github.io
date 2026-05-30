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
