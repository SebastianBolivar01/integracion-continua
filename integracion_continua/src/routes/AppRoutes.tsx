// integracion_continua/src/routes/AppRoutes.tsx

import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../views/HomePage";

// ✅ Importa la nueva vista
import ShapesView from "../views/ShapesView";
import GlobeView from "../views/GlobeView";
import SolarSystemView from "../views/SolarSystemView";
import PaintView from "../views/PaintView"; // ⬅️  NUEVA IMPORTACIÓN


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Página principal */}
        <Route index element={<HomePage />} />

        {/* ✅ Nuevas rutas de las tres áreas temáticas */}
        <Route path="shapes" element={<ShapesView />} />
        <Route path="globe" element={<GlobeView />} />
        <Route path="solarsystem" element={<SolarSystemView />} />
        
        {/* 🎨 Ruta de Pintura 3D */}
        <Route path="paint" element={<PaintView />} /> {/* ⬅️  NUEVA RUTA */}
      </Route>
    </Routes>
  );
}