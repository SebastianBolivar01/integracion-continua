import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";


export default function Layout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenedor principal */}
      <div className="flex flex-col flex-1">
        {/* Navbar arriba */}
        

        {/* Contenido dinámico (cada vista) */}
        <main className="flex-1 overflow-y-auto p-4 bg-[#c2e1ef]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
