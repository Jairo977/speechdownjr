import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ChildList() {
  const [children, setChildren] = useState([]);
  useEffect(() => {
    axios.get("/api/children").then(res => setChildren(res.data));
  }, []);
  return (
    <div className="bg-green-100 p-4 rounded-xl mb-4">
      <h2 className="font-bold text-green-700 mb-2">Perfiles de niños</h2>
      <ul>
        {children.map(c => (
          <li key={c.id} className="mb-1">🧒 {c.name} ({c.age} años)</li>
        ))}
      </ul>
    </div>
  );
}
