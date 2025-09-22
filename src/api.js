// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://server-tflow.onrender.com",  // ✅ single place to update
});

export default API;
  