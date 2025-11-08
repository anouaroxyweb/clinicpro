import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, Outlet, useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Stethoscope,
  Moon,
  Sun,
  LogOut,
  Menu,
  X,
  User,
  ClipboardList,
  CalendarClock,
} from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { dark, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Dynamic Menu based on Role
  let navItems = [];
  if (role === "admin") {
    navItems = [
      { to: "/admin/", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
      { to: "/admin/patients", label: "Patients", icon: <Users size={18} /> },
      { to: "/admin/doctors", label: "Doctors", icon: <Stethoscope size={18} /> },
      { to: "/admin/calendar", label: "Calendar", icon: <CalendarDays size={18} /> },
      { to: "/admin/appointments", label: "Appointments", icon: <ClipboardList size={18} /> },
    ];
  }

  if (role === "doctor") {
    navItems = [
      { to: "/admin/", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
      { to: "/admin/calendar", label: "Calendar", icon: <CalendarDays size={18} /> },
      { to: "/admin/profile", label: "My Profile", icon: <User size={18} /> },
      { to: "/admin/schedule", label: "schedule", icon: <CalendarClock size={18} /> },
    ];
  }

  const panelTitle = role === "doctor" ? "Doctor Panel" : "Admin Panel";
  const profileName = role === "doctor" ? "Doctor" : "Admin";

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-gray-100 transition">

      {isMobile && (
        <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center bg-white/90 dark:bg-neutral-900/80 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800 px-4 py-3">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold text-blue-700 dark:text-white hover:opacity-80 transition">
            <span>🏥</span><span>{panelTitle}</span>
          </Link>

          <button onClick={() => setSidebarOpen(v => !v)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 transition">
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </header>
      )}

      <AnimatePresence>
        {(!isMobile || sidebarOpen) && (
          <motion.aside
            initial={{ x: isMobile ? -260 : 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -260, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`${isMobile ? "fixed z-50" : "sticky top-0 h-screen"} w-64 bg-gradient-to-b from-blue-600/90 to-blue-700/80 dark:from-neutral-800 dark:to-neutral-900 shadow-xl flex flex-col`}
          >
            <Link to="/" className="p-6 text-xl font-bold text-white border-b border-white/20 flex items-center gap-2 hover:bg-white/10 transition">
              <span>🏥</span> <span>{panelTitle}</span>
            </Link>

            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {navItems.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end
                  onClick={() => isMobile && setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive ? "bg-white/20 text-white shadow-md" : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>

            <div className="p-4 border-t border-white/20 space-y-2">
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-md bg-red-500/90 hover:bg-red-600 text-white text-sm transition"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className={`flex-1 flex flex-col ${isMobile ? "pt-16" : ""}`}>
        <header className="sticky top-0 z-30 bg-white/70 dark:bg-neutral-800/60 backdrop-blur-md border-b border-gray-200 dark:border-neutral-700 flex justify-between items-center px-6 py-3 shadow-sm">
          <h1 className="font-semibold text-lg">{panelTitle}</h1>

          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700 transition">
              {dark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-blue-500" />}
            </button>

            <div className="flex items-center gap-2 bg-gray-100 dark:bg-neutral-700 px-3 py-1.5 rounded-md text-sm">
              <User size={16} /> {profileName}
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 md:p-8 overflow-y-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-6xl mx-auto w-full">
            <Outlet />
          </motion.div>
        </main>

        <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-neutral-700 pt-4">
          © {new Date().getFullYear()} ClinicCare Admin — All rights reserved
        </footer>
      </div>

      {isMobile && sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/40 z-40 backdrop-blur-[1px]"></div>}
    </div>
  );
}
