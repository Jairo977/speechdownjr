


import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";

import ChildProfileForm from "./components/ChildProfileForm";
import ExerciseGenerator from "./components/ExerciseGenerator";
import ProgressDashboard from "./components/ProgressDashboard";

import UserList from "./components/UserList";
import ChildList from "./components/ChildList";
import SessionList from "./components/SessionList";
import ProgressList from "./components/ProgressList";
import UserForm from "./components/UserForm";
import ChildForm from "./components/ChildForm";
import SessionForm from "./components/SessionForm";
import ProgressForm from "./components/ProgressForm";


import axios from "axios";
import Login from "./components/Login";
function ResourceLibrary({ activities }) {
  // Para reproducir audio generado por TTS
  const handleListen = async (text) => {
    try {
      const res = await axios.post("/api/tts", { text }, { responseType: "blob" });
      const audioUrl = URL.createObjectURL(res.data);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch {
      alert("No se pudo reproducir el audio");
    }
  };
  return (
    <div className="p-6 bg-yellow-100 rounded-3xl shadow-lg mb-6 border-4 border-yellow-300">
      <h2 className="font-extrabold text-lg mb-4 flex items-center text-yellow-700"><span role="img" aria-label="books">📚</span> Biblioteca de Recursos</h2>
      <ul className="list-disc pl-5">
        {activities.length === 0 && <li className="text-yellow-700">¡Aún no hay ejercicios! Genera uno con el robot 🤖</li>}
        {activities.map((act, idx) => (
          <li key={idx} className="mb-4 flex items-center">
            <span className="bg-white rounded-xl px-3 py-2 text-lg font-semibold text-yellow-800 shadow mr-2">{act}</span>
            <button
              className="ml-2 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold px-4 py-2 rounded-full shadow transition"
              onClick={() => {
                const blob = new Blob([act], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `ejercicio_${idx + 1}.txt`;
                a.click();
              }}
              aria-label="Descargar ejercicio"
            >
              <span role="img" aria-label="descargar">⬇️</span> Descargar
            </button>
            <button
              className="ml-2 bg-blue-400 hover:bg-blue-300 text-white font-bold px-4 py-2 rounded-full shadow transition"
              onClick={() => handleListen(act)}
              aria-label="Escuchar ejercicio"
            >
              <span role="img" aria-label="escuchar">🔊</span> Escuchar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


function App() {
  const [activities, setActivities] = useState([]);
  const [progressData] = useState([3, 5, 7, 9]);
  const [user, setUser] = useState(null); // usuario logueado
  const [section, setSection] = useState(null);
  const [childrenList, setChildrenList] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);

  // Cargar lista de niños al loguear
  useEffect(() => {
    if (user) {
      axios.get("/api/children").then(res => {
        setChildrenList(res.data);
        // Si hay niños, seleccionar el primero por defecto
        if (res.data.length > 0) setSelectedChild(res.data[0]);
        else setSelectedChild(null);
      });
    } else {
      setChildrenList([]);
      setSelectedChild(null);
    }
  }, [user]);

  // Paneles por rol
  const renderPanel = () => {
    if (!user) return <Login onLogin={u => { setUser(u); setSection(null); }} />;
    // Sidebar controla la sección
    // Paneles filtrados por niño seleccionado
    if (user.role === "admin" || user.role === "superadmin" || user.role === "padre" || user.role === "terapeuta") {
      if (section === "usuarios" && (user.role === "admin" || user.role === "superadmin")) {
        return <main className="w-full max-w-2xl mx-auto flex flex-col gap-6"><UserForm /><UserList /></main>;
      }
      if ((section === "niños" || !section)) {
        return <main className="w-full max-w-2xl mx-auto flex flex-col gap-6"><ChildForm user={user} /><ChildList /></main>;
      }
      if (section === "sesiones") {
        return selectedChild ? <main className="w-full max-w-2xl mx-auto flex flex-col gap-6"><SessionForm child={selectedChild} /><SessionList child={selectedChild} /></main> : <div className="text-pink-700 font-bold">Selecciona un niño</div>;
      }
      if (section === "progreso") {
        return selectedChild ? <main className="w-full max-w-2xl mx-auto flex flex-col gap-6"><ProgressDashboard child={selectedChild} /><ProgressList child={selectedChild} /></main> : <div className="text-pink-700 font-bold">Selecciona un niño</div>;
      }
    }
    if (user.role === "niño" || user.role === "nino") {
      if (section === "ejercicios" || !section) {
        return <main className="w-full max-w-2xl mx-auto flex flex-col gap-6"><ExerciseGenerator onExercise={act => setActivities([act, ...activities])} /></main>;
      }
      if (section === "progreso") {
        return <main className="w-full max-w-2xl mx-auto flex flex-col gap-6"><ProgressDashboard progressData={progressData} /></main>;
      }
      if (section === "recursos") {
        return <main className="w-full max-w-2xl mx-auto flex flex-col gap-6"><ResourceLibrary activities={activities} /></main>;
      }
    }
    return <div>Rol no reconocido</div>;
  };

  // Cambiar sección a ejercicios al seleccionar niño
  const handleSelectChild = (child) => {
    setSelectedChild(child);
    setSection("ejercicios");
  };

  // Guardar automáticamente historial y progreso al generar ejercicio IA
  const handleExercise = async (exerciseText) => {
    setActivities([exerciseText, ...activities]);
    if (selectedChild) {
      // Guardar sesión
      try {
        const sessionRes = await axios.post("/api/sessions", {
          child_id: selectedChild.id,
          activity: exerciseText,
          result: "Ejercicio generado por IA"
        });
        // Guardar progreso simulado
        await axios.post("/api/progress", {
          session_id: sessionRes.data.id,
          metric: "ejercicios_ia",
          value: 1
        });
      } catch (e) {
        // No bloquear la UI si falla
        console.error("No se pudo guardar historial/progreso", e);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-pink-100 to-yellow-100 flex">
      <Sidebar
        user={user}
        onLogout={() => setUser(null)}
        onSelect={setSection}
        selected={section}
        childrenList={childrenList}
        selectedChildId={selectedChild?.id}
        onSelectChild={handleSelectChild}
      />
      <div className="flex-1 flex flex-col items-center p-4 ml-48">
        <header className="mb-6 w-full max-w-2xl">
          <div className="flex items-center justify-center mb-2">
            <span className="text-5xl mr-2" role="img" aria-label="niños">🧒👧</span>
            <h1 className="text-4xl font-extrabold text-pink-600 drop-shadow">SpeechDown</h1>
          </div>
          <p className="text-lg text-blue-800 text-center font-semibold">¡Juega, aprende y mejora tu habla con ayuda de la IA!</p>
        </header>
        {/* Panel de ejercicios IA para el niño seleccionado */}
        {user && (user.role === "admin" || user.role === "superadmin" || user.role === "padre" || user.role === "terapeuta") && section === "ejercicios" && selectedChild && (
          <main className="w-full max-w-2xl mx-auto flex flex-col gap-6">
            <ExerciseGenerator onExercise={handleExercise} />
          </main>
        )}
        {/* Panel normal */}
        {renderPanel()}
        <footer className="mt-8 text-center text-pink-500 text-lg font-bold">
          <span role="img" aria-label="corazón">❤️</span> ¡Hablar es divertido! <span role="img" aria-label="estrella">⭐</span>
          <div className="text-gray-500 text-sm mt-2">&copy; 2025 SpeechDown. Accesibilidad y usabilidad primero.</div>
        </footer>
      </div>
    </div>
  );
}

export default App;
