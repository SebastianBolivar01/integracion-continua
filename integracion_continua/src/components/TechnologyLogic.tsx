import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei'; // Asegúrate de instalar esta dependencia si no la tienes: npm install @react-three/drei

// --- Componente 3D del Robot ---
interface Robot3DProps {
  targetPosition: [number, number, number];
  direction: 'up' | 'down' | 'left' | 'right';
}

function Robot3D({ targetPosition, direction }: Robot3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const currentPosition = useRef<[number, number, number]>([0, 1, 0]); // Iniciar en [0, 1, 0] para estar sobre el plano

  useFrame(() => {
    if (meshRef.current) {
      // 1. Movimiento Suave (Interpolación Lineal - lerp)
      const targetVec = new THREE.Vector3(...targetPosition);
      
      // Usamos el vector de la posición actual de Three.js para la interpolación
      meshRef.current.position.lerp(targetVec, 0.1); // El 0.1 es la intensidad de la suavidad (más alto = más rápido)
      
      // Actualizar la posición de referencia después de la interpolación para el próximo frame
      currentPosition.current = [meshRef.current.position.x, meshRef.current.position.y, meshRef.current.position.z];

      // 2. Rotación
      let targetRotation = 0;
      switch (direction) {
        // En Three.js, +Z es 'adelante' si no se rota la cámara
        case 'up': targetRotation = 0; break;
        case 'right': targetRotation = -Math.PI / 2; break; // Rotación en Y (eje vertical)
        case 'down': targetRotation = Math.PI; break;
        case 'left': targetRotation = Math.PI / 2; break;
      }
      
      // Interpolar la rotación para un cambio suave
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
          meshRef.current.rotation.y,
          targetRotation,
          0.1
      );
    }
  });

  return (
    <mesh ref={meshRef} position={currentPosition.current} castShadow>
      {/* Robot simplificado: un BoxGeometry */}
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#ff0000" />
    </mesh>
  );
}

// --- Componente de la Escena 3D ---
function RobotScene({ robotTargetPosition, robotDirection }: {
  robotTargetPosition: [number, number, number];
  robotDirection: 'up' | 'down' | 'left' | 'right';
}) {
  return (
    <>
      {/* Luces */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />

      {/* Plano (Suelo) */}
      <mesh position={[0, 0, 0]} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[50, 50]} /> {/* Hago el plano más grande */}
        <meshStandardMaterial color="#FFD700" />
      </mesh>

      {/* Control de Órbita para mover la cámara (Opcional, pero muy útil) */}
      <OrbitControls target={[0, 1, 0]} />

      {/* El Robot */}
      <Robot3D targetPosition={robotTargetPosition} direction={robotDirection} />
    </>
  );
}

// --- Componente Principal ---
export default function TechnologyLogic() {
  const step = 2; // El robot avanza 2 unidades por paso
  const [robotTargetPosition, setRobotTargetPosition] = useState<[number, number, number]>([0, 1, 0]);
  const [robotDirection, setRobotDirection] = useState<'up' | 'down' | 'left' | 'right'>('up');

  const moveRobot3D = (direction: 'up' | 'down' | 'left' | 'right') => {
    setRobotDirection(direction);
    setRobotTargetPosition(prev => {
      const [x, y, z] = prev;
      // Usar 'step' para definir cuánto se mueve
      switch (direction) {
        case 'up': return [x, y, z - step];  // En Three.js, hacia el "horizonte" es -Z
        case 'down': return [x, y, z + step]; // Hacia la cámara es +Z
        case 'left': return [x - step, y, z];
        case 'right': return [x + step, y, z];
        default: return prev;
      }
    });
  };

  return (
    <div className="w-full h-screen bg-linear-to-b from-sky-300 via-pink-300 to-yellow-300 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-purple-600 mb-4 text-center">🤖 ¡Mi Robot Amigo! 🤖</h1>

      <div className="w-full max-w-4xl bg-white/20 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
        <div className="w-full h-96 rounded-2xl overflow-hidden mb-6">
          {/* Cámara ajustada para ver mejor el suelo (plano XZ) */}
          <Canvas 
            camera={{ position: [0, 15, 15], fov: 60 }} 
            shadows // Habilitar sombras en el Canvas
          >
            <RobotScene
              robotTargetPosition={robotTargetPosition}
              robotDirection={robotDirection}
            />
          </Canvas>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div></div>
          {/* Botones de Control */}
          <button
            onClick={() => moveRobot3D('up')}
            className="w-20 h-20 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-200 active:scale-95"
          >
            <span className="text-4xl">⬆️</span>
          </button>
          <div></div>

          <button
            onClick={() => moveRobot3D('left')}
            className="w-20 h-20 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-200 active:scale-95"
          >
            <span className="text-4xl">⬅️</span>
          </button>
          <button
            onClick={() => moveRobot3D('right')}
            className="w-20 h-20 bg-yellow-500 hover:bg-yellow-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-200 active:scale-95"
          >
            <span className="text-4xl">➡️</span>
          </button>

          <div></div>
          <button
            onClick={() => moveRobot3D('down')}
            className="w-20 h-20 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-200 active:scale-95"
          >
            <span className="text-4xl">⬇️</span>
          </button>
          <div></div>
        </div>
        
        <blockquote className="mt-4 text-center text-gray-700 italic">
          ¡Usa tu creatividad! Dibuja y colorea lo que imagines. (Tu texto original)
        </blockquote>

      </div>
    </div>
  );
}