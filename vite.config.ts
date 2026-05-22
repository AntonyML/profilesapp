import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Polyfill node:url for browser — aws-amplify internals use fileURLToPath
      'node:url': path.resolve(__dirname, 'src/stubs/node-url.ts'),
    },
  },
  optimizeDeps: {
    exclude: [
      '@aws-amplify/backend',
      '@aws-amplify/backend-cli',
      'aws-cdk-lib',
      'constructs',
    ],
  },
  build: {
    rollupOptions: {
      external: (id: string) =>
        id.startsWith('@aws-amplify/backend') ||
        id.startsWith('aws-cdk-lib') ||
        id === 'constructs',
    },
  },
})
