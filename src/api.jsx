// src/api.jsx
import axios from "axios";

const api = axios.create({
  // baseURL: 'http://localhost:3005',
  baseURL: 'http://203.150.243.10:8000',
  timeout: 5000,
});

export default api;
