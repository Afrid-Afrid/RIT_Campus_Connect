import axios from "axios";

// In local dev, leave VITE_API_URL unset - the Vite dev server proxies
// "/api" to the backend (see vite.config.js). In production (e.g. Vercel),
// set VITE_API_URL to your deployed backend URL, e.g.
// https://campusconnect-api.onrender.com/api
const baseURL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
