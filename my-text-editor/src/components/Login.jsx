import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [name, setName] = useState("");
  const { login } = useAuth();
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <input
        className="border rounded p-2 w-64"
        placeholder="Enter a username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn" onClick={() => name && login(name)}>Continue</button>
    </div>
  );
}