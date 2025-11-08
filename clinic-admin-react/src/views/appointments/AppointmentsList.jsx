// src/views/appointments/AppointmentsList.jsx
import React, { useEffect, useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";

export default function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");
  const [doctors, setDoctors] = useState([]);

  // 🧠 fetch doctors
  useEffect(() => {
    api.get("/doctors").then(({ data }) => setDoctors(data.data || data));
  }, []);

  // 📦 fetch appointments
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/appointments", {
        params: {
          status: statusFilter,
          doctor_id: doctorFilter,
        },
      });
      setAppointments(data.data || data);
    } catch (err) {
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter, doctorFilter]);

  // ✅ update appointment status
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/appointments/${id}`, { status });
      toast.success(`Appointment ${status}`);
      fetchAppointments();
    } catch (err) {
      toast.error("Error updating status");
    }
  };

  if (loading) return <div className="text-gray-500 p-4">Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold flex items-center gap-2">
        🩺 Appointments Management
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <select
          value={doctorFilter}
          onChange={(e) => setDoctorFilter(e.target.value)}
          className="border rounded p-2 bg-gray-50 dark:bg-neutral-800"
        >
          <option value="">All Doctors</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded p-2 bg-gray-50 dark:bg-neutral-800"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>

        <button
          onClick={fetchAppointments}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Refresh
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-neutral-800 rounded-xl shadow border border-gray-200 dark:border-neutral-700">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-neutral-700">
            <tr>
              <th className="p-3 text-left">Patient</th>
              <th className="p-3 text-left">Doctor</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr
                key={a.id}
                className="border-b border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-900 transition"
              >
                <td className="p-3">{a.patient?.first_name} {a.patient?.last_name}</td>
                <td className="p-3">{a.doctor?.name}</td>
                <td className="p-3">{a.starts_at} → {a.ends_at}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold ${
                      a.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : a.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : a.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => updateStatus(a.id, "confirmed")}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => updateStatus(a.id, "cancelled")}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
