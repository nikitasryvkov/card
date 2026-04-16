import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  config.headers["X-Request-Id"] = crypto.randomUUID();
  return config;
});

export default http;
