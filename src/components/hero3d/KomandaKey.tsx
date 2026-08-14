"use client";

import { useMemo } from "react";
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

export function KomandaKey({
  keyIn,
  press,
}: {
  keyIn: number;
  press: number;
}) {
  const arrowGeo = useMemo(
    () =>
      new THREE.ExtrudeGeometry(createArrowShape(), {
        depth: 0.045,
        bevelEnabled: false,
      }),
    []
  );

  const y = 0.22 + (1 - keyIn) * 1.65 - press * 0.09;
  const rotX = 0.42 - keyIn * 0.18 - press * 0.1;
  const rotY = -0.55 + keyIn * 0.55;
  const rotZ = 0.12 - keyIn * 0.08;
  const scale = 0.72 + keyIn * 0.18;

  return (
    <group
      position={[0, y, 0.15]}
      rotation={[rotX, rotY, rotZ]}
      scale={scale}
      visible={keyIn > 0.01}
    >
      <RoundedBox args={[1, 1, 0.3]} radius={0.18} smoothness={8} castShadow>
        <meshPhysicalMaterial
          color="#FFD23F"
          roughness={0.32}
          metalness={0.12}
          clearcoat={0.55}
          clearcoatRoughness={0.25}
        />
      </RoundedBox>
      <mesh geometry={arrowGeo} position={[0, 0, 0.132]} castShadow>
        <meshStandardMaterial color="#15110C" roughness={0.55} metalness={0.05} />
      </mesh>
    </group>
  );
}
