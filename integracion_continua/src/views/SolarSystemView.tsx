import SolarSystemScene from "../components/SolarSystemScene";

export default function SolarSystemView() {
  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="p-4 text-xl font-bold">🪐 Sistema Solar</h2>
      <SolarSystemScene />
    </div>
  );
}
