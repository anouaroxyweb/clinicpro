import React, { useState } from "react";
import api from "../../api";

export default function PatientRegister() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { ...form, role: "patient" });
      setMsg("✅ Account created! You can now login.");
    } catch {
      setMsg("❌ Error creating account.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900">
      <form
        onSubmit={submit}
        className="p-6 rounded-2xl shadow-lg bg-white dark:bg-neutral-800 w-80"
      >
        <h2 className="text-lg font-semibold mb-4 text-center">🩺 Patient Register</h2>
        <input
          className="w-full mb-2 p-2 border rounded"
          placeholder="Full name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full mb-2 p-2 border rounded"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="w-full mb-2 p-2 border rounded"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="w-full mt-3 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Register
        </button>
        {msg && <p className="mt-3 text-center text-sm">{msg}</p>}
      </form>
    </div>
  );
}
