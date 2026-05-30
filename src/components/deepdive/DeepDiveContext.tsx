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
