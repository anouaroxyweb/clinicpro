import React from "react";
import api from "../../api";

export default function Calendar() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/appointments/calendar");
      setItems(data);
    } catch (err) {
      console.error("Failed to load appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await api.patch(`/appointments/${id}/status`, { status: newStatus });
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("❌ Failed to update appointment status");
    }
  };

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500">Loading appointments...</div>
    );

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">🗓️ Appointments (This Week)</h2>

      <div className="space-y-2">
        {items.length === 0 ? (
          <p className="text-gray-500">No appointments found for this week.</p>
        ) : (
          items.map((ev) => (
            <div
              key={ev.id}
              className="p-4 rounded-xl bg-white dark:bg-neutral-800 shadow flex justify-between items-center"
            >
              <div>
                <div className="font-medium">{ev.title}</div>
                <div className="text-sm opacity-70">
                  {new Date(ev.start).toLocaleString()} →{" "}
                  {new Date(ev.end).toLocaleString()}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-xs px-2 py-1 rounded font-semibold ${
                    ev.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : ev.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : ev.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {ev.status}
                </span>

                <div className="flex gap-1">
                  {ev.status !== "confirmed" && (
                    <button
                      onClick={() => updateStatus(ev.id, "confirmed")}
                      className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                    >
                      Confirm
                    </button>
                  )}
                  {ev.status !== "cancelled" && (
                    <button
                      onClick={() => updateStatus(ev.id, "cancelled")}
                      className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
