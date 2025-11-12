import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SolarSystemScene from "../components/SolarSystemScene";

export default function SolarSystemView() {
  return (
    <div className="w-full h-screen bg-black text-white flex flex-col">
      {/* Botón para regresar a la página principal */}
      <Link
        to="/"
        className="absolute top-4 left-4 z-20 p-2 bg-gray-800/50 rounded-full text-white hover:bg-gray-700/70 transition-colors"
        aria-label="Regresar a la página principal"
      >
        <ArrowLeft size={24} />
      </Link>

      <h2 className="absolute top-4 left-1/2 -translate-x-1/2 p-4 text-xl font-bold z-10">🪐 Sistema Solar</h2>
      <SolarSystemScene />
    </div>
  );
}
