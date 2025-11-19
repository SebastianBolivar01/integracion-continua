// src/components/WaterCycleScene.tsx
import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Droplets, Cloud, Sun, Waves } from "lucide-react";

interface AnimatedElementProps {
  position: [number, number, number];
  scale?: number;
  color?: string;
  animationType: 'rise' | 'fall' | 'float' | 'flow';
  speed?: number;
}

function AnimatedElement({ position, scale = 1, color = "#ffffff", animationType, speed = 1 }: AnimatedElementProps) {
  const ref = useRef<THREE.Mesh>(null);
  const startY = position[1];

  useFrame((state, delta) => {
    if (!ref.current) return;

    switch (animationType) {
      case 'rise':
        ref.current.position.y += speed * delta * 0.5;
        if (ref.current.position.y > 3) {
          ref.current.position.y = startY;
        }
        break;
      case 'fall':
        ref.current.position.y -= speed * delta * 0.8;
        if (ref.current.position.y < -2) {
          ref.current.position.y = startY;
        }
        break;
      case 'float':
        ref.current.position.x += Math.sin(state.clock.elapsedTime + position[0]) * delta * 0.1;
        ref.current.position.y += Math.cos(state.clock.elapsedTime + position[1]) * delta * 0.05;
        break;
      case 'flow':
        ref.current.position.x += speed * delta * 0.3;
        if (ref.current.position.x > 5) {
          ref.current.position.x = -5;
        }
        break;
    }
  });

  return (
    <mesh ref={ref} position={position} scale={[scale, scale, scale]}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function WaterCycleScene() {
  const [phase, setPhase] = useState<'evaporation' | 'condensation' | 'precipitation' | 'collection'>('evaporation');

  const waterDroplets = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 4,
        -2 + Math.random() * 2,
        (Math.random() - 0.5) * 2
      ] as [number, number, number],
      animationType: 'rise' as const,
      speed: 0.5 + Math.random() * 0.5
    }));
  }, []);

  const rainDrops = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 6,
        2 + Math.random() * 2,
        (Math.random() - 0.5) * 2
      ] as [number, number, number],
      animationType: 'fall' as const,
      speed: 1 + Math.random() * 0.5
    }));
  }, []);

  const cloudParticles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 3,
        1.5 + Math.random() * 1,
        (Math.random() - 0.5) * 1
      ] as [number, number, number],
      animationType: 'float' as const,
      speed: 0.2
    }));
  }, []);

  const riverFlow = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      position: [
        -5 + (i * 1),
        -2.5,
        0
      ] as [number, number, number],
      animationType: 'flow' as const,
      speed: 0.8
    }));
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />

        {/* Sun */}
        <mesh position={[3, 2, -2]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.3} />
        </mesh>

        {/* Ocean */}
        <mesh position={[0, -3, 0]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#1e40af" />
        </mesh>

        {/* Ground */}
        <mesh position={[0, -2.8, 0]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[8, 6]} />
          <meshStandardMaterial color="#16a34a" />
        </mesh>

        {/* River bed */}
        <mesh position={[0, -2.6, 0]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[6, 0.5]} />
          <meshStandardMaterial color="#0ea5e9" />
        </mesh>

        {/* Animated elements based on phase */}
        {phase === 'evaporation' && waterDroplets.map((droplet) => (
          <AnimatedElement
            key={droplet.id}
            position={droplet.position}
            color="#3b82f6"
            animationType={droplet.animationType}
            speed={droplet.speed}
          />
        ))}

        {(phase === 'condensation' || phase === 'precipitation') && cloudParticles.map((particle) => (
          <AnimatedElement
            key={particle.id}
            position={particle.position}
            color="#e5e7eb"
            animationType={particle.animationType}
            speed={particle.speed}
          />
        ))}

        {phase === 'precipitation' && rainDrops.map((drop) => (
          <AnimatedElement
            key={drop.id}
            position={drop.position}
            color="#60a5fa"
            animationType={drop.animationType}
            speed={drop.speed}
          />
        ))}

        {phase === 'collection' && riverFlow.map((flow) => (
          <AnimatedElement
            key={flow.id}
            position={flow.position}
            color="#0ea5e9"
            animationType={flow.animationType}
            speed={flow.speed}
          />
        ))}
      </Canvas>

      {/* Phase indicator */}
      <div style={{
        position: "absolute",
        top: "80%",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "white",
        color: "black",
        fontSize: "1.5rem",
        fontWeight: "bold",
        padding: "10px 20px",
        borderRadius: "20px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        pointerEvents: "none",
        zIndex: 5
      }}>
        {phase === 'evaporation' && '🌞 Evaporación'}
        {phase === 'condensation' && '☁️ Condensación'}
        {phase === 'precipitation' && '🌧️ Precipitación'}
        {phase === 'collection' && '🏞️ Recolección'}
      </div>

      {/* Control panel */}
      <div className="font-sans bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/50 text-cyan-100 absolute top-1/2 left-[90%] transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-2xl shadow-lg z-10 text-center flex flex-col items-center">
        <h3 style={{
          marginBottom: "8px",
          fontSize: "18px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          color: "#ffd700"
        }}>
          <Droplets className="inline mr-2" />
          <span className="font-display">Ciclo del Agua</span>
        </h3>

        <p style={{
          marginBottom: "16px",
          fontSize: "14px",
          color: "#ffffff",
          textAlign: "center"
        }}>Observa las fases del ciclo</p>

        <div style={{ marginBottom: "12px" }}>
          <button
            onClick={() => setPhase('evaporation')}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: phase === 'evaporation' ? "#ffd700" : "rgba(255, 255, 255, 0.9)",
              color: phase === 'evaporation' ? "#000" : "#333",
              fontWeight: "bold",
              cursor: "pointer",
              margin: "4px"
            }}
          >
            🌞 Evaporación
          </button>
          <button
            onClick={() => setPhase('condensation')}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: phase === 'condensation' ? "#ffd700" : "rgba(255, 255, 255, 0.9)",
              color: phase === 'condensation' ? "#000" : "#333",
              fontWeight: "bold",
              cursor: "pointer",
              margin: "4px"
            }}
          >
            ☁️ Condensación
          </button>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <button
            onClick={() => setPhase('precipitation')}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: phase === 'precipitation' ? "#ffd700" : "rgba(255, 255, 255, 0.9)",
              color: phase === 'precipitation' ? "#000" : "#333",
              fontWeight: "bold",
              cursor: "pointer",
              margin: "4px"
            }}
          >
            🌧️ Precipitación
          </button>
          <button
            onClick={() => setPhase('collection')}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: phase === 'collection' ? "#ffd700" : "rgba(255, 255, 255, 0.9)",
              color: phase === 'collection' ? "#000" : "#333",
              fontWeight: "bold",
              cursor: "pointer",
              margin: "4px"
            }}
          >
            🏞️ Recolección
          </button>
        </div>
      </div>
    </div>
  );
}