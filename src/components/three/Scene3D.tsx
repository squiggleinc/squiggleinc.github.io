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
          {/* Local HDRI present at public/hdri/studio.hdr → use files. */}
          <Environment files="/hdri/studio.hdr" />
        </Suspense>
      </Canvas>
    </div>
  );
}
