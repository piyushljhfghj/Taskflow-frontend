

// // src/api.js
// import axios from "axios";

// // Base URL must be `baseURL` (case-sensitive) and point to your backend + /api
// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
//   withCredentials: true,
// });

// // Attach token automatically to every request
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers = config.headers || {};
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default API;

// ------------------------------------------

// src/api.js
import axios from "axios";

// Base URL must be `baseURL` (case-sensitive) and point to your backend + /api
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://server-tflow.onrender.com/api",
  withCredentials: true,
});

// Attach token automatically to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
