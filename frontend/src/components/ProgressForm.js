import React, { useState } from "react";
import axios from "axios";

export default function ProgressForm({ onCreated }) {
  const [sessionId, setSessionId] = useState("");
  const [metric, setMetric] = useState("");
  const [value, setValue] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("/api/progress", { session_id: sessionId, metric, value });
      setMsg("Progreso registrado");
      setSessionId(""); setMetric(""); setValue("");
      if (onCreated) onCreated();
    } catch {
      setMsg("Error al registrar progreso");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-pink-50 p-4 rounded-xl mb-4 flex flex-col gap-2">
      <h2 className="font-bold text-pink-700">Registrar progreso</h2>
      <input required value={sessionId} onChange={e=>setSessionId(e.target.value)} placeholder="ID de sesión" className="p-2 rounded" />
      <input required value={metric} onChange={e=>setMetric(e.target.value)} placeholder="Métrica" className="p-2 rounded" />
      <input required value={value} onChange={e=>setValue(e.target.value)} placeholder="Valor" type="number" className="p-2 rounded" />
      <button type="submit" className="bg-pink-400 hover:bg-pink-300 text-white font-bold px-4 py-2 rounded">Registrar</button>
      {msg && <div className="text-sm text-pink-700">{msg}</div>}
    </form>
  );
}
