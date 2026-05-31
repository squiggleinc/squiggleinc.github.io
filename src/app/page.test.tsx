import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Stub the WebGL/R3F pieces so jsdom can render the page.
vi.mock("@/components/three/Scene3D", () => ({ default: () => null }));
vi.mock("@/components/effects/WarpBackground", () => ({ default: () => null }));

import Home from "./page";

describe("home page", () => {
  it("renders the name and all section anchors", () => {
    render(<Home />);
    expect(screen.getByText("Vince Sarkis")).toBeInTheDocument();
    // "Squiggle" and "Mindfull Intel" appear in both the Projects grid and the
    // Timeline milestones, so assert at least one match rather than a unique one.
    expect(screen.getAllByText("Squiggle").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Mindfull Intel").length).toBeGreaterThan(0);
  });
});
