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
const [shape, setShape] = useState<"box" | "sphere" | "cone" | "octahedron" | "tetrahedron" | "dodecahedron">("box");

const geometry =
    shape === "box"
    ? new THREE.BoxGeometry(1, 1, 1)
    : shape === "sphere"
    ? new THREE.SphereGeometry(0.7, 32, 32)
    : shape === "cone"
    ? new THREE.ConeGeometry(0.8, 1.4, 32)
    : shape === "octahedron"
    ? new THREE.OctahedronGeometry(0.8, 0)
    : shape === "tetrahedron"
    ? new THREE.TetrahedronGeometry(0.8, 0)
    : new THREE.DodecahedronGeometry(0.8, 0);

return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
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

        {/* Floating controls menu */}
        <div style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            zIndex: 10,
            textAlign: "center",
            color: "white",
            fontFamily: "'Comic Sans MS', cursive, sans-serif"
        }}>
            <h3 style={{
                marginBottom: "16px",
                fontSize: "18px",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                color: "#ffd700"
            }}>🎨 Controles Mágicos</h3>

            <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>🔷 Forma</label>
                <select
                    value={shape}
                    onChange={(e) => setShape(e.target.value as "box" | "sphere" | "cone" | "octahedron" | "tetrahedron" | "dodecahedron")}
                    style={{
                        padding: "8px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        color: "#333",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}
                >
                <option value="box">🟦 Cubo</option>
                <option value="sphere">🔮 Esfera</option>
                <option value="cone">📐 Pirámide</option>
                <option value="octahedron">💎 Octaedro</option>
                <option value="tetrahedron">🔺 Tetraedro</option>
                <option value="dodecahedron">⭐ Dodecaedro</option>
                </select>
            </div>

            <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>🎨 Color</label>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gap: '6px',
                    justifyContent: 'center'
                }}>
                  {[
                    '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b',
                    '#6c5ce7', '#a29bfe', '#fd79a8', '#00b894', '#00cec9', '#e17055',
                    '#ffeaa7', '#fab1a0', '#fdcb6e', '#e84393', '#0984e3', '#6c5ce7'
                  ].map((c) => (
                    <button
                      key={c}
                      style={{
                          backgroundColor: c,
                          width: '32px',
                          height: '32px',
                          border: '2px solid rgba(255,255,255,0.8)',
                          borderRadius: '50%',
                          cursor: 'pointer',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          transition: 'transform 0.2s'
                      }}
                      onClick={() => setColor(c)}
                      title={c}
                      onMouseEnter={(e) => (e.target as HTMLElement).style.transform = 'scale(1.1)'}
                      onMouseLeave={(e) => (e.target as HTMLElement).style.transform = 'scale(1)'}
                    />
                  ))}
                </div>
            </div>

            <div style={{ marginBottom: "12px" }}>
                <label style={{
                    display: "block",
                    marginBottom: "4px",
                    fontWeight: "bold"
                }}>📏 Escala: {scale.toFixed(2)}</label>
                <input
                    type="range"
                    min="0.3"
                    max="2"
                    step="0.01"
                    value={scale}
                    onChange={(e) => setScale(Number(e.target.value))}
                    style={{
                        width: "100%",
                        accentColor: "#ffd700"
                    }}
                />
            </div>

            <div style={{ marginBottom: "8px" }}>
                <label style={{
                    display: "block",
                    marginBottom: "4px",
                    fontWeight: "bold"
                }}>🌪️ Velocidad: {speed.toFixed(2)}</label>
                <input
                    type="range"
                    min="0"
                    max="3"
                    step="0.01"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    style={{
                        width: "100%",
                        accentColor: "#ffd700"
                    }}
                />
            </div>
        </div>
    </div>
);
}
