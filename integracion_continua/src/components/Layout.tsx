import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const isGlobe = location.pathname === '/globe';

  return (
    <div className="h-screen relative">
      {/* Botón Atrás - solo mostrar si no es home */}
      {!isHome && (
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
        <main className={`flex-1 ${isGlobe ? 'overflow-hidden p-0' : 'overflow-y-auto pt-16 p-4'} bg-[#c2e1ef]`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
