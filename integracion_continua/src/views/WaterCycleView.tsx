import WaterCycleScene from "../components/WaterCycleScene";

export default function WaterCycleView() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">💧 Ciclo del Agua en 3D</h2>
      <p className="mb-4">
        Observa cómo el agua se mueve a través de su ciclo natural:
        evaporación, condensación, precipitación y escorrentía.  
        Este modelo 3D simplificado muestra las fases principales del ciclo del agua.
      </p>
      <WaterCycleScene />
      <p className="mt-4 text-gray-600 italic">
        *Puedes rotar la cámara con el mouse para ver la escena desde diferentes ángulos.*
      </p>
    </div>
  );
}
