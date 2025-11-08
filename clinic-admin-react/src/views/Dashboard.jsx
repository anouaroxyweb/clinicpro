import React from "react";
import { Users, CalendarDays, DollarSign } from "lucide-react";
import api from "../api";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [stats, setStats] = React.useState(null);

  React.useEffect(() => {
    api.get("/dashboard/stats").then(({ data }) => setStats(data));
  }, []);

  if (!stats)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500 text-sm">
        Loading dashboard...
      </div>
    );

  return (
    <div className="space-y-8 pb-10">
      {/* 🏷️ Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold tracking-tight text-center md:text-left"
      >
        Dashboard Overview
      </motion.h1>

      {/* 📊 Stats Cards */}
      <motion.div
        className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        <AnimatedCard
          title="Total Patients"
          value={stats.patients_total}
          icon={<Users className="text-blue-500" size={26} />}
          gradient="from-blue-500/10 to-blue-500/5"
        />
        <AnimatedCard
          title="Appointments Today"
          value={stats.appointments_today}
          icon={<CalendarDays className="text-green-500" size={26} />}
          gradient="from-green-500/10 to-green-500/5"
        />
        <AnimatedCard
          title="Revenue This Month"
          value={`${stats.revenue_month} MAD`}
          icon={<DollarSign className="text-yellow-500" size={26} />}
          gradient="from-yellow-500/10 to-yellow-500/5"
        />
      </motion.div>

      {/* 🕒 Recent Activity */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <h2 className="text-lg font-semibold mb-3 flex items-center justify-between flex-wrap gap-2">
          <span>Recent Activity</span>
          <span className="text-xs text-gray-400 dark:text-gray-500 font-normal">
            (coming soon)
          </span>
        </h2>

        <div className="p-5 bg-white dark:bg-neutral-800 rounded-2xl border border-gray-100 dark:border-neutral-700 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3 text-center sm:text-left">
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
              Appointment timeline, new patients, and revenue insights coming
              soon 🚀
            </p>
            <div className="text-gray-300 text-3xl sm:text-4xl">📈</div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

/* 🪄 Reusable Animated Card */
function AnimatedCard({ title, value, icon, gradient }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.4 }}
    >
      <div
        className={`p-5 sm:p-6 rounded-2xl bg-gradient-to-br ${gradient} from-gray-50 to-white dark:from-neutral-800 dark:to-neutral-900 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex justify-between items-center`}
      >
        <div>
          <div className="text-sm opacity-70">{title}</div>
          <div className="text-2xl sm:text-3xl font-bold mt-1">{value}</div>
        </div>
        <div className="p-3 sm:p-4 rounded-full bg-gray-100 dark:bg-neutral-700 shadow-inner">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
