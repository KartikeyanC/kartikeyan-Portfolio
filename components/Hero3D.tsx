"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

/**
 * Distorted sphere that idles with a slow rotation and tilts subtly toward
 * the pointer. Loaded via next/dynamic({ ssr:false }) so R3F/Three never
 * enter the server bundle or block first paint.
 */
function Blob() {
  const mesh = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.18;
    mesh.current.rotation.z += delta * 0.04;

    pointer.current.x = state.pointer.x;
    pointer.current.y = state.pointer.y;
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, pointer.current.y * 0.4, 0.05);
    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, pointer.current.x * 0.3, 0.05);
    void viewport;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.9}>
      <mesh ref={mesh} scale={2.1}>
        <icosahedronGeometry args={[1, 24]} />
        <MeshDistortMaterial
          color="#FB542B"
          emissive="#A3278F"
          emissiveIntensity={0.2}
          roughness={0.25}
          metalness={0.6}
          distort={0.42}
          speed={1.6}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} />
        <directionalLight position={[-5, -2, -3]} intensity={0.9} color="#A3278F" />
        <Blob />
        {/* Procedural environment for metallic reflections — no external HDR
            fetch, so it never depends on (or is blocked by) a remote CDN. */}
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={2.2} color="#FF704D" position={[3, 2, 4]} scale={[6, 6, 1]} />
          <Lightformer form="rect" intensity={1.3} color="#4F30AB" position={[-4, -1, 2]} scale={[5, 5, 1]} />
          <Lightformer form="ring" intensity={1.5} color="#ffffff" position={[0, 3, -3]} scale={[4, 4, 1]} />
        </Environment>
      </Suspense>
    </Canvas>
  );
}
