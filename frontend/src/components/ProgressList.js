import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProgressList() {
  const [progress, setProgress] = useState([]);
  useEffect(() => {
    axios.get("/api/progress").then(res => setProgress(res.data));
  }, []);
  return (
    <div className="bg-pink-100 p-4 rounded-xl mb-4">
      <h2 className="font-bold text-pink-700 mb-2">Progreso</h2>
      <ul>
        {progress.map(p => (
          <li key={p.id} className="mb-1">📈 {p.metric}: {p.value} ({new Date(p.timestamp).toLocaleDateString()})</li>
        ))}
      </ul>
    </div>
  );
}
