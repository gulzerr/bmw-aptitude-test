import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    // Enable HMR
    hmr: true,
    // Watch for changes in these directories
    watch: {
      usePolling: true,
    },
    // Auto-open browser on start
    open: true,
    // Proxy API requests to avoid CORS issues
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
})
