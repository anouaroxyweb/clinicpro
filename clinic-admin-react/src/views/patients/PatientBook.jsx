import React, { useEffect, useState } from "react";
import api from "../../api";
import { CalendarDays, Stethoscope, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import PatientLayout from "../../layouts/PatientLayout";

export default function PatientBook() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    doctor_id: "",
    starts_at: "",
    notes: "",
  });
  const [success, setSuccess] = useState("");

  useEffect(() => {
    api
      .get("/doctors")
      .then(({ data }) => {
        setDoctors(data.data || data); // ✅ يدعم pagination أو array مباشرة
      })
      .catch(() => setDoctors([]))
      .finally(() => setLoading(false));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setSuccess("");
    try {
      const patient_id = 1; // ✅ لاحقًا نستخرجو من localStorage أو login info
      await api.post("/appointments", {
        ...form,
        patient_id,
        ends_at: form.starts_at,
        status: "pending",
      });
      setSuccess("✅ Appointment request sent successfully!");
      setForm({ doctor_id: "", starts_at: "", notes: "" });
    } catch (err) {
      console.error(err);
      setSuccess("❌ ⛔ Selected time is outside the doctor's working hours (09:30:00 → 18:30:00)");
    }
  };

  return (
<PatientLayout>
    <div className="flex justify-center">      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-neutral-800 shadow-2xl rounded-2xl p-6 w-full max-w-md space-y-5 border border-gray-100 dark:border-neutral-700"
      >
        <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400">
          <CalendarDays size={22} /> Book Appointment
        </h2>

        {/* 👩‍⚕️ Doctor select */}
        <div>
          <label className="block text-sm mb-1 font-medium">Select Doctor</label>
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-3 text-gray-500">
              <Loader2 size={18} className="animate-spin" /> Loading doctors...
            </div>
          ) : (
            <select
              value={form.doctor_id}
              onChange={(e) =>
                setForm({ ...form, doctor_id: e.target.value })
              }
              className="w-full border p-2 rounded-md bg-gray-50 dark:bg-neutral-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            >
              <option value="">-- Choose doctor --</option>
              {Array.isArray(doctors) &&
                doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.user?.name || d.name} (
                    {d.specialty?.name || "General"})
                  </option>
                ))}
            </select>
          )}
        </div>

        {/* 🕒 Date/time */}
        <div>
          <label className="block text-sm mb-1 font-medium">
            Select Date & Time
          </label>
          <input
            type="datetime-local"
            value={form.starts_at}
            onChange={(e) =>
              setForm({ ...form, starts_at: e.target.value })
            }
            className="w-full border p-2 rounded-md bg-gray-50 dark:bg-neutral-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
            required
          />
        </div>

        {/* 📝 Notes */}
        <div>
          <label className="block text-sm mb-1 font-medium">
            Notes (optional)
          </label>
          <textarea
            value={form.notes}
            onChange={(e) =>
              setForm({ ...form, notes: e.target.value })
            }
            placeholder="Describe your problem or symptoms..."
            className="w-full border p-2 rounded-md bg-gray-50 dark:bg-neutral-700 h-24 resize-none focus:ring-2 focus:ring-blue-500 outline-none transition"
          ></textarea>
        </div>

        {/* 🔘 Submit */}
        <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-2.5 rounded-md font-medium hover:from-blue-700 hover:to-cyan-600 transition">
          Confirm Appointment
        </button>

        {/* 🟢 Message */}
        {success && (
          <p
            className={`text-center text-sm mt-2 ${
              success.startsWith("✅")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {success}
          </p>
        )}
      </motion.form>
    </div>
  </PatientLayout>
  );
}
