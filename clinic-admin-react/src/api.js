// src/api.js
import axios from "axios";

// 🧩 إنشاء instance أساسي لـ axios
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false, // ✅ نخليها false باش ما يديرش مشاكل مع CORS
});

// 🧩 تحميل التوكن من localStorage أول مرة
const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// 🧩 Interceptor قبل كل request
api.interceptors.request.use(
  (config) => {
    const t = localStorage.getItem("token");
    if (t) config.headers.Authorization = `Bearer ${t}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// 🧩 Interceptor بعد كل response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // ✅ التعامل مع انتهاء صلاحية التوكن أو عدم الصلاحية
    if (error.response && error.response.status === 401) {
      console.warn("⚠️ Unauthorized! Logging out...");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/login"; // ⬅️ رجع المستخدم مباشرة
    }
    return Promise.reject(error);
  }
);

export default api;
