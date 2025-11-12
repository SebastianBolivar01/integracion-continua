// src/components/ShapesScene.tsx
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface RotatingMeshProps {
    geometry: THREE.BufferGeometry;
    color: string;
    scale: number;
    rotationSpeed: number;
}

function RotatingMesh({ geometry, color, scale, rotationSpeed }: RotatingMeshProps) {
const ref = useRef<THREE.Mesh>(null);
useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += rotationSpeed * delta;
});
return (
    <mesh ref={ref} geometry={geometry} scale={[scale, scale, scale]}>
    <meshStandardMaterial color={color} />
    </mesh>
);
}

export default function ShapesScene() {
const [color, setColor] = useState("#ff5555");
const [scale, setScale] = useState(1);
const [speed, setSpeed] = useState(0.8);
const [shape, setShape] = useState<"box" | "sphere" | "cone">("box");

const geometry =
    shape === "box"
    ? new THREE.BoxGeometry(1, 1, 1)
    : shape === "sphere"
    ? new THREE.SphereGeometry(0.7, 32, 32)
    : new THREE.ConeGeometry(0.8, 1.4, 32);

return (
    <div style={{ display: "flex", gap: 12 }}>
    <div style={{ width: "60vw", height: "60vh" }}>
        <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <RotatingMesh
            geometry={geometry}
            color={color}
            scale={scale}
            rotationSpeed={speed}
        />
        <OrbitControls />
        </Canvas>
    </div>

    <div style={{ width: 240 }}>
        <h3>Controles</h3>
        <label>Forma</label>
        <select value={shape} onChange={(e) => setShape(e.target.value as "box" | "sphere" | "cone")}>
        <option value="box">Cubo</option>
        <option value="sphere">Esfera</option>
        <option value="cone">Pirámide</option>
        </select>

        <label>Color</label>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />

        <label>Escala: {scale.toFixed(2)}</label>
        <input type="range" min="0.3" max="2" step="0.01" value={scale} onChange={(e) => setScale(Number(e.target.value))} />

        <label>Velocidad rotación: {speed.toFixed(2)}</label>
        <input type="range" min="0" max="3" step="0.01" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
    </div>
    </div>
);
}
