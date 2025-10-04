import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',   // repo URL base for Pages
  define: {
    'import.meta.env.VITE_GITHUB_TOKEN': '""', // force-empty at build
  },
})
