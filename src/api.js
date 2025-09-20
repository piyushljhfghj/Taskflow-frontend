// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://taskflow005.onrender.com/api",  // ✅ single place to update
});

export default API;
