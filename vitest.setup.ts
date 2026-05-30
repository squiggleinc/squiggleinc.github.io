import "@testing-library/jest-dom/vitest";

// jsdom lacks IntersectionObserver, which framer-motion's whileInView/useInView
// (used by AnimateIn) relies on. Provide a minimal stub for the test environment.
class IntersectionObserverStub {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

if (typeof globalThis.IntersectionObserver === "undefined") {
  globalThis.IntersectionObserver =
    IntersectionObserverStub as unknown as typeof IntersectionObserver;
}
