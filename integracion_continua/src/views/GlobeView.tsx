import GlobeScene from "../components/GlobeScene";

export default function GlobeView() {
  return (
    <div className="relative h-full">
      <GlobeScene />
      <h2 className="absolute top-4 left-1/2 transform -translate-x-1/2 text-3xl font-bold text-white pointer-events-none z-20">
        🌍 Globo Interactivo
      </h2>
    </div>
  );
}
