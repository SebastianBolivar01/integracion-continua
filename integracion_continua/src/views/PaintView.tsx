import Paint3DScene from "../components/Paint3DScene";

export default function PaintView() {
  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="p-4 text-xl font-bold">🎨 Pintura 3D</h2>
      <Paint3DScene />
    </div>
  );
}