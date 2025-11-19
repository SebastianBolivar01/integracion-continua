import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import { Vector3 } from "three";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Info } from "lucide-react";
import { useEffect } from "react";

function Droplet({ position, isPlaying = true, speed = 1 }: { position: Vector3; isPlaying?: boolean; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const initialPosition = useRef(position.clone());

  useFrame((state) => {
    if (!ref.current || !isPlaying) return;

    const t_cycle = (state.clock.getElapsedTime() * speed) % animationConfig.animationDuration;
    const precipitationStart = animationConfig.evaporationTime + animationConfig.travelTime;
    const precipitationEnd = precipitationStart + animationConfig.precipitationTime;

    // Comprobar si estamos en la fase de precipitación
    if (t_cycle >= precipitationStart && t_cycle < precipitationEnd) {
      ref.current.visible = true;
      // Animar la caída de la gota
      const fallDuration = 2; // Cuánto tarda la gota en caer
      ref.current.position.y = initialPosition.current.y - ((state.clock.getElapsedTime() * 0.8 * speed) % fallDuration);
    } else {
      // Ocultar y reiniciar la gota fuera de la fase de precipitación
      ref.current.visible = false;
      ref.current.position.y = initialPosition.current.y;
    }
  });

  return (
    <mesh ref={ref} position={initialPosition.current} visible={false}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial color="#00aaff" />
    </mesh>
  );
}

const animationConfig = {
  evaporationTime: 3, // 3s para que el vapor suba
  travelTime: 5, // 5s para que la nube se mueva
  precipitationTime: 2, // 2s para que la nube se quede sobre la montaña
  resetTime: 2, // 2s para que la nube esté invisible
  get animationDuration() {
    return this.evaporationTime + this.travelTime + this.precipitationTime + this.resetTime;
  }, // 12s en total
};

function Cloud({ isPlaying = true, speed = 1, onPhaseChange }: { isPlaying?: boolean; speed?: number; onPhaseChange?: (phase: string) => void }) {
  const groupRef = useRef<THREE.Group>(null!);
  const startX = 2;
  const endX = -2;
  const { evaporationTime, travelTime, precipitationTime, animationDuration } = animationConfig;

  useFrame((state) => {
    if (!isPlaying) return;

    const t = (state.clock.getElapsedTime() * speed) % animationDuration;

    if (t < evaporationTime) {
      // Fase 1: La nube está visible y quieta en la posición inicial
      if (groupRef.current) groupRef.current.visible = true;
      groupRef.current.position.x = startX;
      if (onPhaseChange) onPhaseChange("evaporación");
    } else if (t < evaporationTime + travelTime) {
      // Fase 2: La nube es visible y se mueve de derecha a izquierda
      if (groupRef.current) groupRef.current.visible = true;
      const progress = (t - evaporationTime) / travelTime;
      groupRef.current.position.x = THREE.MathUtils.lerp(startX, endX, progress);
      if (onPhaseChange) onPhaseChange("transporte");
    } else if (t < evaporationTime + travelTime + precipitationTime) {
      // Fase 3: La nube está quieta sobre la montaña
      if (groupRef.current) groupRef.current.visible = true;
      groupRef.current.position.x = endX;
      if (onPhaseChange) onPhaseChange("precipitación");
    } else {
      // Fase 4: La nube desaparece para reiniciar
      if (groupRef.current) groupRef.current.visible = false;
      if (onPhaseChange) onPhaseChange("reinicio");
    }
  });

  return (
    <group ref={groupRef} position={[startX, 2.5, 0]} castShadow>
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.6, 0, 0]} castShadow>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.6, 0, 0]} castShadow>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

