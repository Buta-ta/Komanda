"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { KomandaKey } from "./KomandaKey";
import type { HeroPhases } from "./phases";

export function Scene({
  frames,
  phases,
}: {
  frames: HTMLImageElement[];
  phases: HeroPhases;
}) {
  const { film, exit, keyIn, press } = phases;
  const plane = useRef<THREE.Mesh>(null);
  const bezel = useRef<THREE.Mesh>(null);
  const texRef = useRef<THREE.CanvasTexture | null>(null);
  const lastIdx = useRef(-1);
  const { camera } = useThree();

  const { texture, ctx, canvas } = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#FFD23F";
    ctx.fillRect(0, 0, 1280, 720);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texRef.current = texture;
    return { texture, ctx, canvas };
  }, []);

  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  useFrame(() => {
    if (frames.length && ctx) {
      const idx = Math.round(film * (frames.length - 1));
      const img = frames[idx];
      if (img && img.complete && img.naturalWidth && idx !== lastIdx.current) {
        lastIdx.current = idx;
        ctx.fillStyle = "#FFD23F";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        texture.needsUpdate = true;
      }
    }

    const x = exit * 5.4;
    const rotY = -exit * 0.72;
    const rotZ = exit * 0.1;
    const z = -exit * 0.35;
    if (plane.current) {
      plane.current.position.set(x, 0.42, z);
      plane.current.rotation.set(0, rotY, rotZ);
    }
    if (bezel.current) {
      bezel.current.position.set(x, 0.42, z - 0.045);
      bezel.current.rotation.set(0, rotY, rotZ);
    }

    const pull = film * 0.35 + exit * 0.85;
    camera.position.set(exit * 0.18, 0.12 + exit * 0.18, 2.02 + pull);
    camera.lookAt(exit * 0.4, 0.2 + keyIn * 0.05, 0);
  });

  const filmOpacity = 1 - exit * 0.15;

  return (
    <>
      <color attach="background" args={["#FFD23F"]} />
      <fog attach="fog" args={["#FFD23F", 7, 18]} />

      <ambientLight intensity={0.85} color="#ffe9a0" />
      <directionalLight
        position={[4.2, 6.2, 4.5]}
        intensity={1.55}
        color="#fff6dd"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-4, 2.2, -2]} intensity={0.35} color="#ffd27a" />
      <pointLight position={[0, 1.4, 2.2]} intensity={0.55} color="#ffe566" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.92, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#E8B01A" roughness={0.92} metalness={0} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.919, 0]}>
        <circleGeometry args={[3.4, 64]} />
        <meshBasicMaterial color="#FFD23F" transparent opacity={0.35} />
      </mesh>

      <mesh ref={bezel} position={[0, 0.42, -0.045]} castShadow>
        <boxGeometry args={[3.36, 1.94, 0.1]} />
        <meshStandardMaterial color="#1A1610" roughness={0.7} metalness={0.15} />
      </mesh>
      <mesh ref={plane} position={[0, 0.42, 0]}>
        <planeGeometry args={[3.2, 1.8]} />
        <meshBasicMaterial map={texture} toneMapped={false} transparent opacity={filmOpacity} />
      </mesh>

      <KomandaKey keyIn={keyIn} press={press} />

      <ContactShadows
        position={[0, -0.9, 0]}
        opacity={0.28 + keyIn * 0.22}
        scale={8}
        blur={2.4}
        far={3.5}
        color="#6a4a00"
      />
    </>
  );
}
