import React from "react";
import { Link } from "react-router-dom";
import { Search, UserPlus, Phone, Mail } from "lucide-react";
import api from "../../api";
import { motion } from "framer-motion";

export default function Patients() {
  const [q, setQ] = React.useState("");
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchList = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/patients", { params: { q } });
      setItems(data.data || data);
    } catch (err) {
      console.error("Failed to fetch patients", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchList();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* 🔍 Search + New Button */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center w-full sm:w-auto gap-2 border rounded-xl px-3 py-2 bg-white dark:bg-neutral-800 shadow-sm hover:shadow-md transition">
          <Search className="text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or CIN..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm dark:text-gray-100 placeholder:text-gray-400"
          />
          <button
            onClick={fetchList}
            className="px-3 py-1.5 rounded-md bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-sm font-medium shadow-sm transition"
          >
            Filter
          </button>
        </div>

        <Link
          to="new"
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white text-sm font-medium shadow-sm sm:ml-auto transition"
        >
          <UserPlus size={16} /> New Patient
        </Link>
      </div>

      {/* 🩺 Table */}
      <div className="overflow-x-auto bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-700">
        <table className="min-w-full text-sm">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-neutral-700 dark:to-neutral-800">
            <tr className="text-left text-gray-600 dark:text-gray-300 font-medium">
              <th className="p-3">Name</th>
              <th className="p-3">CIN</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
            </tr>
          </thead>
        <tbody>
  {items.length > 0 ? (
    items.map((p, i) => (
      <motion.tr
        key={p.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.05 }}
        className="border-b border-gray-100 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700/60 transition"
      >
        {/* 🧍 Name */}
        <td className="p-3 font-semibold text-gray-800 dark:text-gray-100">
          {p.first_name} {p.last_name}
        </td>

        {/* 🪪 CIN */}
        <td className="p-3 text-gray-500 dark:text-gray-400">
          {p.cin || "—"}
        </td>

        {/* 📧 Email */}
        <td className="p-3 text-gray-500 dark:text-gray-400">
          {p.email ? (
            <div className="flex items-center gap-2">
              <Mail size={14} className="opacity-70" />
              <a
                href={`mailto:${p.email}`}
                className="hover:underline hover:text-blue-600 dark:hover:text-blue-400"
              >
                {p.email}
              </a>
            </div>
          ) : (
            <span className="flex items-center gap-2 opacity-60">
              <Mail size={14} /> —
            </span>
          )}
        </td>

        {/* 📞 Phone */}
        <td className="p-3 text-gray-500 dark:text-gray-400">
          {p.phone ? (
            <div className="flex items-center gap-2">
              <Phone size={14} className="opacity-70" />
              <a
                href={`tel:${p.phone}`}
                className="hover:underline hover:text-green-600 dark:hover:text-green-400"
              >
                {p.phone}
              </a>
            </div>
          ) : (
            <span className="flex items-center gap-2 opacity-60">
              <Phone size={14} /> —
            </span>
          )}
        </td>
      </motion.tr>
    ))
  ) : (
    <tr>
      <td
        colSpan={4}
        className="p-6 text-center text-gray-500 dark:text-gray-400"
      >
        No patients found 🩺
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>
    </motion.div>
  );
}