function VaporParticle({ isPlaying = true, speed = 1 }: { isPlaying?: boolean; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null!);

  // Estado para la posición y velocidad de cada partícula
  const [position] = useState(() => new THREE.Vector3(
    1.5 + Math.random(),      // Posición X sobre el mar (cerca de donde empieza la nube)
    -0.9,                     // Posición Y inicial en la superficie del mar
    (Math.random() - 0.5) * 2 // Posición Z aleatoria
  ));
  const [particleSpeed] = useState(() => 0.3 + Math.random() * 0.4);

  useFrame((state, delta) => {
    if (!isPlaying || !ref.current) return;

    const t = (state.clock.getElapsedTime() * speed) % animationConfig.animationDuration;

    // Solo animar y mostrar el vapor durante la fase de evaporación
    if (t < animationConfig.evaporationTime) {
      ref.current.visible = true;
      // Mover la partícula hacia arriba
      ref.current.position.y += particleSpeed * delta * speed;
      // Desvanecer la partícula a medida que sube
      (ref.current.material as THREE.MeshStandardMaterial).opacity -= 0.2 * delta * speed;

      // Reiniciar la partícula cuando llega a la nube o se desvanece
      if (ref.current.position.y > 2.5 || (ref.current.material as THREE.MeshStandardMaterial).opacity <= 0) {
        ref.current.position.y = -0.9;
        (ref.current.material as THREE.MeshStandardMaterial).opacity = 0.7;
      }
    } else {
      // Ocultar la partícula si no estamos en la fase de evaporación
      ref.current.visible = false;
      // Reiniciar su estado para el próximo ciclo
      ref.current.position.y = -0.9;
      (ref.current.material as THREE.MeshStandardMaterial).opacity = 0.7;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshStandardMaterial color="#ffffff" transparent opacity={0.7} />
    </mesh>
  );
}

function Mountain({ position, scale = 1, seed = 0 }: { position: Vector3, scale?: number, seed?: number }) {
  const geometry = useMemo(() => { 
    const geom = new THREE.SphereGeometry(1.2, 32, 32);
    const positions = geom.attributes.position;
    const vertex = new THREE.Vector3();
    const colors: number[] = [];
    const color = new THREE.Color();
    const snowColor = new THREE.Color("#ffffff"); // Nieve
    const rockColor = new THREE.Color("#654321");
    const earthColor = new THREE.Color("#556B2F"); // Un verde terroso
    const snowLevel = 1.0; // Aumentamos la altura para que haya menos nieve

    for (let i = 0; i < positions.count; i++) {
      vertex.fromBufferAttribute(positions, i);

      // Asignar color basado en la altura original del vértice
      if (vertex.y > snowLevel) {
        color.set(snowColor);
      } else if (vertex.y > 0) { // Mitad superior de la esfera original
        color.set(rockColor);
      } else { // Mitad inferior
        color.set(earthColor);
      }
      colors.push(color.r, color.g, color.b);

      // Deformar la geometría para que parezca una montaña
      // Usamos una combinación de senos para una deformación más natural que Math.random()
      const noise = 
        0.5 * Math.sin(vertex.x * 2 + seed) * Math.cos(vertex.z * 2 + seed) +
        0.25 * Math.sin(vertex.x * 5 + seed) * Math.cos(vertex.z * 5 + seed);

      if (vertex.y > 0) {
        // Aplicamos la deformación solo a la parte superior y la amplificamos
        vertex.y += noise * Math.pow(vertex.y, 2) * 2.5;
      }
      positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geom.computeVertexNormals();
    return geom;
  }, [seed]);

  return <mesh geometry={geometry} position={position} scale={scale}><meshStandardMaterial vertexColors={true} /></mesh>;
}

function Land() {
  const geometry = useMemo(() => {
    // Plano con más segmentos para poder deformarlo
    const geom = new THREE.PlaneGeometry(10, 10, 50, 50);
    const positions = geom.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < positions.count; i++) {
      vertex.fromBufferAttribute(positions, i);
      // Los vértices del borde derecho (x=5) se ondulan para crear la costa
      if (Math.abs(vertex.x - 5) < 0.1) {
        vertex.x += Math.sin(vertex.y * 1.2) * 0.6 + Math.cos(vertex.y * 2.5) * 0.3;
      }
      positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  return <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[-5, -0.99, 0]}><meshStandardMaterial color="#556B2F" /></mesh>;
}

export default function WaterCycleScene() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const [currentPhase, setCurrentPhase] = useState("evaporación");
  const [cycleProgress, setCycleProgress] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) * speed / 1000;
        const progress = (elapsed % animationConfig.animationDuration) / animationConfig.animationDuration;
        setCycleProgress(progress);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying, speed, startTime]);

  const resetCycle = () => {
    setStartTime(Date.now());
    setCycleProgress(0);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-b from-blue-200 to-blue-400 overflow-hidden">
      {/* Encabezado */}
      <header className="absolute top-0 left-0 right-0 z-20 bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-white text-center drop-shadow-lg">
            Ciclo del Agua
          </h1>
        </div>
      </header>
      {/* Controles UI */}
      <div className="absolute top-20 left-4 z-10 flex flex-col gap-2">
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg font-bold text-blue-800 mb-2">Controles</h2>
          <p className="text-sm text-blue-600 mb-3">Fase actual: <span className="font-semibold">{currentPhase}</span></p>

          <div className="flex gap-2 mb-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetCycle}
              className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <RotateCcw size={20} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Info size={20} />
            </motion.button>
          </div>

          {/* Indicador de progreso circular */}
          <div className="relative w-16 h-16 mb-3">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray={`${cycleProgress * 100}, 100`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-blue-600">
                {Math.round(cycleProgress * 100)}%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Velocidad:</span>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-20"
            />
            <span className="text-sm text-gray-600">{speed.toFixed(1)}x</span>
          </div>
        </motion.div>

        {/* Panel de información */}
        {showInfo && (
          <motion.div
            className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h3 className="font-bold text-blue-800 mb-2">¿Qué es el ciclo del agua?</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>1. Evaporación:</strong> El agua del mar se convierte en vapor.</p>
              <p><strong>2. Condensación:</strong> El vapor forma nubes en el cielo.</p>
              <p><strong>3. Precipitación:</strong> El agua cae como lluvia o nieve.</p>
              <p><strong>4. Recolección:</strong> El agua vuelve al mar y ríos.</p>
            </div>
          </motion.div>
        )}
      </div>

      <Canvas
        camera={{ position: [0, 3, 8], fov: 60 }}
        shadows
        style={{ width: '100vw', height: 'calc(100vh - 80px)' }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#87CEEB"]} />
        <fog attach="fog" args={['#87CEEB', 10, 50]} />
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-5, 3, 5]} intensity={0.5} color="#ffffff" />

        {/* Mar con olas sutiles */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
          <planeGeometry args={[20, 10]} />
          <meshStandardMaterial color="#1e90ff" roughness={0.1} metalness={0.1} />
        </mesh>

        {/* Tierra/Playa con borde ondulado */}
        <Land />

        {/* Montaña */}
        <Mountain position={new THREE.Vector3(-2, -0.5, 0)} scale={1} seed={0} />
        {/* Montañas más pequeñas */}
        <Mountain position={new THREE.Vector3(-4.5, -0.8, -1.5)} scale={0.5} seed={10} />
        <Mountain position={new THREE.Vector3(-3.5, -0.9, 2)} scale={0.35} seed={20} />

        {/* Sol (luz adicional) */}
        <mesh position={[5, 8, -5]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="#FFD700" />
        </mesh>

        {/* Etiquetas educativas */}
        <Text
          position={[2, 1, 0]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          Mar
        </Text>

        <Text
          position={[-2, 1.5, 0]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          Montaña
        </Text>

        {/* Flechas indicadoras del flujo */}
        <Text
          position={[1, 0.5, 0]}
          fontSize={0.4}
          color="#ff6b6b"
          anchorX="center"
          anchorY="middle"
        >
          ↑
        </Text>

        <Text
          position={[0, 2.8, 0]}
          fontSize={0.4}
          color="#4ecdc4"
          anchorX="center"
          anchorY="middle"
        >
          →
        </Text>

        <Text
          position={[-2.5, 1, 0]}
          fontSize={0.4}
          color="#45b7d1"
          anchorX="center"
          anchorY="middle"
        >
          ↓
        </Text>

        {/* Nube */}
        <Cloud isPlaying={isPlaying} speed={speed} onPhaseChange={setCurrentPhase} />

        {/* Partículas de vapor (Evaporación) */}
        {[...Array(20)].map((_, i) => (
          <VaporParticle key={i} isPlaying={isPlaying} speed={speed} />
        ))}

        {/* Gotas animadas */}
        {[...Array(10)].map((_, i) => (
          <Droplet
            key={i}
            position={new THREE.Vector3(
              -2 + (Math.random() - 0.5) * 0.8, // Posición X sobre la montaña
              2.5 + Math.random(), // Altura inicial sobre la nube
              (Math.random() - 0.5) * 0.8 // Posición Z alrededor de la montaña
            )}
            isPlaying={isPlaying}
            speed={speed}
          />
        ))}

        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </div>
  );
}
