import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router':       ['react-router-dom'],
          'icons':        ['lucide-react'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild', // Switching to esbuild to avoid terser dependency
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  server: {
    historyApiFallback: true,
  },
  preview: {
    historyApiFallback: true,
  }
})
