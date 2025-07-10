import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/", // good for root deployment
  build: {
    outDir: "dist" // ✅ ensures Vercel sees the built files
  }
})
