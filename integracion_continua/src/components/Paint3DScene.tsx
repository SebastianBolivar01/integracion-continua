import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface PaintPoint {
  position: THREE.Vector3;
  color: string;
}

export default function Paint3DScene() {
  const [points, setPoints] = useState<PaintPoint[]>([]);
  const [currentColor, setCurrentColor] = useState("#ff0000");
  const meshRef = useRef<THREE.Mesh>(null);

  const handleCanvasClick = (event: any) => {
    if (event.intersections.length > 0) {
      const point = event.intersections[0].point;
      const newPoint: PaintPoint = {
        position: point.clone(),
        color: currentColor,
      };
      setPoints([...points, newPoint]);
    }
  };

  return (
    <div style={{ display: "flex", gap: 12 }}>
      <div style={{ width: "70vw", height: "60vh" }}>
        <Canvas camera={{ position: [0, 0, 5] }} onClick={handleCanvasClick}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <OrbitControls />

          {/* Painted points */}
          {points.map((point, index) => (
            <mesh key={index} position={point.position}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial color={point.color} />
            </mesh>
          ))}

          {/* Invisible plane for clicking */}
          <mesh ref={meshRef} visible={false}>
            <planeGeometry args={[10, 10]} />
            <meshBasicMaterial />
          </mesh>
        </Canvas>
      </div>

      <div style={{ width: 240 }}>
        <h3>Controles de Pintura</h3>
        <label>Color</label>
        <input
          type="color"
          value={currentColor}
          onChange={(e) => setCurrentColor(e.target.value)}
        />

        <button
          onClick={() => setPoints([])}
          style={{ marginTop: 10, padding: "8px 16px", background: "#f44336", color: "white", border: "none", borderRadius: 4 }}
        >
          Limpiar
        </button>

        <p style={{ marginTop: 10, fontSize: "14px" }}>
          Haz clic en el espacio 3D para pintar puntos de color.
        </p>
      </div>
    </div>
  );
}