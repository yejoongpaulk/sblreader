import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

// for development purposes, changeOrigin
// is set to true. However, this is changed
// during production to prevent CORS errors.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true
      }
    }
  }
})
