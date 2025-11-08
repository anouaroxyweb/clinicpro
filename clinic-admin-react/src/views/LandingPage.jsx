import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clinicIllustration from "../assets/clinic-illustration.png";
import {
  Stethoscope,
  CalendarDays,
  UserPlus,
  Moon,
  Sun,
  ShieldCheck,
  Clock,
  Smartphone,
  Mail,
  Phone,
} from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [doctors, setDoctors] = useState([]);


useEffect(() => {
  fetch("http://127.0.0.1:8000/api/public/doctors")
    .then(res => res.json())
    .then(data => {
      const formatted = (data.data || data).map(doc => ({
        name: doc.user?.name,
        specialty: doc.specialty?.name,
        photo_url: doc.photo
          ? `http://127.0.0.1:8000/storage/${doc.photo}`
          : "/default1.jpg"
      }));
      setDoctors(formatted);
      console.log("📌 Doctors:", formatted);
    })
    .catch(() => setDoctors([]));
}, []);


  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
     

<section className="relative min-h-[88vh] flex items-center overflow-hidden">
  {/* خلفية نظيفة + دوائر متحركة خفيفة */}
  <div className="absolute inset-0 bg-gradient-to-b from-white to-sky-50 dark:from-neutral-900 dark:to-neutral-900" />
  <motion.div
    initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: .6 }}
    className="relative z-10 w-full px-6 md:px-16 grid md:grid-cols-2 items-center gap-10"
  >
    <div className="space-y-6">
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-clinic-text dark:text-white">
        Modern <span className="text-clinic-primary">Medical</span> Platform
      </h1>
      <p className="text-clinic-subt dark:text-slate-300 max-w-xl">
        Book appointments, manage your health, and connect with trusted doctors.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/patient/register"
          className="px-6 py-3 rounded-lg bg-clinic-primary text-dark font-semibold hover:bg-blue-700 transition"
        >
          Create Patient Account
        </Link>
        <Link
          to="/patient/login"
          className="px-6 py-3 rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-neutral-700 transition"
        >
          Login as Patient
        </Link>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-4 pt-2 text-sm text-clinic-subt">
        <div className="flex items-center gap-2"><ShieldCheck size={18}/> Secure</div>
        <div className="flex items-center gap-2"><Clock size={18}/> Fast</div>
        <div className="flex items-center gap-2"><Smartphone size={18}/> Mobile-first</div>
      </div>
    </div>

    {/* صورة/Mockup */}
    <motion.div
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7, delay: .1 }}
      className="relative"
    >
      <img
        src={clinicIllustration}
        alt="Clinic"
        className="w-full max-w-xl mx-auto rounded-2xl shadow-2xl"
      />
      {/* هالة لونية ناعمة */}
      <div className="absolute -z-10 inset-0 blur-3xl opacity-40 bg-gradient-to-tr from-clinic-primary/30 to-clinic-primaryLight/30 rounded-3xl" />
    </motion.div>
  </motion.div>
</section>


     {/* ⚙️ Features Section */}
<motion.section
  className="py-24 px-8 md:px-16 relative overflow-hidden"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 1 }}
>

  {/* خلفية راقية */}
  <div className="absolute inset-0 bg-gradient-to-b from-white to-sky-50 dark:from-neutral-900 dark:to-neutral-900" />

  <h2 className="relative text-4xl font-extrabold text-center mb-14 text-gray-800 dark:text-white">
    Why Choose ClinicPro?
  </h2>

  <div className="relative grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

    {[
      {
        icon: <ShieldCheck size={32} className="text-clinic-primary" />,
        title: "Secure & Private",
        desc: "All patient data is fully encrypted and protected.",
      },
      {
        icon: <Clock size={32} className="text-clinic-primary" />,
        title: "Quick Appointment",
        desc: "Book and manage appointments in just a few seconds.",
      },
      {
        icon: <Smartphone size={32} className="text-clinic-primary" />,
        title: "Mobile Friendly",
        desc: "Optimized for phones, tablets, and desktop devices.",
      },
    ].map((f, i) => (
      
      <motion.div
        key={i}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="group p-8 rounded-2xl bg-white dark:bg-neutral-800 shadow-lg border border-transparent hover:border-blue-500 relative"
      >

        {/* Halo Light Effect */}
        <div className="absolute -inset-4 opacity-0 group-hover:opacity-30 blur-3xl transition bg-gradient-to-br from-clinic-primary/40 to-clinic-primaryLight/40" />

        <div className="relative flex flex-col items-center text-center space-y-3">
          <div className="p-4 rounded-full bg-blue-100 dark:bg-neutral-700 shadow">
            {f.icon}
          </div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            {f.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {f.desc}
          </p>
        </div>

      </motion.div>
    ))}
  </div>
</motion.section>


      {/* 💬 Testimonials */}
<motion.section
  className="py-20 bg-white dark:bg-neutral-900 text-center"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 1 }}
