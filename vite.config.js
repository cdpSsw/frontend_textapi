import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/frontend_textapi/',
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://api.comenspu.com:8000',  // URL ของ API ที่ต้องการใช้
        changeOrigin: true,
        secure: false, // ตั้งเป็น false ถ้า API ใช้ HTTP (ไม่ใช่ HTTPS)
        rewrite: (path) => path.replace(/^\/api/, ''),  // หากต้องการเปลี่ยน path
      },
    },
  }
})
