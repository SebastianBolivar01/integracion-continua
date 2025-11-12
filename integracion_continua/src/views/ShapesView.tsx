import ShapesScene from "../components/ShapesScene";

export default function ShapesView() {
  return (
    <div className="relative h-full">
      <ShapesScene />
      <h2 className="absolute top-4 left-1/2 transform -translate-x-1/2 text-3xl font-bold text-white pointer-events-none z-20">
        🔷 Exploración de Formas 3D
      </h2>
    </div>
  );
}
