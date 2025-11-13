import SolarSystemScene from "../components/SolarSystemScene";
import { Sun } from "lucide-react";

export default function SolarSystemView() {
  return (
    <div className="relative h-full">
      <SolarSystemScene />
      <h2 className="absolute top-4 left-1/2 transform -translate-x-1/2 text-3xl font-bold font-display text-white pointer-events-none z-20 flex items-center">
        <Sun className="mr-2" /> Sistema Solar
      </h2>
    </div>
  );
}
