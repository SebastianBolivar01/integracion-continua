import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";


export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex h-screen">
      {/* Sidebar - solo mostrar si no es home */}
      {!isHome && <Sidebar />}

      {/* Contenedor principal */}
      <div className={`flex flex-col ${isHome ? 'flex-1' : 'flex-1'}`}>
        {/* Contenido dinámico (cada vista) */}
        <main className={`flex-1 overflow-y-auto p-4 ${isHome ? 'bg-[#c2e1ef]' : 'bg-[#c2e1ef]'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
