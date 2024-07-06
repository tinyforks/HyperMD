// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: './demo', // The app root during development
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'HyperMD',
      // the proper extensions will be added
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
  },
})
