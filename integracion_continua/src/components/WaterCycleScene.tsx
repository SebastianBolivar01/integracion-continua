import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Droplet({ startY }: { startY: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.position.y = startY + Math.sin(t * 2) * 1.5;
  });

  return (
    <mesh ref={ref} position={[0, startY, 0]}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial color="#00aaff" />
    </mesh>
  );
}

export default function WaterCycleScene() {
  return (
    <div style={{ width: "70vw", height: "70vh" }}>
      <Canvas camera={{ position: [0, 3, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Mar */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#1e90ff" />
        </mesh>

        {/* Montaña */}
        <mesh position={[-2, 0, 0]}>
          <coneGeometry args={[1, 2, 32]} />
          <meshStandardMaterial color="#654321" />
        </mesh>

        {/* Nube */}
        <group position={[2, 2, 0]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.6, 16, 16]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.6, 0, 0]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[-0.6, 0, 0]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* Gotas animadas */}
        {[...Array(6)].map((_, i) => (
          <Droplet key={i} startY={Math.random() * 2} />
        ))}

        <OrbitControls />
      </Canvas>
    </div>
  );
}
