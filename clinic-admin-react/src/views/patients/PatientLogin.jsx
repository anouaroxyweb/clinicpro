import React, { useState, useEffect } from "react";
import api from "../../api";

export default function PatientLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🧭 Auto Redirect إذا المريض داخل من قبل
 

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", { email, password });

      // 🧩 حفظ البيانات فـ localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      // 🧩 تفعيل التوكن مباشرة فـ axios
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      // ✅ تحويل المريض مباشرة إلى صفحته
      window.location.replace("/patient/book");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900 px-4">
      <form
        onSubmit={submit}
        className="p-6 rounded-2xl shadow-lg bg-white dark:bg-neutral-800 w-full max-w-sm space-y-4 transition-all duration-300"
      >
        <h2 className="text-xl font-semibold text-center">
          🧑‍⚕️ Patient Login
        </h2>

        {/* Email */}
        <div>
          <input
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 outline-none"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Error message */}
        {error && (
          <p className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 py-1 rounded">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          disabled={loading}
          className={`w-full py-2 rounded-md font-medium transition text-white ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in…" : "Login"}
        </button>

        {/* Register link */}
        <p className="text-sm text-center mt-2 text-gray-600 dark:text-gray-300">
          Don’t have an account?{" "}
          <a
            href="/patient/register"
            className="text-blue-500 hover:underline font-medium"
          >
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