>
  <h2 className="text-3xl font-extrabold mb-12 text-gray-800 dark:text-white">
    What Our Users Say
  </h2>

  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
    {[
      { name: "Sara B.", text: "Booking my doctor has never been easier! Love the simplicity." },
      { name: "Dr. Youssef", text: "This system saves hours of admin work weekly. Brilliant!" },
      { name: "Hassan", text: "Dark mode? Responsive? Perfect for my clinic tablet!" }
    ].map((t, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.03 }}
        className="relative bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-8 text-center border border-transparent hover:border-blue-500 transition overflow-hidden"
      >
        {/* هالة خلفية */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition duration-300"></div>

        <p className="italic text-gray-600 dark:text-gray-300 text-sm mb-4">“{t.text}”</p>
        <h4 className="font-semibold text-blue-600 dark:text-blue-400">— {t.name}</h4>
      </motion.div>
    ))}
  </div>
</motion.section>


   {/* 👨‍⚕️ Meet Our Doctors */}
<motion.section
  className="py-20 bg-white dark:bg-neutral-900 text-center"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 1 }}
>
  <h2 className="text-3xl font-extrabold mb-12 text-gray-800 dark:text-white">
    Meet Our Doctors
  </h2>

  <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">

    {(doctors?.length > 0 ? doctors : [
      { name: "Dr. Sofia", specialty: "Dermatologist", photo_url: "/default1.jpg" },
      { name: "Dr. Karim", specialty: "Cardiologist", photo_url: "/default2.jpg" },
      { name: "Dr. Amina", specialty: "Dentist", photo_url: "/default3.jpg" },
    ]).map((doc, i) => (

      <motion.div
        key={i}
        whileHover={{ scale: 1.03 }}
        className="relative bg-white dark:bg-neutral-800 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-8 transition overflow-hidden"
      >

        {/* هالة لونية ناعمة فـ الخلف */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition duration-300 rounded-2xl" />

        {/* صورة الطبيب */}
        <div className="relative w-28 h-28 mx-auto mb-4">
          <img
            src={doc.photo_url}
            alt={doc.name}
            className="w-full h-full rounded-full object-cover border-4 border-blue-500 shadow-lg"
          />
        </div>

        {/* الاسم */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
          {doc.name}
        </h3>

        {/* التخصص */}
        <p className="text-blue-600 dark:text-blue-400 text-sm mb-3">
          {doc.specialty}
        </p>

        {/* ⭐ تقييم ثابت */}
        <div className="flex justify-center text-yellow-400 mb-4 text-sm">
          ★ ★ ★ ★ ☆
        </div>

        {/* زر الحجز */}
        <Link
          to="/patient/book"
          className="inline-block px-5 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-md"
        >
          Book Appointment
        </Link>

      </motion.div>
    ))}
  </div>
</motion.section>


{/* 🎯 Call To Action */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="mt-12 flex justify-center"
>
  <Link
    to="/patient/book"
    className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
  >
    <CalendarDays size={18} />
    Book Appointment Now
  </Link>
</motion.div>



      {/* 📩 Contact Form Section */}
<motion.section
  className="py-20 px-8 md:px-16 bg-gray-50 dark:bg-neutral-900"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 1 }}
>
  <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800 dark:text-white">
    Get in Touch
  </h2>

  <p className="text-center text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-10">
    Have questions or need support? Send us a message and we’ll reply shortly.
  </p>

  <form className="max-w-xl mx-auto space-y-4 bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-neutral-700">
    <input
      type="text"
      placeholder="Your Name"
      className="w-full p-3 rounded-lg bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-neutral-600 focus:ring-2 focus:ring-blue-500 outline-none"
    />

    <input
      type="email"
      placeholder="Your Email"
      className="w-full p-3 rounded-lg bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-neutral-600 focus:ring-2 focus:ring-blue-500 outline-none"
    />

    <textarea
      placeholder="Your Message"
      rows="4"
      className="w-full p-3 rounded-lg bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-neutral-600 focus:ring-2 focus:ring-blue-500 outline-none"
    ></textarea>

    <button
      type="submit"
      className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition"
    >
      Send Message
    </button>
  </form>
</motion.section>

      {/* 🦶 Footer */}
      
    </div>
  );
}
