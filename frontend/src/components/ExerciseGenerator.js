import React, { useState } from "react";
import axios from "axios";

function ExerciseGenerator({ onExercise }) {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setError("");
    setResult("");
    try {
      const res = await axios.post("/api/ai/generate-exercise", { prompt });
      if (res.data.exercise && res.data.exercise.length > 10) {
        setResult(res.data.exercise);
        if (onExercise) onExercise(res.data.exercise);
      } else {
        setError("La respuesta de la IA no es adecuada. Intenta con otro prompt.");
      }
    } catch (e) {
      setError("Error al generar ejercicio: " + e.message);
    }
  };

  const handleListen = async () => {
    if (!result) return;
    try {
      const res = await axios.post("/api/ai/speech", { text: result });
      if (res.data.audio_base64) {
        const audioUrl = "data:audio/wav;base64," + res.data.audio_base64;
        const audio = new window.Audio(audioUrl);
        audio.play();
      } else {
        setError("No se pudo reproducir el audio: " + (res.data.error || ""));
      }
    } catch (e) {
      setError("Error al reproducir audio: " + e.message);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow mb-4" aria-label="Generador de ejercicios IA">
      <h2 className="font-bold mb-2 flex items-center"><span role="img" aria-label="robot">🤖</span> Generador de Ejercicios IA</h2>
      <input
        className="border p-2 w-full mb-2"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Ej: Genera una historia de 5 oraciones con sílabas directas para un niño de 6 años"
        aria-label="Prompt para IA"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleGenerate}>Generar</button>
      {result && (
        <div className="mt-2 p-2 bg-green-100 rounded flex flex-col gap-2">
          <span>{result}</span>
          <button className="bg-blue-400 hover:bg-blue-300 text-white font-bold px-4 py-2 rounded-full shadow transition w-fit" onClick={handleListen}>
            <span role="img" aria-label="escuchar">🔊</span> Escuchar ejercicio
          </button>
        </div>
      )}
      {error && <div className="mt-2 p-2 bg-red-100 rounded text-red-700">{error}</div>}
    </div>
  );
}

export default ExerciseGenerator;
