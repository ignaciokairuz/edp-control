import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/edp-control/',
  server: { host: '0.0.0.0', allowedHosts: ['terminal.local'] },
  plugins: [react(), tailwindcss()],
})
