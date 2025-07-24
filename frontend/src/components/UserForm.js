import React, { useState } from "react";
import axios from "axios";

export default function UserForm({ onCreated }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("padre");
  const [msg, setMsg] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("/api/users", { username, email, password, role });
      setMsg("Usuario creado");
      setUsername(""); setEmail(""); setPassword("");
      if (onCreated) onCreated();
    } catch {
      setMsg("Error al crear usuario");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-blue-50 p-4 rounded-xl mb-4 flex flex-col gap-2">
      <h2 className="font-bold text-blue-700">Registrar usuario</h2>
      <input required value={username} onChange={e=>setUsername(e.target.value)} placeholder="Usuario" className="p-2 rounded" />
      <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" className="p-2 rounded" />
      <input required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Contraseña" type="password" className="p-2 rounded" />
      <select value={role} onChange={e=>setRole(e.target.value)} className="p-2 rounded">
        <option value="padre">Padre</option>
        <option value="terapeuta">Terapeuta</option>
      </select>
      <button type="submit" className="bg-blue-400 hover:bg-blue-300 text-white font-bold px-4 py-2 rounded">Registrar</button>
      {msg && <div className="text-sm text-blue-700">{msg}</div>}
    </form>
  );
}
