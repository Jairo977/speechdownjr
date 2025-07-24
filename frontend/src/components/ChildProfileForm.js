import React, { useState } from "react";
import axios from "axios";

function ChildProfileForm({ onProfileCreated }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    diagnosis: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    try {
      // Ajusta la URL según tu endpoint real
      const res = await axios.post("http://localhost:5000/child-profiles", form);
      setMessage("Perfil creado correctamente");
      setForm({ name: "", age: "", diagnosis: "" });
      if (onProfileCreated) onProfileCreated(res.data);
    } catch (err) {
      setMessage("Error al crear perfil");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow mb-4" aria-label="Formulario de perfil de niño">
      <h2 className="font-bold mb-2">Registrar perfil de niño</h2>
      <label className="block mb-2">
        Nombre:
        <input
          className="border p-2 w-full"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          aria-label="Nombre del niño"
        />
      </label>
      <label className="block mb-2">
        Edad:
        <input
          className="border p-2 w-full"
          name="age"
          type="number"
          value={form.age}
          onChange={handleChange}
          required
          aria-label="Edad del niño"
        />
      </label>
      <label className="block mb-2">
        Diagnóstico:
        <input
          className="border p-2 w-full"
          name="diagnosis"
          value={form.diagnosis}
          onChange={handleChange}
          required
          aria-label="Diagnóstico"
        />
      </label>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Registrar</button>
      {message && <div className="mt-2 text-green-700">{message}</div>}
    </form>
  );
}

export default ChildProfileForm;
