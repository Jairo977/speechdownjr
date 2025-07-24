import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SessionList() {
  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    axios.get("/api/sessions").then(res => setSessions(res.data));
  }, []);
  return (
    <div className="bg-yellow-100 p-4 rounded-xl mb-4">
      <h2 className="font-bold text-yellow-700 mb-2">Historial de actividades</h2>
      <ul>
        {sessions.map(s => (
          <li key={s.id} className="mb-1">📅 {new Date(s.date).toLocaleDateString()} - {s.activity}</li>
        ))}
      </ul>
    </div>
  );
}
