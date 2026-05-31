"use client";

import { useMemo, useRef } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import * as THREE from "three";

// Final on-screen width of the signature, in world units.
const TARGET_WIDTH = 2.8;

export default function SignatureLogo3D() {
  const tilt = useRef<THREE.Group>(null);
  const data = useLoader(SVGLoader, "/squiggle-signature.svg");
  const { pointer } = useThree();

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const geometry = useMemo(() => {
    const shapes: THREE.Shape[] = [];
    for (const path of data.paths) {
      shapes.push(...SVGLoader.createShapes(path));
    }

    // measure in the artwork's own units so result is viewBox-independent
    const flat = new THREE.ShapeGeometry(shapes);
    flat.computeBoundingBox();
    const bb = flat.boundingBox!;
    const w = bb.max.x - bb.min.x || 1;
    flat.dispose();

    // shallow extrude with a small rounded bevel so the thin gold strokes
    // catch light along their edges without blowing out into blobs
    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: w * 0.013,
      bevelEnabled: true,
      bevelThickness: w * 0.0045,
      bevelSize: w * 0.0028,
      bevelSegments: 4,
      curveSegments: 24,
    });
    geo.center();

    const s = TARGET_WIDTH / w;
    geo.scale(s, -s, s); // flip Y (SVG y-down) + normalize
    geo.computeVertexNormals();
    return geo;
  }, [data]);

  useFrame((state) => {
    if (!tilt.current) return;
    const t = state.clock.elapsedTime;
    const baseTilt = -0.1;
    // gentle sway — never a full spin, so the signature stays readable
    const swayY = reduce ? 0 : Math.sin(t * 0.45) * 0.16;
    const swayX = reduce ? 0 : Math.sin(t * 0.6) * 0.04;
    const targetY = pointer.x * 0.22 + swayY;
    const targetX = baseTilt + pointer.y * 0.1 + swayX;
    tilt.current.rotation.y += (targetY - tilt.current.rotation.y) * 0.05;
    tilt.current.rotation.x += (targetX - tilt.current.rotation.x) * 0.05;
  });

  return (
    <group position={[2.75, 0.5, 0]}>
      <group ref={tilt}>
        <mesh geometry={geometry}>
          <meshPhysicalMaterial
            color="#e3b53f"
            metalness={1}
            roughness={0.24}
            clearcoat={0.85}
            clearcoatRoughness={0.22}
            envMapIntensity={1.6}
          />
        </mesh>
      </group>
    </group>
  );
}
