"use client";

import { useMemo, useRef } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import * as THREE from "three";

export default function SquiggleLogo3D() {
  const group = useRef<THREE.Group>(null);
  const data = useLoader(SVGLoader, "/squiggle-s.svg");
  const { pointer } = useThree();

  const geometry = useMemo(() => {
    const shapes: THREE.Shape[] = [];
    for (const path of data.paths) {
      shapes.push(...SVGLoader.createShapes(path));
    }
    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: 18,
      bevelEnabled: true,
      bevelThickness: 3,
      bevelSize: 2,
      bevelSegments: 6,
    });
    geo.center();
    // SVG Y axis points down; flip so the S is upright.
    geo.scale(0.05, -0.05, 0.05);
    return geo;
  }, [data]);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.35;
    // subtle mouse parallax tilt
    group.current.rotation.x += (pointer.y * 0.25 - group.current.rotation.x) * 0.05;
    group.current.position.x += (pointer.x * 0.3 - group.current.position.x) * 0.05;
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry} castShadow>
        <meshStandardMaterial
          color="#c8c8d0"
          metalness={1}
          roughness={0.18}
          envMapIntensity={1.4}
        />
      </mesh>
    </group>
  );
}
