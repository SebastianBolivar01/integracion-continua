// integracion_continua/src/components/PaintScene.tsx
import { useRef, useState, useCallback, forwardRef, useImperativeHandle } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";
import { Palette, Brush, Minus, CircleDot, SprayCan, Trash2 } from "lucide-react";

interface PaintSceneProps {}

type BrushType = 'solid' | 'dotted' | 'spray';

interface LineData {
  points: THREE.Vector3[];
  color: string;
  size: number;
  type: BrushType;
}

interface DrawingPlaneProps {
  brushColor: string;
  brushSize: number;
  brushType: BrushType;
}

export interface DrawingPlaneRef {
  clear: () => void;
}

const DrawingPlane = forwardRef<DrawingPlaneRef, DrawingPlaneProps>(({ brushColor, brushSize, brushType }, ref) => {
  const { camera, scene, raycaster, pointer } = useThree();
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState<THREE.Vector3[]>([]);
  const [lines, setLines] = useState<LineData[]>([]);
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
      if (brushType === 'spray') {
        // Añadir múltiples puntos alrededor del cursor para el efecto spray
        for (let i = 0; i < 5; i++) {
          const sprayPoint = point.clone().add(new THREE.Vector3((Math.random() - 0.5) * brushSize * 40, 0, (Math.random() - 0.5) * brushSize * 40));
          setCurrentLine(prev => [...prev, sprayPoint]);
        }
      } else {
        setCurrentLine(prev => [...prev, point]);
      }
    }
  }, [isDrawing, camera, pointer, raycaster, brushType, brushSize]);

  const handlePointerUp = useCallback(() => {
    if (isDrawing && currentLine.length > 1) {
      setLines(prev => [...prev, { points: currentLine, color: brushColor, size: brushSize, type: brushType }]);
    }
    setIsDrawing(false);
    setCurrentLine([]);
  }, [isDrawing, currentLine, brushColor, brushSize, brushType]);

  useImperativeHandle(ref, () => ({
    clear() {
      setLines([]);
    },
  }));

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
      {lines.map((lineData, index) => (
        <Line
          key={index}
          points={lineData.points}
          color={lineData.color}
          lineWidth={lineData.size * 100}
          dashed={lineData.type === 'dotted'}
          dashScale={50}
          gapSize={lineData.size * 50}
          dashSize={lineData.size * 50}
        />
      ))}
      {isDrawing && currentLine.length > 1 && (
        <Line
          points={currentLine}
          color={brushColor}
          lineWidth={brushSize * 100}
          dashed={brushType === 'dotted'}
          dashScale={50}
          gapSize={brushSize * 50}
          dashSize={brushSize * 50}
        />
      )}
    </>
  );
});

export default function PaintScene({}: PaintSceneProps) {
  const drawingPlaneRef = useRef<DrawingPlaneRef>(null);
  const [brushColor, setBrushColor] = useState("#ff0000");
  const [brushSize, setBrushSize] = useState(0.01);
  const [brushType, setBrushType] = useState<BrushType>('solid');


  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas camera={{ position: [0, 8, 0] }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 0]} intensity={1} castShadow />
        <DrawingPlane ref={drawingPlaneRef} brushColor={brushColor} brushSize={brushSize} brushType={brushType} />
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

        <div style={{ marginBottom: "12px", width: '100%' }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>🖌️ Tipo de Pincel</label>
          <div style={{ display: 'flex', justifyContent: 'space-around', gap: '8px' }}>
            <button
              onClick={() => setBrushType('solid')}
              title="Sólido"
              style={{
                padding: '8px',
                borderRadius: '8px',
                border: brushType === 'solid' ? '2px solid #ffd700' : '2px solid transparent',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
              }}
            >
              <Minus size={24} />
            </button>
            <button
              onClick={() => setBrushType('dotted')}
              title="Punteado"
              style={{
                padding: '8px',
                borderRadius: '8px',
                border: brushType === 'dotted' ? '2px solid #ffd700' : '2px solid transparent',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
              }}
            >
              <CircleDot size={24} />
            </button>
            <button
              onClick={() => setBrushType('spray')}
              title="Disperso"
              style={{
                padding: '8px',
                borderRadius: '8px',
                border: brushType === 'spray' ? '2px solid #ffd700' : '2px solid transparent',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
              }}
            >
              <SprayCan size={24} />
            </button>
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

        <div style={{ marginTop: "16px", width: '100%' }}>
          <button
            onClick={() => drawingPlaneRef.current?.clear()}
            title="Limpiar lienzo"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'rgba(255, 82, 82, 0.8)',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            <Trash2 size={20} style={{ display: 'inline', marginRight: '8px' }} /> Limpiar
          </button>
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