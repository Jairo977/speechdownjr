import React, { useState } from "react";
import axios from "axios";

export default function SessionForm({ onCreated }) {
  const [childId, setChildId] = useState("");
  const [activity, setActivity] = useState("");
  const [result, setResult] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("/api/sessions", { child_id: childId, activity, result });
      setMsg("Sesión registrada");
      setChildId(""); setActivity(""); setResult("");
      if (onCreated) onCreated();
    } catch {
      setMsg("Error al registrar sesión");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-yellow-50 p-4 rounded-xl mb-4 flex flex-col gap-2">
      <h2 className="font-bold text-yellow-700">Registrar actividad</h2>
      <input required value={childId} onChange={e=>setChildId(e.target.value)} placeholder="ID del niño" className="p-2 rounded" />
      <input required value={activity} onChange={e=>setActivity(e.target.value)} placeholder="Actividad" className="p-2 rounded" />
      <input value={result} onChange={e=>setResult(e.target.value)} placeholder="Resultado (opcional)" className="p-2 rounded" />
      <button type="submit" className="bg-yellow-400 hover:bg-yellow-300 text-white font-bold px-4 py-2 rounded">Registrar</button>
      {msg && <div className="text-sm text-yellow-700">{msg}</div>}
    </form>
  );
}
