import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Vite plugin: replaces any local amplify/ backend file with an empty module.
// These files (data/resource, auth/resource, backend.ts) use CDK/Node.js APIs
// and must never execute in the browser. The frontend only needs the Schema *type*,
// which TypeScript erases at compile time — so an empty module is safe.
function stubAmplifyBackend(): Plugin {
  return {
    name: 'stub-amplify-backend',
    load(id) {
      // Match any resolved path inside the project's /amplify/ folder
      if (/[\\/]amplify[\\/]/.test(id) && !id.includes('node_modules')) {
        return 'export default {};\nexport const Schema = undefined;\nexport const data = undefined;\nexport const auth = undefined;\n'
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), stubAmplifyBackend()],
  resolve: {
    alias: {
      // Polyfill node:url — aws-amplify internals use fileURLToPath
      'node:url': path.resolve(__dirname, 'src/stubs/node-url.ts'),
      // Stub backend-only npm packages
      '@aws-amplify/backend': path.resolve(__dirname, 'src/stubs/aws-amplify-backend.ts'),
      '@aws-amplify/backend-cli': path.resolve(__dirname, 'src/stubs/aws-amplify-backend.ts'),
    },
  },
  optimizeDeps: {
    exclude: ['aws-cdk-lib', 'constructs'],
  },
})
