// src/components/ShapesScene.tsx
import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Shapes, Wand2 } from "lucide-react";

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
    <mesh ref={ref} geometry={geometry} scale={[scale, scale, scale]} castShadow>
    <meshStandardMaterial color={color} />
    </mesh>
);
}

export default function ShapesScene() {
const [color, setColor] = useState("#ff5555");
const [scale, setScale] = useState(1);
const [speed, setSpeed] = useState(0.8);
const platonicFaces = [4, 6, 8, 12, 20];
const [faceIndex, setFaceIndex] = useState(0);
const faceCount = platonicFaces[faceIndex];

const getShapeFromFaces = (faces: number): "tetrahedron" | "box" | "octahedron" | "dodecahedron" | "icosahedron" => {
  switch (faces) {
    case 4: return "tetrahedron";
    case 6: return "box";
    case 8: return "octahedron";
    case 12: return "dodecahedron";
    case 20: return "icosahedron";
    default: return "tetrahedron";
  }
};

const getShapeName = (faces: number): string => {
  switch (faces) {
    case 4: return "Tetraedro";
    case 6: return "Cubo";
    case 8: return "Octaedro";
    case 12: return "Dodecaedro";
    case 20: return "Icosaedro";
    default: return "Tetraedro";
  }
};

const shape = getShapeFromFaces(faceCount);

// Crear textura de damero
const checkerTexture = useMemo(() => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext('2d')!;
  const size = 8;
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      context.fillStyle = (x + y) % 2 === 0 ? '#ffffff' : '#cccccc';
      context.fillRect(x * size, y * size, size, size);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}, []);

const geometry =
    shape === "tetrahedron"
    ? new THREE.TetrahedronGeometry(0.8, 0)
    : shape === "box"
    ? new THREE.BoxGeometry(1, 1, 1)
    : shape === "octahedron"
    ? new THREE.OctahedronGeometry(0.8, 0)
    : shape === "dodecahedron"
    ? new THREE.DodecahedronGeometry(0.8, 0)
    : shape === "icosahedron"
    ? new THREE.IcosahedronGeometry(0.8, 0)
    : shape === "sphere"
    ? new THREE.SphereGeometry(0.7, 32, 32)
    : new THREE.ConeGeometry(0.8, 1.4, 32);

return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <Canvas camera={{ position: [0, 1.25, 2.5] }} shadows>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
        <RotatingMesh
            geometry={geometry}
            color={color}
            scale={scale}
            rotationSpeed={speed}
        />

        {/* Plano para recibir sombras */}
        <mesh receiveShadow position={[0, -1.5, 0]} rotation-x={-Math.PI / 2}>
            <planeGeometry args={[7, 7]} />
            <meshStandardMaterial map={checkerTexture} />
        </mesh>

        </Canvas>

        {/* Nombre de la figura en el centro */}
        <div style={{
            position: "absolute",
            top: "80%",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "white",
            color: "black",
            fontSize: "2rem",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "20px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
            pointerEvents: "none",
            zIndex: 5
        }}>
            {getShapeName(faceCount)}
        </div>
        {/* Floating controls menu */}
        <div className="font-sans bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/50 text-cyan-100 absolute top-1/2 left-[90%] transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-2xl shadow-lg z-10 text-center flex flex-col items-center">
            <h3 style={{
                marginBottom: "8px",
                fontSize: "18px",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                color: "#ffd700"
            }}><Wand2 className="inline mr-2" /> <span className="font-display">Controles Mágicos</span></h3>
            <p style={{
                marginBottom: "16px",
                fontSize: "14px",
                color: "#ffffff",
                textAlign: "center"
            }}>Sólidos Platónicos</p>

            <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", textAlign: "center" }}><Shapes style={{ display: "inline", marginRight: "4px" }} /> Número de Caras</label>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px" }}>
                    <button
                        onClick={() => setFaceIndex(Math.max(0, faceIndex - 1))}
                        style={{
                            padding: "8px 12px",
                            borderRadius: "8px",
                            border: "none",
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            color: "#333",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}
                    >
                        ➖
                    </button>
                    <span style={{
                        padding: "8px 16px",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "8px",
                        color: "#333",
                        fontWeight: "bold",
                        minWidth: "40px",
                        textAlign: "center"
                    }}>{faceCount}</span>
                    <button
                        onClick={() => setFaceIndex(Math.min(platonicFaces.length - 1, faceIndex + 1))}
                        style={{
                            padding: "8px 12px",
                            borderRadius: "8px",
                            border: "none",
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            color: "#333",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}
                    >
                        ➕
                    </button>
                </div>
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
