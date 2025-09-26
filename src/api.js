// src/api.js
import axios from "axios";

// Centralized API instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://server-tflow.onrender.com",
});

// ✅ Attach token automatically to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
