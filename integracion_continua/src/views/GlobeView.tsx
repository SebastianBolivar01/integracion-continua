import GlobeScene from "../components/GlobeScene";

export default function GlobeView() {
  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="p-4 text-xl font-bold">🌍 Globo Interactivo</h2>
      <GlobeScene />
    </div>
  );
}
