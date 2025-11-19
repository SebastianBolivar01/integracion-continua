import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ArrowBigLeftDash } from "lucide-react";
import FriendlyCharacter from "./FriendlyCharacter";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const isPaint = location.pathname === '/paint';
  const isGlobe = location.pathname === '/globe';
  const isSolarSystem = location.pathname === '/solarsystem';
  const isShapes = location.pathname === '/shapes';


  return (
    <div className="h-screen relative">
      {/* Botón Atrás - solo mostrar si no es home */}
      {!isHome && (
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 z-10 bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg shadow-red-500/50 hover:shadow-red-500/75 hover:shadow-2xl transition-all duration-300 flex items-center space-x-2"
        >
          <ArrowBigLeftDash className="w-5 h-5" />
          <span>ATRÁS</span>
        </button>
      )}

      {/* Contenedor principal */}
      <div className="flex flex-col h-full">
        {/* Contenido dinámico (cada vista) */}
        <main className={`flex-1 overflow-y-auto ${(isGlobe || isSolarSystem || isShapes) ? 'p-0' : 'pt-16 p-4'} bg-linear-to-br from-black via-blue-900 to-purple-900`}>
          <Outlet />
        </main>
      </div>

      {/* Personaje amigable */}
      <FriendlyCharacter />
    </div>
  );
}



