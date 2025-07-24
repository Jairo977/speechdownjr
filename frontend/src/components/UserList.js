import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("/api/users").then(res => setUsers(res.data));
  }, []);
  return (
    <div className="bg-blue-100 p-4 rounded-xl mb-4">
      <h2 className="font-bold text-blue-700 mb-2">Usuarios registrados</h2>
      <ul>
        {users.map(u => (
          <li key={u.id} className="mb-1">👤 {u.username} ({u.role})</li>
        ))}
      </ul>
    </div>
  );
}
