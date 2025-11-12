import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";



// ✅ Nuevas vistas educativas 3D
import ShapesView from "../views/ShapesView";
import GlobeView from "../views/GlobeView";
import PaintView from "../views/PaintView";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Página principal */}
        <Route index element={<></>} />

        {/* ✅ Nuevas rutas de las tres áreas temáticas */}
        <Route path="shapes" element={<ShapesView />} />
        <Route path="globe" element={<GlobeView />} />
        <Route path="paint" element={<PaintView />} />
      </Route>
    </Routes>
  );
}
