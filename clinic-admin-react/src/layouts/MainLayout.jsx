import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Stethoscope, Moon, Sun, Mail, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../theme/ThemeProvider";

export default function MainLayout() {
  const location = useLocation();
  const { dark, toggleTheme } = useTheme ? useTheme() : { dark: false, toggleTheme: () => {} };
  const [scrolled, setScrolled] = useState(false);
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));

  // ✅ مراقبة تغيّر التوكن في localStorage
  useEffect(() => {
    const handleStorage = () => setIsLogged(!!localStorage.getItem("token"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // ✅ تحديث التوكن حتى داخل نفس التبويب
  useEffect(() => {
    const checkToken = setInterval(() => {
      setIsLogged(!!localStorage.getItem("token"));
    }, 1000);
    return () => clearInterval(checkToken);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      {/* 🩺 Navbar */}
      <header
        className={`fixed top-0 w-full z-50 flex justify-between items-center px-8 py-4 transition-all duration-300 ${
          scrolled
            ? "bg-white/70 dark:bg-neutral-800/60 shadow-md backdrop-blur-lg"
            : "bg-transparent"
        }`}
      >
        <Link
          to="/"
          className="text-2xl font-bold flex items-center gap-2 hover:scale-[1.02] transition-transform"
        >
          <Stethoscope className="text-blue-500 drop-shadow-md" />
          <span>
            Clinic<span className="text-blue-600">Pro</span>
          </span>
        </Link>

        <nav className="flex gap-5 items-center text-sm font-medium">
         <Link
  to={
    localStorage.getItem("token")
      ? localStorage.getItem("role") === "admin"
        ? "/admin"
        : "/patient/book"
      : "/login"
  }
  className="hover:text-blue-500 transition"
>
  {localStorage.getItem("token")
    ? localStorage.getItem("role") === "admin"
      ? "Admin"
      : "Patient"
    : "Login"}
</Link>


          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-gray-300 dark:border-neutral-600 
                     hover:bg-gray-100 dark:hover:bg-neutral-700 transition-all duration-200
                     hover:rotate-12"
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? (
              <Sun size={18} className="text-yellow-400 drop-shadow" />
            ) : (
              <Moon size={18} className="text-blue-500 drop-shadow" />
            )}
          </button>
        </nav>
      </header>

      {/* 📄 Animated Page Transitions */}
      <main className="pt-24 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="px-6 md:px-10"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

    <footer className="mt-20 bg-gray-100 dark:bg-neutral-800 border-t border-gray-300 dark:border-neutral-700">
  <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

    {/* Logo + Text */}
    <div>
      <Link to="/" className="flex items-center gap-2">
        <Stethoscope className="text-clinic-primary" />
        <span className="text-xl font-bold">
          Clinic<span className="text-clinic-primary">Pro</span>
        </span>
      </Link>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        The smarter way to manage clinic bookings and patient experience.
      </p>
    </div>

    {/* Navigation */}
    <div>
      <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-4">Navigation</h4>
      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        <li><Link to="/" className="hover:text-clinic-primary transition">Home</Link></li>
        <li><Link to="/about" className="hover:text-clinic-primary transition">About</Link></li>
        <li><Link to="/login" className="hover:text-clinic-primary transition">Login</Link></li>
      </ul>
    </div>

    {/* Patients */}
    <div>
      <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-4">Patients</h4>
      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        <li><Link to="/patient/register" className="hover:text-clinic-primary transition">Create Account</Link></li>
        <li><Link to="/patient/book" className="hover:text-clinic-primary transition">Book Appointment</Link></li>
        <li><Link to="/patient/appointments" className="hover:text-clinic-primary transition">My Appointments</Link></li>
      </ul>
    </div>

    {/* Contact */}
    <div>
      <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-4">Contact</h4>
      <div className="flex flex-col space-y-2 text-sm text-gray-600 dark:text-gray-300">
        <span className="flex items-center gap-2"><Mail size={16}/> support@clinicpro.com</span>
        <span className="flex items-center gap-2"><Phone size={16}/> +212 600 000 000</span>
      </div>
    </div>

  </div>

  {/* Copyright bar */}
  <div className="border-t border-gray-300 dark:border-neutral-700 py-4 text-center text-xs text-gray-500 dark:text-gray-400">
    © {new Date().getFullYear()} ClinicPro — All rights reserved.
  </div>
</footer>


    </div>
  );
}
