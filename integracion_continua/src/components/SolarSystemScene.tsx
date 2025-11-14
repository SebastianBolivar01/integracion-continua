/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Ring, Stars } from "@react-three/drei";
import * as THREE from "three";

function Planet(props: {
  name: string;
  color: string;
  size: number;
  distance: number;
  speed: number;
  onClick: (name: string) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const angleRef = useRef(Math.random() * Math.PI * 2);

  useFrame(() => {
    angleRef.current += props.speed;
    meshRef.current.position.x = Math.cos(angleRef.current) * props.distance;
    meshRef.current.position.z = Math.sin(angleRef.current) * props.distance;
  });

  return (
    <mesh ref={meshRef} onClick={() => props.onClick(props.name)} data-testid={`planet-${props.name}`} data-name={props.name}>
      <sphereGeometry args={[props.size, 32, 32]} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
}

function Orbit({ distance }: { distance: number }) {
  return (
    <Ring
      args={[distance - 0.01, distance + 0.01, 128]}
      rotation-x={-Math.PI / 2}
    >
      <meshBasicMaterial
        color="#a7a3a3ff"
        side={THREE.DoubleSide}
        transparent
        opacity={0.5}
      />
    </Ring>
  );
}

export default function SolarSystemScene() {
  const handlePlanetClick = (name: string) => {
    alert(`${name} — planeta del Sistema Solar`);
  };

  const planets = [
    { name: "Mercurio", color: "#b5b5b5", size: 0.2, distance: 2, speed: 0.02 },
    { name: "Venus", color: "#d4af37", size: 0.3, distance: 3, speed: 0.015 },
    { name: "Tierra", color: "#2e77ff", size: 0.32, distance: 4, speed: 0.013 },
    { name: "Marte", color: "#b03030", size: 0.25, distance: 5, speed: 0.011 },
    { name: "Júpiter", color: "#c2b280", size: 0.7, distance: 7, speed: 0.009 },
    { name: "Saturno", color: "#d2b48c", size: 0.6, distance: 9, speed: 0.007 },
    { name: "Urano", color: "#8ad3e6", size: 0.45, distance: 11, speed: 0.006 },
    { name: "Neptuno", color: "#4169e1", size: 0.45, distance: 13, speed: 0.005 },
  ];

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 0]} intensity={1.5} />
        {/* Sol */}
        {/* Fondo de estrellas */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <mesh data-testid="sun">
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshStandardMaterial emissive={"#ffaa00"} emissiveIntensity={1} />
        </mesh>

        {/* Planetas */}
        {planets.map((p) => (
          <Planet key={p.name} {...p} onClick={handlePlanetClick} />
        ))}

        {/* Órbitas */}
        {planets.map((p) => (
          <Orbit key={`orbit-${p.name}`} distance={p.distance} />
        ))}

        <OrbitControls />
      </Canvas>
    </div>
  );
}
