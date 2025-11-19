import WaterCycleScene from "../components/WaterCycleScene";
import { Droplets } from "lucide-react";

export default function WaterCycleView() {
  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="p-4 text-xl font-bold font-display flex items-center"><Droplets className="mr-2" /> Ciclo del Agua</h2>
      <WaterCycleScene />
    </div>
  );
}
