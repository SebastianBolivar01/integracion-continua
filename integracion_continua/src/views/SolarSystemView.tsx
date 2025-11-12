import SolarSystemScene from "../components/SolarSystemScene";

export default function SolarSystemView() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🪐 Sistema Solar Interactivo</h2>
      <p className="mb-4">
        Explora los planetas del Sistema Solar en esta simulación 3D.  
        Haz clic sobre un planeta para obtener su nombre y observa cómo orbitan alrededor del Sol.
      </p>
      <SolarSystemScene />
      <p className="mt-4 text-gray-600 italic">
        *Usa el mouse para rotar y hacer zoom sobre la escena.*
      </p>
    </div>
  );
}
