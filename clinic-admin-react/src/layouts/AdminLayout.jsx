import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import api from "../api";

export default function AdminLayout() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "admin"; // default admin

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    delete api.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  const title = role === "doctor" ? "👨‍⚕️ Doctor Panel" : "🩺 Admin Panel";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-gray-100">
      {/* 🧭 Navbar */}
      <header className="bg-white dark:bg-neutral-800 shadow-sm border-b border-gray-100 dark:border-neutral-700">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-3 gap-3 md:gap-0">
          
          {/* Logo */}
          <Link
            to="/admin"
            className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition"
          >
            {title}
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center flex-wrap justify-center gap-4 text-sm font-medium">
            <Link to="/admin" className="hover:text-blue-500 transition">
              Dashboard
            </Link>

            {role === "admin" && (
              <>
                <Link to="/admin/patients" className="hover:text-blue-500 transition">
                  Patients
                </Link>
                <Link to="/admin/doctors" className="hover:text-blue-500 transition">
                  Doctors
                </Link>
              </>
            )}

            <Link to="/admin/calendar" className="hover:text-blue-500 transition">
              Calendar
            </Link>

            <Link to="/admin/appointments" className="hover:text-blue-500 transition">
              Appointments
            </Link>

            <button
              onClick={logout}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-sm transition"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* 📦 Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full">
        <Outlet />
      </main>

      {/* 🦶 Footer */}
      <footer className="bg-white dark:bg-neutral-800 border-t border-gray-100 dark:border-neutral-700 text-center py-3 text-sm opacity-70">
        © {new Date().getFullYear()} ClinicCare Admin — All rights reserved
      </footer>
    </div>
  );
}
