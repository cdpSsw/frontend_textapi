import axios from "axios";

const api = axios.create({
  // baseURL: 'https://api.comenspu.com:8000',
  // baseURL: 'https://203.150.243.10:8000',   //  TEST - GITHUB HOST
  baseURL: 'https://comenspu.com:8000',   //  TEST - GITHUB HOST
  // baseURL: 'http://203.150.243.10:8000', // ✅ TEST - LOCALHOST SUCCESS
  timeout: 30000, // เพิ่มเวลา timeout
});

api.interceptors.request.use(request => {
  console.log('Starting Request:', request.url);
  return request;
});

api.interceptors.response.use(
  response => {
    console.log('Response:', response.status);
    return response;
  },
  error => {
    console.error('Error:', error.message);
    if (error.code === 'ECONNABORTED') {
      console.error('Timeout error - server not responding');
    }
    return Promise.reject(error);
  }
);

export default api;