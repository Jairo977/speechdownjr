import React from "react";

export default function Sidebar({ user, onLogout, onSelect, selected, childrenList, selectedChildId, onSelectChild }) {
  if (!user) return null;
  let links = [];
  if (user.role === "admin" || user.role === "superadmin") {
    links = [
      { key: "usuarios", label: "Usuarios" },
      { key: "niños", label: "Niños" },
      { key: "sesiones", label: "Sesiones" },
      { key: "progreso", label: "Progreso" },
    ];
  } else if (user.role === "padre" || user.role === "terapeuta") {
    links = [
      { key: "niños", label: "Niños" },
      { key: "sesiones", label: "Sesiones" },
      { key: "progreso", label: "Progreso" },
    ];
  } else if (user.role === "niño" || user.role === "nino") {
    links = [
      { key: "ejercicios", label: "Ejercicios IA" },
      { key: "progreso", label: "Progreso" },
      { key: "recursos", label: "Recursos" },
    ];
  }
  return (
    <aside className="fixed left-0 top-0 h-full w-48 bg-white shadow-lg flex flex-col items-stretch z-20">
      <div className="p-4 font-extrabold text-pink-600 text-xl border-b">Menú</div>
      <nav className="flex-1 flex flex-col gap-1 p-2">
        {links.map(link => (
          <button
            key={link.key}
            className={`text-left px-4 py-2 rounded font-bold transition ${selected===link.key ? "bg-pink-200 text-pink-800" : "hover:bg-pink-50 text-pink-600"}`}
            onClick={() => onSelect(link.key)}
          >
            {link.label}
          </button>
        ))}
        {/* Lista de niños */}
        {childrenList && childrenList.length > 0 && (
          <div className="mt-4">
            <div className="font-bold text-pink-700 mb-1">Niños</div>
            {childrenList.map(child => (
              <button
                key={child.id}
                className={`block w-full text-left px-3 py-1 rounded transition text-pink-600 font-semibold mb-1 ${selectedChildId===child.id ? "bg-pink-100" : "hover:bg-pink-50"}`}
                onClick={() => onSelectChild(child)}
              >
                🧒 {child.name}
              </button>
            ))}
          </div>
        )}
      </nav>
      <button className="m-4 mt-auto bg-pink-500 hover:bg-pink-400 text-white font-bold px-4 py-2 rounded" onClick={onLogout}>
        Cerrar sesión
      </button>
      <div className="text-xs text-gray-400 text-center pb-2">{user.username} ({user.role})</div>
    </aside>
  );
}
