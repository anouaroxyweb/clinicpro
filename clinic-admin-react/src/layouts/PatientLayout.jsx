// src/layouts/PatientLayout.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function PatientLayout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    delete api.defaults.headers.common["Authorization"];
    navigate("/patient/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-gray-100">
      {/* 🧭 Navbar */}
      <header className="bg-white dark:bg-neutral-800 shadow-sm border-b border-gray-100 dark:border-neutral-700">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-3 gap-3 md:gap-0">
          {/* Logo */}
          <Link
            to="/"
            className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition"
          >
            🏥 ClinicCare
          </Link>

          {/* Nav Links + Logout */}
          <div className="flex items-center flex-wrap justify-center gap-4 text-sm font-medium">
            <Link to="/" className="hover:text-blue-500 transition">
              Home
            </Link>
            <Link to="/patient/book" className="hover:text-blue-500 transition">
              Book Appointment
            </Link>
            <Link
              to="/patient/appointments"
              className="hover:text-blue-500 transition"
            >
              My Appointments
            </Link>
            <Link to="/contact" className="hover:text-blue-500 transition">
              Contact
            </Link>

            {/* 🚪 Logout Button */}
            <button
              onClick={logout}
              className="ml-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-sm transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* 📦 Main Content */}
      <main className="flex-1 p-4 md:p-8">{children}</main>

      {/* 🦶 Footer */}
      <footer className="bg-white dark:bg-neutral-800 border-t border-gray-100 dark:border-neutral-700 text-center py-3 text-sm opacity-70">
        © {new Date().getFullYear()} ClinicCare — All rights reserved
      </footer>
    </div>
  );
}
