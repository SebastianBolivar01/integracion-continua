import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

// Views existentes
import HomePage from "../views/HomePage";
import ThreeDemoView from "../views/ThreeDemoView";
import LayoutsView from "../views/LayoutsView";
import SpeechDemoView from "../views/SpeechDemoView";
import GeometryExplorer from "../views/GeometryExplorer";
import SettingsView from "../views/SettingsView";
import TablasMul from "../views/TablasMul";
import ConversorUnid from "../views/ConversorUnid";
import ValidContrasena from "../views/ValidContrasena";
import ContadorClics from "../views/ContadorClics";
import ListaTareas from "../views/ListaTareas";

// ✅ Nuevas vistas educativas 3D
import ShapesView from "../views/ShapesView";
import GlobeView from "../views/GlobeView";
import PaintView from "../views/PaintView";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Página principal */}
        <Route index element={<HomePage />} />

        {/* Rutas existentes */}
        <Route path="three" element={<ThreeDemoView />} />
        <Route path="layouts" element={<LayoutsView />} />
        <Route path="tts" element={<SpeechDemoView />} />
        <Route path="three_2" element={<GeometryExplorer />} />
        <Route path="settings" element={<SettingsView />} />
        <Route path="tablasmul" element={<TablasMul />} />
        <Route path="conversorunid" element={<ConversorUnid />} />
        <Route path="validcontrasena" element={<ValidContrasena />} />
        <Route path="contadorclics" element={<ContadorClics />} />
        <Route path="listareas" element={<ListaTareas />} />

        {/* ✅ Nuevas rutas de las tres áreas temáticas */}
        <Route path="shapes" element={<ShapesView />} />
        <Route path="globe" element={<GlobeView />} />
        <Route path="paint" element={<PaintView />} />
      </Route>
    </Routes>
  );
}
