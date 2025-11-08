import React, { useEffect, useState } from "react";
import api from "../api";

const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

export default function DoctorSchedule() {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    api.get("/doctor/schedule").then(({ data }) => setSchedule(data ?? []));
  }, []);

  const update = () => {
    api.post("/doctor/schedule", { schedule }).then(() => {
      alert("✅ Schedule saved!");
    });
  };

  const updateDay = (day, field, value) => {
    setSchedule((prev) => {
      const updated = [...prev];
      const index = updated.findIndex((d) => d.day_of_week === day);

      if (index === -1) {
        updated.push({
          day_of_week: day,
          start_time: field === "start_time" ? value : "",
          end_time: field === "end_time" ? value : "",
        });
      } else {
        updated[index][field] = value;
      }

      return updated;
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-neutral-800 rounded-xl shadow mt-8">
      <h2 className="text-xl font-bold mb-4 text-center">🕒 Work Schedule</h2>

      {days.map((day) => {
        const item = schedule.find((d) => d.day_of_week === day) || {};
        return (
          <div key={day} className="flex justify-between items-center mb-3">
            <span className="w-24">{day}</span>

            <input
              type="time"
              value={item.start_time || ""}
              onChange={(e) => updateDay(day, "start_time", e.target.value)}
              className="p-2 rounded bg-neutral-700 text-white"
            />

            <input
              type="time"
              value={item.end_time || ""}
              onChange={(e) => updateDay(day, "end_time", e.target.value)}
              className="p-2 rounded bg-neutral-700 text-white"
            />
          </div>
        );
      })}

      <button
        onClick={update}
        className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
      >
        Save Schedule
      </button>
    </div>
  );
}
