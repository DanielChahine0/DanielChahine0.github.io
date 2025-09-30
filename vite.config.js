import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

// When using ESM, __dirname is not defined. Use fileURLToPath(import.meta.url)
// to compute the current directory reliably across platforms (Windows/Unix).
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Debug: print resolved paths when running Vite to ensure alias points to the correct folder
console.log('VITE __dirname:', __dirname);
console.log('VITE alias @ ->', path.resolve(__dirname, 'src'));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
