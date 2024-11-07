import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "https://ohjelmistoprojekti-1-tiimi-3.github.io/s24Tiimi3FrontEnd/",
  plugins: [react()],
})
