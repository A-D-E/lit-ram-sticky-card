import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'sticky-card.js',
        entryFileNames: 'sticky-card.js'
      }
    }
  }
})