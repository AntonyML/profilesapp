import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Polyfill node:url — aws-amplify internals use fileURLToPath
      'node:url': path.resolve(__dirname, 'src/stubs/node-url.ts'),
      // Stub backend-only packages so they never get bundled for the browser
      '@aws-amplify/backend': path.resolve(__dirname, 'src/stubs/aws-amplify-backend.ts'),
      '@aws-amplify/backend-cli': path.resolve(__dirname, 'src/stubs/aws-amplify-backend.ts'),
    },
  },
  optimizeDeps: {
    exclude: ['aws-cdk-lib', 'constructs'],
  },
})
