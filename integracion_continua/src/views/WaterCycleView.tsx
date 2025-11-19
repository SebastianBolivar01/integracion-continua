import WaterCycleScene from "../components/WaterCycleScene";
import { Droplets } from "lucide-react";

export default function WaterCycleView() {
  return (
    <div className="relative h-full">
      <WaterCycleScene />
      <h2 className="absolute top-4 left-1/2 transform -translate-x-1/2 text-3xl font-bold font-display text-white pointer-events-none z-20 flex items-center">
        <Droplets className="mr-2" /> Ciclo del Agua
      </h2>
    </div>
  );
}