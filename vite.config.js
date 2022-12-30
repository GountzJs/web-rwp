import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '192.168.0.26',
    port: 3000
  },
  plugins: [react()],
})
