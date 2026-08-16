import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Vercel serves at root ('/'); GitHub Pages serves from a sub-path.
  // Set VITE_DEPLOY_BASE=/nuraki-beauty-lounge/ for the GitHub Pages build.
  base: process.env.VITE_DEPLOY_BASE || '/',
  plugins: [react()],
})
