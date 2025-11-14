import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Vector3 } from "three";

function Droplet({ position }: { position: Vector3 }) {
  const ref = useRef<THREE.Mesh>(null!);
  const initialPosition = useRef(position.clone());

  useFrame((state) => {
    if (!ref.current) return;

    const t_cycle = state.clock.getElapsedTime() % animationConfig.animationDuration;
    const precipitationStart = animationConfig.evaporationTime + animationConfig.travelTime;
    const precipitationEnd = precipitationStart + animationConfig.precipitationTime;

    // Comprobar si estamos en la fase de precipitación
    if (t_cycle >= precipitationStart && t_cycle < precipitationEnd) {
      ref.current.visible = true;
      // Animar la caída de la gota
      const fallDuration = 2; // Cuánto tarda la gota en caer
      ref.current.position.y = initialPosition.current.y - ((state.clock.getElapsedTime() * 0.8) % fallDuration);
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

function Cloud() {
  const groupRef = useRef<THREE.Group>(null!);
  const startX = 2;
  const endX = -2;
  const { evaporationTime, travelTime, precipitationTime, animationDuration } = animationConfig;

  useFrame((state) => {
    const t = state.clock.getElapsedTime() % animationDuration;

    if (t < evaporationTime) {
      // Fase 1: La nube está visible y quieta en la posición inicial
      if (groupRef.current) groupRef.current.visible = true;
      groupRef.current.position.x = startX;
    } else if (t < evaporationTime + travelTime) {
      // Fase 2: La nube es visible y se mueve de derecha a izquierda
      if (groupRef.current) groupRef.current.visible = true;
      const progress = (t - evaporationTime) / travelTime;
      groupRef.current.position.x = THREE.MathUtils.lerp(startX, endX, progress);
    } else if (t < evaporationTime + travelTime + precipitationTime) {
      // Fase 3: La nube está quieta sobre la montaña
      if (groupRef.current) groupRef.current.visible = true;
      groupRef.current.position.x = endX;
    } else {
      // Fase 4: La nube desaparece para reiniciar
      if (groupRef.current) groupRef.current.visible = false;
    }
  });

  return (
    <group ref={groupRef} position={[startX, 2.5, 0]}>
      <mesh position={[0, 0, 0]}><sphereGeometry args={[0.6, 16, 16]} /><meshStandardMaterial color="#ffffff" /></mesh>
      <mesh position={[0.6, 0, 0]}><sphereGeometry args={[0.5, 16, 16]} /><meshStandardMaterial color="#ffffff" /></mesh>
      <mesh position={[-0.6, 0, 0]}><sphereGeometry args={[0.5, 16, 16]} /><meshStandardMaterial color="#ffffff" /></mesh>
    </group>
  );
}

function VaporParticle() {
  const ref = useRef<THREE.Mesh>(null!);

  // Estado para la posición y velocidad de cada partícula
  const [position] = useState(() => new THREE.Vector3(
    1.5 + Math.random(),      // Posición X sobre el mar (cerca de donde empieza la nube)
    -0.9,                     // Posición Y inicial en la superficie del mar
    (Math.random() - 0.5) * 2 // Posición Z aleatoria
  ));
  const [speed] = useState(() => 0.3 + Math.random() * 0.4);

  useFrame((state, delta) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime() % animationConfig.animationDuration;

      // Solo animar y mostrar el vapor durante la fase de evaporación
      if (t < animationConfig.evaporationTime) {
        ref.current.visible = true;
        // Mover la partícula hacia arriba
        ref.current.position.y += speed * delta;
        // Desvanecer la partícula a medida que sube
        (ref.current.material as THREE.MeshStandardMaterial).opacity -= 0.2 * delta;

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
  return (
    <div style={{ width: "70vw", height: "70vh" }}>
      <Canvas camera={{ position: [0, 3, 8], fov: 60 }}>
        <color attach="background" args={["#87CEEB"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Mar */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[20, 10]} />
          <meshStandardMaterial color="#1e90ff" />
        </mesh>

        {/* Tierra/Playa con borde ondulado */}
        <Land />

        {/* Montaña */}
        <Mountain position={new THREE.Vector3(-2, -0.5, 0)} scale={1} seed={0} />
        {/* Montañas más pequeñas */}
        <Mountain position={new THREE.Vector3(-4.5, -0.8, -1.5)} scale={0.5} seed={10} />
        <Mountain position={new THREE.Vector3(-3.5, -0.9, 2)} scale={0.35} seed={20} />

        {/* Nube */}
        <Cloud />

        {/* Partículas de vapor (Evaporación) */}
        {[...Array(20)].map((_, i) => (
          <VaporParticle key={i} />
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
          />
        ))}

        <OrbitControls />
      </Canvas>
    </div>
  );
}
