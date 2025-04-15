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
        target: 'https://api.comenspu.com:8000',
        changeOrigin: true,
        secure: false, // ตั้งเป็น false เพื่อข้ามการตรวจสอบ SSL
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  }
  
})
