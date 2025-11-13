import GlobeScene from "../components/GlobeScene";
import { Globe } from "lucide-react";

export default function GlobeView() {
  return (
    <div className="relative h-full">
      <GlobeScene />
      <h2 className="absolute top-4 left-1/2 transform -translate-x-1/2 text-3xl font-bold font-display text-white pointer-events-none z-20 flex items-center">
        <Globe className="mr-2" /> Globo Interactivo
      </h2>
    </div>
  );
}
