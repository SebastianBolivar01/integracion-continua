import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";


export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';
<<<<<<< HEAD
  const isSolarSystem = location.pathname === '/solarsystem';
=======
  const isGlobe = location.pathname === '/globe';
>>>>>>> 271eb91a90d41e2b7d487284f0ca80213abe0267

  return (
    <div className="flex h-screen">
      {/* Sidebar - solo mostrar si no es home */}
      {!isHome && !isSolarSystem && <Sidebar />}

      {/* Contenedor principal */}
      <div className={`flex flex-col ${isHome ? 'flex-1' : 'flex-1'}`}>
        {/* Contenido dinámico (cada vista) */}
<<<<<<< HEAD
        <main className={`flex-1 overflow-y-auto ${isSolarSystem ? '' : 'p-4'} ${isHome ? 'bg-[#c2e1ef]' : 'bg-[#c2e1ef]'}`}>
=======
        <main className={`flex-1 ${isGlobe ? 'overflow-hidden p-0' : 'overflow-y-auto pt-16 p-4'} bg-[#c2e1ef]`}>
>>>>>>> 271eb91a90d41e2b7d487284f0ca80213abe0267
          <Outlet />
        </main>
      </div>
    </div>
  );
}
