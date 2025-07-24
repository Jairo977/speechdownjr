import React, { useState } from "react";
import axios from "axios";

export default function ChildForm({ onCreated, user }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [parentId, setParentId] = useState("");
  const [msg, setMsg] = useState("");

  // Determinar si el campo parent_id debe autocompletarse
  const isParentOrTherapist = user && (user.role === "padre" || user.role === "terapeuta");

  const handleSubmit = async e => {
    e.preventDefault();
    let pid = parentId;
    if (isParentOrTherapist) {
      pid = user.id;
    }
    try {
      await axios.post("/api/children", { name, age, diagnosis, parent_id: pid });
      setMsg("Perfil creado");
      setName(""); setAge(""); setDiagnosis(""); setParentId("");
      if (onCreated) onCreated();
    } catch {
      setMsg("Error al crear perfil");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-green-50 p-4 rounded-xl mb-4 flex flex-col gap-2">
      <h2 className="font-bold text-green-700">Registrar niño</h2>
      <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre" className="p-2 rounded" />
      <input required value={age} onChange={e=>setAge(e.target.value)} placeholder="Edad" type="number" className="p-2 rounded" />
      <input value={diagnosis} onChange={e=>setDiagnosis(e.target.value)} placeholder="Diagnóstico (opcional)" className="p-2 rounded" />
      {!isParentOrTherapist && (
        <input required value={parentId} onChange={e=>setParentId(e.target.value)} placeholder="ID del padre" className="p-2 rounded" />
      )}
      {isParentOrTherapist && (
        <input type="hidden" value={user.id} />
      )}
      <button type="submit" className="bg-green-400 hover:bg-green-300 text-white font-bold px-4 py-2 rounded">Registrar</button>
      {msg && <div className="text-sm text-green-700">{msg}</div>}
    </form>
  );
}
