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
        <ambientLight intensity={0.12} />
        {/* key + fill in brand purple, plus a cool rim light for crisp edges */}
        <pointLight position={[6, 5, 6]} intensity={140} color="#a78bfa" />
        <pointLight position={[-7, -2, 3]} intensity={90} color="#4c1d95" />
        <pointLight position={[-3, 4, -6]} intensity={120} color="#e8e8ff" />
        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
            <SquiggleLogo3D />
          </Float>
          {/* Local HDRI present at public/hdri/studio.hdr → use files. */}
          <Environment files="/hdri/studio.hdr" environmentIntensity={0.55} />
        </Suspense>
      </Canvas>
    </div>
  );
}
