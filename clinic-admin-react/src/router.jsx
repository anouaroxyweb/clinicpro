import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import Layout from "./views/Layout";

// Admin
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import Patients from "./views/patients/List";
import PatientForm from "./views/patients/Form";
import Calendar from "./views/appointments/Calendar";
import DoctorsList from "./doctors/List";

// Landing + Patient
import LandingPage from "./views/LandingPage";
import PatientLogin from "./views/patients/PatientLogin";
import PatientRegister from "./views/patients/PatientRegister";
import PatientBook from "./views/patients/PatientBook";
import PatientAppointments from "./views/patients/PatientAppointments";
import AppointmentsList from "./views/appointments/AppointmentsList";
import DoctorProfile from "./doctors/Profile";
import DoctorSchedule from "./views/DoctorSchedule";

/* 🔐 حماية عامة متكاملة */
function Protected({ children, allowedRoles = [] }) {
  const [isReady, setIsReady] = React.useState(false);
  const [auth, setAuth] = React.useState({ token: null, role: null });

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    setAuth({ token, role });
    setIsReady(true);
  }, []);

  if (!isReady)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading...
      </div>
    );

  // 🔐 إذا ما كاينش توكن → رجع للـ Login
  if (!auth.token) return <Navigate to="/login" replace />;

  // 🚫 إذا ما عندوش الصلاحية
  if (allowedRoles.length > 0 && !allowedRoles.includes(auth.role)) {
    switch (auth.role) {
      case "patient":
        return <Navigate to="/patient/book" replace />;
      case "doctor":
        return <Navigate to="/admin/calendar" replace />;
      case "receptionist":
        return <Navigate to="/admin/patients" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // ✅ كلشي مزيان
  return children;
}


/* 🧭 Router */
export default function AppRouter() {
  return (
    <Routes>
      {/* 🌍 صفحات عامة (Navbar + Footer) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/patient/register" element={<PatientRegister />} />
      </Route>

      {/* ⚙️ صفحات ADMIN */}
      <Route
        path="/admin"
        element={
          <Protected allowedRoles={["admin", "doctor", "receptionist"]}>
            <Layout />
          </Protected>
        }
      >
        
        <Route index element={<Dashboard />} />

        <Route
          path="patients"
          element={
            <Protected allowedRoles={["admin", "receptionist"]}>
              <Patients />
            </Protected>
          }
        />
        <Route
          path="patients/new"
          element={
            <Protected allowedRoles={["admin", "receptionist"]}>
              <PatientForm />
            </Protected>
          }
        />
        <Route
          path="doctors"
          element={
            <Protected allowedRoles={["admin"]}>
              <DoctorsList />
            </Protected>
          }
        />
        <Route path="/admin/schedule" element={<DoctorSchedule />} />


         <Route
  path="/admin/profile"
  element={
    <Protected allowedRoles={["doctor"]}>
      <DoctorProfile />
    </Protected>
  }
/>

        <Route
  path="appointments"
  element={
    <Protected allowedRoles={["admin", "receptionist"]}>
      <AppointmentsList />
    </Protected>
  }
/>

        <Route
          path="calendar"
          element={
            <Protected allowedRoles={["admin", "doctor"]}>
              <Calendar />
            </Protected>
          }
        />
      </Route>

      {/* 👩‍⚕️ صفحات المريض */}
      <Route
        path="/patient/book"
        element={
          <Protected allowedRoles={["patient"]}>
            <PatientBook />
          </Protected>
        }
      />
      <Route
        path="/patient/appointments"
        element={
          <Protected allowedRoles={["patient"]}>
            <PatientAppointments />
          </Protected>
        }
      />

     
      {/* 🌀 صفحة غير موجودة */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
