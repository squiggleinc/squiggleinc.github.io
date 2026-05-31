"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import SignatureLogo3D from "./SignatureLogo3D";

export default function Scene3D({ className }: { className?: string }) {
  return (
    <div className={className ?? "absolute inset-0"}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        {/* warm key + gold fill + soft rim — tuned to make the gold read as gold */}
        <pointLight position={[5, 6, 6]} intensity={220} color="#fff1cf" />
        <pointLight position={[-6, 1, 3]} intensity={130} color="#ffce82" />
        <pointLight position={[-2, 5, -6]} intensity={170} color="#fff6e8" />
        <Suspense fallback={null}>
          <Float speed={1} rotationIntensity={0.06} floatIntensity={0.35}>
            <SignatureLogo3D />
          </Float>
          {/* Local HDRI present at public/hdri/studio.hdr → use files. */}
          <Environment files="/hdri/studio.hdr" environmentIntensity={1.05} />
        </Suspense>
      </Canvas>
    </div>
  );
}
