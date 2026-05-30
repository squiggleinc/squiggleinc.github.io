"use client";

import { Warp } from "@paper-design/shaders-react";

// Animated Warp shader background, tuned to the Squiggle purple brand ramp.
export default function WarpBackground({ className }: { className?: string }) {
  return (
    <div className={className ?? "fixed inset-0 -z-10"}>
      <Warp
        style={{ height: "100%", width: "100%" }}
        proportion={0.45}
        softness={1}
        distortion={0.25}
        swirl={0.8}
        swirlIterations={10}
        shape="checks"
        shapeScale={0.1}
        scale={1}
        rotation={0}
        speed={1}
        colors={[
          "hsl(258, 72%, 10%)", // near-black violet base (keeps text readable)
          "hsl(263, 70%, 34%)", // #4c1d95 deep purple
          "hsl(258, 88%, 66%)", // #8b5cf6 light purple
          "hsl(255, 92%, 78%)", // #a78bfa glow
        ]}
      />
    </div>
  );
}
