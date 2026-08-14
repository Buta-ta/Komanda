"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { cameraAt, chapters } from "./chapters";
import { useHtmlImage, useUrlTex } from "./useUrlTex";
import { StudioKey } from "./StudioKey";

const SHOWROOM = [
  "/showroom/delices.jpg",
  "/showroom/menard.jpg",
  "/showroom/fatou.jpg",
  "/showroom/lumiere.jpg",
  "/showroom/pharmacie.jpg",
  "/showroom/koa.jpg",
];

function makeCard(title: string, price: string, tag: string, accent: string) {
  const c = document.createElement("canvas");
  c.width = 768;
  c.height = 960;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#FFF8E4";
  ctx.fillRect(0, 0, 768, 960);
  ctx.fillStyle = accent;
  ctx.fillRect(0, 0, 768, 18);
  ctx.fillStyle = "#15110C";
  ctx.font = "700 28px system-ui";
  ctx.fillText(tag.toUpperCase(), 56, 120);
  ctx.font = "800 72px Georgia";
  ctx.fillText(title, 56, 220);
  ctx.font = "800 86px Georgia";
  ctx.fillStyle = "#E8A317";
  ctx.fillText(price, 56, 360);
  ctx.fillStyle = "#15110C";
  ctx.font = "600 28px system-ui";
  ctx.fillText("CFA", 56, 410);
  ctx.fillStyle = "rgba(21,17,12,.55)";
  ctx.font = "500 26px system-ui";
  const lines = [
    "Livré. Administrable.",
    "Paiement Mobile Money.",
    "Afrique de l'Ouest & Centrale.",
  ];
  lines.forEach((l, i) => ctx.fillText(l, 56, 560 + i * 44));
  ctx.fillStyle = "#FFD23F";
  roundRect(ctx, 56, 780, 280, 72, 36);
  ctx.fill();
  ctx.fillStyle = "#15110C";
  ctx.font = "700 26px system-ui";
  ctx.fillText("Composer  →", 92, 826);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeAudit() {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 640;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#0c0b09";
  ctx.fillRect(0, 0, 1024, 640);
  ctx.fillStyle = "#FFD23F";
  ctx.font = "700 22px ui-monospace, monospace";
  ctx.fillText("scan · komanda", 48, 56);
  const rows = [
    ["perf", 61],
    ["ux mobile", 54],
    ["seo", 73],
    ["sécu", 80],
  ] as const;
  rows.forEach(([k, v], i) => {
    ctx.fillStyle = "rgba(255,210,63,.85)";
    ctx.font = "500 28px ui-monospace, monospace";
    ctx.fillText(k.padEnd(14, " "), 48, 160 + i * 70);
    ctx.fillStyle = "rgba(255,255,255,.08)";
    ctx.fillRect(360, 140 + i * 70, 400, 10);
    ctx.fillStyle = "#FFD23F";
    ctx.fillRect(360, 140 + i * 70, 400 * (v / 100), 10);
    ctx.fillText(String(v), 780, 152 + i * 70);
  });
  ctx.fillStyle = "#fff";
  ctx.font = "800 96px Georgia";
  ctx.fillText("67", 48, 560);
  ctx.fillStyle = "rgba(255,255,255,.4)";
  ctx.font = "600 32px Georgia";
  ctx.fillText("/100", 200, 548);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function World({
  frames,
  progressRef,
  cards: cardData = [],
}: {
  frames: HTMLImageElement[];
  progressRef: React.MutableRefObject<number>;
  cards?: { title: string; price: string; tag: string; accent: string }[];
}) {
  const photo = useRef<THREE.Group>(null);
  const keyMain = useRef<THREE.Group>(null);
  const keyHow = [useRef<THREE.Group>(null), useRef<THREE.Group>(null), useRef<THREE.Group>(null)];
  const cat = useRef<THREE.Mesh>(null);
  const dog = useRef<THREE.Mesh>(null);
  const products = useRef<THREE.Group>(null);
  const gallery = useRef<THREE.Group>(null);
  const phone = useRef<THREE.Mesh>(null);
  const audit = useRef<THREE.Mesh>(null);
  const lastIdx = useRef(-1);
  const { camera } = useThree();
  const persp = camera as THREE.PerspectiveCamera;

  const catTex = useUrlTex("/film/cat.png");
  const dogTex = useUrlTex("/film/dog.png");
  const keybTex = useUrlTex("/film/keyboard.png");
  const chatTex = useUrlTex("/film/ui-chat.jpg");
  const siteImg = useHtmlImage("/film/ui-site.jpg");
  const g0 = useUrlTex(SHOWROOM[0]);
  const g1 = useUrlTex(SHOWROOM[1]);
  const g2 = useUrlTex(SHOWROOM[2]);
  const g3 = useUrlTex(SHOWROOM[3]);
  const g4 = useUrlTex(SHOWROOM[4]);
  const g5 = useUrlTex(SHOWROOM[5]);
  const galleryTex = [g0, g1, g2, g3, g4, g5];

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
    return { texture, ctx, canvas };
  }, []);

  const cards = useMemo(
    () => [
      makeCard("Vitrine", "10 000", "72 heures · site", "#FFD23F"),
      makeCard("3D Motion", "15 000", "Populaire · site", "#15110C"),
      makeCard("Application", "50 000", "14 jours · app", "#3D5AFE"),
      makeCard("Audit", "12 000", "72 heures · scan", "#FF6B4A"),
    ],
    []
  );
  const auditTex = useMemo(() => makeAudit(), []);

  useEffect(() => {
    return () => {
      texture.dispose();
      cards.forEach((c) => c.dispose());
      auditTex.dispose();
    };
  }, [texture, cards, auditTex]);

  useFrame(() => {
    const p = progressRef.current;
    const ch = chapters(p);
    const cam = cameraAt(p);
    persp.position.set(cam.pos[0], cam.pos[1], cam.pos[2]);
    persp.lookAt(cam.look[0], cam.look[1], cam.look[2]);
    persp.fov = cam.fov;
    persp.updateProjectionMatrix();

    if (frames.length && ctx) {
      const idx = Math.round(ch.film * (frames.length - 1));
      const img = frames[idx];
      if (img && img.complete && img.naturalWidth && idx !== lastIdx.current) {
        lastIdx.current = idx;
        ctx.fillStyle = "#FFD23F";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        if (siteImg && ch.film > 0.42) {
          const a = Math.min(1, (ch.film - 0.42) / 0.4);
          ctx.save();
          ctx.globalAlpha = a * 0.95;
          ctx.drawImage(siteImg, canvas.width * 0.465, canvas.height * 0.305, canvas.width * 0.292, canvas.height * 0.355);
          ctx.restore();
        }
        texture.needsUpdate = true;
      }
    }

    if (photo.current) {
      photo.current.position.set(ch.exit * 6.2, 0.38, -ch.exit * 0.4);
      photo.current.rotation.set(0, -ch.exit * 0.85, ch.exit * 0.08);
      photo.current.visible = ch.exit < 0.98;
    }

    if (keyMain.current) {
      const hide = ch.how * 0.85 + ch.offers + ch.show + ch.agent + ch.audit;
      const back = ch.cta;
      const show = Math.max(ch.keyIn - hide + back, 0);
      const y = 0.22 + (1 - ch.keyIn) * 1.7 - ch.press * 0.1 + ch.cta * 0.02;
      keyMain.current.position.set(0, y, 0.12);
      keyMain.current.rotation.set(0.4 - ch.keyIn * 0.16 - ch.press * 0.1, -0.5 + ch.keyIn * 0.5, 0.1 - ch.keyIn * 0.08);
      const s = (0.7 + ch.keyIn * 0.2 + ch.cta * 0.15) * (show > 0.02 ? 1 : 0);
      keyMain.current.scale.setScalar(Math.max(s, 0.001));
      keyMain.current.visible = show > 0.02;
    }

    keyHow.forEach((ref, i) => {
      const g = ref.current;
      if (!g) return;
      const t = ch.how * (1 - ch.offers * 0.9);
      const x = (i - 1) * 1.35;
      g.position.set(x, -0.05 + t * 0.35, -0.55);
      g.rotation.set(0.25, 0.15 - i * 0.12, 0);
      g.scale.setScalar(0.001 + t * 0.55);
      g.visible = t > 0.02;
    });

    if (cat.current) {
      const t = ch.witnesses;
      const wander = ch.offers * 0.4 + ch.show * 0.2;
      cat.current.position.set(-1.85 - wander * 0.3 + ch.cta * 0.5, -0.18, 0.55 - ch.agent * 0.2);
      cat.current.rotation.set(0, 0.35 + ch.agent * 0.4, 0);
      (cat.current.material as THREE.MeshBasicMaterial).opacity = t;
      cat.current.visible = t > 0.02;
    }
    if (dog.current) {
      const t = ch.witnesses;
      dog.current.position.set(-0.95 + ch.how * 0.15 + ch.cta * 0.55, -0.28, 0.85 - ch.show * 0.15);
      dog.current.rotation.set(0, 0.45 + ch.offers * 0.2, 0);
      (dog.current.material as THREE.MeshBasicMaterial).opacity = t;
      dog.current.visible = t > 0.02;
    }

    if (products.current) {
      const t = ch.offers * (1 - ch.show * 0.95);
      products.current.position.set(0, 0.15 + t * 0.1, -1.1);
      products.current.scale.setScalar(0.001 + t);
      products.current.visible = t > 0.02;
      products.current.rotation.y = -0.12 + ch.offers * 0.08;
    }

    if (gallery.current) {
      const t = ch.show * (1 - ch.agent * 0.95);
      gallery.current.position.set(0.2, 0.25, -1.8);
      gallery.current.scale.setScalar(0.001 + t);
      gallery.current.visible = t > 0.02;
      gallery.current.rotation.y = -0.2 + ch.show * 0.15;
    }

    if (phone.current) {
      const t = ch.agent * (1 - ch.audit * 0.95);
      phone.current.position.set(0.15, 0.18 + t * 0.08, 0.05);
      phone.current.rotation.set(-0.08, 0.18, 0.02);
      phone.current.scale.setScalar(0.001 + t * 1.15);
      phone.current.visible = t > 0.02;
    }

    if (audit.current) {
      const t = ch.audit * (1 - ch.cta * 0.95);
      audit.current.position.set(0, 0.32, -0.2);
      audit.current.rotation.set(-0.12, -0.2, 0);
      audit.current.scale.setScalar(0.001 + t);
      audit.current.visible = t > 0.02;
    }
  });

  return (
    <>
      <color attach="background" args={["#FFD23F"]} />
      <fog attach="fog" args={["#FFD23F", 8, 22]} />

      <ambientLight intensity={0.88} color="#ffe9a0" />
      <directionalLight
        position={[4.4, 6.4, 4.2]}
        intensity={1.5}
        color="#fff6dd"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-5, 2, -2]} intensity={0.32} color="#ffd27a" />
      <pointLight position={[0, 1.6, 2]} intensity={0.5} color="#ffe566" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.92, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#E8B01A" roughness={0.92} />
      </mesh>
      <mesh position={[0, 2.2, -5.2]}>
        <planeGeometry args={[40, 14]} />
        <meshStandardMaterial color="#FFD23F" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.918, 0]}>
        <circleGeometry args={[3.6, 64]} />
        <meshBasicMaterial color="#FFD23F" transparent opacity={0.32} />
      </mesh>

      {keybTex && (
        <mesh position={[0.15, 1.72, -5.05]}>
          <planeGeometry args={[2.15, 1.2]} />
          <meshBasicMaterial map={keybTex} toneMapped={false} />
        </mesh>
      )}

      <group ref={photo}>
        <mesh position={[0, 0, -0.03]} castShadow>
          <boxGeometry args={[4.02, 2.27, 0.06]} />
          <meshStandardMaterial color="#1A1610" roughness={0.75} />
        </mesh>
        <mesh>
          <planeGeometry args={[4.0, 2.25]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>

      {catTex && (
        <mesh ref={cat} scale={[2.15, 1.2, 1]} visible={false}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={catTex} toneMapped={false} transparent opacity={0} />
        </mesh>
      )}
      {dogTex && (
        <mesh ref={dog} scale={[2.0, 1.12, 1]} visible={false}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={dogTex} toneMapped={false} transparent opacity={0} />
        </mesh>
      )}

      <StudioKey ref={keyMain} />
      <StudioKey ref={keyHow[0]} color="#FFF6DD" />
      <StudioKey ref={keyHow[1]} />
      <StudioKey ref={keyHow[2]} color="#15110C" arrow="#FFD23F" />

      <group ref={products} visible={false}>
        {cards.map((tex, i) => (
          <mesh key={i} position={[(i - 1.5) * 1.35, 0.1, i % 2 === 0 ? 0 : -0.15]} rotation={[0, 0.08 - i * 0.04, 0]}>
            <planeGeometry args={[1.15, 1.44]} />
            <meshBasicMaterial map={tex} toneMapped={false} />
          </mesh>
        ))}
      </group>

      <group ref={gallery} visible={false}>
        {galleryTex.map((tex, i) =>
          tex ? (
            <mesh
              key={i}
              position={[(i - 2.5) * 1.28, (i % 2) * 0.18, -Math.abs(i - 2.5) * 0.12]}
              rotation={[0, (i - 2.5) * -0.08, 0]}
            >
              <planeGeometry args={[1.15, 0.72]} />
              <meshBasicMaterial map={tex} toneMapped={false} />
            </mesh>
          ) : null
        )}
      </group>

      {chatTex && (
        <mesh ref={phone} visible={false}>
          <planeGeometry args={[2.4, 1.35]} />
          <meshBasicMaterial map={chatTex} toneMapped={false} />
        </mesh>
      )}

      <mesh ref={audit} visible={false}>
        <planeGeometry args={[2.6, 1.62]} />
        <meshBasicMaterial map={auditTex} toneMapped={false} />
      </mesh>

      <ContactShadows position={[0, -0.9, 0]} opacity={0.32} scale={12} blur={2.6} far={4} color="#6a4a00" />
    </>
  );
}
