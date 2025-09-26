import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://taskflow-frontend-nine.vercel.app/",
});

// Add token automatically if exists
API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
