importAR { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const isPaint = location.pathname === '/paint';
  const isGlobe = location.pathname === '/globe';
  const isSolarSystem = location.pathname === '/solarsystem';


  return (
    <div className="h-screen relative">
      {/* Botón Atrás - solo mostrar si no es home y no es paint */}
      {!isHome && !isPaint && (
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 z-10 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
        >
          {'<-- Atrás'}
        </button>
      )}

      {/* Contenedor principal */}
      <div className="flex flex-col h-full">
        {/* Contenido dinámico (cada vista) */}
        <main className={`flex-1 overflow-y-auto ${(isGlobe || isSolarSystem) ? 'p-0' : 'pt-16 p-4'} bg-[#c2e1ef]`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
