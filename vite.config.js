import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
    build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          reacticons: ['react-icons'],
          bootstrap: ['react-bootstrap'],
          
        }
      },
      chunkSizeWarningLimit: 1000, // Increase limit if needed
    }
  },
  base:'/',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "bootstrap/scss/bootstrap";`
      }
    }
  }
})