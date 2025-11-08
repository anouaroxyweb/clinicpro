import React, { useState } from "react";
import api from "../api";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("admin@clinic.local");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", { email, password });

      // ✅ حفظ token + role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      // 🔁 التوجيه حسب الدور
      if (data.user.role === "patient") {
        window.location.replace("/patient/book");
      } else {
        window.location.href = "/admin";
      }
    } catch (err) {
      console.error(err);
      setError("❌ Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 transition-colors duration-500 px-4">
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm bg-white/90 dark:bg-neutral-800/90 backdrop-blur-xl border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-4"
      >
        {/* 🏥 Logo / Title */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl mb-2"
          >
            🏥
          </motion.div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Clinic Admin Login
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Sign in to manage your clinic
          </p>
        </div>

        {/* ✉️ Email */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Email address
          </label>
          <input
            className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* 🔑 Password */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* ⚠️ Error message */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm text-center font-medium"
          >
            {error}
          </motion.p>
        )}

        {/* 🔘 Submit Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className="w-full py-2.5 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-md transition"
        >
          {loading ? "Signing in…" : "Sign In"}
        </motion.button>

        {/* 🌙 Footer Info */}
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
          © {new Date().getFullYear()} ClinicCare — All rights reserved
        </p>
      </motion.form>
    </div>
  );
}
