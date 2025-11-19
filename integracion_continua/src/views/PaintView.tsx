import PaintScene from "../components/PaintScene";
import { Palette } from "lucide-react";

export default function PaintView() {
  return (
    <div className="relative h-full">
      <PaintScene />
      <h2 className="absolute top-4 left-1/2 transform -translate-x-1/2 text-3xl font-bold font-display text-white pointer-events-none z-20 flex items-center">
        <Palette className="mr-2" /> Pintura 3D - Espacio Creativo
      </h2>
    </div>
  );
}