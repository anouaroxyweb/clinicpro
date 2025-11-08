import React, { useEffect, useState } from "react";
import api from "../../api";
import PatientLayout from "../../layouts/PatientLayout";
import { CalendarDays, User, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get("/appointments").then(({ data }) =>
      setAppointments(data.data || data)
    );
  }, []);

  const cancelAppointment = async (id) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;

    await api.patch(`/appointments/${id}/status`, { status: "cancelled" });

    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "cancelled" } : a))
    );
  };

  return (
    
    <PatientLayout>
      
      <div className="max-w-3xl mx-auto p-5 space-y-6">
        <h1 className="text-2xl font-bold text-center md:text-left">My Appointments</h1>

        {appointments.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-center py-10">
            You don't have any appointments yet.
          </p>
        )}

        <div className="space-y-4">
          {appointments.map((a, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="p-5 bg-white dark:bg-neutral-800 rounded-xl shadow border border-gray-200 dark:border-neutral-700 flex justify-between items-center gap-3"
            >
              <div>
                <p className="font-semibold text-lg">
                  Dr. {a.doctor?.name}
                </p>

                <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <CalendarDays size={16} /> {a.starts_at_formatted}
                </p>

                <p className="text-sm mt-1">
                  Status:{" "}
                  <span
                    className={
                      a.status === "pending"
                        ? "text-yellow-500"
                        : a.status === "confirmed"
                        ? "text-blue-500"
                        : a.status === "done"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {a.status}
                  </span>
                </p>
              </div>

              {a.status === "pending" && (
                <button
                  onClick={() => cancelAppointment(a.id)}
                  className="px-3 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition flex items-center gap-1"
                >
                  <XCircle size={16} /> Cancel
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </PatientLayout>
  );
}
