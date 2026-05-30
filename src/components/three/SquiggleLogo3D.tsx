"use client";

import { useMemo, useRef } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import * as THREE from "three";

// Final on-screen height of the logo, in world units (camera-independent).
const TARGET_HEIGHT = 3.0;

export default function SquiggleLogo3D() {
  const spin = useRef<THREE.Group>(null);
  const data = useLoader(SVGLoader, "/squiggle-s.svg");
  const { pointer } = useThree();

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const geometry = useMemo(() => {
    const shapes: THREE.Shape[] = [];
    for (const path of data.paths) {
      shapes.push(...SVGLoader.createShapes(path));
    }

    // Measure the artwork in its own units so the result is independent of the
    // SVG's viewBox (a bigger viewBox must NOT make the model bigger).
    const flat = new THREE.ShapeGeometry(shapes);
    flat.computeBoundingBox();
    const bb = flat.boundingBox!;
    const h = bb.max.y - bb.min.y || 1;
    flat.dispose();

    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: h * 0.16,
      bevelEnabled: true,
      bevelThickness: h * 0.02,
      bevelSize: h * 0.012,
      bevelSegments: 5,
      curveSegments: 32,
    });
    geo.center();

    const s = TARGET_HEIGHT / h;
    geo.scale(s, -s, s); // flip Y (SVG y-down) and normalize size
    geo.computeVertexNormals();
    return geo;
  }, [data]);

  useFrame((_, delta) => {
    if (!spin.current) return;
    if (!reduce) spin.current.rotation.y += delta * 0.3;
    // subtle parallax: tilt toward the cursor, no translation
    const tx = pointer.y * 0.18;
    const tz = pointer.x * 0.12;
    spin.current.rotation.x += (tx - spin.current.rotation.x) * 0.05;
    spin.current.rotation.z += (tz - spin.current.rotation.z) * 0.05;
  });

  return (
    // Outer group offsets the logo to the right so it frames the headline.
    <group position={[2.1, 0.1, 0]}>
      <group ref={spin}>
        <mesh geometry={geometry}>
          <meshStandardMaterial
            color="#b9b0e6"
            metalness={1}
            roughness={0.18}
            envMapIntensity={1.0}
          />
        </mesh>
      </group>
    </group>
  );
}
