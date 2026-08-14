"use client";

import { forwardRef, useMemo } from "react";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";

function createArrowShape() {
  const s = new THREE.Shape();
  const k = 1 / 80;
  const x = (v: number) => v * k - 0.5;
  const y = (v: number) => 0.5 - v * k;
  s.moveTo(x(26), y(18));
  s.lineTo(x(38), y(18));
  s.lineTo(x(38), y(38));
  s.lineTo(x(50), y(38));
  s.lineTo(x(50), y(28));
  s.lineTo(x(68), y(45.5));
  s.lineTo(x(50), y(64));
  s.lineTo(x(50), y(54));
  s.lineTo(x(26), y(54));
  s.closePath();
  return s;
}

export const StudioKey = forwardRef<THREE.Group, { color?: string; arrow?: string }>(
  function StudioKey({ color = "#FFD23F", arrow = "#15110C" }, ref) {
    const arrowGeo = useMemo(
      () =>
        new THREE.ExtrudeGeometry(createArrowShape(), {
          depth: 0.045,
          bevelEnabled: false,
        }),
      []
    );

    return (
      <group ref={ref}>
        <RoundedBox args={[1, 1, 0.3]} radius={0.18} smoothness={8} castShadow>
          <meshPhysicalMaterial
            color={color}
            roughness={0.32}
            metalness={0.12}
            clearcoat={0.55}
            clearcoatRoughness={0.25}
          />
        </RoundedBox>
        <mesh geometry={arrowGeo} position={[0, 0, 0.132]} castShadow>
          <meshStandardMaterial color={arrow} roughness={0.55} metalness={0.05} />
        </mesh>
      </group>
    );
  }
);
