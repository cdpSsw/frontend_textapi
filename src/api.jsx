// src/api.jsx
import axios from "axios";
import https from "https"

const api = axios.create({
  // baseURL: 'http://localhost:3005',
  baseURL: 'https://203.150.243.10:8000',
  // baseURL: 'https://api.comenspu.com',
  timeout: 10000,
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
});

export default api;
