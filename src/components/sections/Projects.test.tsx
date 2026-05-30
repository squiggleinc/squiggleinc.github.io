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
