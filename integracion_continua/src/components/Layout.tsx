import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isSolarSystem = location.pathname === '/solarsystem';
  const isGlobe = location.pathname === '/globe';


  return (
    <div className="flex h-screen">

      {/* Contenedor principal */}
      <div className={`flex flex-col ${isHome ? 'flex-1' : 'flex-1'}`}>
        {/* Contenido dinámico (cada vista) */}

        <main className={`flex-1 overflow-y-auto ${isSolarSystem ? '' : 'p-4'} ${isHome ? 'bg-[#c2e1ef]' : 'bg-[#c2e1ef]'}`}>
          <Outlet />
        
        </main>
      </div>
    </div>
  );
}
