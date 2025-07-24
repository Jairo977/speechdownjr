import React, { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", { username, password });
      onLogin(res.data);
    } catch {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow flex flex-col gap-3 max-w-xs mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center text-pink-600 mb-2">Iniciar sesión</h2>
      <input required value={username} onChange={e=>setUsername(e.target.value)} placeholder="Usuario" className="p-2 rounded border" />
      <input required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Contraseña" type="password" className="p-2 rounded border" />
      <button type="submit" className="bg-pink-500 hover:bg-pink-400 text-white font-bold px-4 py-2 rounded">Entrar</button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </form>
  );
}
