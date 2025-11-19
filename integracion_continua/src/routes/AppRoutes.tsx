import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../views/HomePage";

// ✅ Nuevas vistas educativas 3D
import ShapesView from "../views/ShapesView";
import GlobeView from "../views/GlobeView";
import SolarSystemView from "../views/SolarSystemView";
import WaterCycleView from "../views/WaterCycleView";
import PaintView from "../views/PaintView";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Página principal */}
        <Route index element={<HomePage />} />

        {/* ✅ Nuevas rutas de las tres áreas temáticas */}
        <Route path="shapes" element={<ShapesView />} />
        <Route path="globe" element={<GlobeView />} />
        <Route path="paint" element={<PaintView />} />
        <Route path="solarsystem" element={<SolarSystemView />} />
        <Route path="watercycle" element={<WaterCycleView />} />

        {/* Nueva ruta para Tecnología y Pensamiento Lógico */}
        <Route path="technology-logic" element={<PaintView />} />
      </Route>
    </Routes>
  );
}
