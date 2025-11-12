import { Link } from "react-router-dom";
import SolarSystemScene from "../components/SolarSystemScene";

export default function SolarSystemView() {
  return (
    <div className="w-full h-screen bg-black text-white flex flex-col">
      {/* Botón para regresar a la página principal */}
      <Link
        to="/"
        className="absolute top-4 left-4 z-20 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
        aria-label="Regresar a la página principal"
      >
        {'<-- Atrás'}
      </Link>

      <h2 className="absolute top-4 left-1/2 -translate-x-1/2 p-4 text-xl font-bold z-10">🪐 Sistema Solar</h2>
      <SolarSystemScene />
    </div>
  );
}
