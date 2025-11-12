// src/components/Paint3DScene.tsx
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

interface PainterProps {
    strokes: number[][][];
}

function Painter({ strokes }: PainterProps) {
return (
    <>
    {strokes.filter(stroke => stroke.length > 1).map((stroke, idx) => (
        <line key={idx}>
        <bufferGeometry attach="geometry">
            <bufferAttribute
            attach="attributes-position"
            array={new Float32Array(stroke.flat())}
            itemSize={3}
            count={stroke.length}
            />
        </bufferGeometry>
        <lineBasicMaterial attach="material" color="white" linewidth={2} />
        </line>
    ))}
    </>
);
}
export default function Paint3DScene() {
const [strokes, setStrokes] = useState<number[][][]>([]);
const [currentStroke, setCurrentStroke] = useState<number[][]>([]);
const [drawing, setDrawing] = useState(false);

<<<<<<< HEAD
=======
<<<<<<< HEAD
  // NOTA: El componente original tenía <div style={{ display: "flex" }}>
  // Lo he cambiado a "flex h-full w-full" para que use Tailwind y
  // se adapte mejor al Layout.
  return (
    <div className="flex h-full w-full">
      {/* Panel de controles */}
      <div className="w-1/4 p-4 bg-gray-100 dark:bg-gray-800 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Pintura 3D</h2>
        <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
          Click y arrastra en la vista para dibujar en 3D.
        </p>
        <button
          // CORRECCIÓN 7: El botón "Limpiar" ahora funciona,
          // porque tiene acceso a 'setStrokes'.
          onClick={() => {
            setStrokes([]);
          }}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
=======
>>>>>>> 7e0bf54 (mejoras globo)
return (
    <div style={{ display: "flex" }}>
    <div style={{ width: "60vw", height: "60vh", position: "relative" }}>
        <Canvas
        onPointerDown={(e) => {
            setDrawing(true);
            setCurrentStroke([[e.point.x, e.point.y, e.point.z]]);
        }}
        onPointerMove={(e) => {
            if (!drawing) return;
            setCurrentStroke((s) => [...s, [e.point.x, e.point.y, e.point.z]]);
        }}
        onPointerUp={() => {
            setDrawing(false);
            if (currentStroke.length) {
            setStrokes((s) => [...s, currentStroke]);
            setCurrentStroke([]);
            }
        }}
        camera={{ position: [0, 0, 5] }}
        style={{ background: 'white' }}
<<<<<<< HEAD
=======
>>>>>>> 3c505a4 (mejoras del globo)
>>>>>>> 7e0bf54 (mejoras globo)
        >
        <ambientLight intensity={0.8} />
        <Painter strokes={[...strokes, currentStroke]} />
        <OrbitControls />
        </Canvas>
    </div>

    <div style={{ width: 240 }}>
        <h3>Pintura 3D</h3>
        <button onClick={() => { setStrokes([]); setCurrentStroke([]); }}>Limpiar</button>
        <p>Click y arrastra en la vista para dibujar en 3D.</p>
    </div>
    </div>
);
}
