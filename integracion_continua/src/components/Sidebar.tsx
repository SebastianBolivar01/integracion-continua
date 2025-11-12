import { useState } from "react";
import { NavLink } from "react-router-dom";

interface SidebarItem {
  label: string;
  route: string;
}

const mainItems: SidebarItem[] = [
  { label: "🔷 Explorador de Formas", route: "/shapes" },
  { label: "🌍 Globo Interactivo", route: "/globe" },
  { label: "🎨 Pintura 3D", route: "/paint" },
];

export default function Sidebar() {
  const [openMain, setOpenMain] = useState(true); // Dejamos el menú principal abierto por defecto

  const renderNavItem = ({ label, route }: SidebarItem) => (
    <NavLink
      key={route}
      to={route}
      className={({ isActive }) =>
        `w-full text-left flex items-center gap-2 justify-between rounded-lg px-3 py-2 text-[#15803D] bg-white
         hover:bg-slate-200 
         ${isActive ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300" : ""}`
      }
    >
      <div className="flex items-center gap-2">{label}</div>
    </NavLink>
  );

  return (
    <aside className="hidden md:flex flex-col w-full md:w-[240px] border-r border-slate-200 dark:border-slate-800 bg-[#81C784]">
      <div className="flex-1">
        <div className="p-3 space-y-1">
          {/* Acordeón Main Items */}
          <button
            onClick={() => setOpenMain(!openMain)}
            className="w-full text-left flex items-center justify-between rounded-lg px-3 py-2 text-[#166534] bg-[#FDE047]
                       hover:bg-yellow-300 font-medium"
          >
            Mi Aventura
            <span>{openMain ? "▲" : "▼"}</span>
          </button>
          {openMain && <div className="pl-4 space-y-1">{mainItems.map(renderNavItem)}</div>}
        </div>
      </div>

      {/* Caja inferior */}
      <div className="p-4">
        <div className="bg-white rounded-lg p-4 text-center text-[#15803D] font-bold">
          🦊 ¡Sigue explorando!
        </div>

      </div>
    </aside>
  );
}
