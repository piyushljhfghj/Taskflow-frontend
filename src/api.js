// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://server-tflow.onrender.com",
});

// Attach Firebase ID token (not just our own jwt)
API.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token"); // this must be Firebase's ID token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
