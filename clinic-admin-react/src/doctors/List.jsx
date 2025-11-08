import React, { useEffect, useState } from "react";
import { Plus, Trash2, Edit3, Stethoscope, X, Save } from "lucide-react";
import api from "../api";
import { motion, AnimatePresence } from "framer-motion";

export default function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [specialties, setSpecialties] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    specialty_id: "",
    license_number: "",
    bio: "",
  });

  // 🔹 Fetch doctors & specialties
  const fetchDoctors = async () => {
    try {
      const { data } = await api.get("/doctors");
      setDoctors(data.data || []);
    } catch {
      setError("❌ Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  const fetchSpecialties = async () => {
    try {
      const { data } = await api.get("/specialties");
      setSpecialties(data);
    } catch {
      console.error("Failed to load specialties");
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchSpecialties();
  }, []);

  // 🔹 Open modal
  const openModal = (doctor = null) => {
    setEditingDoctor(doctor);
    setForm(
      doctor
        ? {
            name: doctor.name || "",
            email: doctor.email || "",
            specialty_id: doctor.specialty?.id || "",
            license_number: doctor.license_number || "",
            bio: doctor.bio || "",
          }
        : { name: "", email: "", specialty_id: "", license_number: "", bio: "" }
    );
    setShowModal(true);
  };

  // 🔹 Save doctor
  const saveDoctor = async (e) => {
    e.preventDefault();
    try {
      if (editingDoctor) {
        await api.put(`/doctors/${editingDoctor.id}`, form);
      } else {
        await api.post("/doctors", form);
      }
      setShowModal(false);
      fetchDoctors();
    } catch {
      alert("❌ Failed to save doctor");
    }
  };

  // 🔹 Delete doctor
  const deleteDoctor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
    try {
      await api.delete(`/doctors/${id}`);
      setDoctors((prev) => prev.filter((d) => d.id !== id));
    } catch {
      alert("❌ Failed to delete doctor");
    }
  };

  if (loading)
    return <div className="p-6 text-gray-500">Loading doctors...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Stethoscope className="text-blue-500" /> Doctors
        </h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition w-full sm:w-auto justify-center"
        >
          <Plus size={16} /> Add Doctor
        </button>
      </div>

      {/* 🧾 Table (Desktop) */}
      <div className="hidden md:block overflow-x-auto rounded-xl shadow">
        <table className="w-full border-collapse bg-white dark:bg-neutral-800 text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-200">
              <th className="text-left p-3">#</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Specialty</th>
              <th className="text-left p-3">License</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc, i) => (
              <tr
                key={doc.id}
                className="border-b border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition"
              >
                <td className="p-3">{i + 1}</td>
                <td className="p-3 font-medium">{doc.name}</td>
                <td className="p-3">{doc.email}</td>
                <td className="p-3">{doc.specialty?.name || "—"}</td>
                <td className="p-3">{doc.license_number || "—"}</td>
                <td className="p-3">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                    Active
                  </span>
                </td>
                <td className="p-3 text-right flex justify-end gap-2">
                  <button
                    onClick={() => openModal(doc)}
                    className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-800/50 text-blue-600"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => deleteDoctor(doc.id)}
                    className="p-2 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-800/50 text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 Cards (Mobile) */}
      <div className="grid md:hidden gap-4">
        {doctors.map((doc, i) => (
          <div
            key={doc.id}
            className="bg-white dark:bg-neutral-800 rounded-xl shadow p-4 space-y-2 border border-gray-100 dark:border-neutral-700"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">{doc.name}</h3>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                Active
              </span>
            </div>
            <p className="text-sm text-gray-500">{doc.email}</p>
            <p className="text-sm">
              <strong>Specialty:</strong> {doc.specialty?.name || "—"}
            </p>
            <p className="text-sm">
              <strong>License:</strong> {doc.license_number || "—"}
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => openModal(doc)}
                className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 text-blue-600"
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={() => deleteDoctor(doc.id)}
                className="p-2 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-900/30 text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🧩 Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl w-full max-w-md p-6 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-semibold mb-4">
                {editingDoctor ? "Edit Doctor" : "Add Doctor"}
              </h2>

              <form onSubmit={saveDoctor} className="space-y-3">
                <input
                  type="text"
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-2 border rounded dark:bg-neutral-700"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full p-2 border rounded dark:bg-neutral-700"
                />
                <select
                  value={form.specialty_id}
                  onChange={(e) =>
                    setForm({ ...form, specialty_id: e.target.value })
                  }
                  className="w-full p-2 border rounded dark:bg-neutral-700"
                >
                  <option value="">Select specialty</option>
                  {specialties.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="License number"
                  value={form.license_number}
                  onChange={(e) =>
                    setForm({ ...form, license_number: e.target.value })
                  }
                  className="w-full p-2 border rounded dark:bg-neutral-700"
                />
                <textarea
                  placeholder="Short bio"
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full p-2 border rounded dark:bg-neutral-700"
                />

                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded bg-gray-100 dark:bg-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-600 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 transition justify-center"
                  >
                    <Save size={16} /> Save
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
