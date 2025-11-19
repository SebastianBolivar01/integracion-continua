// integracion_continua/src/components/PaintScene.tsx
import { useRef, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";
import { Palette, Brush } from "lucide-react";

interface PaintSceneProps {}

function DrawingPlane({ brushColor, brushSize }: { brushColor: string; brushSize: number }) {
  const { camera, scene, raycaster, pointer } = useThree();
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState<THREE.Vector3[]>([]);
  const [lines, setLines] = useState<THREE.Vector3[][]>([]);

  const planeRef = useRef<THREE.Mesh>(null);

  const handlePointerDown = useCallback((event: any) => {
    event.stopPropagation();
    setIsDrawing(true);
    const point = new THREE.Vector3();
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObject(planeRef.current!);
    if (intersects.length > 0) {
      point.copy(intersects[0].point);
      setCurrentLine([point]);
    }
  }, [camera, pointer, raycaster]);

  const handlePointerMove = useCallback((event: any) => {
    if (!isDrawing) return;
    const point = new THREE.Vector3();
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObject(planeRef.current!);
    if (intersects.length > 0) {
      point.copy(intersects[0].point);
      setCurrentLine(prev => [...prev, point]);
    }
  }, [isDrawing, camera, pointer, raycaster]);

  const handlePointerUp = useCallback(() => {
    if (isDrawing && currentLine.length > 1) {
      setLines(prev => [...prev, currentLine]);
    }
    setIsDrawing(false);
    setCurrentLine([]);
  }, [isDrawing, currentLine]);

  return (
    <>
      <mesh
        ref={planeRef}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        receiveShadow
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      {lines.map((line, index) => (
        <Line
          key={index}
          points={line}
          color={brushColor}
          lineWidth={brushSize * 100}
        />
      ))}
      {isDrawing && currentLine.length > 1 && (
        <Line
          points={currentLine}
          color={brushColor}
          lineWidth={brushSize * 100}
        />
      )}
    </>
  );
}

export default function PaintScene({}: PaintSceneProps) {
  const [brushColor, setBrushColor] = useState("#ff0000");
  const [brushSize, setBrushSize] = useState(0.01);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas camera={{ position: [0, 8, 0] }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 0]} intensity={1} castShadow />
        <DrawingPlane brushColor={brushColor} brushSize={brushSize} />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={false} />
      </Canvas>

      {/* Floating controls menu */}
      <div className="font-sans bg-pink-500/20 backdrop-blur-sm border border-pink-400/50 text-pink-100 absolute top-1/2 left-[90%] transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-2xl shadow-lg z-10 text-center flex flex-col items-center">
        <h3 style={{
          marginBottom: "8px",
          fontSize: "18px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          color: "#ffd700"
        }}><Brush className="inline mr-2" /> <span className="font-display">Herramientas de Pintura</span></h3>

        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>🎨 Color del Pincel</label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '6px',
            justifyContent: 'center'
          }}>
            {[
              '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
              '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b',
              '#6c5ce7', '#a29bfe', '#fd79a8', '#00b894', '#00cec9', '#e17055'
            ].map((c) => (
              <button
                key={c}
                style={{
                  backgroundColor: c,
                  width: '32px',
                  height: '32px',
                  border: brushColor === c ? '3px solid #ffd700' : '2px solid rgba(255,255,255,0.8)',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  transition: 'transform 0.2s'
                }}
                onClick={() => setBrushColor(c)}
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
          }}>📏 Tamaño del Pincel: {brushSize.toFixed(3)}</label>
          <input
            type="range"
            min="0.005"
            max="0.05"
            step="0.001"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            style={{
              width: "100%",
              accentColor: "#ffd700"
            }}
          />
        </div>

        <p style={{
          marginTop: "16px",
          fontSize: "14px",
          color: "#ffffff",
          textAlign: "center"
        }}>Haz clic y arrastra en el plano para dibujar</p>
      </div>
    </div>
  );
}